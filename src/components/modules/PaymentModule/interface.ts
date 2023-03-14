import { Game, Participant, Team } from '@prisma/client'
import { InformationCardProps } from '../RegistrationModule/interface'

export interface HighlightProps extends Omit<InformationCardProps, 'type'> {
  title: string
}

export interface PaymentProps {
  game: any
  participant: any
  team: any
}
