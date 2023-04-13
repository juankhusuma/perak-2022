import React from 'react'
import { TimezoneModule } from '@modules'
import type { NextPage } from 'next'
import withSession from 'src/components/hoc/withSession'

const Timezone: NextPage = () => (
  <>
    <div className="flex items-center justify-center">
      <TimezoneModule />
    </div>
  </>
)

export default withSession(Timezone)
