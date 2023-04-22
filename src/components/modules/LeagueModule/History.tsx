import { GameSchedule } from '@elements'
import { ContentProps } from '../NewLandingModule/interface'
import { MatchHistoryLayout } from './MatchHistoryLayout'

export const History: React.FC<ContentProps> = ({ leagueName }) => (
  <MatchHistoryLayout
    leagueName={leagueName}
    fetchData={'history'}
    noneText={'Tidak ada riwayat permainan'}
  />
)
