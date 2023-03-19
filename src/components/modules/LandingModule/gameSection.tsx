import { Button, GameCard, Tabs } from '@elements'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import CompetitiveGamesImage from '@images/CompetitiveGamesImage.svg'
import FamilyGamesImage from '@images/FamilyGamesImage.svg'
import GameController from '@images/GameController.svg'
import MasterLeagueImage from '@images/MasterLeagueImage.svg'
import Trophy from '@images/Trophy.svg'
import Skeleton from '@mui/material/Skeleton'
import React, { useEffect, useRef, useState } from 'react'
import { api } from 'src/utils/api'
import { leagueData } from './constant'
import { Pagination } from './Pagination'

const GameSection = () => {
  const [league, setLeague] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [isClosing, setIsClosing] = useState<boolean>(false)

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

  const useIsInViewport = (ref: any) => {
    const [isIntersecting, setIntersecting] = useState(false)

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      )
      observer.observe(ref.current)
      return () => {
        observer.disconnect()
      }
    }, [ref])

    return isIntersecting
  }
  const landingClosingRef = useRef(null)
  const isLandingClosingInViewport = useIsInViewport(landingClosingRef)

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
            <Pagination currentPage={currentPage} pages={pages} />
          </div>
        )}
      </div>
      <div
        className="relative flex w-full flex-col items-center gap-3 overflow-hidden bg-[url('/assets/images/LandingClosingBg.svg')] bg-cover bg-center py-[60px] px-5"
        ref={landingClosingRef}
      >
        <GameController
          className={`absolute right-0 bottom-0 z-0 -rotate-45 transform opacity-50 transition-all duration-1000 ease-in-out xl:top-0 xl:bottom-auto xl:right-[15%] xl:rotate-0 xl:opacity-100 ${
            isLandingClosingInViewport
              ? ''
              : 'translate-y-full xl:-translate-y-full'
          }`}
        />
        <Trophy
          className={`absolute left-0 top-0 z-0 rotate-45 transform opacity-50 transition-all duration-1000 ease-in-out xl:bottom-0 xl:top-auto xl:left-[15%] xl:rotate-0 xl:opacity-100 ${
            isLandingClosingInViewport
              ? ''
              : '-translate-y-full xl:translate-y-full'
          }`}
        />
        <p className="z-10 text-center font-poppinsBold text-headline-small text-white md:text-headline-large">
          Mau tahu permainan lainnya?
        </p>
        <p className="z-10 text-center font-poppins text-label-large text-white md:text-headline-medium">
          Temukan games-games seru hanya di PERAK!
        </p>
        <Button
          className="z-10 mt-3 w-fit px-16 py-4"
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
