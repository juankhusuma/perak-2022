import React from 'react'
import { DashboardModule } from '@modules'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'

const Dashboard: NextPage = () => (
  <>
    <NextSeo
      title="Dashboard"
      description="Lihat game apa saja yang kamu ikuti."
    />
    <DashboardModule />
  </>
)

export default Dashboard
