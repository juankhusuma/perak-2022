import { MatchCard } from '@elements'
import { MatchLayout } from './MatchLayout'
import { LayoutProps } from './interface'

export const Schedule: React.FC<LayoutProps> = ({ gameName }) => (
  <MatchLayout
    fetchData={'match'}
    gameName={gameName}
    noneText={'Tidak ada permainan yang akan datang.'}
  />
)
