import React, { useState } from 'react'

import { Button, Tag } from '@elements'
import Image from 'next/image'
import Link from 'next/link'
import { GameCardProps } from './interface'

export const GameCard: React.FC<GameCardProps> = ({
  name,
  league,
  count,
  slug,
  className,
}) => {
  const [isHover, setIsHover] = useState(false)
  const renderURL = (name: string) => {
    switch (name) {
      case 'Dota 2':
        return '/assets/images/gameCard/dota2.jpg'
      case 'Mobile Legends':
        return '/assets/images/gameCard/mlbb.png'
      case 'Chess':
        return '/assets/images/gameCard/ChessSet.jpg'
      case 'Apex Legends':
        return '/assets/images/gameCard/apex.jpg'
      case 'Fifa 23':
        return '/assets/images/gameCard/fifa23.jpg'
      case 'Futsal':
        return '/assets/images/gameCard/futsal.jpg'
      case 'Basket 3x3':
        return '/assets/images/gameCard/basket.jpeg'
      case 'Valorant':
        return '/assets/images/gameCard/valorant.jpg'
      case 'Family Games':
        return '/assets/images/gameCard/fg.png'
      default:
        return null
    }
  }
  const closeCG = new Date('2023-04-09 23:59').getTime()

  const closeML = new Date('2023-04-12 23:59').getTime()

  const date = new Date().getTime()

  const selisihTutupCG = date - closeCG

  const selisihTutupML = date - closeML

  return (
    <div
      className={`rounded-[20px] border-2 border-background-normal bg-purple-dark p-[10px] ${
        className ?? ''
      } w-80`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="relative min-h-[325px] overflow-hidden rounded-[12px] bg-black">
        <div className="overflow-hidden">
          <Image
            src={renderURL(name) as string}
            alt="Game"
            className={`-mt-1 rounded-[0px] bg-center object-cover transition-all duration-200 ease-in-out ${
              isHover ? 'scale-125 opacity-75' : 'scale-100'
            }`}
            fill
            priority
            placeholder="blur"
            blurDataURL="/assets/images/ImagePlaceholder.svg"
          />
        </div>
        <div
          className={`absolute w-full bg-purple-lightest px-4 pb-4 pt-2 transition-all duration-200 ease-in-out ${
            isHover ? 'bottom-0' : '-bottom-[20%]'
          }`}
        >
          <p className="font-poppinsBold text-title-large font-extrabold text-primary">
            {name}
          </p>
          <div className="mt-1 flex flex-col gap-2">
            <div className="flex gap-[10px]">
              <Tag text={league} variant={3} className="truncate" />
              <Tag text={count} variant={3} className="truncate" />
            </div>
            <Link href={`/registration/${slug}`} className="w-full">
              <Button
                variant={2}
                className="w-full py-4"
                disabled={selisihTutupML > 0}
              >
                Daftar Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
