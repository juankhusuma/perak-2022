import { useAuthModalContext } from '@contexts'
import Skeleton from '@mui/material/Skeleton'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import TeamDetail from 'src/components/elements/TeamDetail'
import { api } from 'src/utils/api'

export const DashboardModule: React.FC = () => {
  // TODO: Write module's logic
  const router = useRouter()
  const { setAuthModalOpen } = useAuthModalContext()

  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.replace('/')
      setAuthModalOpen(true)
    },
  })

  const gameDataQuery = api.game.getParticipantOf.useQuery(undefined, {
    onSuccess(data) {},
    refetchOnWindowFocus: false,
  })
  const { data: gameData } = gameDataQuery

  const refetchGameData = () => gameDataQuery.refetch()

  return (
    <>
      <main className="min-h-screen bg-background-light p-4 pt-24 md:p-20 md:pt-32">
        <h1 className="text-shadow-lg font-outline-4 mb-6 text-center font-retro text-display-medium shadow-orange-dark md:text-display-large">
          Permainan Terdaftar
        </h1>
        <section className="w-full columns-1 gap-4 lg:columns-2 lg:gap-16">
          {gameData ? (
            gameData.length > 0 ? (
              gameData.map((participatedGame) => (
                <TeamDetail
                  key={participatedGame.id}
                  refetchGameData={refetchGameData}
                  {...participatedGame}
                />
              ))
            ) : null
          ) : (
            <>
              <Skeleton
                variant={'rectangular'}
                animation="wave"
                className="h-[400px] w-full"
              />
              <Skeleton
                variant={'rectangular'}
                animation="wave"
                className="h-[400px] w-full"
              />
            </>
          )}
        </section>
      </main>
    </>
  )
}
