import React from 'react'
import { TagProps } from './interface'

export const Tag: React.FC<TagProps> = ({ icon, text, variant }) => {
  // TODO: Write element's logic

  return (
    <>
      <div
        className={`flex w-fit select-none items-center gap-1 rounded-md  stroke-current px-2 py-1 font-poppinsBold text-title-small font-extrabold  ${
          variant == 1 && 'bg-orange-normal text-primary'
        } ${variant == 2 && 'bg-primary text-cream-light'}`}
      >
        {icon && <span>{icon}</span>}
        {text}
      </div>
    </>
  )
}
