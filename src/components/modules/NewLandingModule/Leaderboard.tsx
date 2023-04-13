import React, { useEffect, useRef, useState } from 'react'
import { TicketDesign } from '@elements'
import { Games } from './Games'
import RightCloud from '@images/NewLanding/rightCloud.svg'
import LeftCloud from '@images/NewLanding/leftCloud.svg'

export default function Leaderboard() {
  const [league, setLeague] = useState<number>(0)

  const leagueName = (leagueNumber: number) => {
    switch (leagueNumber) {
      case 0:
        return 'Competitive Games'
      case 1:
        return 'Competitive Games'
      case 2:
        return 'Master League'
    }
  }

  const leaderboardContent = () => {
    const name = leagueName(league) as string
    return <Games leagueName={name} />
  }

  return (
    <>
      <div
        className="relative flex h-[1400px] w-full flex-col items-center justify-start gap-6 bg-background-light 
        bg-cover bg-center 
        bg-no-repeat md:h-[712px] md:bg-[url('/assets/images/NewLanding/LeaderboardMdBg.svg')] lg:bg-[url('/assets/images/NewLanding/LeaderboardBg.svg')]"
      >
        <div className="flex-col items-center justify-start">
          <h1 className="mt-10 text-center font-poppinsBold text-headline-small text-blue-dark md:text-display-medium">
            Main dan Menang!
          </h1>
          <p className="w-[300px] text-center font-poppinsBold text-body-medium text-blue-dark md:w-[784px] md:text-title-large">
            Raih posisi tertinggi dan dapatkan hadiah
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <TicketDesign name="Leaderboard" />

          <div className="flex flex-wrap">{leaderboardContent()}</div>
        </div>
        <RightCloud className="absolute hidden animate-[bounce_20s_ease-in-out_infinite]  md:top-[-20%] md:right-[-28%] md:block lg:top-[-10%] lg:right-[5%]" />
        <LeftCloud className="absolute hidden animate-[bounce_20s_ease-in-out_infinite] md:top-[-20%] md:left-[-28%] md:block lg:top-[-10%] lg:left-[5%]" />
      </div>

      <div className="bg-transparent lg:h-[40px]"></div>
    </>
  )
}
