import { IMAGE_DECORATION } from './constant'
import { GameSection } from './GameSection'
import { RegistrationSection } from './RegistrationSection'
import { LeagueRegistrationLayoutProps } from './interface'
import Image from 'next/image'

export const LeagueRegistrationLayout: React.FC<
  LeagueRegistrationLayoutProps
> = ({ game, children }) => {
  return (
    <div className="relative flex min-h-screen justify-center bg-cream-light pt-24 pb-16 font-poppins lg:pt-40">
      {IMAGE_DECORATION.map(({ alt, imageUrl, className }, key) => (
        <div key={key}>
          <Image
            alt={alt}
            src={imageUrl}
            className={`fill-inherit object-fill ${className}`}
            width={0}
            height={0}
          />
        </div>
      ))}
      <div className="relative z-40 mx-2 flex h-full w-full max-w-[120rem] flex-col gap-8 rounded-3xl bg-cream-normal p-5 md:mx-16 md:w-[80%] md:p-8 xl:flex-row">
        <GameSection game={game} />
        <RegistrationSection>{children}</RegistrationSection>
      </div>
    </div>
  )
}
