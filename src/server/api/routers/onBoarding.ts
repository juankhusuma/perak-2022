import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc'

export const onBoardingRouter = createTRPCRouter({
  check: protectedProcedure
    .input(z.object({ email: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      })
    }),

  add: protectedProcedure
    .input(
      z.object({
        fullName: z.string(),
        npm: z.string(),
        lineId: z.string(),
        phone: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.user.update({
        where: { email: input.email },
        data: {
          fullName: input.fullName,
          lineId: input.lineId,
          phoneNumber: input.phone,
          isOnboarded: true,
        },
      })
    }),
  getUserById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input: { id }, ctx }) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: id,
        },
      })
    }),
  getUserGeneration: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input: { id }, ctx }) => {
      return ctx.prisma.generation.findUnique({
        where: {
          id: id,
        },
      })
    }),

  newCheck: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },
        select: {
          isOnboarded: true,
        },
      })
    }),

  mahasiswa: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        fullName: z.string(),
        elementTypeId: z.string(),
        generationId: z.string(),
        lineId: z.string(),
        username: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          slug: input.username,
        },
      })

      if (user && user.id != input.userId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Username sudah digunakan',
        })
      }

      return await ctx.prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          fullName: input.fullName,
          elementType: {
            connect: {
              id: input.elementTypeId,
            },
          },
          generation: {
            connect: {
              id: input.generationId,
            },
          },
          lineId: input.lineId,
          isOnboarded: true,
          slug: input.username,
        },
      })
    }),

  mahasiswaWithPhoto: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        fullName: z.string(),
        elementTypeId: z.string(),
        generationId: z.string(),
        lineId: z.string(),
        awsImage: z.string(),
        username: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          slug: input.username,
        },
      })

      if (user && user.id != input.userId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Username sudah digunakan',
        })
      }

      return await ctx.prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          fullName: input.fullName,
          elementType: {
            connect: {
              id: input.elementTypeId,
            },
          },
          generation: {
            connect: {
              id: input.generationId,
            },
          },
          lineId: input.lineId,
          awsImage: input.awsImage,
          isOnboarded: true,
          slug: input.username,
        },
      })
    }),

  otherElements: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        fullName: z.string(),
        elementTypeId: z.string(),
        phoneNumber: z.string(),
        username: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          slug: input.username,
        },
      })

      if (user && user.id != input.userId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Username sudah digunakan',
        })
      }

      return await ctx.prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          fullName: input.fullName,
          elementType: {
            connect: {
              id: input.elementTypeId,
            },
          },
          phoneNumber: input.phoneNumber,
          isOnboarded: true,
          slug: input.username,
        },
      })
    }),

  otherElementsWithPhoto: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        fullName: z.string(),
        elementTypeId: z.string(),
        phoneNumber: z.string(),
        awsImage: z.string(),
        username: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          slug: input.username,
        },
      })

      if (user && user.id != input.userId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Username sudah digunakan',
        })
      }

      return await ctx.prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          fullName: input.fullName,
          elementType: {
            connect: {
              id: input.elementTypeId,
            },
          },
          phoneNumber: input.phoneNumber,
          awsImage: input.awsImage,
          isOnboarded: true,
          slug: input.username,
        },
      })
    }),
})
