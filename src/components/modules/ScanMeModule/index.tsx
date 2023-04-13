import { Button } from '@elements'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ChallengeCard from 'src/components/elements/ScanMe/ChallengeCard'
import withSession from 'src/components/hoc/withSession'
import { api } from 'src/utils/api'

const ScanMeModule = () => {
  const { data: challenges } = api.scanMe.getChallenges.useQuery()

  const { data: session } = useSession()
  const userData = api.userData.get.useQuery({
    id: session?.user?.id as string,
  })

  const router = useRouter()

  return (
    <main className="min-h-screen bg-background-light p-4 pt-24 md:p-20">
      <section className="relative flex h-[calc(100vh-81px)] flex-col items-center justify-center gap-5">
        <div className="relative">
          <Image
            src="/assets/images/scanStars.svg"
            alt=""
            width={520}
            height={153.75}
            className="absolute bottom-0 left-1/2 aspect-[520/153] w-full min-w-[300px] max-w-[520px] -translate-x-1/2 sm:min-w-[520px]"
          />
          <h1 className="font-outline-2 text-shadow-lg text-center font-retro text-display-medium shadow-orange-dark sm:text-display-large  sm:text-7xl">
            Scan Me
          </h1>
        </div>
        <p className="-mt-4 max-w-[40ch] text-center font-poppinsBold text-sm font-semibold text-orange-dark sm:text-base">
          Scan barcode dengan aplikasi kamera kamu untuk mendapatkan tantangan
          baru!
        </p>
        <Button
          onClick={() => void router.push('/scan-me/leaderboard')}
          className="w-[250px] px-8 py-4"
          variant={1}
        >
          Cek Leaderboard Scan Me
        </Button>
        <Button
          onClick={() => void router.push('/scan-me/how-to-play')}
          className="w-[250px] px-8 py-4"
          variant={2}
        >
          Cara Bermain
        </Button>
        <div className="mx-auto mt-3 space-y-2 text-center">
          <div className="hidden font-poppinsBold text-title-medium uppercase sm:static">
            Informasi Saya
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="bg-primary px-5 py-4 text-center text-orange-normal">
              <div className="font-poppinsBold text-title-small md:text-title-medium">
                Total Poin
              </div>
              <div className="font-retro text-display-small md:text-display-medium">
                {challenges && userData && userData.data?.scanMeScore
                  ? userData.data?.scanMeScore
                  : 0}
              </div>
            </div>
            <div className="bg-orange-normal px-5 py-4 text-center text-primary">
              <div className="font-poppinsBold text-title-small md:text-title-medium">
                Total Tantangan
              </div>
              <div className="font-retro text-display-small md:text-display-medium">
                {challenges?.length ?? 0}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ul className="mt-20 columns-1 gap-8 space-y-5 md:mt-0 lg:columns-2 lg:gap-16">
        {challenges?.map((challenge, index) => (
          <ChallengeCard
            key={challenge.id}
            {...challenge}
            index={challenges.length - index}
          />
        ))}
      </ul>
    </main>
  )
}

export default withSession(ScanMeModule)
