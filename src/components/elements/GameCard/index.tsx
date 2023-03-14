import React from 'react'

import { GameCardProps } from './interface'
import Image from 'next/image'
import { Button, Tag } from '@elements'

export const GameCard: React.FC<GameCardProps> = ({
  name,
  league,
  count,
  className,
}) => {
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
      case 'Basket':
        return '/assets/images/gameCard/basket.jpeg'
      case 'Valorant':
        return '/assets/images/gameCard/valorant.jpg'
      case 'Family Games':
        return '/assets/images/gameCard/fg.png'
      default:
        return null
    }
  }
  return (
    <div
      className={`rounded-[20px] border-2 border-[#E9DEA6] bg-[rgb(56,61,117)] p-[10px] ${
        className ?? ''
      } w-80`}
    >
      <div className="overflow-hidden rounded-[12px] bg-[rgb(223,205,242)]">
        <div className="w-full overflow-hidden">
          <Image
            src={renderURL(name) as string}
            alt="Game"
            className="-mt-1 h-[216px] w-full rounded-[0px] object-cover"
            width="280"
            height="280"
            priority
          />
        </div>
        <div className="px-4 pt-2 pb-4">
          <p className="font-poppinsBold text-title-large font-extrabold text-primary">
            {name}
          </p>
          <div className="mt-1 flex flex-col gap-2">
            <Tag text={league} variant={3} />
            <Tag text={count} variant={3} />
            <Button variant={2} className="py-4">
              Daftar Sekarang
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
