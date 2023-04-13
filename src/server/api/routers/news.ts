import { createTRPCRouter, publicProcedure } from '../trpc'

export const newsRouter = createTRPCRouter({
  getNews: publicProcedure.query(async ({ ctx }) => {
    const news = await ctx.prisma.trendingNews.findMany({})
    return news
  }),
})
