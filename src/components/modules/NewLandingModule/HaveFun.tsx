import { Button } from '@elements'
import { useWindowSize } from '@hooks'
import Image from 'next/image'
export default function HaveFun() {
  const { width } = useWindowSize()
  return (
    <>
      <div className="flex w-full items-end justify-center bg-orange-dark pb-5 pt-5 md:h-60 xl:justify-between">
        <Image
          alt="running"
          src="./assets/images/NewLanding/running.svg"
          width={0}
          height={0}
          className="ml-0 hidden w-52 xl:ml-20 xl:block"
        ></Image>
        <div className="flex h-full flex-col items-center justify-center ">
          <p className="hidden font-retro text-display-small text-cream-light sm:block md:text-display-large">
            Lets Have Fun Together!
          </p>
          <p className="block pt-5 font-retro text-display-small text-cream-light sm:hidden md:text-display-large">
            Have Fun Together!
          </p>
          <p className="text-center font-poppins text-title-medium text-cream-light md:text-title-large">
            Temukan semua keseruan di PERAK!
          </p>
          <div className="p-2"></div>
        </div>
        <Image
          alt="booth"
          src="./assets/images/NewLanding/TicketBooth.svg"
          width={0}
          height={0}
          className="mr-0 hidden w-40 xl:mr-20 xl:block"
        ></Image>
      </div>
    </>
  )
}
