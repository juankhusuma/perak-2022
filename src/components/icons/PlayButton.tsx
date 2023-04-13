import React from 'react'
import { IconProps } from './interface'

export const PlayButton: React.FC<IconProps> = ({
  fill = 'none',
  stroke,
  className,
  size,
}) => {
  // TODO: Place svg's elements here and strip out sizing, fill, and stroke attribute then place className={`${size} ${fill} ${stroke} ${className}`} in the <svg> tag
  return (
    <svg
      width="17"
      height="22"
      viewBox="0 0 17 22"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 3.98951C1 3.01835 1 2.53277 1.20249 2.2651C1.37889 2.03191 1.64852 1.88761 1.9404 1.87018C2.27544 1.85017 2.67946 2.11953 3.48752 2.65823L14.0031 9.6686C14.6708 10.1137 15.0046 10.3363 15.1209 10.6168C15.2227 10.8621 15.2227 11.1377 15.1209 11.383C15.0046 11.6635 14.6708 11.886 14.0031 12.3312L3.48752 19.3415C2.67946 19.8802 2.27544 20.1496 1.9404 20.1296C1.64852 20.1122 1.37889 19.9679 1.20249 19.7347C1 19.467 1 18.9814 1 18.0103V3.98951Z"
        stroke="#F4EFD3"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
