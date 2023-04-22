import React, { useState } from 'react'
import Image from 'next/image'
import { Chevrondown, Gamingpad, Medal } from '@icons'
import { MatchCard, Tag, Button } from '@elements'

export const PlayerModule: React.FC = () => {
  const [chevron, setChevron] = useState(false)

  return (
    <>
      <main className="relative flex flex-col gap-8 py-28 px-8 font-poppins lg:px-28">
        <h1 className="text-shadow-lg font-outline-4 font-poppinsBold text-headline-large text-purple-dark shadow-orange-dark">
          Player Information
        </h1>

        <Player
          playerLogo={'/assets/images/League/TeamDummy.svg'}
          name={'Your Name'}
          type={'Mahasiswa'}
          cohort={'Bakung'}
        />

        <div className="flex items-center gap-2">
          <h1 className="justify-center font-poppinsBold text-headline-small text-purple-dark lg:justify-start">
            Permainan diikuti
          </h1>
          <div
            className="cursor-pointer"
            onClick={() => {
              setChevron(!chevron)
            }}
          >
            {chevron ? (
              <div className="rotate-180">
                <Chevrondown />
              </div>
            ) : (
              <Chevrondown />
            )}
          </div>
        </div>
        <div className="grid w-full gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4].map((item, key) => (
            <GameHistory
              playerLogo={'/assets/images/League/TeamDummy.svg'}
              game={'Valorant'}
              team={'Team Name'}
              gamePad={'MyIGN'}
              playerRank={1}
              maxRank={99}
            />
          ))}
        </div>
      </main>
    </>
  )
}

const Player: React.FC<{
  playerLogo: string
  name: string
  type: string
  cohort: string
}> = ({ playerLogo, name, type, cohort }) => {
  return (
    <div className="flex w-full flex-row space-x-5 whitespace-nowrap rounded-md bg-orange-light p-5">
      <Image
        alt={'Team'}
        src={playerLogo}
        className={`h-fit w-20 fill-inherit object-fill`}
        width={0}
        height={0}
      />
      <div className="flex flex-col space-y-1">
        <h1 className="text-shadow-lg font-outline-4 font-retro text-headline-large text-purple-darkest shadow-orange-dark">
          {name}
        </h1>
        <h2 className="font-poppins text-purple-darkest">
          {type}-{cohort}
        </h2>
      </div>
    </div>
  )
}

const GameHistory: React.FC<{
  playerLogo: string
  game: string
  team: string
  gamePad: string
  playerRank: number
  maxRank: number
}> = ({ playerLogo, game, team, gamePad, playerRank, maxRank }) => {
  return (
    <div className="overflow-hidden rounded-md">
      <div className="flex flex-row items-center gap-x-2 bg-purple-darkest p-2">
        <div className="relative flex justify-center">
          <Image
            alt={'Photo'}
            src={playerLogo}
            className={`h-fit w-14 fill-inherit object-fill`}
            width={0}
            height={0}
          />
        </div>
        <div className="flex-col space-y-1">
          <Tag variant={1} text={game} />
          <h2 className="font-poppinsBold text-white">{team}</h2>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-x-2 bg-orange-normal p-3">
        <div className="flex flex-col items-start space-x-1">
          <div className="flex items-center space-x-2">
            <Gamingpad />
            <h2 className="font-poppinsBold text-grey-dark">{gamePad}</h2>
          </div>
          <div className="flex items-center space-x-3">
            <Medal />
            <h2 className="text-center font-poppins">
              {playerRank}/{maxRank}
            </h2>
          </div>
        </div>

        <Button className={'w-1/2 py-4'} variant={1}>
          Team Details
        </Button>
      </div>
    </div>
  )
}
