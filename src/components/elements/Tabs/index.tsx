import React from 'react'

import { TabsProps } from './interface'

export const Tabs: React.FC<TabsProps> = ({
  items,
  value = 0,
  setValue,
  dark = false,
  className,
}) => {
  return (
    <div
      className={`flex w-fit space-x-5 border-b-2 border-[#091E4224] ${
        className ?? 'text-title-medium'
      } `}
    >
      {items.map((item: any, index: any) => (
        <div
          onClick={() => setValue(index)}
          className="group relative flex cursor-pointer select-none flex-col items-center justify-center"
          key={item}
        >
          <p
            className={`w-max font-poppins font-extrabold ${
              dark
                ? 'group-hover:text-cream-normal'
                : 'group-hover:text-primary'
            }  ${
              index === value
                ? dark
                  ? 'text-orange-light'
                  : 'text-primary'
                : dark
                ? 'text-cream-light'
                : 'text-orange-dark'
            }`}
          >
            {item}
          </p>
          <div
            className={`
              absolute -bottom-0.5 -mr-0.5 rounded-sm ${
                dark ? 'bg-orange-light' : 'bg-primary'
              } transition-all group-hover:h-0.5 group-hover:w-full
              ${index === value ? 'h-0.5 w-full' : 'h-0 w-0'}
            `}
          ></div>
        </div>
      ))}
    </div>
  )
}
