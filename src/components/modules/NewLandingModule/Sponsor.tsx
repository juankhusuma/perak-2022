import { Image } from '@elements'
import { useWindowSize } from '@hooks'
import { FlowRegistration } from '@icons'
import StarLeft from 'public/assets/images/StarLeft.svg'
import StarRight from 'public/assets/images/StarRight.svg'
import Marquee from 'react-fast-marquee'

export default function Sponsor() {
  const { width } = useWindowSize()
  return (
    <>
      <div className="h-auto w-full bg-purple-dark py-10">
        <div className="flex h-full flex-col items-center justify-center gap-y-10">
          <p className="font-poppinsBold text-headline-large text-white">
            Sponsor Shoutout
          </p>
          <Marquee
            speed={50}
            gradient={width >= 768}
            gradientColor={[56, 61, 117]}
          >
            <div className="mx-[30px] flex items-center justify-between gap-[55px]">
              <Image
                className="min-h-[150px] min-w-[150px] snap-center lg:min-h-[250px] lg:min-w-[250px]"
                alt=""
                imageUrl="/assets/images/NewLanding/doraemon.png"
                fill
                isRounded
              />
              <Image
                className="min-h-[150px] min-w-[150px] snap-center lg:min-h-[250px] lg:min-w-[250px]"
                alt=""
                imageUrl="/assets/images/NewLanding/doraemon.png"
                isRounded
                fill
              />
              <Image
                className="min-h-[150px] min-w-[150px] snap-center lg:min-h-[250px] lg:min-w-[250px]"
                alt=""
                imageUrl="/assets/images/NewLanding/doraemon.png"
                isRounded
                fill
              />
              <Image
                className="min-h-[150px] min-w-[150px] snap-center lg:min-h-[250px] lg:min-w-[250px]"
                alt=""
                imageUrl="/assets/images/NewLanding/doraemon.png"
                isRounded
                fill
              />
              <Image
                className="min-h-[150px] min-w-[150px] snap-center    lg:min-h-[250px] lg:min-w-[250px]"
                alt=""
                imageUrl="/assets/images/NewLanding/doraemon.png"
                isRounded
                fill
              />
            </div>
          </Marquee>
        </div>
      </div>
    </>
  )
}
