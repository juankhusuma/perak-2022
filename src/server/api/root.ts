import { onBoardingRouter } from './routers/onBoarding'
import { gameRouter } from './routers/game2'
import { profileRouter } from './routers/profile'
import { userDataRouter } from './routers/userData'
import { createTRPCRouter } from './trpc'
import { registrationRouter } from './routers/registration'
import { teamRouter } from './routers/team'
import { participantRouter } from './routers/participant'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  userData: userDataRouter,
  onBoarding: onBoardingRouter,
  participant: participantRouter,
  game: gameRouter,
  team: teamRouter,
  profile: profileRouter,
  registration: registrationRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
