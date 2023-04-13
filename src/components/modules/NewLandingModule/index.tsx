import React from 'react'
import Welcome from './Welcome'
import About from './About'
import News from './News'
import WhatsOn from './WhatsOn'
import Leaderboard from './Leaderboard'
import CountDown from './CountDown'
import HaveFun from './HaveFun'
import Sponsor from './Sponsor'

export const NewLandingModule: React.FC = () => {
  // TODO: Write module's logic

  return (
    <>
      <div className="">
        <Welcome />
        <News />
        <About />
        <WhatsOn />
        <Leaderboard />
        <CountDown />
        {/* <Sponsor /> */}
        <HaveFun />
      </div>
    </>
  )
}
