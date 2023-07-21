import React from 'react'
import { Button, TicketDesign } from '@elements'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function WhatsOn() {
  const router = useRouter()
  return (
    <>
      <div
        className="relative flex h-[500px] w-full flex-col items-center justify-start gap-6 bg-background-light 
        bg-cover bg-center 
        bg-no-repeat md:h-[612px] md:bg-[url('/assets/images/NewLanding/whatsOnBg.svg')]"
      >
        <div className="flex-col items-center justify-start">
          <h1 className="mt-2 text-center font-poppinsBold text-headline-small text-red-light md:text-display-medium lg:mt-10">
            Ada Apa di Perak?
          </h1>
          <p className="w-[300px] text-center font-poppinsBold text-body-medium text-red-light md:w-[784px] md:text-title-large">
            Temukan semua keseruan di PERAK!
          </p>
        </div>

        <div className="flex flex-col gap-16 lg:flex-row lg:gap-8 ">
          <div className="group h-[148px] w-[312px] items-center justify-center [perspective:1000px] lg:h-[330px] lg:w-[592px]">
            <div
              className="flex flex-row items-start justify-center transition-all duration-500 
            [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
            >
              <div
                className="absolute inset-0 mt-[28px] h-[160px] w-[310px] bg-[url('/assets/images/NewLanding/ScanMeSmallAsset.svg')] bg-cover 
                bg-center bg-no-repeat lg:mt-[60px] lg:h-[302px] lg:w-[587px] lg:bg-[url('/assets/images/NewLanding/ScanMeAsset.svg')]"
              ></div>
              <div
                className="absolute inset-0 mt-[28px] h-[160px] w-[310px] bg-[url('/assets/images/NewLanding/greenCardSmallBg.svg')] bg-cover bg-center bg-no-repeat 
                [backface-visibility:hidden] [transform:rotateY(180deg)] lg:mt-[60px] lg:h-[302px] lg:w-[587px] lg:bg-[url('/assets/images/NewLanding/greenCardBg.svg')]"
              >
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 lg:gap-3">
                  <div className="flex w-[280px] flex-wrap items-center justify-center text-center font-poppins text-body-small text-background-light lg:w-[392px] lg:text-title-large">
                    Permainan interaktif menggunakan beberapa barcode berisi
                    tantangan berhadiah yang disebar di lingkungan Fasilkom
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="w-fit rounded-md px-4 py-2 text-[8px] lg:rounded-lg lg:px-5 lg:py-3 lg:text-label-medium"
                      variant={1}
                      onClick={() => {
                        router.push('/scan-me')
                      }}
                    >
                      PLAY NOW
                    </Button>
                    <Button
                      className="w-fit rounded-md px-4 py-2 text-[8px] lg:rounded-lg lg:px-5 lg:py-3 lg:text-label-medium"
                      variant={2}
                      onClick={() => {
                        router.push('/scan-me/how-to-play')
                      }}
                    >
                      Cara Bermain
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-center">
              <TicketDesign name="Scan Me" />
            </div>
          </div>

          <div className="group h-[148px] w-[312px] items-center justify-center [perspective:1000px] lg:h-[330px] lg:w-[592px]">
            <div
              className="flex flex-row items-start justify-center transition-all duration-500 
            [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
            >
              <div
                className="absolute inset-0 mt-[28px] h-[160px] w-[310px] bg-[url('/assets/images/NewLanding/TimezoneSmallAsset.svg')] bg-cover bg-center bg-no-repeat 
                lg:mt-[60px] lg:h-[302px] lg:w-[587px] lg:bg-[url('/assets/images/NewLanding/TimezoneAsset.svg')]"
              ></div>
              <div
                className="absolute inset-0 mt-[28px] h-[160px] w-[310px] bg-[url('/assets/images/NewLanding/greenCardSmallBg.svg')] bg-cover bg-center bg-no-repeat 
                [backface-visibility:hidden] [transform:rotateY(180deg)] lg:mt-[60px] lg:h-[302px] lg:w-[587px] lg:bg-[url('/assets/images/NewLanding/greenCardBg.svg')]"
              >
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 lg:gap-3">
                  <div className="flex w-[280px] flex-wrap items-center justify-center text-center font-poppins text-body-small text-background-light lg:w-[392px] lg:text-title-large">
                    Permainan online berupa Tetris dan Snake. Lima orang dengan
                    poin tertinggi pada setiap game-nya akan mendapatkan hadiah.
                  </div>
                  <Link href={`/timezone/tetris`} className="w-fit">
                    <Button
                      className="w-fit rounded-md px-4 py-2 text-[8px] lg:rounded-lg lg:px-5 lg:py-3 lg:text-label-medium"
                      variant={1}
                    >
                      PLAY NOW
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-center">
              <TicketDesign name="Timezone" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
