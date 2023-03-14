import { ReactNode, Dispatch, SetStateAction } from 'react'

export interface RegistrationContextProviderProps {
  children: ReactNode
}
export interface RegistrationContextProps {
  currentPage: number
  type: 'personal' | 'team'
  ign: string
  teamName: string
  paymentProof: string
  setCurrentPage: Dispatch<SetStateAction<number>>
  setType: Dispatch<SetStateAction<'personal' | 'team'>>
  setIGN: Dispatch<SetStateAction<string>>
  setTeamName: Dispatch<SetStateAction<string>>
  setPaymentProof: Dispatch<SetStateAction<string>>
}
