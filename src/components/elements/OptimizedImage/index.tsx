import React from 'react'
import Image from 'next/image'
import { OptimizedImageProps } from './interface'

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  imageUrl,
  alt,
  className,
  fill,
  isRounded,
}) => {
  if (isRounded) {
    isRounded = typeof isRounded === 'boolean' ? 'rounded-full' : isRounded
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={imageUrl}
        alt={alt}
        fill={fill}
        className={isRounded as string}
        priority
      />
    </div>
  )
}

export default OptimizedImage
