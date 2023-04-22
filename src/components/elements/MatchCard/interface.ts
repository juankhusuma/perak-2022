export interface MatchCardProps {
  firstTeam: string
  firstTeamLogo: string
  firstTeamScore: string
  secondTeam: string
  secondTeamLogo: string
  secondTeamScore: string
  bracketInformation: string
  schedule: Date
  videoMatch: string
  live: boolean
  gameName?: string
  videoStatus?: boolean
  completed?: boolean
}
