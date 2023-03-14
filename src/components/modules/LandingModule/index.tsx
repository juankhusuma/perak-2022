import React from 'react'
import Hero from './Hero'
import About from './About'
import GameSection from './gameSection'

export const LandingModule: React.FC = () => {
  return (
    <>
      <div className="relative mt-20 w-full">
        <Hero />
        <About />
        <GameSection />
      </div>
    </>
  )
}
