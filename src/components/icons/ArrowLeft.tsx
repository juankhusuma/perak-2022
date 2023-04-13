import React from 'react'
import { IconProps } from './interface'

export const ArrowLeft: React.FC<IconProps> = ({
  fill = 'none',
  stroke,
  className,
  size,
}) => {
  // TODO: Place svg's elements here and strip out sizing, fill, and stroke attribute then place className={`${size} ${fill} ${stroke} ${className}`} in the <svg> tag
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 8H1M1 8L8 15M1 8L8 1"
        stroke="#383D75"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
