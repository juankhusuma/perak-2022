import React from 'react'
import { IconProps } from './interface'

export const Instagramfooter: React.FC<IconProps> = ({
  fill = 'fill-current',
  stroke,
  className,
  size,
}) => {
  // TODO: Place svg's elements here and strip out sizing, fill, and stroke attribute then place className={`${size} ${fill} ${stroke} ${className}`} in the <svg> tag
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.9786 18.7192C16.4484 18.7192 18.4506 16.717 18.4506 14.2472C18.4506 11.7773 16.4484 9.77515 13.9786 9.77515C11.5087 9.77515 9.50653 11.7773 9.50653 14.2472C9.50653 16.717 11.5087 18.7192 13.9786 18.7192Z"
        stroke="#E9DEA6"
        strokeWidth="2.23601"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.9165 18.7191V9.77509C3.9165 6.6878 6.41925 4.18506 9.50654 4.18506H18.4506C21.5379 4.18506 24.0406 6.6878 24.0406 9.77509V18.7191C24.0406 21.8064 21.5379 24.3092 18.4506 24.3092H9.50653C6.41925 24.3092 3.9165 21.8064 3.9165 18.7191Z"
        stroke="#E9DEA6"
        strokeWidth="2.23601"
      />
      <path
        d="M20.1276 8.10932L20.1388 8.0969"
        stroke="#E9DEA6"
        strokeWidth="1.67701"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
