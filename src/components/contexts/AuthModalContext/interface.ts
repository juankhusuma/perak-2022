export interface ContextProviderProps {
  children: React.ReactNode
}

export interface AuthModalContextProps {
  authModalOpen: boolean
  setAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
