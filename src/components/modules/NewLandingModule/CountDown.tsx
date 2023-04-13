import Image from 'next/image'
import { Activitiescard, Countdown } from '@elements'
import { useEffect, useState } from 'react'
import { activities, imageUrl } from './constant'

export default function CountDown() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const intervalid = setInterval(() => {
      setCurrentIndex(
        currentIndex == imageUrl.length - 1 ? 0 : currentIndex + 1
      )
    }, 5000)
    return () => clearInterval(intervalid)
  }, [currentIndex])
  return (
    <>
      <div className="relative h-[1200px] w-full  bg-[#272B52] md:h-[1000px] ">
        <Image
          alt="topper"
          src="./assets/images/NewLanding/allBg.svg"
          width={0}
          height={0}
          className="invisible absolute top-[-130px] w-full xl:visible"
        ></Image>

        <div className="flex flex-col items-center justify-center ">
          <p className="mt-16 px-5 font-poppinsBold text-display-small text-cream-light md:mt-32 md:text-display-medium">
            Jangan Sampai Ketinggalan!
          </p>
          <p className="mx-5 mt-5 font-poppinsBold text-title-small text-cream-light md:mt-0 md:text-headline-medium ">
            Ikuti berbagai macam acara menarik di Perak 2023!
          </p>
        </div>
        <div className="mb-5 flex justify-center overflow-x-auto">
          <div className="my-12 flex w-fit items-center justify-center  pl-[800px] pr-10 md:pr-5 md:pl-[330px] lg:pl-[80px] xl:pl-0 xl:pr-0">
            <div className="z-10 flex items-center">
              <div
                className={` flex h-[128px] w-[150px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-orange-dark hover:bg-orange-dark ${
                  currentIndex === 0 ? 'bg-orange-dark' : 'bg-[#95544C]'
                }  `}
                onClick={() => setCurrentIndex(0)}
              >
                <div className="font-poppinsBold text-[20px] text-white">
                  Pesta
                </div>
                <div className="font-poppinsBold text-[20px] text-white">
                  Pemboeka
                </div>
                <div className="text-title-[22px] font-poppins text-white">
                  13 April
                </div>
              </div>
              <div className="h-[2px] w-[54px] bg-white "></div>
              <div
                className={` flex h-[128px] w-[210px] cursor-pointer  flex-col items-center justify-center rounded-2xl border-2 border-orange-dark  hover:bg-orange-dark ${
                  currentIndex == 1 ? 'bg-orange-dark' : 'bg-[#95544C]'
                }`}
                onClick={() => setCurrentIndex(1)}
              >
                <div className="font-poppinsBold text-[20px] text-white">
                  Main Event Perak
                </div>
                <div className="font-poppinsBold text-[20px] text-white">
                  Mencari Bakat
                </div>
                <div className="text-title-[22px] font-poppins text-white">
                  4 Mei
                </div>
              </div>
              <div className="h-[2px] w-[54px] bg-white "></div>

              <div
                className={` flex h-[128px] w-[130px] cursor-pointer  flex-col items-center justify-center rounded-2xl border-2 border-orange-dark  hover:bg-orange-dark ${
                  currentIndex == 2 ? 'bg-orange-dark' : 'bg-[#95544C]'
                }`}
                onClick={() => setCurrentIndex(2)}
              >
                <div className="font-poppinsBold text-[20px] text-white">
                  Karaoke
                </div>
                <div className="font-poppinsBold text-[20px] text-white">
                  Night
                </div>
                <div className="text-title-[22px] font-poppins text-white">
                  12 Mei
                </div>
              </div>
              <div className="h-[2px] w-[54px] bg-white "></div>
              <div
                className={` flex h-[128px] w-[122px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-orange-dark   hover:bg-orange-dark ${
                  currentIndex === 3 ? 'bg-orange-dark' : 'bg-[#95544C]'
                }`}
                onClick={() => setCurrentIndex(3)}
              >
                <div className="font-poppinsBold text-[20px] text-white">
                  White
                </div>
                <div className="font-poppinsBold text-[20px] text-white">
                  Canvas
                </div>
                <div className="text-title-[22px] font-poppins text-white">
                  7 - 20 Mei
                </div>
              </div>
              <div className="h-[2px] w-[54px] bg-white "></div>
              <div
                className={` flex h-[128px] w-[190px] cursor-pointer  flex-col items-center justify-center rounded-2xl border-2 border-orange-dark  hover:bg-orange-dark ${
                  currentIndex === 4 ? 'bg-orange-dark' : 'bg-[#95544C]'
                }`}
                onClick={() => setCurrentIndex(4)}
              >
                <div className="font-poppinsBold text-[20px] text-white">
                  Pesta Rakyat
                </div>
                <div className="font-poppinsBold text-[20px] text-white">
                  x Pasar Malam
                </div>
                <div className="text-title-[22px] font-poppins text-white">
                  16 Sep
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-5 flex h-auto items-center justify-center ">
          <Activitiescard
            date={activities[currentIndex][0]}
            imageUrl={activities[currentIndex][1]}
            title={activities[currentIndex][2]}
          />
        </div>
      </div>
    </>
  )
}
