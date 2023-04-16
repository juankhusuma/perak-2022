import { DefaultSeoProps } from 'next-seo'

const NEXT_SEO_CONFIG = {
  titleTemplate: '%s - PERAK 2023',
  defaultTitle: 'PERAK 2023',
  description:
    'PERAK (Pesta Rakyat Komputer) merupakan acara internal terbesar di Fasilkom yang bertujuan untuk menjaga rasa kekeluargaan antarelemen dan sebagai tempat refreshing dari kegiatan akademis. Acara di PERAK ada mulai dari games, talent show, nobar, dll. Ayo bergabung bersama PERAK!',
  canonical: `https://perak.cs.ui.ac.id`,
  openGraph: {
    type: 'website',
    title: 'PERAK 2023',
    url: 'https://perak.cs.ui.ac.id',
    locale: 'en_US',
    site_name: 'PERAK CSUI 2023',
  },
} as DefaultSeoProps

export default NEXT_SEO_CONFIG
