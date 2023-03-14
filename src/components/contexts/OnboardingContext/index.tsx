import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { api } from 'src/utils/api'
import { onBoardingProps, OnBoardingProviderProps } from './interface'

const OnboardingContext = createContext({} as onBoardingProps) // TODO: Declare interface of contextValue

export const useOnboardingContext = () => useContext(OnboardingContext)

export const OnboardingContextProvider: React.FC<OnBoardingProviderProps> = ({
  children,
}) => {
  // TODO: Write context's logic
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(true)

  const { data: session } = useSession()

  const router = useRouter()

  const check = api.onBoarding.newCheck.useQuery({
    userId: session?.user?.id as string,
  })

  useEffect(() => {
    if (check?.data?.isOnboarded === false) {
      setIsOnboarded(false)
    }
  }, [check?.data?.isOnboarded])

  const contextValue = {
    check,
  }

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
    </OnboardingContext.Provider>
  )
}
