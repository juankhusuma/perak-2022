import React from 'react'
import Link from 'next/link'
import { MatchCardProps } from './interface'
import { Button } from '../Button'
import { Tag } from '../Tag'
import { SignalIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { DateTime } from 'luxon'

export const MatchCard: React.FC<MatchCardProps> = ({
  firstTeam,
  secondTeam,
  firstTeamLogo,
  secondTeamLogo,
  firstTeamScore,
  secondTeamScore,
  bracketInformation,
  schedule,
  videoMatch,
  live,
  gameName,
  videoStatus,
  completed,
}) => {
  // TODO: Write element's logic

  const date1 = schedule ? new Date(schedule.toISOString()) : null

  return (
    <div className="mx-auto flex w-full flex-col gap-y-3 rounded-lg bg-orange-light p-4">
      {live ? (
        <div className="flex flex-col items-end">
          <Tag
            variant={1}
            className="bg-red-normal text-background-light"
            icon={<SignalIcon className="h-5 w-5" />}
            text="LIVE"
            flex
          />
        </div>
      ) : (
        <></>
      )}
      <div className="flex flex-col items-center justify-between lg:flex-row">
        {firstTeam ? (
          <div className="flex items-center justify-between gap-x-6">
            {/* First Team */}
            <Team team={firstTeam} teamLogo={firstTeamLogo} />
            <div className="flex font-poppinsBold text-purple-dark">
              {completed ? (
                <div className="flex gap-2">
                  <p className="flex">{firstTeamScore}</p>
                  <p>-</p>
                  <p>{secondTeamScore}</p>
                </div>
              ) : (
                <>
                  <p>vs</p>
                </>
              )}
            </div>
            <Team team={secondTeam} teamLogo={secondTeamLogo} />
          </div>
        ) : (
          <h2 className="font-poppinsBold text-purple-dark">
            {bracketInformation}
          </h2>
        )}
        <div className="flex flex-col gap-y-1 text-center">
          {firstTeam ? (
            <h2 className="font-poppinsBold text-purple-dark">
              {bracketInformation}
            </h2>
          ) : (
            <br></br>
          )}
          {date1 && (
            <p className="text-red-dark">
              {DateTime.fromJSDate(date1)
                .setLocale('id')
                .toFormat('dd LLLL | HH:mm')}
            </p>
          )}
        </div>
      </div>
      {videoStatus && videoMatch ? (
        <a
          href={videoMatch}
          className="w-full"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant={1} className="w-full py-4">
            Tonton
          </Button>
        </a>
      ) : (
        <Button variant={1} className="w-full py-4" disabled>
          Tonton
        </Button>
      )}
    </div>
  )
}

const Team: React.FC<{
  team: string
  teamLogo: string
}> = ({ team, teamLogo }) => {
  return (
    <div className="flex w-full flex-col items-center gap-y-2">
      {/* di hilangkan untuk sementara */}
      {/* <div className="relative flex justify-center">
        <Image
          alt={team}
          src={teamLogo}
          className={`h-fit w-10 fill-inherit object-fill`}
          width={0}
          height={0}
        />
      </div> */}
      <h2 className="truncate font-poppinsBold text-purple-dark"> {team} </h2>
    </div>
  )
}
