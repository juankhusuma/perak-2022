import React, { useState } from 'react'

import { Button, Tag } from '@elements'
import Image from 'next/image'
import Link from 'next/link'
import { LeaderboardCardProps } from './interface'

export const LeaderboardCard: React.FC<LeaderboardCardProps> = ({
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
        return ''
    }
  }
  return (
    <div
      className={`rounded-[20px] bg-blue-dark p-[10px] ${className ?? ''} w-80`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="relative min-h-[260px] overflow-hidden rounded-[12px] bg-black">
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
          className={`absolute w-full bg-blue-normal px-4 pb-4 pt-2 transition-all duration-200 ease-in-out ${
            isHover ? 'bottom-0' : '-bottom-[26%]'
          } ${className ?? ''}`}
        >
          <p className="font-poppinsBold text-title-large font-extrabold text-background-light">
            {name}
          </p>
          <div className="mt-1 flex flex-col gap-2">
            <div className="flex gap-[10px]">
              <Tag text={league} variant={3} className="truncate" />
              <Tag text={count} variant={3} className="truncate" />
            </div>
            <Link href={`/game/${slug}`} className="w-full">
              <Button variant={1} className="w-full py-4">
                Lihat Detail
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
