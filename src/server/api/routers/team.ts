import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const teamRouter = createTRPCRouter({
  createTeam: protectedProcedure
    .input(
      z.object({
        leaderId: z.string(),
        name: z.string(),
        slug: z.string(),
        gameId: z.string(),
        teamStatusId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = await ctx.prisma.team.create({
        data: { ...input },
      })

      return id
    }),
  getTeamStatusById: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
      })
    )
    .query(async ({ input: { teamId }, ctx }) => {
      return await ctx.prisma.team.findUnique({
        where: {
          id: teamId,
        },
      })
    }),
  getTeamById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const team = await ctx.prisma.team.findUnique({
        where: {
          id: input.id,
        },
        include: {
          game: {
            include: {
              paymentMethod: true,
            },
          },
          member: true,
          leader: {
            include: {
              User: {
                include: {
                  generation: true,
                },
              },
            },
          },
          teamStatus: true,
        },
      })

      return team
    }),
  updateTeamStatus: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
        teamStatusName: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const getTeam = await ctx.prisma.team.findUnique({
        where: {
          id: input.teamId,
        },
        include: {
          member: true,
          game: true,
        },
      })

      if (
        getTeam?.member.length &&
        getTeam?.game?.idealMembers &&
        getTeam?.member.length < getTeam?.game?.idealMembers
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Kurang Anggota',
        })
      }
      const team = await ctx.prisma.team.update({
        where: {
          id: input.teamId,
        },
        data: {
          teamStatus: {
            connect: {
              name: input.teamStatusName,
            },
          },
        },
      })

      return team
    }),
})
