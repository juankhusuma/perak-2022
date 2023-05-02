import { Button, Modal } from '@elements'
import { PlayButton } from '@icons'
import { decrypt } from 'crypto-js/aes'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { api } from 'src/utils/api'
import { GameInstruction } from './GameInstruction'
import Leaderboard from './Leaderboard'
import { NextSeo } from 'next-seo'

export const SnakeGame: React.FC = () => {
  const router = useRouter()
  const snakeIFrame = useRef<HTMLIFrameElement>(null)
  const mutateSnakeScore = api.game.addSnakeScore.useMutation()
  const snakeScoreQuery = api.game.getSnakeScore.useQuery(undefined, {
    onSuccess(data) {},
    refetchOnWindowFocus: false,
  })
  const { data: snakeScoreData } = snakeScoreQuery
  const userSnakeScoreQuery = api.game.getUserSnakeScore.useQuery(undefined, {
    onSuccess(data) {},
    refetchOnWindowFocus: false,
  })
  const { data: userSnakeScoreData } = userSnakeScoreQuery
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleStartGame = () => {
    setIsModalOpen(false)
    snakeIFrame.current?.focus()
    snakeIFrame.current?.contentWindow?.postMessage('start_game', {
      targetOrigin: process.env.NEXT_PUBLIC_SNAKE_URL,
    })
  }

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data === 'request_token') {
        snakeIFrame.current?.contentWindow?.postMessage(
          `nudes ${process.env.NEXT_PUBLIC_SECRET}`,
          { targetOrigin: process.env.NEXT_PUBLIC_SNAKE_URL }
        )
      }
      if (event.data.toString().slice(0, 5) === 'score') {
        const secured_score = event.data.split(' ')[1]
        mutateSnakeScore.mutate(secured_score, {
          onSuccess: () => {
            snakeScoreQuery.refetch()
            userSnakeScoreQuery.refetch()
            setIsModalOpen(true)
          },
        })
      }
    }

    window.addEventListener('message', handler)

    // Don't forget to remove addEventListener
    return () => window.removeEventListener('message', handler)
  }, [])

  const gameInstructions = (
    <>
      Untuk menggerakkan ular tekan tombol arrow pada keyboard. Namun, ingatlah
      bahwa ular akan terus bergerak maju secara otomatis, jadi pastikan Anda
      memberi instruksi yang tepat dan tidak terlalu berlebihan saat
      menggerakkan ular. Anda harus mengendalikan ular kecil untuk memakan
      makanan dan tumbuh lebih besar. Namun, cobalah untuk mengendalikan gerakan
      ular dengan cermat agar tidak menabrak dinding atau ekornya sendiri, atau
      Anda akan kalah!
      <br />
      <br />
      ⬆️⬇️ : menggeser ular ke arah atas maupun bawah
      <br />
      ⬅️➡️ : menggeser ular ke arah kiri maupun kanan
    </>
  )

  return (
    <>
      <NextSeo title="Snake Nokia" />
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
        }}
        onOpen={() => {
          setIsModalOpen(true)
        }}
        title="Permainan Selesai"
        variant={1}
        primaryClicked={handleStartGame}
        secondaryClicked={() => {
          setIsModalOpen(false)
          const offset = document.getElementById('leaderboard')?.offsetTop
          window.scrollTo({
            top: offset === undefined ? 0 : offset - 100,
            behavior: 'smooth',
          })
        }}
        primary="Mainkan lagi"
        secondary="Lihat papan peringkat"
        primaryButtonClassname="!bg-orange-dark text-background-light"
        secondaryButtonClassname="!bg-orange-light"
        message={
          <div className="text-center">
            <p className="font-poppinsBold text-body-large text-cream-light">
              Skor Kamu:
            </p>
            <p className="font-poppinsBold text-headline-large text-green-normal">
              {userSnakeScoreData?.currScore}
            </p>
          </div>
        }
        // icon={<Modalcheckicon />}
      />
      <h1 className="text-shadow-lg font-outline-4 mx-10 mt-4 text-center font-retro text-display-small text-primary shadow-orange-dark md:text-display-medium lg:text-display-large">
        Snake Nokia
      </h1>
      <div className="flex flex-col items-center justify-center gap-4 xl:flex-row xl:p-0">
        <GameInstruction
          className="hidden xl:block"
          gameInstructions={gameInstructions}
        />
        <div className="flex w-fit grow flex-col items-center gap-4">
          <div className="w-fit overflow-hidden">
            <iframe
              ref={snakeIFrame}
              className="h-[610px] w-full sm:h-[500px] sm:w-[500px]"
              src={process.env.NEXT_PUBLIC_SNAKE_URL}
            ></iframe>
          </div>
          <Button
            className="w-full px-5 py-3"
            variant={1}
            onClick={handleStartGame}
            rightIcon={<PlayButton />}
          >
            Mainkan Permainan
          </Button>
        </div>
        <div className="flex flex-col justify-between gap-4">
          <p className="font-poppins text-body-medium text-primary lg:text-body-large">
            Dengan Snake Nokia, Anda akan merasakan sensasi unik dari game
            arcade yang sederhana namun adiktif. Dengan tampilan grafis 8-bit
            dan soundtrack yang ikonik, game ini pasti akan membuat Anda kembali
            ke masa kecil yang penuh kenangan.
            <br />
            <br />
            Jangan lewatkan kesempatan untuk mengambil peran sebagai pemain
            terbaik di papan peringkat!
          </p>
          <div className="flex flex-col gap-4">
            {/* <TipCard
                  message={`Waktumu bermain tersisa ${sisaWaktu} hari lagi!`}
                  icon={<ExclamationTriangleIcon className="h-7 w-7" />}
                  variant="orange"
                /> */}
            <div className="w-full snap-center rounded-xl bg-primary p-2 text-center text-xs font-bold text-white md:p-3 md:text-base lg:p-5">
              <p>Skor tertinggi kamu:</p>
              <p className="mt-3 text-4xl text-green-normal">
                {userSnakeScoreData?.highScore ?? 0}
              </p>
            </div>
          </div>
        </div>
      </div>
      <GameInstruction
        className="xl:hidden"
        gameInstructions={gameInstructions}
      />
      <div className="z-10 mt-14 flex w-full flex-col items-center lg:mt-24">
        <p className="mb-2 text-center font-retro text-display-small text-[#383D75] lg:text-display-medium">
          Papan Peringkat Permainan
        </p>
        <Leaderboard leaderboardData={snakeScoreData} />
      </div>
    </>
  )
}

export default SnakeGame
