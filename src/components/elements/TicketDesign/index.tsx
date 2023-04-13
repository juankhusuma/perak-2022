import React from 'react'

import { TicketProps } from './interface'

export const TicketDesign: React.FC<TicketProps> = ({ name }) => {
  // TODO: Write element's logic

  return (
    <>
      <div
        className="flex h-[55.4px] w-[142.37px] flex-row items-center justify-center bg-[url('/assets/images/NewLanding/TicketSmBg.svg')] font-poppinsBold 
        text-title-medium text-background-light drop-shadow-[-8px_0px_0px_rgba(10,0,131,0.25)] 
        lg:h-[100px] lg:w-[244px] 
        lg:bg-[url('/assets/images/NewLanding/TicketBg.svg')] lg:text-headline-large lg:drop-shadow-[-20px_0px_0px_rgba(10,0,131,0.25)]"
      >
        {name as string}
      </div>
    </>
  )
}
