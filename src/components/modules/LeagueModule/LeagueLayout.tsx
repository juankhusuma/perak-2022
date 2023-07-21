import Image from 'next/image'
import Skeleton from '@mui/material/Skeleton'
import { LeagueLayoutProps } from './interface'
import { MatchCard, Tag } from '@elements'
import { api } from 'src/utils/api'
import { LIVE_LOADING_SKELETON, LIVE_PAGINATION_LIMIT } from './constant'
import { useState } from 'react'
import { Pagination } from '../LandingModule/Pagination'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export const LeagueLayout: React.FC<LeagueLayoutProps> = ({
  title,
  description,
  imageAlt,
  imageUrl,
  imageClassname,
  tagName = '',
  gameName,
  children,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0)

  const { data, fetchNextPage } = api.game.getLiveGames.useInfiniteQuery(
    {
      limit: LIVE_PAGINATION_LIMIT,
      gameName: gameName ?? undefined,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  )

  const liveMatches = data?.pages[currentPage].items
  const nextCursor = data?.pages[currentPage]?.nextCursor
  const totalPages = Math.ceil(
    (data?.pages[currentPage]?.totalCount ?? 0) / LIVE_PAGINATION_LIMIT
  )

  const handleFetchNextPage = async () => {
    await fetchNextPage()
    setCurrentPage(currentPage + 1)
  }

  const pages = Array.from(Array(totalPages).keys())

  return (
    <main className="relative flex flex-col gap-16 px-16 py-28 font-poppins">
      {/* Text Section */}
      <div className="flex flex-col-reverse items-center justify-between gap-6 text-center md:flex-row  md:text-left">
        <div className="flex justify-center md:w-1/2">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-shadow-lg font-outline-4 font-retro text-display-medium text-purple-darkest shadow-orange-dark md:text-display-large">
              {title}
            </h1>
            {!!tagName && <Tag variant={1} text={tagName} className="mb-4" />}
            {/* If you need tag*/}
            <p className="font-poppinsBold text-orange-dark"> {description} </p>
          </div>
        </div>
        <div className="relative flex justify-center md:w-1/2">
          <Image
            alt={imageAlt}
            src={imageUrl}
            className={`fill-inherit object-fill ${imageClassname} h-fit w-full max-w-md`}
            width={0}
            height={0}
          />
        </div>
      </div>
      {/* Live Section */}
      {liveMatches ? (
        <div className="relative pb-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {liveMatches?.map((item, key) => (
              <MatchCard
                bracketInformation={item?.title as string}
                firstTeam={item?.team[0]?.name as string}
                firstTeamLogo={
                  item?.team[0]?.logo ?? '/assets/images/League/TeamDummy.svg'
                }
                firstTeamScore={item?.team1Score as string}
                schedule={item?.date as Date}
                secondTeam={item?.team[1]?.name as string}
                secondTeamLogo={
                  item?.team[1]?.logo ?? '/assets/images/League/TeamDummy.svg'
                }
                secondTeamScore={item?.team2Score as string}
                videoMatch={item?.link as string}
                key={key}
                gameName={item?.game?.name as string}
                live
                videoStatus={true}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <>
              <div className="bottom-0 right-12 z-10 mt-10 flex select-none justify-center gap-2 lg:absolute lg:mt-0">
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
        </div>
      ) : (
        <div className="mx-auto my-4 grid w-fit grid-cols-2 gap-5">
          {Array.from({ length: LIVE_LOADING_SKELETON }).map((_, key) => (
            <Skeleton
              key={key}
              variant={'rectangular'}
              animation="wave"
              className="h-[20px] w-[300px] rounded-[20px]"
            />
          ))}
        </div>
      )}
      {children}
    </main>
  )
}
