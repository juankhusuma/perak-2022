import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc'

export const profileRouter = createTRPCRouter({
  getAllElementTypes: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.elementType.findMany()
  }),

  getAllGenerations: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.generation.findMany()
  }),
})
