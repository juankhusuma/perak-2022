import jwt from 'jsonwebtoken'
import { decrypt } from 'crypto-js/aes'
import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import CryptoJS from 'crypto-js'

export const gameRouter = createTRPCRouter({
  getGames: publicProcedure.query(async ({ ctx }) => {
    // return game information based on slug on router
    const games = await ctx.prisma.game.findMany({
      include: {
        gameType: true,
      },
    })
    return games
  }),
  getGameByName: publicProcedure
    .input(
      z.object({
        slugName: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      // return game information based on slug on router
      const game = await ctx.prisma.game.findUnique({
        where: {
          slug: input.slugName,
        },
        include: {
          gameType: true,
          paymentMethod: true,
        },
      })
      return game
    }),
  getGamesBatch: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(),
        skip: z.number().optional(),
        gameTypeName: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, skip, cursor } = input
      const items = await ctx.prisma.game.findMany({
        take: limit + 1,
        skip: skip,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          name: 'asc',
        },
        where: {
          gameTypeName: input.gameTypeName ?? undefined,
        },
        include: {
          gameType: true,
        },
      })
      let nextCursor: typeof cursor | undefined = undefined
      if (items.length > limit) {
        const nextItem = items.pop() // return the last item from the array
        nextCursor = nextItem?.id
      }
      const totalCount = await ctx.prisma.game.count({
        where: {
          gameTypeName: input.gameTypeName ?? undefined,
        },
      })
      return {
        items,
        nextCursor,
        totalCount,
      }
    }),
  getParticipantOf: protectedProcedure.query(async ({ ctx }) => {
    const participants = await ctx.prisma.participant.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        id: true,
        game: {
          select: {
            name: true,
            lineGroup: true,
            isIndividual: true,
          },
        },
        Team: {
          select: {
            name: true,
            teamStatus: {
              select: {
                name: true,
                message: true,
              },
            },
            leaderId: true,
            ign: true,
            leader: {
              select: {
                userId: true,
                ign: true,
              },
            },
            logo: true,
            id: true,
            isTeamButIndividual: true,
          },
        },
      },
    })
    return participants
  }),
  getTeamMembers: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const team = await ctx.prisma.team.findFirst({
        where: {
          id: input.teamId,
          member: {
            some: {
              userId: ctx.session.user.id,
            },
          },
        },
        select: {
          member: {
            select: {
              id: true,
              userId: true,
              ign: true,
              User: {
                select: {
                  fullName: true,
                },
              },
            },
          },
        },
      })
      return team?.member ?? []
    }),
  addSnakeScore: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user
      input = decrypt(
        input,
        process.env.NEXT_PUBLIC_SECRET as string
      ).toString()

      let scoreString: string = ''
      for (let i = 0; i < input.length; i += 2) {
        scoreString += input[i + 1]
      }
      const score = +scoreString
      let highScore = await ctx.prisma.snakeScore.findUnique({
        where: {
          userId: user.id,
        },
        select: {
          highScore: true,
        },
      })
      if (!highScore) {
        highScore = {
          highScore: 0,
        }
      }
      if (highScore?.highScore < score) {
        highScore = {
          highScore: score,
        }
      }

      const snakeScore = await ctx.prisma.snakeScore.upsert({
        where: {
          userId: user.id,
        },
        create: {
          currScore: score,
          highScore: score,
          attempts: 1,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
        update: {
          currScore: score,
          highScore: highScore.highScore,
          attempts: {
            increment: 1,
          },
        },
        select: {
          currScore: true,
          highScore: true,
          attempts: true,
        },
      })

      return snakeScore
    }),
  addTetrisScore: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user
      input = decrypt(
        input,
        process.env.NEXT_PUBLIC_SECRET as string
      ).toString()

      let scoreString: string = ''
      for (let i = 0; i < input.length; i += 2) {
        scoreString += input[i + 1]
      }
      const score = +scoreString

      let highScore = await ctx.prisma.tetrisScore.findUnique({
        where: {
          userId: user.id,
        },
        select: {
          highScore: true,
        },
      })
      if (!highScore) {
        highScore = {
          highScore: 0,
        }
      }
      if (highScore?.highScore! < score) {
        highScore = {
          highScore: score,
        }
      }

      const tetrisScore = await ctx.prisma.tetrisScore.upsert({
        where: {
          userId: user.id,
        },
        create: {
          currScore: score,
          highScore: score,
          attempts: 1,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
        update: {
          currScore: score,
          highScore: highScore.highScore,
          attempts: {
            increment: 1,
          },
        },
        select: {
          currScore: true,
          highScore: true,
          attempts: true,
        },
      })

      return tetrisScore
    }),
  getSnakeScore: publicProcedure.query(async ({ ctx }) => {
    const scores: any = await ctx.prisma.snakeScore.findMany({
      orderBy: [
        {
          highScore: 'desc',
        },
        {
          attempts: 'asc',
        },
      ],
      select: {
        highScore: true,
        attempts: true,
        user: {
          select: {
            id: true,
            fullName: true,
          },
        },
      },
    })

    // get the rank of the current user
    const user = ctx.session?.user
    const userScore = await ctx.prisma.snakeScore.findUnique({
      where: {
        userId: user?.id,
      },
      select: {
        highScore: true,
        attempts: true,
        user: {
          select: {
            id: true,
            fullName: true,
          },
        },
      },
    })
    const userRank = scores.findIndex(
      (score: any) =>
        score.highScore === userScore?.highScore &&
        score.attempts === userScore?.attempts
    )
    const userScoreWithRank = {
      ...userScore,
      rank: userRank + 1,
    }

    const top10 = scores.slice(0, 10)

    if (userRank > 10) {
      top10.push(userScoreWithRank)
    }

    return top10
  }),
  getTetrisScore: publicProcedure.query(async ({ ctx }) => {
    const scores: any = await ctx.prisma.tetrisScore.findMany({
      orderBy: [
        {
          highScore: 'desc',
        },
        {
          attempts: 'asc',
        },
      ],
      select: {
        highScore: true,
        attempts: true,
        user: {
          select: {
            id: true,
            fullName: true,
          },
        },
      },
    })

    // get the rank of the current user
    const user = ctx.session?.user
    const userScore = await ctx.prisma.tetrisScore.findUnique({
      where: {
        userId: user?.id,
      },
      select: {
        highScore: true,
        attempts: true,
        user: {
          select: {
            id: true,
            fullName: true,
          },
        },
      },
    })
    const userRank = scores.findIndex(
      (score: any) =>
        score.highScore === userScore?.highScore &&
        score.attempts === userScore?.attempts
    )
    const userScoreWithRank = {
      ...userScore,
      rank: userRank + 1,
    }

    const top10 = scores.slice(0, 10)

    if (userRank > 10) {
      top10.push(userScoreWithRank)
    }

    return top10
  }),
  getUserSnakeScore: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user
    const score = await ctx.prisma.snakeScore.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        currScore: true,
        highScore: true,
        attempts: true,
        user: {
          select: {
            fullName: true,
          },
        },
      },
    })
    return score
  }),
  getUserTetrisScore: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user
    const score = await ctx.prisma.tetrisScore.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        currScore: true,
        highScore: true,
        attempts: true,
        user: {
          select: {
            fullName: true,
          },
        },
      },
    })
    return score
  }),
  getMatch: publicProcedure
    .input(
      z.object({
        gameTypeName: z.string().optional(),
        gameName: z.string().optional(),
        limit: z.number(),
        cursor: z.string().nullish(),
        skip: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, skip, cursor } = input

      const items = await ctx.prisma.schedule.findMany({
        take: limit + 1,
        skip: skip,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          game: {
            gameTypeName: input.gameTypeName ?? undefined,
            slug: input.gameName ?? undefined,
          },
        },
        orderBy: {
          date: 'desc',
        },
        include: {
          game: {
            select: {
              name: true,
              gameTypeName: true,
            },
          },
          team: {
            select: {
              name: true,
              logo: true,
            },
          },
        },
      })
      let nextCursor: typeof cursor | undefined = undefined
      if (items.length > limit) {
        const nextItem = items.pop() // return the last item from the array
        nextCursor = nextItem?.id
      }

      const totalCount = await ctx.prisma.game.count({
        where: {
          gameTypeName: input.gameTypeName ?? undefined,
          slug: input.gameName ?? undefined,
        },
      })

      return {
        items,
        nextCursor,
        totalCount,
      }
    }),
  getHistory: publicProcedure
    .input(
      z.object({
        gameTypeName: z.string().optional(),
        gameName: z.string().optional(),
        limit: z.number(),
        cursor: z.string().nullish(),
        skip: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, skip, cursor } = input

      const items = await ctx.prisma.result.findMany({
        take: limit + 1,
        skip: skip,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          game: {
            gameTypeName: input.gameTypeName ?? undefined,
            slug: input.gameName ?? undefined,
          },
        },
        orderBy: {
          date: 'desc',
        },
        include: {
          game: {
            select: {
              name: true,
              gameTypeName: true,
            },
          },
          team: {
            select: {
              name: true,
              logo: true,
            },
          },
        },
      })
      let nextCursor: typeof cursor | undefined = undefined
      if (items.length > limit) {
        const nextItem = items.pop() // return the last item from the array
        nextCursor = nextItem?.id
      }

      const totalCount = await ctx.prisma.result.count({
        where: {
          game: {
            gameTypeName: input.gameTypeName ?? undefined,
            slug: input.gameName ?? undefined,
          },
        },
      })

      return {
        items,
        nextCursor,
        totalCount,
      }
    }),
  getLiveGames: publicProcedure
    .input(
      z.object({
        gameName: z.string().optional(),
        limit: z.number(),
        cursor: z.string().nullish(),
        skip: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, skip, cursor, gameName } = input

      const items = await ctx.prisma.live.findMany({
        take: limit + 1,
        skip: skip,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          date: 'desc',
        },
        where: {
          game: {
            slug: gameName ?? undefined,
          },
        },
        include: {
          game: {
            select: {
              name: true,
              gameTypeName: true,
            },
          },
          team: {
            select: {
              name: true,
              logo: true,
            },
          },
        },
      })

      let nextCursor: typeof cursor | undefined = undefined
      if (items.length > limit) {
        const nextItem = items.pop() // return the last item from the array
        nextCursor = nextItem?.id
      }

      const totalCount = await ctx.prisma.live.count({
        where: {
          game: {
            slug: gameName ?? undefined,
          },
        },
      })

      return {
        items,
        nextCursor,
        totalCount,
      }
    }),
  getGameByType: publicProcedure
    .input(
      z.object({
        gameTypeName: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.game.findMany({
        where: {
          gameTypeName: input.gameTypeName,
        },
      })
    }),
})
