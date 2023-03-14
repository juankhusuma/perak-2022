import React from 'react'
import { ProfileModule } from '@modules'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'

const Profile: NextPage = () => (
  <>
    <NextSeo title="Profile" description="Ubah dan atur akun profile kamu." />
    <ProfileModule />
  </>
)

export default Profile
