import Skeleton from '@mui/material/Skeleton'
import { ContentProps } from './interface'
import React, { useEffect, useState } from 'react'
import { api } from 'src/utils/api'
import { LeaderboardCard, Tabs } from '@elements'
import { leagueData } from './constant'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Pagination } from '../LandingModule/Pagination'

export const Games: React.FC<ContentProps> = ({ leagueName }) => {
  const [league, setLeague] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)

  const { data, fetchNextPage, isLoading, isFetchingNextPage } =
    api.game.getGamesBatch.useInfiniteQuery(
      {
        limit: 3,
        gameTypeName: league > 0 ? leagueData[league].title : undefined,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    )
  const games = data?.pages[currentPage]?.items
  const nextCursor = data?.pages[currentPage]?.nextCursor
  const totalPages = Math.ceil((data?.pages[currentPage]?.totalCount ?? 0) / 3)
  const pages = Array.from(Array(totalPages).keys())

  const handleFetchNextPage = async () => {
    await fetchNextPage()
    setCurrentPage((prev) => prev + 1)
  }

  const handleFetchPreviousPage = () => {
    setCurrentPage((prev) => prev - 1)
  }

  useEffect(() => {
    setCurrentPage(0)
  }, [league])

  return (
    <>
      <div
        className="flex w-full flex-col items-center gap-7"
        id="game-section"
      >
        <Tabs
          value={league}
          setValue={setLeague}
          variant={0}
          className="w-[280px] flex-wrap justify-center pb-[16px] md:w-fit md:gap-x-5 md:pb-0"
          items={['All', 'Master League', 'Competitive Games', 'Family Games']}
        />

        {isLoading ||
          (isFetchingNextPage && !games && (
            <div className="flex flex-wrap justify-center gap-5">
              <Skeleton
                variant={'rectangular'}
                animation="wave"
                className="h-[300px] w-[200px] rounded-[20px]"
              />
              <Skeleton
                variant={'rectangular'}
                animation="wave"
                className="h-[300px] w-[200px] rounded-[20px]"
              />
              <Skeleton
                variant={'rectangular'}
                animation="wave"
                className="h-[300px] w-[200px] rounded-[20px]"
              />
              <Skeleton
                variant={'rectangular'}
                animation="wave"
                className="h-[300px] w-[200px] rounded-[20px]"
              />
            </div>
          ))}

        {!isLoading && (
          <div className="relative lg:w-[1000px]">
            <div className="flex flex-wrap justify-center gap-5">
              {games?.map((game) => (
                <LeaderboardCard
                  key={game.id}
                  name={game.name as string}
                  league={game.gameType?.name?.toLocaleUpperCase() as string}
                  count={
                    game.minimumMembers == game.maximumMembers
                      ? `${game.minimumMembers} ORANG`
                      : `${game.minimumMembers} - ${game.maximumMembers} ORANG`
                  }
                  slug={game.slug as string}
                  className="max-w-[240px] flex-grow lg:max-w-[300px]"
                />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="bottom-0 right-0 z-10 mt-10 flex select-none justify-center gap-2 lg:absolute lg:mt-0">
                {
                  <div
                    className="cursor-pointer rounded-full p-2"
                    onClick={() => currentPage > 0 && handleFetchPreviousPage()}
                  >
                    <ChevronLeftIcon
                      className={`h-8 w-8 transition-all ${
                        currentPage > 0
                          ? 'text-purple-darkest hover:scale-125'
                          : 'text-purple-darkest/50'
                      }`}
                    />
                  </div>
                }
                <div
                  className="cursor-pointer rounded-full p-2"
                  onClick={() => nextCursor && handleFetchNextPage()}
                >
                  <ChevronRightIcon
                    className={`h-8 w-8 transition-all ${
                      nextCursor
                        ? 'text-purple-darkest hover:scale-125'
                        : 'text-purple-darkest/50'
                    }`}
                  />
                </div>
              </div>
            )}
            <Pagination currentPage={currentPage} pages={pages} />
          </div>
        )}
      </div>
    </>
  )
}
