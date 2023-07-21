import React from 'react'
import Image from 'next/image'
import { Countdown } from '@elements'
import { useEffect, useState } from 'react'
import { ActivitiesProp } from './interface'

export const Activitiescard: React.FC<ActivitiesProp> = ({
  date,
  imageUrl,
  title,
}) => {
  return (
    <>
      <div className="relative  flex h-auto w-auto flex-col items-center  justify-center gap-10 rounded-2xl bg-purple-dark p-10 md:w-[800px] md:flex-row">
        <Image
          alt="bgDecoration"
          src={imageUrl}
          width={10}
          height={0}
          className=" w-fit "
        ></Image>
        <div className="flex w-[380px] flex-col items-center justify-center">
          <p className="font-poppinsBold text-title-large text-cream-light">
            Count Down To
          </p>
          <p className="px-10 text-center font-retro text-display-medium text-orange-normal">
            Pesta Rakyat
          </p>
          <p className="px-10 text-center font-retro text-display-medium text-orange-normal">
            X
          </p>
          <p className="px-10 text-center font-retro text-display-medium text-orange-normal">
            Pasar Malam
          </p>
          <div className="w-full px-10">
            <Countdown
              date={'2023-10-16 18:30'}
              subTitleClassName="text-cream-light"
            />
          </div>
        </div>
      </div>
    </>
  )
}
