import { useAuthModalContext, useRegistration } from '@contexts'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { api } from 'src/utils/api'
import { LeagueRegistrationLayout } from './Layout'
import { GameDetail, RegistrationForm } from './module-exports'

export const RegistrationModule: React.FC = () => {
  const router = useRouter()

  const { setAuthModalOpen } = useAuthModalContext()
  const { currentPage, type } = useRegistration()

  const { gameName } = router.query

  const game = api.game.getGameByName.useQuery({
    slugName: gameName as string,
  }).data!

  useSession({
    required: true,
    onUnauthenticated: () => {
      router.replace('/')
      setAuthModalOpen(true)
    },
  })

  const [isSendiri, setIsSendiri] = useState(false)

  return (
    <>
      <LeagueRegistrationLayout game={game}>
        {currentPage === 0 ? (
          <GameDetail game={game} setIsSendiri={setIsSendiri} />
        ) : (
          <RegistrationForm
            type={type}
            game={game}
            isSendiri={isSendiri}
            setIsSendiri={setIsSendiri}
          />
        )}
      </LeagueRegistrationLayout>
    </>
  )
}
