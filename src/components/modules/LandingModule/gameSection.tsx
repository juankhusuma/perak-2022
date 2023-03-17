import { Button, GameCard, Tabs } from '@elements'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import CompetitiveGamesImage from '@images/CompetitiveGamesImage.svg'
import FamilyGamesImage from '@images/FamilyGamesImage.svg'
import MasterLeagueImage from '@images/MasterLeagueImage.svg'
import Skeleton from '@mui/material/Skeleton'
import React, { useEffect, useState } from 'react'
import { api } from 'src/utils/api'
import { leagueData } from './constant'
import { Pagination } from './Pagination'

const GameSection = () => {
  const [league, setLeague] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

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
  const totalPages = Math.floor((data?.pages[currentPage]?.totalCount ?? 0) / 2)
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
        className="flex w-full flex-col items-center gap-7 bg-background-light pt-16 pb-5 md:p-20 md:pt-24"
        id="game-section"
      >
        <div className="relative font-retro text-5xl md:text-7xl">
          <p className="-text-shadow-lg font-outline-4 p-5 text-center text-purple-normal shadow-orange-normal md:p-6">
            Permainan di Perak League
          </p>
        </div>
        <Tabs
          value={league}
          setValue={setLeague}
          variant={0}
          className="flex-wrap justify-center "
          items={['All', 'Master League', 'Competitive Games', 'Family Games']}
        />
        {league > 0 && (
          <div className="hidden min-h-[256px] max-w-[300px] flex-col items-center gap-10 rounded-[20px] border-2 border-[#E9DEA6] bg-background-normal px-[40px] py-[32px] text-primary md:max-w-[1024px] md:flex-row lg:flex">
            <div>
              {league === 1 && <MasterLeagueImage />}
              {league === 2 && <CompetitiveGamesImage />}
              {league === 3 && <FamilyGamesImage />}
            </div>
            <div className="flex flex-col justify-start gap-2">
              <p className="font-poppinsBold text-title-large font-extrabold ">
                {leagueData[league].title}
              </p>
              <p className="text-justify font-poppins text-body-large ">
                {leagueData[league].body}
              </p>
            </div>
          </div>
        )}
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
                <GameCard
                  key={game.id}
                  name={game.name as string}
                  league={game.gameType?.name?.toLocaleUpperCase() as string}
                  count={
                    game.minimumMembers == game.maximumMembers
                      ? `${game.minimumMembers} ORANG`
                      : `${game.minimumMembers} - ${game.maximumMembers} ORANG`
                  }
                  slug={game.slug as string}
                  className="max-w-[294px] flex-grow md:max-w-[327px]"
                />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="right-0 bottom-0 z-10 mt-10 flex select-none justify-center gap-2 lg:absolute lg:mt-0">
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
            <Pagination
              currentPage={currentPage}
              // setPage={setPage}
              pages={pages}
            />
          </div>
        )}
      </div>
      <div className="flex w-full flex-col items-center gap-3 bg-[rgb(243,106,34)] py-20 px-5">
        <p className="text-center font-poppinsBold text-headline-small text-white md:text-headline-large">
          Mau tahu permainan lainnya?
        </p>
        <p className="text-center font-poppins text-label-large text-white md:text-headline-medium">
          Temukan games-games seru hanya di PERAK!
        </p>
        <Button
          className="mt-3 w-fit px-16 py-4"
          variant={2}
          onClick={() => {
            const offset = document.getElementById('game-section')?.offsetTop
            window.scrollTo({
              top: offset === undefined ? 0 : offset,
              behavior: 'smooth',
            })
          }}
        >
          <p className="font-poppinsBold text-body-large font-extrabold text-primary">
            Daftar Sekarang
          </p>
        </Button>
      </div>
    </>
  )
}

export default GameSection
