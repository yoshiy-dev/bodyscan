import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { uploadImageToS3 } from '@/utils/uploadImageToS3';

export const posenetRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        userId: z.string(),
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
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const { userId, poseStatus, score, imageBase64, keypoints } = input;
        const currentDateTime = new Date().toISOString();
        const fileName = `patient/${userId}/${poseStatus}_${currentDateTime}.jpeg`;
        const image = await uploadImageToS3(imageBase64, fileName);

        const createdPosenet = await ctx.prisma.poseImage.create({
          data: {
            score,
            userId,
            image,
            poseStatus,
            keypoints: {
              create: keypoints.map((keypoint) => ({
                score: keypoint.score,
                part: keypoint.part,
                positionX: keypoint.position.x,
                positionY: keypoint.position.y,
              })),
            },
          },
          include: {
            keypoints: true,
          },
        });

        return createdPosenet;
      } catch (error) {
        throw new Error('Failed to create Posenet and Keypoint data');
      }
    }),

  // getAll: protectedProcedure.query(({ ctx }) => {
  //   return ctx.prisma.report.findMany();
  // }),

  // getById: protectedProcedure
  //   .input(
  //     z.object({
  //       id: z.number(),
  //     }),
  //   )
  //   .query(({ input, ctx }) => {
  //     return ctx.prisma.report.findUnique({
  //       where: {
  //         id: input.id,
  //       },
  //     });
  //   }),

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
