import RandomLogoBottomLeft from 'public/assets/images/random-logo-bl.svg'
import RandomLogoBottomRight from 'public/assets/images/random-logo-br.svg'
import CurtainRight from 'public/assets/images/curtain-right.svg'
import CurtainLeft from 'public/assets/images/curtain-left.svg'
import RandomBSOnTop from 'public/assets/images/RandomBSOnTop.svg'
import Stars from 'public/assets/images/Stars.svg'
import GamePad from 'public/assets/images/gaming-pad-02.svg'
import GameController from '@images/GameControllerSmall.svg'
import Send from 'public/assets/images/Send.svg'
import { Button, Countdown } from '@elements'
import { useRouter } from 'next/router'
import { date } from './constant'
import { useWindowSize } from '@hooks'

export default function Hero() {
  const router = useRouter()
  const { height } = useWindowSize()

  const closeML = '2023-04-12 23:59'
  const closeCG = '2023-04-09 23:59'

  const dateNow = new Date().getTime()

  const start = date.open ? new Date(date.open).getTime() : dateNow

  const selisihBuka = dateNow - start

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-background-light py-20 md:py-28">
      <RandomLogoBottomLeft className="absolute bottom-10 left-0 z-0 hidden lg:inline-block" />
      <RandomLogoBottomRight className="absolute bottom-10 right-0 z-0 hidden lg:inline-block" />
      {height > 768 && (
        <div>
          <CurtainLeft className="absolute top-[5%] z-0 animate-slide-in md:hidden" />
          <RandomLogoBottomRight className="absolute -bottom-[10%] -right-[20%] z-0 animate-slide-up md:hidden" />
        </div>
      )}
      <CurtainRight className="absolute -right-40 top-0 hidden md:right-0 md:block" />
      <CurtainLeft className="absolute -left-40 top-0 hidden md:left-0 md:block" />
      <RandomBSOnTop className="invisible absolute left-5 top-5 animate-slide-in md:visible md:left-20 md:top-24" />
      <GameController className="invisible absolute right-5 top-0 animate-slide-in md:right-14 md:top-12 lg:visible" />
      <div className="grid w-full place-items-center">
        <Stars />
      </div>
      <div className="z-10">
        <h1 className="text-shadow-lg font-outline-4 mx-10 text-center font-retro text-display-small text-primary shadow-orange-dark md:text-display-medium lg:text-display-large">
          Main dan Menang!
        </h1>
        <p className="mx-5 text-center font-poppinsBold text-title-small text-orange-dark md:text-title-medium lg:text-title-large">
          Daftar dan temukan keseruan di PERAK League 2023!
        </p>
      </div>
      <div className="z-10 grid w-full place-content-center">
        <div className="mt-5 grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 md:justify-items-start">
          <Button
            className="z-10 w-72 cursor-pointer px-5 py-3 md:w-60"
            variant={1}
            onClick={() => {
              router.push('/dashboard')
            }}
            rightIcon={<GamePad />}
          >
            Lihat Permainan Saya
          </Button>
          <Button
            className="z-10 w-72 cursor-pointer px-5 py-3 md:w-60"
            variant={2}
            onClick={() => {
              const offset = document.getElementById('game-section')?.offsetTop
              window.scrollTo({
                top: offset === undefined ? 0 : offset,
                behavior: 'smooth',
              })
            }}
            rightIcon={<Send />}
          >
            Lihat Permainan
          </Button>
        </div>
        <div className="z-10 mt-10 grid w-full place-items-center px-5 md:px-0">
          <Countdown
            title={
              selisihBuka < 0
                ? 'Pendaftaran Dibuka Dalam'
                : 'Pendaftaran MASTER LEAGUE Berakhir dalam'
            }
            titleClassName="text-[#383D75] font-poppinsBold"
            date={selisihBuka < 0 ? date.open : closeML}
            className="w-full font-bold text-[#383D75] md:w-[425px]"
          />
        </div>
        <div className="z-10 mt-5 grid w-full place-items-center px-5 md:px-0">
          <Countdown
            title={
              selisihBuka < 0
                ? 'Pendaftaran Dibuka Dalam'
                : 'Pendaftaran COMPETITIVE GAME & FAMILY GAME Berakhir dalam'
            }
            titleClassName="text-[#383D75] font-poppinsBold"
            date={selisihBuka < 0 ? date.open : closeCG}
            className="w-full font-bold text-[#383D75] md:w-[425px]"
          />
        </div>
      </div>
    </div>
  )
}
