import {
  UseTRPCMutationResult,
  UseTRPCQueryResult,
} from '@trpc/react-query/shared'

export interface LeaderboardProps {
  leaderboardData:
    | {
        user: {
          id: string
          fullName: string | null
        } | null
        rank?: number
        highScore: number
        attempts: number
      }[]
    | undefined
}

export interface GameInstructionsProps {
  className?: string
  gameInstructions: string | JSX.Element
}
