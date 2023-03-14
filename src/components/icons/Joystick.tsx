import React from 'react'
import { IconProps } from './interface'

export const Joystick: React.FC<IconProps> = ({
  fill = 'none',
  stroke = 'currentColor',
  className,
  size = 'w-[25px] h-[25px]',
}) => {
  // TODO: Place svg's elements here and strip out sizing, fill, and stroke attribute then place className={`${size} ${fill} ${stroke} ${className}`} in the <svg> tag
  return (
    <svg
      width="22"
      height="16"
      fill={fill}
      stroke={stroke}
      viewBox="0 0 22 16"
      xmlns="http://www.w3.org/2000/svg"
      className={`${size} ${className}`}
    >
      <path
        d="M5.00001 7H9.00001M7.00001 5V9M14 8H14.01M17 6H17.01M9.44897 1H12.5511C15.1759 1 16.4884 1 17.5186 1.49743C18.4256 1.9354 19.1792 2.63709 19.6806 3.51059C20.2502 4.5027 20.3437 5.81181 20.5307 8.43002L20.7768 11.8745C20.8974 13.5634 19.5598 15 17.8666 15C17.0007 15 16.1795 14.6154 15.6252 13.9502L15.25 13.5C14.9069 13.0882 14.7353 12.8823 14.5399 12.7159C14.1303 12.3672 13.6345 12.1349 13.1044 12.0436C12.8515 12 12.5835 12 12.0475 12H9.95258C9.41655 12 9.14853 12 8.89565 12.0436C8.36551 12.1349 7.86969 12.3672 7.46012 12.7159C7.26475 12.8823 7.09317 13.0882 6.75001 13.5L6.37485 13.9502C5.82052 14.6154 4.99936 15 4.13347 15C2.44025 15 1.10263 13.5634 1.22326 11.8745L1.4693 8.43002C1.65631 5.81181 1.74982 4.5027 2.31938 3.51059C2.82086 2.63709 3.57446 1.9354 4.48147 1.49743C5.51164 1 6.82408 1 9.44897 1Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
