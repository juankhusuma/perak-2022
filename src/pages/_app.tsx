import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

import { api } from '../utils/api'

import '../styles/globals.css'
import { Spinelipse, Toasterror, Toastsuccess } from '@icons'
import { Footer, Smoothscroll, Onboarding, NewOnboarding } from '@elements'
import { AuthModalContextProvider, OnboardingContextProvider } from '@contexts'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import SEO from 'next-seo.config'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { asPath } = useRouter()
  const variants = {
    out: {
      opacity: 0,
      y: -40,
      transition: {
        duration: 0.75,
      },
    },
    in: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        delay: 0.5,
      },
    },
  }
  return (
    <>
      <DefaultSeo {...SEO} />
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            // Define default options
            className: '',
            style: {
              background: '#363636',
              color: '#fff',
            },
            loading: {
              style: {
                fontFamily: 'Poppins',
                background: '#2F7A84',
                border: '2px solid #6DB8C2',
                color: '#F3E2CE',
              },
              icon: <Spinelipse />,
            },
            success: {
              style: {
                fontFamily: 'PoppinsBold',
                background: '#A3AA10',
                border: '2px solid #C7CC70',
                color: '#F4EFD3',
              },
              icon: <Toastsuccess />,
            },
            error: {
              style: {
                fontFamily: 'PoppinsBold',
                background: '#A33233',
                border: '2px solid #CA5355',
                color: '#F4EFD3',
              },
              icon: <Toasterror />,
            },
          }}
        />
        <AuthModalContextProvider>
          <OnboardingContextProvider>
            <NewOnboarding>
              <Smoothscroll>
                <div className="min-h-screen bg-cream-light">
                  <AnimatePresence initial={false} exitBeforeEnter>
                    <motion.div
                      key={asPath}
                      variants={variants}
                      animate="in"
                      initial="out"
                      exit="out"
                    >
                      <Component {...pageProps} />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <Footer />
              </Smoothscroll>
            </NewOnboarding>
          </OnboardingContextProvider>
        </AuthModalContextProvider>
      </SessionProvider>
    </>
  )
}

export default api.withTRPC(MyApp)
