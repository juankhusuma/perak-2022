import { PlayerInformation, Table } from '@elements'
import { useState } from 'react'

export const TopScorerClassement: React.FC = () => {
  const [header, setHeader] = useState(['Pos', 'Name', 'Match', 'Goals'])
  const [content, setContent] = useState([
    ['1', 'Saya', '99', '111'],
    ['1', 'Saya', '99', '111'],
    ['1', 'Saya', '99', '111'],
    ['1', 'Saya', '99', '111'],
    ['1', 'Saya', '99', '111'],
  ])

  const [goals, setGoals] = useState([
    ['1 Goal', 'Tim Saya', '7', '0', 'Tim Lawan'],
    ['2 Goal', 'Tim Saya', '7', '0', 'Tim Lawan'],
    ['1 Goal', 'Tim Saya', '7', '0', 'Tim Lawan'],
  ])

  return (
    <>
      <div className="flex w-full flex-col items-center gap-4 md:flex-row">
        <Table header={header} content={content} />
        <div className="w-full">
          <h2 className="mb-2 font-poppinsBold text-purple-dark">
            Player Information
          </h2>
          <PlayerInformation
            playerName={'Muhammad Akmal Hakim'}
            playerPhoto={'/assets/images/League/TeamDummy.svg'}
            playerTeam={'Tim Asoy'}
            playerGoalHistory={goals}
          />
        </div>
      </div>
    </>
  )
}
