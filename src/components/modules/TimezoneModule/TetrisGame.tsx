import { Button, Modal } from '@elements'
import { PlayButton } from '@icons'
import CryptoJS from 'crypto-js'
import { decrypt } from 'crypto-js/aes'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { api } from 'src/utils/api'
import { GameInstruction } from './GameInstruction'
import Leaderboard from './Leaderboard'

export const TetrisGame: React.FC = () => {
  const router = useRouter()
  const tetrisIFrame = useRef<HTMLIFrameElement>(null)
  const mutateTetrisScore = api.game.addTetrisScore.useMutation()
  const tetrisScoreQuery = api.game.getTetrisScore.useQuery(undefined, {
    onSuccess(data) {},
    refetchOnWindowFocus: false,
  })
  const { data: tetrisScoreData } = tetrisScoreQuery
  const userTetrisScoreQuery = api.game.getUserTetrisScore.useQuery(undefined, {
    onSuccess(data) {},
    refetchOnWindowFocus: false,
  })
  const { data: userTetrisScoreData } = userTetrisScoreQuery
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleStartGame = () => {
    setIsModalOpen(false)
    tetrisIFrame.current?.focus()
  }

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data === 'ready') {
        tetrisIFrame.current?.contentWindow?.postMessage(
          `k: ${process.env.NEXT_PUBLIC_SECRET}`,
          { targetOrigin: process.env.NEXT_PUBLIC_TETRIS_URL }
        )
      }
      console.log(event.data.toString()?.slice(0, 5))
      if (event.data?.toString().slice(0, 5) === 'score') {
        const secured_score = event.data.replace('score ', '')

        mutateTetrisScore.mutate(secured_score, {
          onSuccess: () => {
            tetrisScoreQuery.refetch()
            userTetrisScoreQuery.refetch()
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
      Gunakan tombol arrow dan space pada keyboard untuk menggerakkan blok,
      susun blok dengan cerdas untuk membentuk garis horizontal tanpa celah.
      Hindari menumpuk terlalu tinggi sampai mencapai bagian atas layar, atau
      Anda akan kalah. Dapatkan poin setiap kali berhasil membentuk garis.
      <div className="mt-4 space-y-2">
        <div>
          {' '}
          <span className="rounded-md bg-[#00A6ED] font-poppinsBold text-white">
            ⬅️
          </span>{' '}
          <span className="rounded-md bg-[#00A6ED] font-poppinsBold text-white">
            ➡️
          </span>{' '}
          : menggeser blok ke arah kiri maupun kanan
        </div>
        <div>
          <span className="rounded-md bg-[#00A6ED] px-2 font-poppinsBold text-white">
            Z
          </span>{' '}
          <span className="rounded-md bg-[#00A6ED] font-poppinsBold text-white">
            ⬆️
          </span>{' '}
          : rotasi blok ke arah kiri maupun kanan
        </div>
        <div>
          <span className="rounded-md bg-[#00A6ED] font-poppinsBold text-white">
            ⬇️
          </span>{' '}
          : mempercepat jatuhnya blok
        </div>
        <div>
          <span className="rounded-md bg-[#00A6ED] px-2 font-poppinsBold text-white">
            SHIFT / C
          </span>{' '}
          : hold blok
        </div>
        <div>
          <span className="rounded-md bg-[#00A6ED] px-2 font-poppinsBold text-white">
            SPACE
          </span>{' '}
          : menjatuhkan blok secara instan
        </div>
        <div>
          <span className="rounded-md bg-[#00A6ED] px-2 font-poppinsBold text-white">
            P
          </span>{' '}
          : pause permainan
        </div>
      </div>
    </>
  )

  return (
    <>
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
              {userTetrisScoreData?.currScore}
            </p>
          </div>
        }
        // icon={<Modalcheckicon />}
      />
      <h1 className="text-shadow-lg font-outline-4 mx-10 mt-4 text-center font-retro text-display-small text-primary shadow-orange-dark md:text-display-medium lg:text-display-large">
        Tetris
      </h1>
      <div className="flex flex-col items-center justify-center gap-4 xl:flex-row xl:p-0">
        <GameInstruction
          className="hidden xl:block"
          gameInstructions={gameInstructions}
        />
        <div className="flex w-fit grow flex-col items-center gap-4">
          <iframe
            ref={tetrisIFrame}
            className="h-[660px] w-full overflow-hidden sm:h-[600px] sm:w-[500px]"
            src={process.env.NEXT_PUBLIC_TETRIS_URL}
          ></iframe>
        </div>
        <div className="flex flex-col justify-between gap-4">
          <p className="font-poppins text-body-medium text-primary lg:text-body-large">
            Dengan game Tetris, Anda akan merasakan sensasi unik dari game
            puzzle yang sederhana namun adiktif. Dengan tampilan grafis yang
            simpel namun mengagumkan dan musik yang ikonik, game ini pasti akan
            membuat Anda terpesona dan ingin terus bermain.
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
                {userTetrisScoreData?.highScore ?? 0}
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
        <Leaderboard leaderboardData={tetrisScoreData} />
      </div>
    </>
  )
}

export default TetrisGame
