import Skeleton from '@mui/material/Skeleton'
import React, { useEffect, useState } from 'react'
import { api } from 'src/utils/api'
import { LeaderboardCard } from '@elements'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Pagination } from '../LandingModule/Pagination'
import { ContentProps } from './interface'

export const Games: React.FC<ContentProps> = ({ leagueName, league }) => {
  const [currentPage, setCurrentPage] = useState<number>(0)

  const { data, fetchNextPage, isLoading, isFetchingNextPage } =
    api.game.getGamesBatch.useInfiniteQuery(
      {
        limit: 3,
        gameTypeName: leagueName ?? undefined,
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
