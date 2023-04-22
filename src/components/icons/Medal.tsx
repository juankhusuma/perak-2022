import React from 'react'
import { IconProps } from './interface'

export const Medal: React.FC<IconProps> = ({
  fill = 'fill-current',
  stroke,
  className,
  size,
}) => {
  // TODO: Place svg's elements here and strip out sizing, fill, and stroke attribute then place className={`${size} ${fill} ${stroke} ${className}`} in the <svg> tag
  return (
    <svg
      width="13"
      height="19"
      viewBox="0 0 13 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.89315 8.21597L12 1.17847M4.76344 8.37202L1.16667 1.17847M7.63462 7.88503L4.3625 1.17847M8.96667 1.17847L8.1 3.2618M2 12.8451C2 15.6066 4.23858 17.8451 7 17.8451C9.76142 17.8451 12 15.6066 12 12.8451C12 10.0837 9.76142 7.84513 7 7.84513C4.23858 7.84513 2 10.0837 2 12.8451Z"
        stroke="#242A2B"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
