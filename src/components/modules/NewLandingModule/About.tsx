import React, { useEffect, useRef, useState } from 'react'
import ControllerPic from '@images/NewLanding/controllerPic.svg'
import BlueSmiley from '@images/NewLanding/blueSmiley.svg'
import RedSmiley from '@images/NewLanding/redSmiley.svg'

export default function About() {
  const useIsInViewport = (ref: any) => {
    const [isIntersecting, setIntersecting] = useState(false)

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      )
      observer.observe(ref.current)
      return () => {
        observer.disconnect()
      }
    }, [ref])

    return isIntersecting
  }
  const aboutRef = useRef(null)
  const isAboutInViewport = useIsInViewport(aboutRef)

  return (
    <>
      <div
        className="relative flex h-[500px] w-full flex-col items-center justify-start gap-6 bg-[url('/assets/images/NewLanding/aboutBgMobile.svg')] 
        bg-cover bg-center 
        bg-no-repeat md:h-[836px] md:bg-[url('/assets/images/NewLanding/aboutBg.svg')]"
        ref={aboutRef}
      >
        <ControllerPic
          className={`absolute bottom-auto right-[20%] top-[1%] z-0 hidden transform opacity-100 transition-all duration-1000 ease-in-out lg:block ${
            isAboutInViewport ? '' : 'translate-y-full'
          }`}
        />
        <BlueSmiley className="absolute right-[-5%] top-[30%] hidden animate-[spin_20s_ease-in-out_infinite] lg:block" />
        <RedSmiley className="absolute left-[-5%] top-[40%] hidden animate-[spin_20s_ease-in-out_infinite] lg:block" />
        <h1 className="mt-20 font-retro text-display-small text-primary md:mt-40 md:text-display-large">
          Tentang Perak
        </h1>
        <p className="w-[300px] text-center font-poppins text-body-medium text-primary md:w-[784px] md:text-body-large">
          Pesta Rakyat Komputer adalah acara internal terbesar di Fasilkom UI
          yang bertujuan untuk mempererat hubungan sesama elemen Fasilkom UI.
        </p>
        <div className="rounded-lg p-2 outline outline-4 outline-orange-normal md:rounded-xl md:p-4">
          <div className="rounded-md outline outline-[12px] outline-orange-normal/50 md:outline-[20px]">
            <iframe
              src="https://www.youtube.com/embed/H_9GC5-4O30"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-[162px] w-[292px] rounded-md md:h-[416px] md:w-[752px]"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  )
}
