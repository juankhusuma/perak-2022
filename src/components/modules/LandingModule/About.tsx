import { Image } from '@elements'
import { FlowRegistration } from '@icons'
import StarLeft from 'public/assets/images/StarLeft.svg'
import StarRight from 'public/assets/images/StarRight.svg'

export default function About() {
  return (
    <div className="bg-background-normal py-20">
      <div className="relative mb-10">
        <StarLeft className="invisible absolute -top-5 left-10 sm:left-28 md:visible md:left-32" />
        <StarRight className="invisible absolute -top-3 right-10 md:visible md:right-32" />
        <h1 className="font-outline-2 -text-shadow-lg text-center font-retro text-display-small font-extrabold text-orange-dark shadow-purple-darkest md:text-display-medium lg:text-display-large">
          Tentang Perak League
        </h1>
      </div>
      <div className="grid w-full place-items-center px-5">
        <p className="mx-5 text-justify font-poppins text-sm text-purple-darkest md:mx-16 md:text-base lg:mx-24">
          Di sini, kegembiraan tak terbatas menanti Anda! Inilah tempat di mana
          Anda dapat mengasah kemampuan game Anda di Competitive Games, mengejar
          puncak kejuaraan di Master League, dan bahkan mempererat kekeluargaan
          melalui Family Games! Jangan lewatkan kesempatan untuk menjadi bagian
          dari perayaan warga Fasilkom yang takkan terlupakan dan raihlah
          kemenangan dengan kerja tim yang solid. Segera daftar dan bergabunglah
          dengan Perak League 2023 sekarang juga!
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="w-[200px] rounded-xl border-2 border-[#E0CDF2] bg-orange-light p-2 text-center text-xs font-bold text-purple-darkest md:w-[250px] md:p-3 md:text-base lg:w-[300px] lg:p-5">
            Ukur kemampuanmu dalam bertanding
          </div>
          <div className="w-[200px] rounded-xl border-2 border-[#C7CC70] bg-orange-light p-2 text-center text-xs font-bold text-purple-darkest md:w-[250px] md:p-3 md:text-base lg:w-[300px] lg:p-5">
            Mengejar puncak kejuaraan bersama Master League!
          </div>
          <div className="w-[200px] rounded-xl border-2 border-[#FEB048] bg-orange-light p-2 text-center text-xs font-bold text-purple-darkest md:w-[250px] md:p-3 md:text-base lg:w-[300px] lg:p-5">
            Eratkan kekeluargaan melalui Family Games!
          </div>
        </div>
        <div className="mx-5 mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <Image
            className="h-[210px] w-[300px] rounded-xl border-[5px]  border-orange-normal"
            alt=""
            imageUrl="/assets/png/PerakLeagueFoto1.png"
            fill
            rounded="rounded-lg"
          />
          <Image
            className="h-[210px] w-[300px] rounded-xl border-[5px]  border-orange-normal"
            alt=""
            imageUrl="/assets/png/PerakLeagueFoto2.png"
            rounded="rounded-lg"
            fill
          />
          <Image
            className="h-[210px] w-[300px] rounded-xl border-[5px]  border-orange-normal"
            alt=""
            imageUrl="/assets/png/PerakLeagueFoto3.png"
            rounded="rounded-lg"
            fill
          />
        </div>
        <div className="mt-5 w-full items-center justify-center overflow-auto md:flex">
          <FlowRegistration />
        </div>
      </div>
    </div>
  )
}
