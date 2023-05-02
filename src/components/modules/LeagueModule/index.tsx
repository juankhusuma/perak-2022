import React, { useState, Dispatch, SetStateAction } from 'react'
import { LeagueLayout } from './LeagueLayout'
import { Chips, Tabs } from '@elements'
import {
  CodeBracketSquareIcon,
  UserGroupIcon,
  WindowIcon,
} from '@heroicons/react/24/outline'
import { LEAGUE_OPTIONS, TAB_OPTIONS } from './constant'
import { Schedule } from './Schedule'
import { History } from './History'
import { Games } from './Games'

export const LeagueModule: React.FC = () => {
  const [tab, setTab] = useState<number>(0)
  const [league, setLeague] = useState<number>(0)

  const leagueName = (leagueNumber: number) => {
    switch (leagueNumber) {
      case 0:
        return 'Family Games'
      case 1:
        return 'Competitive Games'
      case 2:
        return 'Master League'
    }
  }

  const contentSection = (tabNumber: number) => {
    const name = leagueName(league) as string
    console.log(name)
    switch (tabNumber) {
      case 0:
        return <Games leagueName={name} league={league} />
      case 1:
        return <Schedule leagueName={name} />
      case 2:
        return <History leagueName={name} />
    }
  }

  return (
    <LeagueLayout
      title="Main dan Menang!"
      description="Raih posisi tertinggi dan dapatkan hadiah"
      imageUrl="/assets/images/League/League.svg"
      imageAlt="league"
    >
      <div className="flex flex-col gap-y-6">
        {/* Tab Section */}
        <div className="flex justify-center">
          <Tabs
            value={tab}
            setValue={setTab}
            variant={0}
            className="flex-wrap justify-center"
            items={TAB_OPTIONS}
          />
        </div>
        {/* Chips Section */}
        <div className="flex flex-wrap justify-center gap-6">
          {LEAGUE_OPTIONS.map((item, key) => (
            <ChipElement
              title={item}
              icon={GroupIcon[key]}
              targetLeague={key}
              league={league}
              setLeague={setLeague}
              key={key}
            />
          ))}
        </div>
        {/* Content Section */}
        {contentSection(tab)}
      </div>
    </LeagueLayout>
  )
}

const ChipElement: React.FC<{
  targetLeague: number
  setLeague: Dispatch<SetStateAction<number>>
  league: number
  icon: React.ReactNode
  title: string
}> = ({ league, setLeague, targetLeague, icon, title }) => (
  <Chips
    text={title}
    enabled={targetLeague === league}
    variant={1}
    className="font-poppinsBold"
    leftIcon={icon}
    onClick={() => setLeague(targetLeague)}
  />
)

const GroupIcon: React.ReactNode[] = [
  <UserGroupIcon className="h-7 w-7" />,
  <WindowIcon className="h-7 w-7" />,
  <CodeBracketSquareIcon className="h-7 w-7" />,
]
