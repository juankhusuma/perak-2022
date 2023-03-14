import React from 'react'
import Image from 'next/image'
import { OptimizedImageProps } from './interface'

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  imageUrl,
  alt,
  className,
  fill,
  isRounded,
  rounded,
}) => {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={imageUrl}
        alt={alt}
        fill={fill}
        className={`${isRounded ? 'rounded-full' : rounded}`}
        priority
      />
    </div>
  )
}

export default OptimizedImage
