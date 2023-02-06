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
  const [day, setDay] = useState<number>(0)
  const [hour, setHour] = useState<number>(0)
  const [minute, setMinute] = useState<number>(0)

  useEffect(() => {
    setTimeout(() => {
      const diff = end.diff(dayjs(), 'second')
      setDifferences({
        days: Math.floor(diff / (60 * 60 * 24)),
        hours: Math.floor((diff / (60 * 60)) % 24),
        minutes: Math.floor((diff / 60) % 60),
      })
    }, 1000)
    if (differences.days > 0) {
      setDay(differences.days)
    }
    if (differences.hours > 0) {
      setHour(differences.hours)
    }
    if (differences.minutes > 0) {
      setMinute(differences.minutes)
    }
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
        <div
          className={`${
            titleClassName ?? 'font-poppinsBold text-title-medium'
          }`}
        >
          {title}
        </div>
        <div className="grid grid-cols-3">
          <div className="bg-primary px-3 py-4 text-center text-orange-normal">
            <div className="font-retro text-display-small md:text-display-medium">
              {day}
            </div>
            <div className="font-poppinsBold text-title-small md:text-title-medium">
              Hari
            </div>
          </div>
          <div className="bg-orange-normal px-3 py-4 text-center text-primary">
            <div className="font-retro text-display-small md:text-display-medium">
              {hour}
            </div>
            <div className="font-poppinsBold text-title-small md:text-title-medium">
              Jam
            </div>
          </div>
          <div className="bg-primary px-3 py-4 text-center text-orange-normal">
            <div className="font-retro text-display-small md:text-display-medium">
              {minute}
            </div>
            <div className="font-poppinsBold text-title-small md:text-title-medium">
              Menit
            </div>
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
