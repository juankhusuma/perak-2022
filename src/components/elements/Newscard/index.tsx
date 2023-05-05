import React, { Component } from 'react'
import { NewsProp } from './interface'
import Image from 'next/image'
import Link from 'next/link'

export const Newscard: React.FC<NewsProp> = ({ name, url }) => {
  const redirect = (name: String) => {
    switch (name) {
      case 'SCAN Me!':
        return '/scan-me'
      case 'Timezone':
        return '/timezone/tetris'
      default:
        return '/'
    }
  }

  return (
    <>
      <Link href={redirect(name)}>
        <div className={`group relative h-80 w-80 bg-slate-500`}>
          <div className="relative h-[calc(100%-50px)]">
            <Image src={url} alt="news" fill style={{ objectFit: 'contain' }} />
          </div>
          <div className="flex h-[50px] w-full items-end justify-center group-hover:w-full group-hover:justify-end">
            <div className="relative h-full w-1/12 bg-pink-dark"></div>
            <div className="inline-flex h-full w-11/12 min-w-0 cursor-pointer items-center justify-center bg-green-300 pl-2 font-poppinsBold text-title-large transition-all duration-200 group-hover:bg-pink-dark group-hover:text-white">
              <div className="truncate">{name}</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}
