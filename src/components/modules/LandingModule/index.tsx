import React from 'react'
import Hero from './Hero'
import About from './About'
import GameSection from './gameSection'

export const LandingModule: React.FC = () => {
  return (
    <>
      <div className="relative w-full">
        <Hero />
        <About />
        <GameSection />
      </div>
    </>
  )
}
