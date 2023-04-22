import React from 'react'
import { TagProps } from './interface'

export const Tag: React.FC<TagProps> = ({
  icon,
  text,
  variant,
  className,
  flex,
}) => {
  // TODO: Write element's logic

  return (
    <>
      <div
        className={`w-fit select-none gap-1 rounded-md  stroke-current px-2 py-1 font-poppinsBold text-title-small font-extrabold ${
          flex && 'flex items-center'
        } ${variant == 1 && 'bg-orange-normal text-primary'} ${
          variant == 2 && 'bg-primary text-cream-light'
        } ${variant == 3 && 'bg-[rgb(56,61,117)] text-white'} ${
          variant == 4 && 'bg-orange-dark text-purple-dark'
        } ${className}`}
      >
        {icon && <span>{icon}</span>}
        {text}
      </div>
    </>
  )
}
