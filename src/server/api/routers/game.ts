import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

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
})
