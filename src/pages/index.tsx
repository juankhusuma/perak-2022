import { NewLandingModule } from '@modules'
import { LandingModule } from '@modules'
import { type NextPage } from 'next'
import { NextSeo } from 'next-seo'

const Home: NextPage = () => (
  <>
    <NextSeo title="Home" />
    <NewLandingModule />
    {/* <LandingModule/> */}
  </>
)

export default Home
