import Skeleton from '@mui/material/Skeleton'
import { GameSchedule } from '@elements'
import { MatchHistoryLayoutProps } from './interface'
import { api } from 'src/utils/api'
import { useState, useLayoutEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Pagination } from '../LandingModule/Pagination'
import { LOADING_SKELETON, PAGINATION_LIMIT } from './constant'

export const MatchHistoryLayout: React.FC<MatchHistoryLayoutProps> = ({
  leagueName,
  fetchData,
  noneText,
}) => {
  const getChosenAPI = () => {
    switch (fetchData) {
      case 'match':
        return api.game.getMatch
      case 'history':
        return api.game.getHistory
    }
  }

  const [currentPage, setCurrentPage] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { data, fetchNextPage } = getChosenAPI().useInfiniteQuery(
    {
      limit: PAGINATION_LIMIT,
      gameTypeName: leagueName,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  )

  const matches = data?.pages[currentPage].items
  const nextCursor = data?.pages[currentPage]?.nextCursor
  const totalPages = Math.ceil(
    (data?.pages[currentPage]?.totalCount ?? 0) / PAGINATION_LIMIT
  )
  const pages = Array.from(Array(totalPages).keys())

  useLayoutEffect(() => {
    setIsLoading(true)
    const timeout = setTimeout(() => {
      setIsLoading(false)
      setCurrentPage(0)
    }, 250)

    return () => {
      clearTimeout(timeout)
    }
  }, [leagueName])

  const handleFetchNextPage = async () => {
    await fetchNextPage()
    setCurrentPage(currentPage + 1)
  }

  return !isLoading ? (
    matches?.length && !isLoading ? (
      <>
        <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
          {matches.map((item, key) => (
            <GameSchedule
              key={key}
              title={item?.title as string}
              firstTeamName={item.team[0]?.name as string}
              firstTeamScore={
                fetchData === 'match' ? '-' : (item?.team1Score as string)
              }
              secondTeamName={item.team[1]?.name as string}
              secondTeamScore={
                fetchData === 'match' ? '-' : (item?.team2Score as string)
              }
              schedule={item?.date as Date}
              gameName={item?.game?.name as string}
            />
          ))}
        </div>
        {totalPages > 1 && (
          <>
            <div className="right-12 bottom-20 z-10 mt-10 flex select-none justify-center gap-2 lg:absolute lg:mt-0">
              {
                <div
                  className="cursor-pointer rounded-full p-2"
                  onClick={() =>
                    currentPage > 0 && setCurrentPage(currentPage - 1)
                  }
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
            <Pagination currentPage={currentPage} pages={pages} />
          </>
        )}
      </>
    ) : (
      <h1 className="text-center"> {noneText} </h1>
    )
  ) : (
    <div className="my-4 mx-auto grid w-fit grid-cols-2 gap-5">
      {Array.from({ length: LOADING_SKELETON }).map((_, key) => (
        <Skeleton
          key={key}
          variant={'rectangular'}
          animation="wave"
          className="h-[20px] w-[200px] rounded-[20px]"
        />
      ))}
    </div>
  )
}
