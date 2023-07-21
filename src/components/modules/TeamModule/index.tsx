import React, { useState } from 'react'
import Image from 'next/image'
import { MatchCard, Tag } from '@elements'
import { Chevrondown } from '@icons'
import withSession from 'src/components/hoc/withSession'

export const TeamModule: React.FC = withSession(() => {
  const [chevron, setChevron] = useState(false)

  return (
    <>
      <main className="relative flex flex-col gap-8 px-8 py-28 font-poppins lg:px-28">
        <h1 className="text-shadow-lg font-outline-4 font-poppinsBold text-headline-large text-purple-dark shadow-orange-dark">
          Team Details
        </h1>

        <div className="flex flex-col gap-4 md:flex-col lg:flex-row">
          <Team
            team={'Team Name'}
            teamLogo={'/assets/images/League/TeamDummy.svg'}
            game={'VALORANT'}
            teamRank={1}
            maxRank={99}
          />

          <div className="flex w-full flex-col">
            <h1 className="flex w-full justify-center font-poppinsBold text-headline-small text-purple-dark lg:justify-start lg:text-headline-medium">
              Pertandingan yang Akan Datang
            </h1>
            <MatchCard
              bracketInformation="Knockout 16 Besar"
              firstTeam="Tim Saya"
              firstTeamLogo="/assets/images/League/TeamDummy.svg"
              firstTeamScore="7"
              schedule={new Date('04 20 2023 20:00:00')}
              secondTeam="Tim Lawan"
              secondTeamLogo="/assets/images/League/TeamDummy.svg"
              secondTeamScore="0"
              videoMatch=""
              live={false}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <h1 className="justify-center font-poppinsBold text-headline-small text-purple-dark lg:justify-start">
            Anggota Tim
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
            <TeamMember
              team={'IGN'}
              teamLogo={'/assets/images/League/TeamDummy.svg'}
              name={'Muhammad Akmal Hakim'}
              type={'Mahasiswa'}
              cohort={'Bakung'}
              kill={99}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <h1 className="justify-center font-poppinsBold text-headline-small text-purple-dark lg:justify-start">
            Jadwal Pertandingan
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

        <div className="flex w-full flex-col gap-4 md:flex-row">
          {[0, 1].map((item, key) => (
            <MatchCard
              bracketInformation="Knockout 16 Besar"
              firstTeam="Tim Saya"
              firstTeamLogo="/assets/images/League/TeamDummy.svg"
              firstTeamScore="7"
              schedule={new Date('04 20 2023 20:00:00')}
              secondTeam="Tim Lawan"
              secondTeamLogo="/assets/images/League/TeamDummy.svg"
              secondTeamScore="0"
              videoMatch=""
              live={false}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <h1 className="justify-center font-poppinsBold text-headline-small text-purple-dark lg:justify-start">
            Riwayat Pertandingan
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
        <div className="flex w-full flex-col gap-4 md:flex-row">
          {[0, 1].map((item, key) => (
            <MatchCard
              bracketInformation="Knockout 16 Besar"
              firstTeam="Tim Saya"
              firstTeamLogo="/assets/images/League/TeamDummy.svg"
              firstTeamScore="7"
              schedule={new Date('04 20 2023 20:00:00')}
              secondTeam="Tim Lawan"
              secondTeamLogo="/assets/images/League/TeamDummy.svg"
              secondTeamScore="0"
              videoMatch=""
              live={false}
            />
          ))}
        </div>
      </main>
    </>
  )
})

const Team: React.FC<{
  team: string
  teamLogo: string
  game: string
  teamRank: number
  maxRank: number
}> = ({ team, teamLogo, game, teamRank, maxRank }) => {
  return (
    <div className="flex w-full flex-row items-center justify-center space-x-5 whitespace-nowrap rounded-md bg-orange-light p-5">
      <Image
        alt={'Team'}
        src={teamLogo}
        className={`h-fit w-20 fill-inherit object-fill`}
        width={0}
        height={0}
      />
      <div className="flex flex-col space-y-1">
        <Tag variant={4} text={game} />
        <h1 className="text-shadow-lg font-outline-4 font-retro text-headline-medium text-purple-darkest shadow-orange-dark">
          {team}
        </h1>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="font-poppinsBold text-headline-small text-purple-dark">
          Rank
        </h1>
        <div className="flex flex-row items-end">
          <h1 className="font-poppinsBold text-headline-small text-green-dark">
            {teamRank}
          </h1>
          <h1 className="font-poppins text-body-large text-purple-darkest">
            &nbsp;{maxRank}
          </h1>
        </div>
      </div>
    </div>
  )
}

const TeamMember: React.FC<{
  team: string
  teamLogo: string
  name: string
  type: string
  cohort: string
  kill: number
}> = ({ team, teamLogo, name, type, kill, cohort }) => {
  return (
    <div className="overflow-hidden rounded-md">
      <div className="flex flex-row items-center gap-x-2 bg-purple-dark p-2">
        <div className="relative flex justify-center">
          <Image
            alt={'Photo'}
            src={teamLogo}
            className={`h-fit w-10 fill-inherit object-fill`}
            width={0}
            height={0}
          />
        </div>
        <div className="flex-col">
          <h2 className="font-poppinsBold text-white">{team}</h2>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-x-2 bg-orange-normal p-3">
        <div>
          <h2 className="font-poppins text-grey-dark">{name}</h2>
          <h2 className="font-poppins text-grey-normal">
            {type}-{cohort}
          </h2>
        </div>

        <div className="flex flex-col items-center rounded-md bg-purple-dark p-2">
          <p className="font-poppinsBold text-body-small text-white">
            Kill&Assist
          </p>
          <p className="font-retro text-display-small text-white">{kill}</p>
        </div>
      </div>
    </div>
  )
}
