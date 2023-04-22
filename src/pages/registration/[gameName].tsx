import React from 'react'
import { RegistrationModule } from '@modules'
import type { NextPage } from 'next'
import { RegistrationContextProvider } from '@contexts'
import { NextSeo } from 'next-seo'

const Registration: NextPage = () => (
  <>
    <NextSeo title="Registration" description="Lakukan Pendaftaran Sekarang!" />
    <RegistrationContextProvider>
      <RegistrationModule />
    </RegistrationContextProvider>
  </>
)

export default Registration
