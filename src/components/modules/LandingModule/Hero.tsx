import RandomLogoBottomLeft from 'public/assets/images/random-logo-bl.svg'
import RandomLogoBottomRight from 'public/assets/images/random-logo-br.svg'
import CurtainRight from 'public/assets/images/curtain-right.svg'
import CurtainLeft from 'public/assets/images/curtain-left.svg'
import RandomBSOnTop from 'public/assets/images/RandomBSOnTop.svg'
import Stars from 'public/assets/images/Stars.svg'
import GamePad from 'public/assets/images/gaming-pad-02.svg'
import Send from 'public/assets/images/Send.svg'
import { Button, Countdown } from '@elements'
import { useRouter } from 'next/router'
import { date } from './constant'

export default function Hero() {
  const router = useRouter()
  const dateNow = new Date().getTime()
  const startString = date.open ? date.open : ''
  const endString = date.close ? date.close : ''

  const start = date.open ? new Date(date.open).getTime() : dateNow
  const end = date.close ? new Date(date.close).getTime() : dateNow

  const selisihBuka = dateNow - start
  const selisihTutup = dateNow - end
  return (
    <div className="relative -mt-5 bg-background-light pb-20 md:py-28 lg:mt-0">
      <RandomLogoBottomLeft className="absolute left-0 bottom-10 hidden lg:inline-block" />
      <RandomLogoBottomRight className="absolute right-0 bottom-10 hidden lg:inline-block" />
      <CurtainRight className="absolute top-0 -right-40 hidden md:right-0 md:block" />
      <CurtainLeft className="absolute top-0 -left-40 hidden md:left-0 md:block" />
      <RandomBSOnTop className="invisible absolute top-5 left-5 md:visible md:top-10 md:left-20" />
      <br />
      <div className="grid w-full place-items-center">
        <Stars />
      </div>
      <h1 className="text-shadow-lg font-outline-4 mx-10 text-center font-retro text-display-small text-primary shadow-orange-dark md:text-display-medium lg:text-display-large">
        Main dan Menang!
      </h1>
      <p className="mx-5 text-center font-poppinsBold text-title-small text-orange-dark md:text-title-medium lg:text-title-large">
        Daftar dan temukan keseruan di PERAK League 2023!
      </p>
      <div className="grid w-full place-content-center">
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
        <div className="mt-5 grid w-full place-items-center">
          <Countdown
            title={
              selisihBuka < 0
                ? 'Pendaftaran Dibuka Dalam'
                : 'Pendaftaran Berakhir dalam'
            }
            titleClassName="text-[#383D75] font-poppinsBold"
            date={selisihBuka < 0 ? date.open : date.close}
            className="w-full font-bold text-[#383D75] md:w-[425px]"
          />
        </div>
      </div>
    </div>
  )
}