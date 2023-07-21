import React from 'react'
import { TipCardProps } from './interface'

export const TipCard: React.FC<TipCardProps> = ({ icon, message, variant }) => {
  // TODO: Write element's logic

  return (
    <>
      <div
        className={`flex w-fit select-none items-center rounded p-0.5 ${
          variant === 'red' && 'bg-red-normal text-red-normal'
        } ${variant === 'green' && 'bg-green-normal text-green-normal'} ${
          variant === 'blue' && 'bg-blue-dark text-blue-dark'
        } ${variant === 'orange' && 'bg-orange-dark text-orange-dark'} ${
          variant === 'purple' && 'bg-purple-normal text-purple-normal'
        }`}
      >
        <div
          className={`rounded-sm p-0.5 ${variant === 'red' && 'bg-red-light'} ${
            variant === 'green' && 'bg-green-light'
          } ${variant === 'blue' && 'bg-blue-normal'} ${
            variant === 'orange' && 'bg-orange-normal'
          } ${variant === 'purple' && 'bg-purple-lightest'}`}
        >
          {icon}
        </div>
        <div className="font-poppinsRegular px-2 py-1 text-body-medium text-white">
          {message}
        </div>
      </div>
    </>
  )
}
