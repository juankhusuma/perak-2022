import { NewLandingModule } from '@modules'
import { type NextPage } from 'next'
import { NextSeo } from 'next-seo'

const Home: NextPage = () => (
  <>
    <NextSeo title="Home" />
    <NewLandingModule />
  </>
)

export default Home
