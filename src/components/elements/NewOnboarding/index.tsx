import { useOnboardingContext } from '@contexts'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { api } from 'src/utils/api'
import { NewOnBoardingProps } from './interface'

export const NewOnboarding: React.FC<NewOnBoardingProps> = ({ children }) => {
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>()

  const { data: session } = useSession()

  const router = useRouter()

  const { check } = useOnboardingContext()

  if (check?.data?.isOnboarded === false) {
    if (router.pathname != '/profile') {
      router.replace('/profile')
    }
  }

  return <>{children}</>
}
