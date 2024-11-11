import { createTRPCRouter } from '@/server/api/trpc';

export const reportRouter = createTRPCRouter({
  // create: protectedProcedure
  //   .input(
  //     z.object({
  //       title: z.string(),
  //       description: z.string(),
  //       userId: z.string(),
  //       posenetId: z.number(),
  //     }),
  //   )
  //   .mutation(({ input, ctx }) => {
  //     return ctx.prisma.report.create({
  //       data: input,
  //     });
  //   }),
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
