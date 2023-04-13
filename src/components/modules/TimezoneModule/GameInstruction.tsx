import React from 'react'
import { GameInstructionsProps } from './interface'

export const GameInstruction: React.FC<GameInstructionsProps> = ({
  className,
  gameInstructions,
}) => {
  return (
    <div
      className={`${className} mt-4 w-full snap-center rounded-xl border-4 border-[#F36A22] bg-[#E9DEA6] p-3 text-xs text-purple-darkest md:text-base lg:p-5`}
    >
      <p className="font-poppinsBold text-headline-small font-extrabold text-primary lg:text-headline-medium">
        Petunjuk Permainan
      </p>
      <p className="mt-2 font-poppins text-body-medium text-primary lg:mt-4 lg:text-body-large">
        {gameInstructions}
      </p>
    </div>
  )
}
