import { useAuthModalContext } from '@contexts'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'

const withSession = <T extends object>(Component: React.ComponentType<T>) => {
  return function WithSession(props: T) {
    const router = useRouter()
    const { setAuthModalOpen } = useAuthModalContext()

    const { data: session, status } = useSession({
      required: true,
      onUnauthenticated: () => {
        router.replace('/')
        setAuthModalOpen(true)
      },
    })

    if (status === 'authenticated' && session) {
      return <Component {...props} />
    }
    return <></>
  }
}

export default withSession
