import React from 'react'
import { IconProps } from './interface'

export const Chevronfull: React.FC<IconProps> = ({
  fill = 'fill-current',
  stroke,
  className,
  size,
}) => {
  // TODO: Place svg's elements here and strip out sizing, fill, and stroke attribute then place className={`${size} ${fill} ${stroke} ${className}`} in the <svg> tag
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${size} ${fill} ${stroke} ${className}`}
    >
      <path
        d="M12.0166 5.9967C11.7166 5.9967 11.4046 6.1363 11.2046 6.4029C10.4536 7.403 5.95465 13.4029 5.20465 14.4029C4.70965 15.0622 5.19264 15.9967 6.01664 15.9967H18.0166C18.8406 15.9967 19.3236 15.0622 18.8286 14.4029L12.8286 6.4029C12.6296 6.1363 12.3166 5.9967 12.0166 5.9967Z"
        fill="white"
      />
    </svg>
  )
}
