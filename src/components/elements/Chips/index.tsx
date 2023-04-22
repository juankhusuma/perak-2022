import React, { useState } from 'react'
import { ChipsProps } from './interface'

export const Chips: React.FC<ChipsProps> = ({
  onClick,
  enabled,
  leftIcon,
  rightIcon,
  text,
  variant,
  className,
}) => {
  // TODO: Write element's logic
  return (
    <>
      <div
        className={`flex w-fit cursor-pointer select-none items-center  gap-1 rounded-2xl px-2 py-1 font-poppins text-label-large text-primary transition-all ${
          enabled
            ? 'border-2 border-cream-normal bg-[#FEB048]'
            : ` border-2 border-primary   ${
                variant == 1 && 'bg-cream-normal'
              } ${variant == 2 && 'bg-orange-light'}`
        } ${className}`}
        onClick={onClick}
      >
        {leftIcon && <span className="text-primary">{leftIcon}</span>}
        {text}
        {rightIcon && <span className="text-primary">{rightIcon}</span>}
      </div>
    </>
  )
}
