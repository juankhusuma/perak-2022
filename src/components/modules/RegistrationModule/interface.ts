import { Game, Team } from '@prisma/client'

export interface GameDetailIconProps {
  part: string | string[]
  icon: React.ReactNode
}
export interface InformationCardProps {
  type: 'game' | 'question'
  children: React.ReactNode
  className?: string
}

export interface RegistrationFormProps extends GameProps {
  type: 'personal' | 'team'
  isSendiri: boolean
  setIsSendiri: React.Dispatch<React.SetStateAction<boolean>>
}

export interface FormProps {
  ign: string
  team?: string
}

export interface GameProps {
  game: Game | null | undefined
}

export interface GameDetailProps {
  game: Game
  setIsSendiri: React.Dispatch<React.SetStateAction<boolean>>
}

export interface RegistrationSectionProps {
  children: React.ReactNode
}

export interface LeagueRegistrationLayoutProps {
  game: Game | null | undefined
  children?: React.ReactNode
}
