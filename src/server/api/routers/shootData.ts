/* eslint-disable no-console */
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { uploadImageToS3 } from '@/utils/uploadImageToS3';

export const shootDataRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        shootName: z.string().optional(),
        userId: z.string(),
        poseImages: z.array(
          z.object({
            poseStatus: z.string(),
            score: z.number(),
            imageBase64: z.string(),
            keypoints: z.array(
              z.object({
                score: z.number(),
                part: z.string(),
                position: z.object({
                  x: z.number(),
                  y: z.number(),
                }),
              }),
            ),
          }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const userId = input.userId;

        const poseImages = await Promise.all(
          input.poseImages.map(async ({ poseStatus, score, imageBase64, keypoints }) => {
            const currentDateTime = new Date().toISOString();
            const fileName = `patient/${userId}/${currentDateTime}_${poseStatus}.jpeg`;
            const image = await uploadImageToS3(imageBase64, fileName);

            // const fileNameOrigin = `patient/${userId}/${currentDateTime}_${poseStatus}_origin.jpeg`;
            // await uploadImageToS3(imageBase64rigin, fileNameOrigin);
            const keypointsData = keypoints.map((keypoint) => ({
              score: keypoint.score,
              part: keypoint.part,
              positionX: keypoint.position.x,
              positionY: keypoint.position.y,
            }));

            return {
              image,
              poseStatus,
              score,
              userId,
              keypoints: { create: keypointsData },
            };
          }),
        );

        const shootData = await ctx.prisma.shootData.create({
          data: {
            userId,
            poseImages: {
              create: poseImages,
            },
          },
          include: {
            poseImages: true,
          },
        });

        const shootDataList = await ctx.prisma.shootData.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          take: 2,
        });
        if (shootDataList.length >= 2) {
          await ctx.prisma.patientFile.create({
            data: {
              userId,
              patientFileShootDatas: {
                create: shootDataList.map((shootData) => ({
                  shootData: {
                    connect: { id: shootData.id },
                  },
                })),
              },
            },
            include: {
              patientFileShootDatas: {
                include: {
                  shootData: true,
                },
              },
            },
          });
        }
        return shootData;
      } catch (error) {
        console.error(error);
        throw new Error('Error');
      }
    }),

  // getAll: protectedProcedure.query(({ ctx }) => {
  //   return ctx.prisma.report.findMany();
  // }),

  getByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.shootData.findMany({
        where: {
          userId: input.userId,
        },
        include: {
          poseImages: { include: { keypoints: true } },
        },
      });
    }),

  // update: protectedProcedure
  //   .input(
  //     z.object({
  //       id: z.number(),
  //       title: z.string(),
  //       description: z.string(),
  //     }),
  //   )
  //   .mutation(({ input, ctx }) => {
  //     return ctx.prisma.report.update({
  //       where: {
  //         id: input.id,
  //       },
  //       data: {
  //         title: input.title,
  //         description: input.description,
  //       },
  //     });
  //   }),

  // delete: protectedProcedure
  //   .input(
  //     z.object({
  //       id: z.number(),
  //     }),
  //   )
  //   .mutation(({ input, ctx }) => {
  //     return ctx.prisma.report.delete({
  //       where: {
  //         id: input.id,
  //       },
  //     });
  //   }),
});
