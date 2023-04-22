import { useRouter } from 'next/router'
import { LeagueLayout } from '../LeagueModule/LeagueLayout'
import { Bracket } from './Bracket'
import { Classement } from './Classement'
import { History } from './History'
import { Schedule } from './Schedule'
import { TAB_OPTIONS } from './constant'
import { Tabs } from '@elements'
import React, { useState } from 'react'

export const MatchModule: React.FC = () => {
  const [tab, setTab] = useState<number>(0)

  const router = useRouter()

  const { gameName } = router.query

  const renderTitle = (name: string) => {
    switch (name) {
      case 'dota2':
        return 'Dota 2'
      case 'ml':
        return 'Mobile Legends'
      case 'chess':
        return 'Chess'
      case 'apex':
        return 'Apex Legends'
      case 'fifa23':
        return 'Fifa 23'
      case 'futsal':
        return 'Futsal'
      case 'basket':
        return 'Basket 3x3'
      case 'valorant':
        return 'Valorant'
      case 'fg':
        return 'Family Games'
      default:
        return null
    }
  }

  const renderURL = (name: string) => {
    switch (name) {
      case 'dota2':
        return '/assets/images/dota2.svg'
      case 'ml':
        return '/assets/images/ml.svg'
      case 'chess':
        return '/assets/images/chess.svg'
      case 'apex':
        return '/assets/images/apex.svg'
      case 'fifa23':
        return '/assets/images/fifa23.svg'
      case 'futsal':
        return '/assets/images/futsal.svg'
      case 'basket':
        return '/assets/images/basket.svg'
      case 'valorant':
        return '/assets/images/valorant.svg'
      case 'fg':
        return '/assets/images/fg.svg'
      default:
        return null
    }
  }

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

  const contentSection = (tabNumber: number) => {
    switch (tabNumber) {
      case 0:
        return <Schedule gameName={gameName as string} />
      case 1:
        return <History gameName={gameName as string} />
    }
  }

  return (
    <>
      {gameName && (
        <LeagueLayout
          title={renderTitle(gameName as string) as string}
          description={renderDesc(gameName as string) as string}
          imageUrl={renderURL(gameName as string) as string}
          imageAlt={gameName as string}
          gameName={gameName as string}
        >
          <div className="flex flex-col gap-y-6">
            {/* Tab Section */}
            <div className="flex justify-center">
              <Tabs
                value={tab}
                setValue={setTab}
                variant={0}
                className="flex-wrap justify-center"
                items={TAB_OPTIONS}
              />
            </div>
            {/* Content Section */}
            {contentSection(tab)}
          </div>
        </LeagueLayout>
      )}
    </>
  )
}
