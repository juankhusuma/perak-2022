import React from 'react'
import { PaymentModule } from '@modules'
import type { NextPage } from 'next'
import { RegistrationContextProvider } from '@contexts'
import { NextSeo } from 'next-seo'

const Payment: NextPage = () => (
  <>
    <NextSeo
      title="Payment"
      description="Lakukan pembayaran untuk melanjutkan."
    />
    <RegistrationContextProvider>
      <PaymentModule />
    </RegistrationContextProvider>
  </>
)

export default Payment
