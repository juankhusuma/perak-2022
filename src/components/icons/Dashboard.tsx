import React from 'react'
import { IconProps } from './interface'

export const Dashboard: React.FC<IconProps> = ({
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
        d="M1.5 4.2C1.5 3.07989 1.5 2.51984 1.71799 2.09202C1.90973 1.71569 2.21569 1.40973 2.59202 1.21799C3.01984 1 3.5799 1 4.7 1H12.3C13.4201 1 13.9802 1 14.408 1.21799C14.7843 1.40973 15.0903 1.71569 15.282 2.09202C15.5 2.51984 15.5 3.0799 15.5 4.2V11.8C15.5 12.9201 15.5 13.4802 15.282 13.908C15.0903 14.2843 14.7843 14.5903 14.408 14.782C13.9802 15 13.4201 15 12.3 15H4.7C3.57989 15 3.01984 15 2.59202 14.782C2.21569 14.5903 1.90973 14.2843 1.71799 13.908C1.5 13.4802 1.5 12.9201 1.5 11.8V4.2Z"
      ></path>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 10.2C7.5 9.07989 7.5 8.51984 7.71799 8.09202C7.90973 7.71569 8.21569 7.40973 8.59202 7.21799C9.01984 7 9.57989 7 10.7 7H18.3C19.4201 7 19.9802 7 20.408 7.21799C20.7843 7.40973 21.0903 7.71569 21.282 8.09202C21.5 8.51984 21.5 9.07989 21.5 10.2V17.8C21.5 18.9201 21.5 19.4802 21.282 19.908C21.0903 20.2843 20.7843 20.5903 20.408 20.782C19.9802 21 19.4201 21 18.3 21H10.7C9.57989 21 9.01984 21 8.59202 20.782C8.21569 20.5903 7.90973 20.2843 7.71799 19.908C7.5 19.4802 7.5 18.9201 7.5 17.8V10.2Z"
      ></path>
    </svg>
  )
}
