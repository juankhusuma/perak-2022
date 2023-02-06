import React from 'react'
import { ButtonProps } from './interface'

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  variant,
  onClick,
  leftIcon,
  rightIcon,
  disabled,
}) => {
  // TODO: Write element's logic

  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${className} flex h-fit select-none items-center justify-center gap-1 rounded-lg font-poppins text-label-medium font-extrabold tracking-wider
        ${
          variant == 1 &&
          'bg-orange-normal text-primary transition-shadow hover:drop-shadow-lg active:drop-shadow-none'
        }
        ${
          variant == 2 &&
          'bg-cream-normal text-primary transition-colors hover:text-[#9A631280] hover:text-opacity-50 active:text-primary'
        }
        ${
          variant == 3 &&
          'bg-orange-light text-primary transition-shadow   hover:drop-shadow-lg active:drop-shadow-none'
        }
        ${
          variant == 4 &&
          'bg-cream-normal text-orange-normal transition-colors hover:text-[#9A631280] hover:text-opacity-50 active:text-orange-normal'
        } ${
          variant == 5 &&
          'bg-transparent text-[#383D75] transition-all hover:bg-[#EABB76] hover:bg-opacity-20 active:bg-opacity-30'
        } ${
          variant == 6 &&
          'bg-orange-dark text-cream-light transition-shadow hover:drop-shadow-lg active:drop-shadow-none'
        }`}
      >
        {leftIcon && <span className="stroke-current">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="stroke-current">{rightIcon}</span>}
      </button>
    </>
  )
}
