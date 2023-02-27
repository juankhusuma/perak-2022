import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const userDataRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      const userData = ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      })

      return userData
    }),
})
