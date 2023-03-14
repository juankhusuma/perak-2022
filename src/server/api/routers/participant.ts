import { Participant, Team } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const participantRouter = createTRPCRouter({
  getParticipantById: protectedProcedure
    .input(
      z.object({
        participantId: z.string(),
      })
    )
    .query(async ({ input: { participantId }, ctx }) => {
      // return game information based on slug on router
      return await ctx.prisma.participant.findUnique({
        where: {
          id: participantId,
        },
      })
    }),
  createParticipant: protectedProcedure
    .input(
      z.object({
        ign: z.string(),
        userId: z.string(),
        gameId: z.string(),
        // add this after participant schema has added isIndividual
        // isIndividual: z.boolean()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = await ctx.prisma.participant.create({
        data: { ...input },
      })

      return id
    }),
  updatePartipantTeam: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
        id: z.string(),
      })
    )
    .mutation(async ({ input: { teamId, id }, ctx }) => {
      return await ctx.prisma.participant.update({
        where: {
          id,
        },
        data: {
          teamId,
        },
      })
    }),
  addParticipantToTeam: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        teamId: z.string(),
        gameId: z.string(),
        ign: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const memberUserId = []

      const team: {
        teamStatus: { name: string | null } | null
        member: Participant[]
        leaderId: string | null
      } | null = await ctx.prisma.team.findUnique({
        where: {
          id: input?.teamId as string,
        },
        select: {
          member: true,
          leaderId: true,
          teamStatus: {
            select: {
              name: true,
            },
          },
        },
      })

      if (team?.teamStatus?.name == 'Terfinalisasi') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Tim sudah final.',
          cause: null,
        })
      }

      const game = await ctx.prisma.game.findUnique({
        where: {
          id: input?.gameId as string,
        },
        select: {
          maximumMembers: true,
        },
      })

      const participant = await ctx.prisma.participant.findUnique({
        where: {
          id: team?.leaderId as string,
        },
      })

      for (const userParticpant of team?.member as Participant[]) {
        memberUserId.push(userParticpant?.userId)
      }

      if (
        participant?.userId === input?.userId ||
        memberUserId.includes(input?.userId)
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Anda sudah berada pada tim ini.',
          cause: null,
        })
      } else if (
        (team?.member?.length as number) >= (game?.maximumMembers as number)
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Jumlah pemain pada kelompok sudah pada batas maksimum.',
          cause: null,
        })
      }

      return await ctx.prisma.participant.create({
        data: { ...input },
      })
    }),
  removeParticipantFromTeam: protectedProcedure
    .input(
      z.object({
        participantId: z.string(),
        teamId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const team = await ctx.prisma.team.findUnique({
        where: {
          id: input?.teamId as string,
        },
        select: {
          leaderId: true,
          teamStatus: {
            select: {
              name: true,
            },
          },
        },
      })

      if (team?.teamStatus?.name == 'Terfinalisasi') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Tim sudah final.',
          cause: null,
        })
      }

      if (team?.leaderId === input?.participantId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message:
            'Anda tidak bisa keluar dari tim karena anda adalah ketuanya.',
          cause: null,
        })
      }

      return await ctx.prisma.participant.delete({
        where: {
          id: input?.participantId as string,
        },
      })
    }),
  updateParticipantIgn: protectedProcedure
    .input(
      z.object({
        participantId: z.string(),
        ign: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.participant.update({
        where: {
          id: input?.participantId as string,
        },
        data: {
          ign: input?.ign as string,
        },
      })
    }),
})
