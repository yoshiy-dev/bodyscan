/* eslint-disable no-console */

import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { uploadImageToS3 } from '@/utils/uploadImageToS3';

export const patientFileRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        shootDataIds: z.array(z.number()),
        userId: z.string(),
        imageBase64: z.string(),
        title: z.string().optional(),
        comment: z.string().optional(),
        reportTitle: z.string().optional(),
        reportComment: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const { userId, shootDataIds, comment, reportTitle, reportComment, title, imageBase64 } =
          input;

        const currentDateTime = new Date().toISOString();
        const fileName = `patient/report/${currentDateTime}_${userId}.jpeg`;
        const reportImage = await uploadImageToS3(imageBase64, fileName);

        return await ctx.prisma.patientFile.create({
          data: {
            userId,
            ...(title && { title }),
            ...(comment && { comment }),
            ...(reportTitle && { reportTitle }),
            ...(reportComment && { reportComment }),
            ...(reportImage && { reportImage }),
            patientFileShootDatas: {
              create: shootDataIds.map((shootDataId) => ({
                shootData: {
                  connect: { id: shootDataId },
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
      } catch (error) {
        console.error(error);
        throw new Error('Error');
      }
    }),

  getByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.patientFile.findMany({
        where: {
          userId: input.userId,
        },
      });
    }),

  getLatestByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.patientFile.findFirst({
        where: {
          userId: input.userId,
        },
        orderBy: {
          updatedAt: 'desc',
        },
        include: {
          patientFileShootDatas: { include: { shootData: { include: { poseImages: true } } } },
        },
      });
    }),

  getById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.patientFile.findUnique({
        where: {
          id: input.id,
        },
        include: {
          patientFileShootDatas: { include: { shootData: { include: { poseImages: true } } } },
        },
      });
    }),
});
