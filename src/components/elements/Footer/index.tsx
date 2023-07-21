import { Image } from '@elements'
import { Instagramfooter, Youtubefooter, Twitterfooter } from '@icons'
import React from 'react'

export const Footer: React.FC = () => {
  // TODO: Write element's logic

  return (
    <>
      <div className="mb-20 flex w-full select-none flex-col items-center justify-between bg-[#DC8F1A] py-5 md:flex-row md:px-20 md:py-10">
        <div className="flex flex-col items-center justify-center text-center md:flex-row md:text-left">
          <Image
            imageUrl="/logo.svg"
            alt="Logo"
            className="h-[100px] w-[100px]"
            fill
          />
          <div className="-space-y-4">
            <p className="font-retro text-display-small text-[#E9DEA6] md:text-display-medium">
              Perak 2023
            </p>
            <p className="text-md font-poppins text-[#F4EFD3] md:text-headline-small">
              #KembaliMenyambutHarmoni
            </p>
          </div>
        </div>
        <div className="mt-5 flex select-none flex-col items-center justify-center md:mt-0">
          <p className="font-poppins text-title-medium font-bold text-[#F4EFD3]">
            Ikuti Perak di
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/perakfasilkom"
              target="_blank"
              rel="noopener"
            >
              <div className="cursor-pointer">
                <Instagramfooter />
              </div>
            </a>
            <a
              href="https://www.youtube.com/@PestaRakyatKomputer"
              target="_blank"
              rel="noopener"
            >
              <div className="cursor-pointer">
                <Youtubefooter />
              </div>
            </a>
            <a
              href="https://twitter.com/perakfasilkom"
              target="_blank"
              rel="noopener"
            >
              <div className=" cursor-pointer">
                <Twitterfooter />
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
