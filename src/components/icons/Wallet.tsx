import React from 'react'
import { IconProps } from './interface'

export const Wallet: React.FC<IconProps> = ({
  fill = 'none',
  stroke = 'currentColor',
  className,
  size = 'w-[25px] h-[25px]',
}) => {
  // TODO: Place svg's elements here and strip out sizing, fill, and stroke attribute then place className={`${size} ${fill} ${stroke} ${className}`} in the <svg> tag
  return (
    <svg
      fill={fill}
      stroke={stroke}
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`${size} ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.5 16L12.5 13M12.5 13L15.5 16M12.5 13V20M22.5 9H2.5M6 18H5.7C4.5799 18 4.01984 18 3.59202 17.782C3.21569 17.5903 2.90973 17.2843 2.71799 16.908C2.5 16.4802 2.5 15.9201 2.5 14.8V7.2C2.5 6.0799 2.5 5.51984 2.71799 5.09202C2.90973 4.71569 3.2157 4.40973 3.59202 4.21799C4.01984 4 4.5799 4 5.7 4H19.3C20.4201 4 20.9802 4 21.408 4.21799C21.7843 4.40974 22.0903 4.7157 22.282 5.09202C22.5 5.51984 22.5 6.0799 22.5 7.2V14.8C22.5 15.9201 22.5 16.4802 22.282 16.908C22.0903 17.2843 21.7843 17.5903 21.408 17.782C20.9802 18 20.4201 18 19.3 18H19"
      ></path>
    </svg>
  )
}
