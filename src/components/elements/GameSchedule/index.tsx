import React from 'react'
import { GameScheduleProps } from './interface'
import { DateTime } from 'luxon'
import { Tag } from '../Tag'

export const GameSchedule: React.FC<GameScheduleProps> = ({
  title,
  firstTeamName,
  firstTeamScore,
  secondTeamName,
  secondTeamScore,
  schedule,
  gameName,
}) => {
  // TODO: Write element's logic

  return (
    <div className="flex w-full flex-col gap-y-2 overflow-hidden rounded-lg border-[2.5px] border-purple-darkest bg-background-normal p-4 text-purple-darkest">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="flex items-center gap-x-2">
          <h1 className="font-poppinsBold"> {title} </h1>
          <Tag variant={3} className="truncate" text={gameName} />
        </div>
        <p className="">
          {DateTime.fromJSDate(schedule)
            .setLocale('id')
            .toFormat('dd LLLL | HH:mm')}
        </p>
      </div>
      {firstTeamName && (
        <div className="flex flex-col items-center justify-center gap-x-4 gap-y-1 text-center font-poppinsBold min-[425px]:flex-row">
          <h2 className="truncate"> Tim {firstTeamName} </h2>
          {secondTeamName && (
            <>
              <p> vs </p>
              <h2 className="truncate"> Tim {secondTeamName} </h2>
            </>
          )}
        </div>
      )}
    </div>
  )
}
