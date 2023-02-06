import React from 'react'
import { IconProps } from './interface'

export const Twitterfooter: React.FC<IconProps> = ({
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
      <g clipPath="url(#clip0_221_916)">
        <path
          d="M26.009 4.1963C26.009 4.1963 23.753 5.52909 22.4985 5.90685C21.8252 5.13264 20.9303 4.5839 19.9349 4.33485C18.9396 4.0858 17.8917 4.14845 16.9332 4.51432C15.9746 4.8802 15.1515 5.53165 14.5752 6.38057C13.9989 7.22949 13.6972 8.23491 13.711 9.26087V10.3789C11.7462 10.4298 9.79937 9.99407 8.04381 9.11044C6.28824 8.2268 4.77846 6.92271 3.64891 5.31431C3.64891 5.31431 -0.823109 15.3764 9.23894 19.8484C6.93644 21.4113 4.19356 22.195 1.4129 22.0844C11.475 27.6744 23.773 22.0844 23.773 9.22733C23.772 8.91591 23.742 8.60526 23.6836 8.29938C24.8246 7.1741 26.009 4.1963 26.009 4.1963Z"
          stroke="#E9DEA6"
          strokeWidth="2.23601"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_221_916">
          <rect
            width="26.8321"
            height="26.8321"
            fill="white"
            transform="translate(0.294922 0.831055)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
