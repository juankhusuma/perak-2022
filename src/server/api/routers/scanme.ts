import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { TRPCError } from '@trpc/server'

export const scanMeRouter = createTRPCRouter({
  getChallenges: protectedProcedure.query(async ({ ctx }) => {
    const challenges = await ctx.prisma.submission.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        Challenge: {
          select: {
            description: true,
            clue: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return challenges ?? []
  }),
  addSubmission: protectedProcedure
    .input(
      z.object({
        challengeId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const challenge = await ctx.prisma.challenge.findUniqueOrThrow({
        where: {
          id: input.challengeId,
        },
      })
      const submission = await ctx.prisma.submission.findFirst({
        where: {
          challengeId: challenge.id,
          userId: ctx.session.user.id,
        },
      })
      if (!submission) {
        await ctx.prisma.submission.create({
          data: {
            challengeId: challenge.id,
            userId: ctx.session.user.id,
            challengeStatusId: 'Menunggu Bukti Tantangan',
          },
        })
      }
    }),
  updateSubmission: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        submissionUrl: z.string().url(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const submission = await ctx.prisma.submission.findUniqueOrThrow({
        where: {
          id: input.id,
        },
        include: {
          status: true,
        },
      })

      if (submission.status?.name == 'Bukti Terkonfirmasi') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Bukti sudah terkonfirmasi',
        })
      }

      await ctx.prisma.submission.update({
        where: {
          id: submission.id,
        },
        data: {
          submisionUrl: input.submissionUrl,
          status: {
            connect: {
              name: 'Menunggu Konfirmasi',
            },
          },
        },
      })
    }),
  getLeaderboard: protectedProcedure.query(async ({ ctx }) => {
    const users = ctx.prisma.user.findMany({
      where: {
        scanMeScore: {
          not: 0,
        },
      },
      orderBy: {
        scanMeScore: 'desc',
      },
      select: {
        name: true,
        scanMeScore: true,
      },
    })
    return users
  }),
})
