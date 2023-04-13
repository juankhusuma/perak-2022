import PalangMerch from 'public/assets/images/NewLanding/PalangMerch.svg'
import KabarMerch from 'public/assets/images/NewLanding/KabarMerch.svg'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import { Newscard } from '@elements'
import { api } from '../../../utils/api'

import 'swiper/css'

// import 'swiper/css/navigation'

import { Navigation } from 'swiper'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

export default function News() {
  var url1 = "bg-[url('/assets/images/NewLanding/doraemon.png')]"
  var url =
    'https://freesvg.org/storage/img/thumb/1679763273gravure-chibi-gohan-watch-away-dbz-3.png'
  const trendingNews = api.news.getNews.useQuery()
  console.log(trendingNews.data?.length)
  return (
    <>
      <div className=" h-[560px] w-screen bg-[#272B52]">
        <h1 className="font-outline-4 -text-shadow-lg mx-auto max-w-[80%] py-10 text-center font-retro text-display-small text-orange-dark shadow-purple-darkest md:hidden md:text-display-medium lg:max-w-[60%] lg:text-display-large">
          Kabar Trending
        </h1>
        <div className="hidden justify-center py-10 md:flex lg:justify-between">
          <KabarMerch className=" lg:ml-24" />
          <PalangMerch className="hidden lg:block" />
        </div>
        <div className=" h-cover relative">
          <div className="swiper-button image-swiper-button-prev">
            <IoIosArrowBack />
          </div>
          <div className="swiper-button image-swiper-button-next">
            <IoIosArrowForward />
          </div>
          <Swiper
            navigation={{
              nextEl: '.image-swiper-button-next',
              prevEl: '.image-swiper-button-prev',
            }}
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={30}
            breakpoints={{
              1500: { slidesPerView: 4 },
              1000: { slidesPerView: 3 },
              700: { slidesPerView: 2 },
            }}
            // loop={true}
            pagination={{ clickable: true }}
            className="mySwiper"
          >
            {trendingNews.data?.length ? (
              trendingNews.data.map((news) => (
                <SwiperSlide className="h-auto">
                  <div className="flex justify-around">
                    <Newscard
                      name={news.title ? news.title : ''}
                      url={news.image ? news.image : ''}
                    />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide className="!mx-1 h-auto">
                <div className="items-center">
                  <Newscard
                    name="Masih kosong beb "
                    url={
                      'https://cdn-icons-png.flaticon.com/512/4989/4989793.png'
                    }
                  />
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </div>
    </>
  )
}
