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
  console.log(title)

  const renderCountdown = (title: String) => {
    switch (title) {
      case 'Pesta Pemboeka':
        return (
          <Countdown
            date={'2023-04-13 16:00'}
            subTitleClassName="text-cream-light"
          />
        )
      case 'PMB':
        return (
          <Countdown
            date={'2023-05-04 00:00'}
            subTitleClassName="text-cream-light"
          />
        )
      case 'Karaoke Night':
        return (
          <Countdown
            date={'2023-05-12 00:00'}
            subTitleClassName="text-cream-light"
          />
        )
      case 'White Canvas':
        return (
          <Countdown
            date={'2023-05-07 00:00'}
            subTitleClassName="text-cream-light"
          />
        )
      case 'Pesta Rakyat':
        return (
          <Countdown
            date={'2023-10-16 00:00'}
            subTitleClassName="text-cream-light"
          />
        )
      default:
        return (
          <Countdown
            date={'2023-04-13 16:00'}
            subTitleClassName="text-cream-light"
          />
        )
    }
  }
  return (
    <>
      <div className="relative  flex h-auto w-auto flex-col items-center  justify-center gap-10 rounded-2xl  bg-purple-dark p-10 md:h-[400px] md:w-[800px] md:flex-row">
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
          <p className="font-retro text-display-medium text-orange-normal">
            {title}
          </p>
          <div className="w-full">{renderCountdown(title)}</div>
        </div>
      </div>
    </>
  )
}
