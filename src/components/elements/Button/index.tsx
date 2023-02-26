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
  isLoading,
}) => {
  // TODO: Write element's logic

  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled || isLoading}
        className={`${className} flex h-fit select-none items-center justify-center gap-1 rounded-lg font-poppins text-label-medium font-extrabold tracking-wider transition-all
        ${
          variant == 1 &&
          `bg-orange-dark text-cream-light hover:drop-shadow-lg active:bg-cream-normal active:text-primary active:drop-shadow-none ${
            isLoading
              ? 'border-cream-light disabled:bg-orange-dark'
              : 'disabled:bg-cream-normal'
          } disabled:text-[#9A6312]/50  disabled:drop-shadow-none`
        }
        ${
          variant == 2 &&
          `bg-orange-light text-primary hover:drop-shadow-lg active:bg-cream-normal active:text-cream-dark active:drop-shadow-none disabled:bg-cream-normal ${
            isLoading
              ? 'border-primary disabled:bg-orange-light'
              : 'disabled:bg-cream-normal'
          } disabled:text-[#9A6312]/50 disabled:drop-shadow-none`
        }
        ${
          variant == 3 &&
          `border-2 border-purple-dark bg-transparent text-purple-dark hover:bg-[#EABB7633]/20 active:bg-[#EABB7633]/50 ${
            !isLoading && 'disabled:border-0'
          }  disabled:bg-transparent disabled:text-purple-dark/50`
        }`}
      >
        {leftIcon && <span className="stroke-current">{leftIcon}</span>}
        {isLoading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-inherit"></div>
        ) : (
          children
        )}
        {rightIcon && <span className="stroke-current">{rightIcon}</span>}
      </button>
    </>
  )
}
