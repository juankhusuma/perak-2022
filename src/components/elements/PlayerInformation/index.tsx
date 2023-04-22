import React from 'react'
import { PlayerInformationProps } from './interface'
import Image from 'next/image'

export const PlayerInformation: React.FC<PlayerInformationProps> = ({
  playerName,
  playerPhoto,
  playerTeam,
  playerGoalHistory,
}) => {
  return (
    <>
      <div className="overflow-hidden rounded-md">
        <div className="flex flex-row items-center gap-x-2 bg-purple-dark p-2">
          <div className="relative flex justify-center">
            <Image
              alt={playerName}
              src={playerPhoto}
              className={`h-fit w-10 fill-inherit object-fill`}
              width={0}
              height={0}
            />
          </div>
          <div className="flex-col">
            <h2 className="font-poppinsBold text-white">{playerName}</h2>
            <p className="text-title-small text-white">{playerTeam}</p>
          </div>
        </div>
        <div className="flex flex-col gap-x-2 bg-orange-light p-2">
          <h2 className="whitespace-nowrap font-poppinsBold text-grey-dark">
            Goal History
          </h2>
          <table className="mx-auto w-full table-auto border-separate border-spacing-y-2 text-left">
            <tbody>
              {playerGoalHistory.map((row, index) => (
                <tr key={index}>
                  <td className="bg-purple-lightest px-2 py-2 font-poppinsBold text-title-small text-grey-dark">
                    {row[0]}
                  </td>
                  <td className="whitespace-pre bg-green-light px-2 py-2 text-center text-title-small text-purple-dark">
                    {row[1]}
                    <span className="font-poppinsBold">
                      {row[2]} - {row[3]}
                    </span>
                    {row[4]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
