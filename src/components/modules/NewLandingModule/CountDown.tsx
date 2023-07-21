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
      <div className="relative w-full bg-[#272B52] md:pb-10 xl:h-[1000px]">
        <Image
          alt="topper"
          src="./assets/images/NewLanding/allBg.svg"
          width={0}
          height={0}
          className="invisible absolute top-[-130px] w-full xl:visible"
        ></Image>

        <div className="flex flex-col items-center justify-center ">
          <p className="hidden px-5 font-poppinsBold text-display-small text-cream-light md:mb-5 md:mt-10 md:block md:text-display-medium">
            Jangan Sampai Ketinggalan!
          </p>
        </div>
        <div className="mx-5 flex h-auto items-center justify-center ">
          <Activitiescard
            date={activities[4][0]}
            imageUrl={activities[4][1]}
            title={activities[4][2]}
          />
        </div>
      </div>
    </>
  )
}
