import { Image } from '@elements'
import { FlowRegistration } from '@icons'
import StarLeft from 'public/assets/images/StarLeft.svg'
import StarRight from 'public/assets/images/StarRight.svg'

export default function About() {
  return (
    <div className="bg-background-normal py-20">
      <div className="relative mb-10 px-5">
        <StarLeft className="invisible absolute -top-5 left-10 sm:left-28 md:visible md:left-32" />
        <StarRight className="invisible absolute -top-3 right-10 md:visible md:right-32" />
        <h1 className="font-outline-4 -text-shadow-lg text-center font-retro text-display-small  text-orange-dark shadow-purple-darkest md:text-display-medium lg:text-display-large">
          Tentang Perak League
        </h1>
      </div>
      <div className="mx-auto w-full max-w-[80%]">
        <p className="text-justify font-poppins text-sm text-purple-darkest md:mx-16 md:text-base lg:mx-24">
          Di sini, kegembiraan tak terbatas menanti Anda! Inilah tempat di mana
          Anda dapat mengasah kemampuan game Anda di Competitive Games, mengejar
          puncak kejuaraan di Master League, dan bahkan mempererat kekeluargaan
          melalui Family Games! Jangan lewatkan kesempatan untuk menjadi bagian
          dari perayaan warga Fasilkom yang takkan terlupakan dan raihlah
          kemenangan dengan kerja tim yang solid. Segera daftar dan bergabunglah
          dengan Perak League 2023 sekarang juga!
        </p>
        <div className="-mx-[20%] mt-10 grid snap-x grid-flow-col items-center gap-5 overflow-auto px-[20%] xl:mx-auto xl:justify-center xl:overflow-hidden">
          <div className="min-w-[200px] snap-center rounded-xl border-2 border-[#E0CDF2] bg-orange-light p-2 text-center text-xs font-bold text-purple-darkest md:w-[250px] md:p-3 md:text-base lg:w-[300px] lg:p-5">
            Ukur kemampuanmu dalam bertanding
          </div>
          <div className="min-w-[200px] snap-center rounded-xl border-2 border-[#C7CC70] bg-orange-light p-2 text-center text-xs font-bold text-purple-darkest md:w-[250px] md:p-3 md:text-base lg:w-[300px] lg:p-5">
            Mengejar puncak kejuaraan bersama Master League!
          </div>
          <div className="min-w-[200px] snap-center rounded-xl border-2 border-[#FEB048] bg-orange-light p-2 text-center text-xs font-bold text-purple-darkest md:w-[250px] md:p-3 md:text-base lg:w-[300px] lg:p-5">
            Eratkan kekeluargaan melalui Family Games!
          </div>
        </div>
        <div className="-mx-[20%] mt-10 flex snap-x items-center gap-5 overflow-auto px-[20%] xl:mx-auto xl:justify-center xl:overflow-hidden">
          <Image
            className="min-h-[150px] min-w-[250px] snap-center rounded-xl border-[5px] border-orange-normal lg:min-h-[250px] lg:min-w-[350px]"
            alt=""
            imageUrl="/assets/png/PerakLeagueFoto1.png"
            fill
            rounded="rounded-lg"
          />
          <Image
            className="min-h-[150px] min-w-[250px] snap-center rounded-xl border-[5px] border-orange-normal lg:min-h-[250px] lg:min-w-[350px]"
            alt=""
            imageUrl="/assets/png/PerakLeagueFoto2.png"
            rounded="rounded-lg"
            fill
          />
          <Image
            className="min-h-[150px] min-w-[250px] snap-center rounded-xl border-[5px] border-orange-normal lg:min-h-[250px] lg:min-w-[350px]"
            alt=""
            imageUrl="/assets/png/PerakLeagueFoto3.png"
            rounded="rounded-lg"
            fill
          />
        </div>
        <div className="mt-10 overflow-x-auto rounded-[20px] border-[3px] border-background-light bg-orange-light px-5 py-6 xl:overflow-x-hidden">
          <div className="fixed -left-full -right-full mx-auto  xl:static">
            <h1 className="mx-auto max-w-[250px] text-center font-poppinsBold text-title-large text-purple-dark md:max-w-none lg:text-display-medium">
              Flow Registrasi Permainan
            </h1>
          </div>
          <div className="mx-auto mt-16 w-fit rounded-[20px] px-4 py-6 md:mt-14 xl:mt-8">
            <FlowRegistration />
          </div>
        </div>
      </div>
    </div>
  )
}
