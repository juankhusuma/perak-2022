import { Tag } from '@elements'
import Image from 'next/image'
import { GameProps } from './interface'
import react from 'react'
import Skeleton from '@mui/material/Skeleton'

export const GameSection: React.FC<GameProps> = ({ game }) => {
  const renderDesc = (slug: string) => {
    switch (slug) {
      case 'dota2':
        return 'Dota 2 adalah sebuah permainan arena pertarungan daring multipemain, dan merupakan sekuel dari Defense of the Ancients mod pada Warcraft 3: Reign of Chaos dan Warcraft 3: The Frozen Throne.'
      case 'ml':
        return 'Mobile Legends: Bang Bang adalah permainan video seluler ber-genre multiplayer online battle arena yang dikembangkan dan diterbitkan oleh Moonton, anak perusahaan dari ByteDance.'
      case 'apex':
        return 'Apex Legends adalah permainan battle royale free-to-play yang dikembangkan oleh Respawn Entertainment dan diterbitkan oleh Electronic Arts.'
      case 'chess':
        return 'Catur adalah permainan papan strategi dua orang yang dimainkan pada sebuah papan kotak-kotak yang terdiri dari 64 kotak, yang disusun dalam petak 8×8, yang terbagi sama rata dalam kelompok warna putih dan hitam.'
      case 'fifa23':
        return 'FIFA 23 adalah gim simulasi bertema sepak bola yang dirilis oleh Electronic Arts dan merupakan bagian dari seri FIFA. Gim ini adalah seri ke-30 di seri permainan tersebut.'
      case 'fg':
        return 'Family Games adalah serangkaian acara perlombaan games berbasis tim yang disusun dengan konsep olimpiade. Family Games menghadirkan permainan Online seperti Gartic.io, Family 100, dan Tebak. Family Games juga diadakan secara offline dengan menghadirkan permainan Balap Karung, Pose, Tebak, Lomba 17-an, dan Benteng Takeshi.'
      case 'futsal':
        return 'Futsal adalah permainan bola yang dimainkan oleh dua tim, yang masing-masing beranggotakan lima orang. Tujuannya adalah memasukkan bola ke gawang lawan, dengan memanipulasi bola dengan kaki. Selain lima pemain utama, setiap regu juga diizinkan memiliki pemain cadangan.'
      case 'basket':
        return 'Olahraga bola berkelompok yang terdiri atas dua tim beranggotakan masing-masing lima orang yang saling bertanding mencetak poin dengan memasukkan bola ke dalam keranjang lawan.'
      case 'valorant':
        return 'Valorant adalah permainan video POP taktis multipemain gratis yang dikembangkan dan diterbitkan oleh Riot Games, untuk Microsoft Windows.'
      default:
        return null
    }
  }
  return (
    <div className="flex flex-col gap-y-4 xl:w-1/2">
      {game ? (
        <Tag
          text={game?.gameTypeName?.toUpperCase() as string}
          variant={1}
          flex
        />
      ) : (
        <Skeleton
          variant={'rectangular'}
          animation="wave"
          className="h-[20px] w-full"
        />
      )}

      {game ? (
        <p className="font-retro text-5xl capitalize tracking-[-1.25px] text-purple-darkest drop-shadow-[-3px_-3px_0_#F36A22] md:text-6xl lg:text-7xl">
          {game?.name}
        </p>
      ) : (
        <Skeleton
          variant={'rectangular'}
          animation="wave"
          className="h-[80px] w-full"
        />
      )}
      {game ? (
        <p className="text-xs md:text-base xl:text-lg">
          {renderDesc(game?.slug as string)}
        </p>
      ) : (
        <Skeleton
          variant={'rectangular'}
          animation="wave"
          className="h-[90px] w-full"
        />
      )}
      <div className="relative hidden justify-center xl:flex">
        {game ? (
          <Image
            alt="game"
            src={`/assets/images/${game?.slug}.svg`}
            className="w-[80%] fill-inherit object-contain"
            width={0}
            height={0}
          />
        ) : (
          <Skeleton
            variant={'rectangular'}
            animation="wave"
            className="h-[400px] w-full"
          />
        )}
      </div>
    </div>
  )
}
