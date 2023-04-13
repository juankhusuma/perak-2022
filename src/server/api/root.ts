import { gameRouter } from './routers/game'
import { onBoardingRouter } from './routers/onBoarding'
import { participantRouter } from './routers/participant'
import { profileRouter } from './routers/profile'
import { registrationRouter } from './routers/registration'
import { scanMeRouter } from './routers/scanme'
import { teamRouter } from './routers/team'
import { userDataRouter } from './routers/userData'
import { createTRPCRouter } from './trpc'
import { newsRouter } from './routers/news'

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
  scanMe: scanMeRouter,
  news: newsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
