import React from 'react'
import { IconProps } from './interface'

export const Dashboardicon: React.FC<IconProps> = ({
  fill = 'fill-current',
  stroke,
  className,
  size,
}) => {
  // TODO: Place svg's elements here and strip out sizing, fill, and stroke attribute then place className={`${size} ${fill} ${stroke} ${className}`} in the <svg> tag
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${size} ${fill} ${stroke} ${className}`}
    >
      <path
        d="M21.5 16V7.2C21.5 6.0799 21.5 5.51984 21.282 5.09202C21.0903 4.71569 20.7843 4.40973 20.408 4.21799C19.9802 4 19.4201 4 18.3 4H6.7C5.57989 4 5.01984 4 4.59202 4.21799C4.21569 4.40973 3.90973 4.71569 3.71799 5.09202C3.5 5.51984 3.5 6.0799 3.5 7.2V16M5.16667 20H19.8333C20.4533 20 20.7633 20 21.0176 19.9319C21.7078 19.7469 22.2469 19.2078 22.4319 18.5176C22.5 18.2633 22.5 17.9533 22.5 17.3333C22.5 17.0233 22.5 16.8683 22.4659 16.7412C22.3735 16.3961 22.1039 16.1265 21.7588 16.0341C21.6317 16 21.4767 16 21.1667 16H3.83333C3.52334 16 3.36835 16 3.24118 16.0341C2.89609 16.1265 2.62654 16.3961 2.53407 16.7412C2.5 16.8683 2.5 17.0233 2.5 17.3333C2.5 17.9533 2.5 18.2633 2.56815 18.5176C2.75308 19.2078 3.29218 19.7469 3.98236 19.9319C4.23669 20 4.54669 20 5.16667 20Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
