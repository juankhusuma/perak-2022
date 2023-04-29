import { Button } from '@elements'
import { ArrowLeft } from '@icons'
import { useRouter } from 'next/router'
import SnakeGame from './SnakeGame'
import { TetrisGame } from './TetrisGame'

export const TimezoneModule: React.FC = () => {
  const router = useRouter()
  const { gameName } = router.query

  return (
    <>
      <div className="relative flex min-h-screen w-full max-w-[1920px] flex-col items-center justify-center bg-background-light px-5 pt-24 pb-10">
        <Button
          className="ml-4 w-fit px-5 py-3 lg:absolute lg:top-[10%] lg:left-5"
          variant={2}
          onClick={() => {
            router.back()
          }}
          leftIcon={<ArrowLeft />}
        >
          Kembali
        </Button>
        {(() => {
          if (gameName === 'snake') {
            return <SnakeGame />
          } else if (gameName === 'tetris') {
            return <TetrisGame />
          } else {
            return (
              <div className="mt-14 flex h-full w-full flex-col items-center justify-center">
                <p className="text-center font-retro text-display-medium text-[#383D75]">
                  Maaf, permainan ini belum tersedia
                </p>
              </div>
            )
          }
        })()}
      </div>
    </>
  )
}

export default TimezoneModule
