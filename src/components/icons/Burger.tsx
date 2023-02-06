import React from 'react'
import { IconProps } from './interface'

export const Burger: React.FC<IconProps> = ({
  fill = 'fill-current',
  stroke,
  className,
  size,
}) => {
  // TODO: Place svg's elements here and strip out sizing, fill, and stroke attribute then place className={`${size} ${fill} ${stroke} ${className}`} in the <svg> tag
  return (
    <svg
      width="29"
      height="19"
      viewBox="0 0 29 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.625 18.75H28.375V15.6667H0.625V18.75ZM0.625 11.0417H28.375V7.95833H0.625V11.0417ZM0.625 0.25V3.33333H28.375V0.25H0.625Z"
        fill="#DC8F1A"
      />
    </svg>
  )
}
