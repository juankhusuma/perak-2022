import { Button, GameCard, Tabs } from '@elements'
import React, { useState } from 'react'
import CompetitiveGamesImage from '@images/CompetitiveGamesImage.svg'
import MasterLeagueImage from '@images/MasterLeagueImage.svg'
import FamilyGamesImage from '@images/FamilyGamesImage.svg'
import { gameData, leagueData } from './constant'
import { api } from 'src/utils/api'
import { Game } from '@prisma/client'
import Link from 'next/link'
import Skeleton from '@mui/material/Skeleton'

const GameSection = () => {
  const [league, setLeague] = useState(0)

  const games = api.game.getGames.useQuery()

  const competitiveGames = games.data?.filter(
    (game) => game.gameType?.name == 'Competitive Games'
  )

  const familyGames = games.data?.filter(
    (game) => game.gameType?.name == 'Family Games'
  )

  const masterLeague = games.data?.filter(
    (game) => game.gameType?.name == 'Master League'
  )

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
        {games.data ? (
          <div className="flex flex-wrap justify-center gap-5">
            {league == 0 &&
              games.data?.map((game) => (
                <Link href={`/registration/${game.slug}`} key={game.id}>
                  <GameCard
                    name={game.name as string}
                    league={game.gameType?.name?.toLocaleUpperCase() as string}
                    count={
                      game.minimumMembers == game.maximumMembers
                        ? `${game.minimumMembers} ORANG`
                        : `${game.minimumMembers} - ${game.maximumMembers} ORANG`
                    }
                    className="max-w-[294px] flex-grow md:max-w-[327px]"
                  />
                </Link>
              ))}
            {league == 1 &&
              games.data
                ?.filter((game) => game.gameType?.name == 'Master League')
                .map((game) => (
                  <Link href={`/registration/${game.slug}`} key={game.id}>
                    <GameCard
                      name={game.name as string}
                      league={
                        game.gameType?.name?.toLocaleUpperCase() as string
                      }
                      count={
                        game.minimumMembers == game.maximumMembers
                          ? `${game.minimumMembers} ORANG`
                          : `${game.minimumMembers} - ${game.maximumMembers} ORANG`
                      }
                      className="max-w-[294px] flex-grow md:max-w-[327px]"
                    />
                  </Link>
                ))}
            {league == 2 &&
              games.data
                ?.filter((game) => game.gameType?.name == 'Competitive Games')
                .map((game) => (
                  <Link href={`/registration/${game.slug}`} key={game.id}>
                    <GameCard
                      name={game.name as string}
                      league={
                        game.gameType?.name?.toLocaleUpperCase() as string
                      }
                      count={
                        game.minimumMembers == game.maximumMembers
                          ? `${game.minimumMembers} ORANG`
                          : `${game.minimumMembers} - ${game.maximumMembers} ORANG`
                      }
                      className="max-w-[294px] flex-grow md:max-w-[327px]"
                    />
                  </Link>
                ))}
            {league == 3 &&
              games.data
                ?.filter((game) => game.gameType?.name == 'Family Games')
                .map((game) => (
                  <Link href={`/registration/${game.slug}`} key={game.id}>
                    <GameCard
                      name={game.name as string}
                      league={
                        game.gameType?.name?.toLocaleUpperCase() as string
                      }
                      count={
                        game.minimumMembers == game.maximumMembers
                          ? `${game.minimumMembers} ORANG`
                          : `${game.minimumMembers} - ${game.maximumMembers} ORANG`
                      }
                      className="max-w-[294px] flex-grow md:max-w-[327px]"
                    />
                  </Link>
                ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-5">
            <Skeleton
              variant={'rectangular'}
              animation="wave"
              className="h-[300px] w-[200px]"
            />
            <Skeleton
              variant={'rectangular'}
              animation="wave"
              className="h-[300px] w-[200px]"
            />
            <Skeleton
              variant={'rectangular'}
              animation="wave"
              className="h-[300px] w-[200px]"
            />
            <Skeleton
              variant={'rectangular'}
              animation="wave"
              className="h-[300px] w-[200px]"
            />
          </div>
        )}
      </div>
      <div className="flex w-full flex-col items-center gap-3 bg-[rgb(243,106,34)] py-20 px-5">
        <p className="text-center font-poppinsBold text-headline-small md:text-headline-large text-white">
          Mau tahu permainan lainnya?
        </p>
        <p className="text-center font-poppins text-label-large md:text-headline-medium text-white">
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
