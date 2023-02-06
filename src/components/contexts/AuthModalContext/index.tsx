import React, { createContext, useContext, useState } from 'react'
import { ContextProviderProps, AuthModalContextProps } from './interface'

const AuthModalContext = createContext({} as AuthModalContextProps) // TODO: Declare interface of contextValue

export const useAuthModalContext = () => useContext(AuthModalContext)

export const AuthModalContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  // TODO: Write context's logic
  const [authModalOpen, setAuthModalOpen] = useState(false)

  const contextValue = {
    authModalOpen,
    setAuthModalOpen,
  }

  return (
    <AuthModalContext.Provider value={contextValue}>
      {children}
    </AuthModalContext.Provider>
  )
}
