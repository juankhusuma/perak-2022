import { Modal, TextField } from '@elements'
import {
  ArrowRightOnRectangleIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  PencilSquareIcon,
  TrashIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useWindowSize } from '@hooks'
import { Clipboard, Line } from '@icons'
import { Tooltip } from '@mui/material'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { api } from 'src/utils/api'
import { Button } from '../Button'
import {
  EditingModeProps,
  RemoveModalProps,
  TeamDetailProps,
  updateIgnType,
} from './interface'

const TeamDetail = ({ refetchGameData, Team, game }: TeamDetailProps) => {
  const { data: session } = useSession()
  const { width } = useWindowSize()

  const isLeader = Team?.leader?.userId === session?.user?.id
  const inviteLink = `${window.location.origin}/invite/${Team?.id}`
  const isFinalized = Team?.teamStatus?.name === 'Terfinalisasi'
  const isConfirmed = Team?.teamStatus?.name === 'Terkonfirmasi'
  const isConfirmed2 =
    Team?.teamStatus?.name === 'Terkonfirmasi' ||
    Team?.teamStatus?.name === 'Menunggu Pembayaran' ||
    Team?.teamStatus?.name === 'Menunggu Konfirmasi'

  const [removeModalProps, setRemoveModalProps] = useState<RemoveModalProps>({
    isOpen: false,
    participantId: '',
    participantIgn: '',
    participantName: '',
  })
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false)
  const [isFinalizeModalOpen, setIsFinalizeModalOpen] = useState<boolean>(false)
  const [editingModeProps, setEditingModeProps] = useState<EditingModeProps>({
    isEditingMode: false,
    participantId: '',
  })
  const [isShowMember, setIsShowMember] = useState<boolean>(true)

  const membersQuery = api.game.getTeamMembers.useQuery(
    { teamId: Team?.id ?? '' },
    {
      enabled: !!Team?.id,
    }
  )
  const { data: members } = membersQuery
  const removeParticipant =
    api.participant.removeParticipantFromTeam.useMutation({
      onSuccess: () => {
        if (isLeader) {
          toast.success('Berhasil mengeluarkan anggota dari tim!')
        } else {
          toast.success('Berhasil keluar dari tim!')
        }

        refetchGameData()
        membersQuery.refetch()
        setRemoveModalProps({
          isOpen: false,
          participantId: '',
          participantIgn: '',
          participantName: '',
        })
      },
      onError: (e) => {
        toast.error(e.message)
      },
    })
  const updateIgn = api.participant.updateParticipantIgn.useMutation({
    onSuccess: () => {
      toast.success('Berhasil mengubah IGN!')
      setEditingModeProps({
        isEditingMode: false,
        participantId: '',
      })
      membersQuery.refetch()
    },
    onError: (e) => {
      toast.error(e.message)
    },
  })
  const updateTeamStatus = api.team.updateTeamStatus.useMutation({
    onSuccess: () => {
      toast.success('Tim telah terfinalisasi!')
      refetchGameData()
      setIsFinalizeModalOpen(false)
    },
    onError: (e) => {
      toast.error(e.message)
    },
  })

  const defaultValues: updateIgnType = {
    ign: '',
  }
  const { handleSubmit, control, resetField } = useForm<updateIgnType>({
    defaultValues: defaultValues,
    mode: 'onBlur',
  })
  const updateIgnSubmitHandler: SubmitHandler<updateIgnType> = (data) => {
    updateIgn.mutate({
      ign: data.ign,
      participantId: editingModeProps.participantId ?? '',
    })
  }

  // create switch case for each status
  const [statusColor, setStatusColor] = useState<string>('bg-orange-dark')
  useEffect(() => {
    switch (Team?.teamStatus?.name) {
      case 'Menunggu Pembayaran':
        setStatusColor('bg-orange-dark')
        break
      case 'Menunggu Konfirmasi':
        setStatusColor('bg-pink-dark')
        break
      case 'Konfirmasi Gagal':
        setStatusColor('bg-red-dark')
        break
      case 'Terkonfirmasi':
        setStatusColor('bg-green-dark')
        break
      case 'Terfinalisasi':
        setStatusColor('bg-blue-dark')
        break
    }
  }, [Team?.teamStatus?.name])

  return (
    <>
      <li className="mb-4 flex h-fit flex-1 break-inside-avoid flex-col gap-5 rounded-lg border-4 border-black bg-background-normal p-5 lg:mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-shadow-md font-retro text-display-small shadow-orange-dark">
              {Team?.name ? Team?.name : Team?.leader?.ign}
            </h2>
            <p className="w-max rounded-md bg-orange-normal p-1 px-2 font-semibold uppercase">
              {game?.name}
            </p>
          </div>
          {Team?.logo ? (
            <div className="relative aspect-square h-20">
              <Image
                src={Team.logo}
                alt={Team.name ?? ''}
                fill
                className="rounded-full object-cover"
              />
            </div>
          ) : null}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="mb-1 font-semibold">STATUS</h3>
            <div className="flex select-none flex-col items-center gap-2 sm:flex-row">
              <p
                className={`p-1 px-2 font-semibold uppercase ${statusColor} w-max rounded-md text-background-light`}
              >
                {Team?.teamStatus?.name}
              </p>
              {Team?.teamStatus?.name === 'Konfirmasi Gagal' && (
                <Tooltip title={Team?.teamStatus?.message} arrow>
                  <span
                    className="cursor-pointer text-red-dark underline"
                    onClick={() => {
                      toast.error(Team?.teamStatus?.message ?? '')
                    }}
                  >
                    Lihat alasan di sini.
                  </span>
                </Tooltip>
              )}
            </div>
          </div>
          <a
            href={game?.lineGroup ?? ''}
            target="_blank"
            className="hidden lg:block"
          >
            <Button
              variant={2}
              className="p-3 text-p-md"
              disabled={!game?.lineGroup}
            >
              <Line className="h-7 w-7" />
              Line Group
            </Button>
          </a>
        </div>
        <a href={game?.lineGroup ?? ''} target="_blank" className="lg:hidden">
          <Button
            variant={2}
            className="w-full p-3 text-p-md"
            disabled={!game?.lineGroup}
          >
            <Line className="h-7 w-7" />
            Line Group
          </Button>
        </a>
        {(Team?.teamStatus?.name === 'Menunggu Pembayaran' ||
          Team?.teamStatus?.name === 'Konfirmasi Gagal') && (
          <div className="grid w-full lg:grid-cols-2">
            <Link href={`/payment/${Team?.id}`}>
              <Button variant={2} className="w-full flex-1 p-3 text-p-md">
                <CurrencyDollarIcon className="h-7 w-7" />
                Lakukan Pembayaran
              </Button>
            </Link>
          </div>
        )}
        {!game?.isIndividual && (
          <div className="rounded-md bg-background-light p-3 font-semibold">
            <div className="flex items-center justify-between">
              <h3 className="mb-2 text-lg">Anggota Tim</h3>
              <ChevronDownIcon
                className={`h-6 w-6 cursor-pointer select-none transition-transform duration-300 ease-in-out ${
                  isShowMember && 'rotate-180'
                }`}
                onClick={() => setIsShowMember(!isShowMember)}
              />
            </div>
            {isShowMember && (
              <ul className="flex flex-col gap-3">
                {members && !Team?.isTeamButIndividual ? (
                  members.map((member) => (
                    <li
                      key={member.id}
                      className="flex items-center justify-between"
                    >
                      <div className="w-full space-y-[2px]">
                        <div className="flex items-center gap-2">
                          {member.userId === session?.user?.id ? (
                            editingModeProps.isEditingMode ? (
                              <div className="flex w-full items-center gap-1">
                                <TextField
                                  className="w-full text-primary"
                                  placeholder={member.ign ?? 'Masukkan IGN'}
                                  label="IGN"
                                  name="ign"
                                  required
                                  rules={{
                                    required: 'Anda harus mengisi ini!',
                                    maxLength: {
                                      value: 50,
                                      message:
                                        'In Game Name tidak boleh lebih dari 50 karakter!',
                                    },
                                  }}
                                  control={control}
                                />
                                <Button
                                  className="w-fit p-2"
                                  variant={2}
                                  onClick={() => {
                                    setEditingModeProps({
                                      ...editingModeProps,
                                      isEditingMode: false,
                                    })
                                    resetField('ign')
                                  }}
                                  leftIcon={
                                    <XMarkIcon className="h-7 w-7 text-primary" />
                                  }
                                ></Button>
                                <Button
                                  className="w-fit p-2"
                                  variant={1}
                                  onClick={handleSubmit(updateIgnSubmitHandler)}
                                  leftIcon={
                                    <CheckIcon className="h-7 w-7 text-background-light" />
                                  }
                                ></Button>
                              </div>
                            ) : (
                              <p className="text-orange-dark">{member.ign}</p>
                            )
                          ) : (
                            <p className="text-green-dark">{member.ign}</p>
                          )}
                          {Team?.leaderId === member.id &&
                            !editingModeProps.isEditingMode && (
                              <p className="rounded-md bg-background-normal px-2 py-1">
                                Ketua
                              </p>
                            )}
                        </div>
                        <p className="font-normal">{member.User?.fullName}</p>
                      </div>
                      {!isFinalized && (
                        <div className="flex items-center gap-2">
                          {member.userId === session?.user?.id &&
                            !editingModeProps.isEditingMode && (
                              <PencilSquareIcon
                                className="h-7 w-7 cursor-pointer"
                                onClick={() =>
                                  setEditingModeProps({
                                    isEditingMode:
                                      !editingModeProps.isEditingMode,
                                    participantId: member.id,
                                  })
                                }
                              />
                            )}
                          {isLeader && member.userId !== session?.user?.id ? (
                            <TrashIcon
                              className="h-7 w-7 cursor-pointer text-red-normal"
                              onClick={() => {
                                setRemoveModalProps({
                                  isOpen: true,
                                  participantId: member.id,
                                  participantIgn: member.ign ?? '',
                                  participantName: member.User?.fullName ?? '',
                                })
                              }}
                            />
                          ) : (
                            Team?.leader?.userId !== session?.user?.id &&
                            member.userId === session?.user?.id && (
                              <ArrowRightOnRectangleIcon
                                className="h-7 w-7 cursor-pointer text-red-normal"
                                onClick={() => {
                                  !isFinalized &&
                                    setRemoveModalProps({
                                      isOpen: true,
                                      participantId: member.id,
                                      participantIgn: member.ign ?? '',
                                      participantName:
                                        member.User?.fullName ?? '',
                                    })
                                }}
                              />
                            )
                          )}
                        </div>
                      )}
                    </li>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src="/member-loading.png"
                      alt="Loading..."
                      width={198}
                      height={182}
                    />
                    <p className="max-w-[35ch] text-center font-normal">
                      Kami sedang mencarikanmu rekan tim. Mohon bersabar {':)'}
                    </p>
                  </div>
                )}
              </ul>
            )}
          </div>
        )}
        {isLeader &&
        !Team?.isTeamButIndividual &&
        !game?.isIndividual &&
        !isFinalized ? (
          <div className="grid items-center gap-2 md:grid-cols-2">
            <Button
              variant={2}
              className="w-full flex-1 p-3 text-p-md"
              onClick={() => setIsInviteModalOpen(true)}
              disabled={!isConfirmed2}
            >
              <LinkIcon className="h-7 w-7" />
              Undang Teman
            </Button>
            <div
              className={`${
                !isConfirmed && 'rounded-lg border border-[#EABB76]'
              }`}
            >
              <Button
                variant={1}
                className={`$ w-full flex-1 p-3 text-p-md`}
                disabled={!isConfirmed}
                onClick={() => setIsFinalizeModalOpen(true)}
              >
                <UserGroupIcon
                  className={`h-7 w-7  ${
                    isConfirmed ? 'stroke-white' : 'stroke-[#C5B27A]'
                  }`}
                />
                <p
                  className={` ${
                    isConfirmed ? 'text-white' : 'text-[#C5B27A]'
                  }`}
                >
                  Finalisasi Tim
                </p>
              </Button>
            </div>
          </div>
        ) : null}
      </li>
      <Modal
        variant={width < 768 ? 1 : 2}
        icon={
          isLeader ? (
            <TrashIcon className="h-14 w-14 rounded-full bg-orange-normal p-2 text-primary" />
          ) : (
            <ArrowRightOnRectangleIcon className="h-14 w-14 rounded-full bg-orange-normal p-2 text-primary" />
          )
        }
        isOpen={removeModalProps.isOpen}
        onClose={() =>
          setRemoveModalProps({ ...removeModalProps, isOpen: false })
        }
        onOpen={() =>
          setRemoveModalProps({ ...removeModalProps, isOpen: true })
        }
        title={isLeader ? 'Hapus Anggota' : 'Keluar Tim'}
        primary="Kembali"
        primaryClicked={() =>
          setRemoveModalProps({ ...removeModalProps, isOpen: false })
        }
        secondary={isLeader ? 'Ya, hapus anggota' : 'Ya, keluar dari tim'}
        secondaryClicked={() =>
          removeParticipant.mutate({
            participantId: removeModalProps.participantId,
            teamId: Team?.id ?? '',
          })
        }
        message={
          <div className="flex flex-col gap-3 text-label-large">
            <p className="text-center text-white">
              {isLeader
                ? 'Kamu yakin ingin menghapus:'
                : 'Kamu yakin ingin keluar dari tim:'}
            </p>
            <div className="grid grid-rows-2 gap-2 rounded-lg bg-purple-dark p-4 text-background-light">
              <div className="grid grid-rows-2 truncate">
                <p className="font-poppinsBold text-orange-normal">IGN</p>
                <p>{removeModalProps.participantIgn}</p>
              </div>
              <div className="grid grid-rows-2 truncate">
                <p className="font-poppinsBold text-orange-normal">Name</p>
                <p>{removeModalProps.participantName}</p>
              </div>
            </div>
          </div>
        }
        className="w-full md:min-w-[500px]"
        primaryButtonClassname="bg-onPrimaryContainer items-center"
        secondaryButtonClassname="!bg-orange-normal items-center"
      />
      <Modal
        variant={width < 768 ? 1 : 2}
        icon={
          <UserGroupIcon className="h-14 w-14 rounded-full bg-orange-normal p-2 text-primary" />
        }
        isOpen={isFinalizeModalOpen}
        onClose={() => setIsFinalizeModalOpen(false)}
        onOpen={() => setIsFinalizeModalOpen(true)}
        title="Finalisasi Tim"
        primary="Kembali"
        primaryClicked={() => setIsFinalizeModalOpen(false)}
        secondary="Ya, finalisasikan tim"
        secondaryClicked={() =>
          updateTeamStatus.mutate({
            teamId: Team?.id ?? '',
            teamStatusName: 'Terfinalisasi',
          })
        }
        message={
          <div className="flex flex-col gap-3 text-label-large">
            <p className="text-center text-white">
              Kamu yakin ingin melakukan finalisasi tim:
            </p>
            <div className="grid grid-rows-2 gap-2 rounded-lg bg-purple-dark p-4">
              <div className="grid grid-rows-2 truncate">
                <p className="font-poppinsBold text-orange-normal">Permainan</p>
                <div className="mt-[0.5px] w-fit rounded-[3px] bg-orange-light px-2 py-[0.5px]">
                  <p className="font-poppinsBold text-purple-dark">
                    {game?.name?.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="grid grid-rows-2 truncate">
                <p className="font-poppinsBold text-orange-normal">Nama Tim</p>
                <p className="text-background-light">{Team?.name ?? ''}</p>
              </div>
            </div>
          </div>
        }
        className="w-full md:min-w-[500px]"
        primaryButtonClassname="bg-onPrimaryContainer items-center"
        secondaryButtonClassname="!bg-orange-normal items-center"
      />
      <Modal
        variant={2}
        icon={
          <LinkIcon className="h-14 w-14 rounded-full bg-orange-normal p-2 text-primary" />
        }
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onOpen={() => setIsInviteModalOpen(true)}
        title="Undang Anggota"
        message={
          <div className="flex flex-col gap-3 text-label-large">
            <p className="text-center text-white">
              Undang anggota tim-mu dengan link di bawah ini!
            </p>
            <div className="grid grid-rows-2 gap-2 rounded-lg bg-purple-dark p-4">
              <div className="grid grid-rows-2 truncate">
                <p className="font-poppinsBold text-orange-normal">Permainan</p>
                <div className="mt-[0.5px] w-fit rounded-[3px] bg-orange-light px-2 py-[0.5px]">
                  <p className="font-poppinsBold text-purple-dark">
                    {game?.name?.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="grid grid-rows-2 truncate">
                <p className="font-poppinsBold text-orange-normal">Nama Tim</p>
                <p className="text-background-light">{Team?.name ?? ''}</p>
              </div>
            </div>
            <div className="flex gap-2 rounded-lg bg-purple-dark p-4 text-background-light">
              <p className="truncate">{inviteLink}</p>
              <div
                className="cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(inviteLink)
                  toast.success('Invite link berhasil di-copy ke clipboard.')
                }}
              >
                <Clipboard className="h-7 w-7" />
              </div>
            </div>
          </div>
        }
        className="w-full md:min-w-[500px]"
        primaryButtonClassname="hidden"
        secondaryButtonClassname="hidden"
      />
    </>
  )
}

export default TeamDetail
