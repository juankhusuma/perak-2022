import { useAuthModalContext } from '@contexts'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import { api } from 'src/utils/api'
import { LeagueRegistrationLayout } from '../RegistrationModule/Layout'
import { Payment } from './Payment'

export const PaymentModule: React.FC = () => {
  const router = useRouter()
  const { id } = router.query

  const { setAuthModalOpen } = useAuthModalContext()

  useSession({
    required: true,
    onUnauthenticated: () => {
      router.replace('/')
      setAuthModalOpen(true)
    },
  })

  const team = api.team.getTeamById.useQuery({
    id: id as string,
  }).data

  return (
    <LeagueRegistrationLayout game={team?.game}>
      <Payment team={team} game={team?.game} participant={team?.leader} />
    </LeagueRegistrationLayout>
  )
}
