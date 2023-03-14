import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import {
  RegistrationContextProps,
  RegistrationContextProviderProps,
} from './interface'

const RegistrationContext = createContext<RegistrationContextProps>({
  currentPage: 0,
  type: 'personal',
  ign: '',
  teamName: '',
  paymentProof: '',
  setCurrentPage: undefined as unknown as Dispatch<SetStateAction<number>>,
  setType: undefined as unknown as Dispatch<
    SetStateAction<'personal' | 'team'>
  >,
  setIGN: undefined as unknown as Dispatch<SetStateAction<string>>,
  setTeamName: undefined as unknown as Dispatch<SetStateAction<string>>,
  setPaymentProof: undefined as unknown as Dispatch<SetStateAction<string>>,
} as RegistrationContextProps) // TODO: Declare interface of contextValue

export const useRegistration = () => useContext(RegistrationContext)

export const RegistrationContextProvider: React.FC<
  RegistrationContextProviderProps
> = ({ children }) => {
  // TODO: Write context's logic
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [type, setType] = useState<'personal' | 'team'>('personal')
  const [ign, setIGN] = useState<string>('')
  const [teamName, setTeamName] = useState<string>('')
  const [paymentProof, setPaymentProof] = useState<string>('')

  const contextValue = {
    currentPage: currentPage,
    type: type,
    ign: ign,
    teamName: teamName,
    paymentProof: paymentProof,
    setCurrentPage: setCurrentPage,
    setType: setType,
    setIGN: setIGN,
    setTeamName: setTeamName,
    setPaymentProof: setPaymentProof,
  }

  return (
    <RegistrationContext.Provider value={contextValue}>
      {children}
    </RegistrationContext.Provider>
  )
}
