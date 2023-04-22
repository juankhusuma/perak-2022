import { MatchLayout } from './MatchLayout'
import { LayoutProps } from './interface'

export const History: React.FC<LayoutProps> = ({ gameName }) => (
  <MatchLayout
    fetchData={'history'}
    gameName={gameName}
    noneText={'Tidak ada riwayat permainan'}
  />
)
