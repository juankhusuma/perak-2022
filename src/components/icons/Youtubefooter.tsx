import React from 'react'
import { IconProps } from './interface'

export const Youtubefooter: React.FC<IconProps> = ({
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
        d="M16.5808 14.2471L12.6678 16.4832V12.0111L16.5808 14.2471Z"
        fill="#E9DEA6"
        stroke="#E9DEA6"
        strokeWidth="1.67701"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.16473 15.0383V13.4562C3.16473 10.2192 3.16473 8.60066 4.17708 7.55928C5.18943 6.51789 6.78322 6.47281 9.97081 6.38265C11.4813 6.33993 13.0242 6.30933 14.3448 6.30933C15.6654 6.30933 17.2083 6.33993 18.7188 6.38265C21.9064 6.47281 23.5002 6.51789 24.5125 7.55928C25.5249 8.60066 25.5249 10.2192 25.5249 13.4562V15.0383C25.5249 18.2752 25.5249 19.8937 24.5125 20.9351C23.5002 21.9765 21.9064 22.0216 18.7189 22.1118C17.2084 22.1545 15.6654 22.1851 14.3448 22.1851C13.0242 22.1851 11.4812 22.1545 9.9707 22.1118C6.78317 22.0216 5.18941 21.9765 4.17707 20.9351C3.16473 19.8937 3.16473 18.2752 3.16473 15.0383Z"
        stroke="#E9DEA6"
        strokeWidth="2.23601"
      />
    </svg>
  )
}
