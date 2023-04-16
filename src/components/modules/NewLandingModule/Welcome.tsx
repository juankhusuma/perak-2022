import MainLogo from 'public/assets/images/main-logo.svg'
import OndelMonas from 'public/assets/images/NewLanding/OndelMonas.svg'
import Toys from 'public/assets/images/NewLanding/Toys.svg'

export default function Welcome() {
  return (
    <>
      <div className="">
        <div className="h-16 w-full bg-cream-light md:h-20"></div>
        <div className=" relative flex h-screen w-full items-center justify-center bg-[url('/assets/images/NewLanding/Background.svg')] bg-cover bg-center bg-no-repeat">
          <OndelMonas className="invisible absolute left-0 bottom-0 lg:visible" />
          <Toys className="invisible absolute right-0 bottom-0 lg:visible" />

          <div className="grid grid-cols-1">
            <p className="text-shadow-lg font-outline-4 sm:[210px] mt-[260px] text-center  font-retro text-display-medium leading-[64px] text-primary drop-shadow-lg md:text-display-large lg:mt-[170px]">
              Pesta Rakyat Komputer
            </p>
            <p className="mt-[-8px] text-center font-poppinsBold text-headline-medium text-red-light">
              Adapting, Aware, Reviving, & Harmony
            </p>
            <div className="mx-auto my-2 w-64 bg-[#E9DEA6] text-center font-poppinsBold leading-8 text-red-dark drop-shadow-xl">
              DOEA RIBOE DOEA TIGA
            </div>
          </div>
          {/* semangat cus! */}
        </div>
      </div>
    </>
  )
}
