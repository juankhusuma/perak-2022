import { EmoticonSmile } from '@icons'
import React from 'react'
import OptimizedImage from '../OptimizedImage'
import { PhotoBoxProps } from './interface'

export const PhotoBox: React.FC<PhotoBoxProps> = ({ imageUrl }) => {
  // TODO: Write element's logic

  return (
    <>
      <div className="flex h-[160px] w-[160px] items-center justify-center rounded-lg bg-orange-light shadow-lg">
        {imageUrl ? (
          <OptimizedImage
            imageUrl={imageUrl}
            alt="Profile Photo"
            className="h-[160px] w-[160px] rounded-lg"
            rounded="rounded-lg"
            fill
          />
        ) : (
          <EmoticonSmile />
        )}
      </div>
    </>
  )
}
