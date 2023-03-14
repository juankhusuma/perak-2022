import { Calendar, Ticket, Users } from '@icons'
import { GameDetailIconProps } from './interface'

export const GAME_DETAIL_ICON: GameDetailIconProps[] = [
  {
    part: ['startDate', 'endDate'],
    icon: <Calendar stroke="#383D75" className="font-bold" />,
  },
  {
    part: ['minimumMembers', 'maximumMembers'],
    icon: <Users stroke="#383D75" className="font-bold" />,
  },
  {
    part: ['teamCost', 'individualCost'],
    icon: <Ticket stroke="#383D75" className="font-bold" />,
  },
]

export const IMAGE_DECORATION: {
  imageUrl: string
  alt: string
  className: string
}[] = [
  {
    imageUrl: '/assets/images/LeagueRegistration/Tetris.svg',
    alt: 'tetris',
    className: 'w-fit absolute right-0 top-12',
  },
  {
    imageUrl: '/assets/images/LeagueRegistration/Tetris.svg',
    alt: 'tetris',
    className: 'w-fit absolute -bottom-1 -left-2 -scale-x-100',
  },
]

export const INFORMATION_SECTION: {
  type: string
  message: string
}[] = [
  {
    type: 'INDIVIDU',
    message: 'Tenang, kami akan mencari teman untuk timmu!',
  },
  {
    type: 'TIM',
    message: 'Daftar dan jadi ketua tim untuk teman-temanmu!',
  },
]

export const REGISTRATION_DESCRIPTION: {
  [registrationType: string]: string
} = {
  personal:
    'Kamu akan mendaftar sebagai individu. Masukkan IGN (In Game Name) kamu.',
  team: 'Kamu akan mendaftar sebagai ketua tim. Masukkan nama tim dan IGN (In Game Name) kamu.',
}
