import React from 'react'
import { InviteModule } from '@modules'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'

const Invite: NextPage = () => (
  <>
    <NextSeo title="Invite" description="Masuk ke tim pilihan kamu." />
    <InviteModule />
  </>
)

export default Invite
