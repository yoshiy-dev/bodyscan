/* eslint-disable no-console */
import AWS from 'aws-sdk';

import { env } from '@/env.mjs';

// AWS SDKの設定
const s3 = new AWS.S3({
  accessKeyId: env.ACCESS_KEY_ID,
  secretAccessKey: env.SECRET_ACCESS_KEY,
  region: env.REGION,
});

export async function uploadImageToS3(base64Data: string, fileName: string): Promise<string> {
  const blob = base64ToBuffer(base64Data);

  console.log(blob);

  const params = {
    Bucket: 'bone-scan',
    Key: fileName,
    Body: blob,
    ContentType: 'image/jpeg', // 画像のコンテンツタイプに応じて適切な値を設定してください
  };

  try {
    // S3に画像をアップロードする
    const data = await s3.upload(params).promise();
    // アップロード成功時の処理
    console.log('画像アップロード成功:', data.Location);
    // アップロードされた画像のURLを取得
    return data.Location;
  } catch (error) {
    // アップロードエラー発生時の処理
    console.error('画像アップロードエラー:', error);
    // null値を返す
    return '画像アップロードエラー';
  }
}

function base64ToBuffer(base64Data: string): Buffer {
  const base64WithoutPrefix = base64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
  return Buffer.from(base64WithoutPrefix, 'base64');
}
