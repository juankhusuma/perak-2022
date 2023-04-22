import { GameSchedule } from '@elements'
import { ContentProps } from '../NewLandingModule/interface'
import { MatchHistoryLayout } from './MatchHistoryLayout'

export const Schedule: React.FC<ContentProps> = ({ leagueName }) => (
  <MatchHistoryLayout
    leagueName={leagueName}
    fetchData={'match'}
    noneText={'Tidak ada permainan yang akan datang.'}
  />
)
