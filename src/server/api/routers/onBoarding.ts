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
          npm: input.npm,
          lineId: input.lineId,
          phone: input.phone,
          isOnboarded: true,
        },
      })
    }),
})
