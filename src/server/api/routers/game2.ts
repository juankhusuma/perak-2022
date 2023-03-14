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
            leader: {
              select: {
                userId: true,
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
