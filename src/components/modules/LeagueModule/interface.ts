export interface LeagueLayoutProps {
  title: string
  description: string
  imageAlt: string
  imageUrl: string
  imageClassname?: string
  tagName?: string
  gameName?: string
  children: React.ReactNode
}

export interface ContentProps {
  leagueName: string
  league: number
}

export interface MatchHistoryLayoutProps {
  fetchData: 'history' | 'match'
  leagueName: string
  noneText: string
}
