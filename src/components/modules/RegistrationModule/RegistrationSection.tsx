import Image from 'next/image'
import { RegistrationSectionProps } from './interface'

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  children,
}) => {
  return (
    <div className="w-full rounded-lg border-[7px] border-cream-light xl:w-1/2">
      <div className="relative h-full w-full rounded-md bg-orange-normal">
        <Image
          alt="game"
          src={'/assets/images/LeagueRegistration/Superstar.svg'}
          className="absolute -right-10 -top-10 hidden w-fit fill-inherit object-contain md:block"
          width={0}
          height={0}
        />
        {children}
      </div>
    </div>
  )
}
