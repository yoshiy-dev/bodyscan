/* eslint-disable no-console */

import { Line, LineClient } from 'messaging-api-line';
import { NextApiResponse } from 'next';

import { prisma } from '@/server/db';
import { LineApiRequest } from '@/types/line';
import { calculateAge, formatDate } from '@/utils/day';

// get accessToken and channelSecret from LINE developers website
const client = new LineClient({
  accessToken:
    'zEJ5U56Tg2FEHVw0EdgkR5dkulYAkWgUhRpErj3apQ42/Ez13MRKeTHOSxh1uMpAEuQEzMWSQLQorqm8hU9+8CbqIIZyOjU8UOcs/DfHhWRKEtoYdiB6bNvRWvLqdKWRfTguVronRdhQPunHdgTvMwdB04t89/1O/w1cDnyilFU=',
  channelSecret: '1247f76aab294b70bfcaeba6e794f949',
});

export default async function lineWebhook(
  req: LineApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    const event = req.body.events[0];
    console.log(event);

    if (event.type == 'unfollow') {
      await prisma.user.update({
        where: { lineId: event.source.userId },
        data: { isDeleted: true },
      });
    } else if (event.type == 'follow') {
      const profile = await client.getUserProfile(req.body.events[0].source.userId);
      console.log(profile);
      const { userId: lineId, pictureUrl: image, displayName: lineName } = profile;
      await client.reply(event.replyToken, [
        Line.createText(
          'フォローいただきありがとうございます！\nカルテ登録を行いますので、以下の質問に回答してください！',
        ),
        Line.createTemplate('性別を教えてください', {
          type: 'buttons',
          title: `最初に性別を教えてください！`,
          text: '以下から選択してください',
          actions: [
            { type: 'postback', label: '男性', data: '男性' },
            { type: 'postback', label: '女性', data: '女性' },
          ],
        }),
      ]);
      await prisma.user.upsert({
        where: { lineId: event.source.userId },
        update: { image, lineName, isDeleted: false },
        create: { lineId, image, lineName, name: lineName },
      });
    } else if (event.type == 'message') {
      const user = await prisma.user.findUnique({ where: { lineId: event.source.userId } });
      if (user?.name === '更新処理中') {
        const name = event.message.text;
        await prisma.user.update({
          where: { lineId: event.source.userId },
          data: { name },
        });
        await client.reply(event.replyToken, [
          Line.createText(`${name}様ありがとうございました！\nこちらで登録は完了になります`),
        ]);
      } else if (event.message.text === 'レポート') {
        const user = await prisma.user.findUnique({ where: { lineId: event.source.userId } });
        if (!user) {
          await client.reply(event.replyToken, [
            Line.createText(`申し訳ございません。登録しているLineのデータが見つかりません。`),
          ]);
        } else {
          const patientFile = await prisma.patientFile.findFirst({
            where: { userId: user?.id },
            orderBy: { createdAt: 'desc' },
          });

          await client.reply(event.replyToken, [
            Line.createText(
              user.name
                ? `${user.name}様ありがとうございましす！\nレポートの送信をさせていただきます！`
                : user?.lineName
                ? `${user.lineName}様ありがとうございましす！\nレポートの送信をさせていただきます！`
                : `ありがとうございましす！\nレポートの送信をさせていただきます！`,
            ),
            patientFile?.reportImage
              ? Line.createImage({
                  originalContentUrl: patientFile.reportImage,
                  previewImageUrl: patientFile.reportImage,
                })
              : Line.createText('申し訳ございません。レポートデータが存在しません'),
          ]);
        }
      }
    } else if (event.type == 'postback') {
      const data = event.postback.data;
      if (['男性', '女性'].includes(data)) {
        await client.reply(event.replyToken, [
          Line.createText(`ありがとうございます！${data}ですね！`),
          Line.createTemplate('血液型', {
            type: 'buttons',
            title: `次に血液型を教えてください！`,
            text: '以下から選択してください',
            actions: [
              { type: 'postback', label: 'A', data: 'A' },
              { type: 'postback', label: 'B', data: 'B' },
              { type: 'postback', label: 'AB', data: 'AB' },
              { type: 'postback', label: 'O', data: 'O' },
            ],
          }),
        ]);
        await prisma.user.update({
          where: { lineId: event.source.userId },
          data: { sex: data === '男性' ? 'MALE' : 'FEMALE' },
        });
      } else if (['A', 'B', 'AB', 'O'].includes(data)) {
        await client.reply(event.replyToken, [
          Line.createText(`ありがとうございます！${data}型ですね！`),
          Line.createTemplate('生年月日', {
            type: 'buttons',
            title: `次に生年月日を教えてください！`,
            text: '以下のボタンか日付をしてください',
            actions: [
              {
                type: 'datetimepicker',
                label: '日付入力',
                data: 'string',
                mode: 'date',
                initial: '2000-01-01',
                max: '2023-12-24',
                min: '1900-01-01',
              },
            ],
          }),
        ]);
        await prisma.user.update({
          where: { lineId: event.source.userId },
          data: { blood: data },
        });
      } else if (data == 'string') {
        const date = new Date(event.postback.params.date);
        await client.reply(event.replyToken, [
          Line.createText(`ありがとうございます！\n${formatDate(date, 'YYYY/MM/DD')}ですね！`),
          Line.createTemplate('お名前設定', {
            type: 'buttons',
            title: `最後に、施術時の呼称を決めてください`,
            text: '以下のボタンを選択してください',
            actions: [
              {
                type: 'postback',
                label: 'Lineの登録名を使う',
                data: 'complete',
              },
              {
                type: 'postback',
                label: 'お名前を登録する',
                data: 'name-update',
                inputOption: 'openKeyboard',
              },
            ],
          }),
        ]);
        await prisma.user.update({
          where: { lineId: event.source.userId },
          data: { barthDate: date, age: calculateAge(date) },
        });
      } else if (data == 'name-update') {
        await prisma.user.update({
          where: { lineId: event.source.userId },
          data: { name: '更新処理中' },
        });
      } else if (data == 'complete') {
        const user = await prisma.user.findUnique({ where: { lineId: event.source.userId } });
        await client.reply(event.replyToken, [
          Line.createText(
            `${
              user?.name ? user.name + '様' : ''
            }ありがとうございました！\nこちらで登録は完了になります`,
          ),
        ]);
      }
    }
    res.status(200).end();
  } catch (error) {
    console.error('Error handling Line webhook:', error);
    res.status(201).end();
  }
}
