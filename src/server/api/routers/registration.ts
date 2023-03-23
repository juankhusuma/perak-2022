import { Game, Participant, User } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import axios from 'axios'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc'

export const registrationRouter = createTRPCRouter({
  check: protectedProcedure
    .input(z.object({ email: z.string() }))
    .query(({ input, ctx }) => {
      //   return ctx.prisma.user.findUnique({
      //     where: {
      //       email: input.email,
      //     },
      //   })
    }),

  add: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        teamName: z.string(),
        ign: z.string(),
        gameid: z.string(),
        isTeamButIndividual: z.boolean(),
        isIndiviual: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const participantExist = await ctx.prisma.game.findUnique({
        where: {
          id: input.gameid,
        },
        select: {
          Participant: {
            where: {
              User: {
                id: input.userId,
              },
            },
          },
        },
      })

      const teamName = await ctx.prisma.team.findUnique({
        where: {
          name: input.teamName,
        },
        select: {
          name: true,
        },
      })

      if (teamName && !input.isIndiviual) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Nama team sudah digunakan',
        })
      }

      if (participantExist?.Participant.length) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Kamu sudah terdaftar dalam game tersebut.',
        })
      }

      const participant: Participant | null =
        await ctx.prisma.participant.create({
          data: {
            ign: input.ign,
          },
        })

      const user: User | null = await ctx.prisma.user.findUnique({
        where: { id: input.userId },
      })

      const game: Game | null = await ctx.prisma.game.findUnique({
        where: {
          id: input.gameid,
        },
      })

      const splitedTeamName = input.teamName.split(' ')
      let newSlug: string = ''
      splitedTeamName.forEach((s: string) => (newSlug += s))

      const editedParticipant = await ctx.prisma.participant.update({
        where: {
          id: participant.id,
        },
        data: {
          game: {
            connect: { id: input.gameid },
          },
          User: {
            connect: {
              id: input.userId,
            },
          },
          Team: {
            create: {
              name: input.isIndiviual ? null : input.teamName,
              slug: input.isIndiviual ? null : newSlug,
              ign: input.isIndiviual ? input.ign : null,
              game: {
                connect: { id: input.gameid },
              },
              leader: {
                connect: { id: participant.id },
              },
              teamStatus: {
                connect: { name: 'Menunggu Pembayaran' },
              },
              isTeamButIndividual: input.isTeamButIndividual,
            },
          },
        },
      })
      return editedParticipant
    }),
  checkPayment: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
        userId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const team = await ctx.prisma.team.findUnique({
        where: {
          id: input.teamId,
        },
        include: {
          teamStatus: true,
          leader: true,
        },
      })

      if (
        team?.teamStatus?.name != 'Menunggu Pembayaran' ||
        team?.leader?.userId != input.userId
      ) {
        return false
      }

      return true
    }),
  payment: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
        url: z.string(),
        paymentMethod: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const team = await ctx.prisma.team.findUnique({
        where: {
          id: input.teamId,
        },
        include: {
          teamStatus: true,
          game: true,
          leader: true,
        },
      })

      if (
        team?.teamStatus?.name == 'Menunggu Konfirmasi' ||
        team?.teamStatus?.name == 'Terkonfirmasi' ||
        team?.teamStatus?.name == 'Terfinalisasi'
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Dilarang untuk post.',
        })
      }

      const editTeam = await ctx.prisma.team.update({
        where: {
          id: input.teamId,
        },
        data: {
          teamStatus: {
            connect: {
              name: 'Menunggu Konfirmasi',
            },
          },
          paymentMethod: {
            connect: {
              id: input.paymentMethod,
            },
          },
          paymentReceipt: input.url,
        },
      })

      const message = `NOTIF KONFIRMASI \n \
      Harap konfirmasi untuk: \n \
      Team / Ign: ${team?.name ? team?.name : team?.leader?.ign} \n \
      Game: ${team?.game?.name}`
      axios.post(
        'https://discord.com/api/webhooks/1084033422667821136/GsBC9N_ySzV_aV81LcPrx35MRxyK8NQjiGQY5ghuVd-kfwcRcgXe6ulZ2eVSbywYQIyp',
        { content: message }
      )
      return editTeam
    }),
})
