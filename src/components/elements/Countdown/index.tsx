import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'
import { monthMap } from './constant'
import { CountdownProps, differencesStateProps } from './interface'

export const Countdown: React.FC<CountdownProps> = ({
  title,
  subTitle,
  date,
  className,
  titleClassName,
  subTitleClassName,
}) => {
  // TODO: Write element's logic
  const now: Dayjs = dayjs()
  const end: Dayjs = dayjs(date)
  const diff: number = end.diff(now, 'second')

  // calculate difference between now and end
  const [differences, setDifferences] = useState<differencesStateProps>({
    days: Math.floor(diff / (60 * 60 * 24)),
    hours: Math.floor((diff / (60 * 60)) % 24),
    minutes: Math.floor((diff / 60) % 60),
  })

  useEffect(() => {
    setTimeout(() => {
      const diff = end.diff(dayjs(), 'second')
      setDifferences({
        days: Math.floor(diff / (60 * 60 * 24)),
        hours: Math.floor((diff / (60 * 60)) % 24),
        minutes: Math.floor((diff / 60) % 60),
      })
    }, 1000)
  }, [dayjs()])

  // format end date to string
  // convert month using monthMap
  const endString: string = end
    .format('DD MMMM YYYY, HH:mm [WIB]')
    .replace(
      new RegExp(Object.keys(monthMap).join('|'), 'gi'),
      (matched) => monthMap[matched]
    )

  return (
    <>
      <div className={`space-y-2 text-center ${className}`}>
        <h1
          className={`${
            titleClassName ?? 'font-poppinsBold text-title-medium'
          }`}
        >
          {title}
        </h1>
        <div className="grid grid-cols-3">
          <div className="bg-primary px-3 py-4 text-center text-orange-normal">
            <h1 className="font-retro text-display-small md:text-display-medium">
              {date ? (differences.days < 0 ? 0 : differences.days) : 0}
            </h1>
            <p className="font-poppinsBold text-title-small md:text-title-medium">
              Hari
            </p>
          </div>
          <div className="bg-orange-normal px-3 py-4 text-center text-primary">
            <h1 className="font-retro text-display-small md:text-display-medium">
              {date ? (differences.hours < 0 ? 0 : differences.hours) : 0}
            </h1>
            <p className="font-poppinsBold text-title-small md:text-title-medium">
              Jam
            </p>
          </div>
          <div className="bg-primary px-3 py-4 text-center text-orange-normal">
            <h1 className="font-retro text-display-small md:text-display-medium">
              {date ? (differences.minutes < 0 ? 0 : differences.minutes) : 0}
            </h1>
            <p className="font-poppinsBold text-title-small md:text-title-medium">
              Menit
            </p>
          </div>
        </div>
        <div className={`${subTitleClassName ?? 'text-title-medium'}`}>
          <p>{subTitle}</p>
          <p>{date ? endString : 'Pilih tanggal dan waktu!'}</p>
        </div>
      </div>
    </>
  )
}
