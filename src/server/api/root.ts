import { createTRPCRouter } from './trpc'
import { exampleRouter } from './routers/example'
import { onBoardingRouter } from './routers/onBoarding'
import { userDataRouter } from './routers/userData'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  onBoarding: onBoardingRouter,
  userData: userDataRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
