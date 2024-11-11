import { patientFileRouter } from '@/server/api/routers/patientFile';
import { posenetRouter } from '@/server/api/routers/posenet';
import { reportRouter } from '@/server/api/routers/report';
import { shootDataRouter } from '@/server/api/routers/shootData';
import { userRouter } from '@/server/api/routers/user';
import { createTRPCRouter } from '@/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  shootData: shootDataRouter,
  patientFile: patientFileRouter,
  report: reportRouter,
  user: userRouter,
  posenet: posenetRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
