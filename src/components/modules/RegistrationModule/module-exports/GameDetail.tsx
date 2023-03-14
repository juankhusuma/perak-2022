import { Clipboard, Line, Team, User, Wa } from '@icons'
import { GAME_DETAIL_ICON, INFORMATION_SECTION } from '../constant'
import { toast } from 'react-hot-toast'
import { InformationCard } from './elements'
import { Button, Tag } from '@elements'
import { useRegistration } from '@contexts'
import { GameDetailProps } from '../interface'
import { DateTime } from 'luxon'
import { moneyFormatter } from '@utils'
import { useState } from 'react'
import Skeleton from '@mui/material/Skeleton'

export const GameDetail: React.FC<GameDetailProps> = ({
  setIsSendiri,
  game,
}) => {
  const { currentPage, setCurrentPage, setType } = useRegistration()

  return (
    <div className="flex flex-col gap-y-6 px-2 py-2 md:py-12 md:px-8">
      <h1 className="text-center font-poppinsBold text-title-large text-primary md:text-start md:text-display-small">
        Detail Permainan
      </h1>
      <div className="flex flex-col gap-y-4 text-xs tracking-wider md:text-base">
        {game ? (
          GAME_DETAIL_ICON.map(({ icon, part }, key) => (
            <div key={key} className="flex items-center gap-x-2">
              <i> {icon} </i>
              <div>
                {key > 0 ? (
                  <div className="flex flex-col">
                    {key === 1 ? (
                      <div className="flex flex-col">
                        {!game?.isIndividual && (
                          <p>
                            Kelompok: {game.minimumMembers} -
                            {game.maximumMembers} orang/tim
                          </p>
                        )}
                        <p> Individu </p>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        {!game?.isIndividual && (
                          <div className="flex flex-col gap-0 md:flex-row md:gap-1">
                            <p>Kelompok:</p>
                            <p>{moneyFormatter(game.teamCost as number)}</p>
                          </div>
                        )}
                        <div className="flex flex-col gap-0 md:flex-row md:gap-1">
                          <p>Individu:</p>
                          <p>{moneyFormatter(game.individualCost as number)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p>
                    {DateTime.fromJSDate(game.startDate as Date)
                      .setLocale('id')
                      .toFormat('dd LLLL')}
                    -
                    {DateTime.fromJSDate(game.endDate as Date)
                      .setLocale('id')
                      .toFormat('dd LLLL yyyy')}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <Skeleton
            variant={'rectangular'}
            animation="wave"
            className="h-[150px] w-full"
          />
        )}
        {game ? (
          <div className="flex w-full items-center justify-between rounded-lg bg-orange-light p-4 text-purple-darkest">
            <div className="flex items-center justify-center gap-x-2">
              <Wa className="flex flex-col items-center justify-center" />
              <div className="">
                <p>
                  {game.gameTypeName == 'Competitive Games'
                    ? '081286229862'
                    : game.gameTypeName == 'Family Games'
                    ? '08111283030'
                    : '081221773872'}
                </p>
                <p>
                  {game.gameTypeName == 'Competitive Games'
                    ? `Andresha Pradana`
                    : game.gameTypeName == 'Family Games'
                    ? `Diona Varastika`
                    : 'Adly renadi'}
                </p>
              </div>
            </div>
            <div
              onClick={() => {
                navigator.clipboard.writeText(
                  game.gameTypeName == 'Competitive Games'
                    ? '081286229862'
                    : game.gameTypeName == 'Family Games'
                    ? '08111283030'
                    : '081221773872'
                )
                toast.success('Successfuly copied to clipboard!')
              }}
            >
              <Clipboard stroke="#383D75" className="cursor-pointer" />
            </div>
          </div>
        ) : (
          <Skeleton
            variant={'rectangular'}
            animation="wave"
            className="h-[80px] w-full"
          />
        )}
        <InformationCard type="game">
          <div className="flex w-full flex-col gap-y-2 px-4 py-2">
            <p className="font-poppinsBold"> Cara Bermain </p>
            <div className="flex flex-col gap-y-2">
              {!game?.isIndividual ? (
                INFORMATION_SECTION.map(({ type, message }, key) => (
                  <div className="flex flex-col gap-y-2" key={key}>
                    <Tag text={type} variant={1} />
                    <p> {message} </p>
                  </div>
                ))
              ) : (
                <>
                  <Tag text={'INDIVIDU'} variant={1} />
                  <p> {'Individual game description here ....'} </p>
                </>
              )}
            </div>
          </div>
        </InformationCard>
        {game ? (
          <div className="flex flex-col gap-3 md:flex-row">
            {!game?.isIndividual && (
              <Button
                variant={1}
                className="h-full w-full px-6 py-4 text-base"
                rightIcon={<Team />}
                onClick={() => {
                  setType('team')
                  setCurrentPage(currentPage + 1)
                }}
              >
                <p className="text-xs md:text-base">Daftar Menjadi Ketua Tim</p>
              </Button>
            )}
            {game && game.gameTypeName == 'Competitive Games' && (
              <Button
                variant={1}
                className="h-auto w-full px-6 py-4 text-base"
                rightIcon={<User />}
                onClick={() => {
                  setType('personal')
                  console.log(currentPage)
                  setCurrentPage(currentPage + 1)
                  if (!game?.isIndividual) {
                    setIsSendiri(true)
                  }
                }}
              >
                <p className="text-xs md:text-base">
                  Daftar {!game?.isIndividual ? 'Sendiri' : ''}
                </p>
              </Button>
            )}
          </div>
        ) : (
          <Skeleton
            variant={'rectangular'}
            animation="wave"
            className="h-[50px] w-full"
          />
        )}
      </div>
    </div>
  )
}
