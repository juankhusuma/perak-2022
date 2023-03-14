import React, { useState } from 'react'
import { useAuthModalContext } from '@contexts'
import { Button, Modal, TextField } from '@elements'
import { Joystick, Team } from '@icons'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { api } from 'src/utils/api'
import { Highlight } from '../PaymentModule/module-exports/Highlight'
import { LeagueRegistrationLayout } from '../RegistrationModule/Layout'
import { FormProps } from './interface'
import { toast } from 'react-hot-toast'
import { XCircleIcon } from '@heroicons/react/24/outline'

export const InviteModule: React.FC = () => {
  const router = useRouter()
  const { teamId } = router.query
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { setAuthModalOpen } = useAuthModalContext()

  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.replace('/')
      setAuthModalOpen(true)
    },
  })

  const team = api.team.getTeamById.useQuery({
    id: teamId as string,
  }).data!

  const { handleSubmit, control, watch } = useForm<FormProps>({
    defaultValues: {
      ign: '',
    },
  })

  const addParticipant = api.participant.addParticipantToTeam.useMutation({
    onSuccess: () => {
      toast.success(`Berhasil masuk kedalam tim ${team?.name} sebagai anggota!`)
      router.replace('/dashboard')
    },
    onError: (e) => {
      setIsOpen(false)
      setIsError(true)
      setErrorMessage(e.message)
    },
  })

  const submitForm: SubmitHandler<FormProps> = (data) => {
    setIsOpen(true)
  }

  const onSubmit = async () => {
    const ign = watch('ign')
    try {
      await addParticipant.mutateAsync({
        ign: ign as string,
        gameId: team?.game?.id as string,
        teamId: team?.id as string,
        userId: session?.user?.id as string,
      })
    } catch (_) {
      // do nothing
    }
  }

  return (
    <LeagueRegistrationLayout game={team?.game}>
      <div className="flex flex-col gap-y-6 px-8 py-12">
        <h1 className="font-poppinsBold text-title-large text-primary md:text-display-small">
          Pendaftaran Anggota Tim
        </h1>
        <p>
          {' '}
          Kamu telah diundang untuk menjadi anggota tim. Silakan cek kembali
          informasi tim yang tertera di bawah dan masukkan IGN (In Game Name)
          kamu.{' '}
        </p>
        <Highlight title="Nama Tim">
          <p> {team?.name} </p>
        </Highlight>
        <Highlight title="Nama Ketua">
          <p className="capitalize"> {team?.leader?.User?.fullName}</p>
        </Highlight>
        <div className="flex flex-col gap-y-1">
          <p> Informasi Pendaftar </p>
          <div className="flex flex-col gap-y-4">
            <TextField
              control={control}
              label="In Game Name"
              name="ign"
              leftIcon={<Joystick stroke="#383D75" />}
              placeholder="In Game Name"
              rules={{
                required: 'Anda harus masukkan In Game Name!',
              }}
              required
            />
            <Button
              variant={1}
              className="h-full w-full px-6 py-4 text-base"
              rightIcon={<Team />}
              onClick={handleSubmit(submitForm)}
            >
              Bergabung sebagai anggota
            </Button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
        title={`Pendaftaran Anggota`}
        variant={1}
        canClose={true}
        primary="Tidak"
        primaryClicked={() => setIsOpen(false)}
        secondary="Ya, daftarkan saya"
        secondaryClicked={() => onSubmit()}
        message={
          <div className="flex flex-col items-center gap-y-4">
            <p className="text-center text-white">
              Apakah anda yakin ingin mendaftarkan diri sebagai anggota tim{' '}
              <span className="font-poppinsBold text-orange-normal">
                {team?.name}
              </span>{' '}
              pada permainan{' '}
              <span className="font-poppinsBold text-orange-normal">
                {team?.game?.name}
              </span>{' '}
              di PERAK 2023?
            </p>
          </div>
        }
        className="w-full pb-8 md:min-w-[600px]"
        primaryButtonClassname={`bg-onPrimaryContainer`}
        secondaryButtonClassname={`!bg-orange-dark text-background-light`}
      />
      <Modal
        isOpen={isError}
        onClose={() => setIsError(false)}
        onOpen={() => setIsError(true)}
        title={''}
        variant={2}
        canClose={false}
        primary="Tidak"
        primaryClicked={() => setIsError(false)}
        secondary="Ya, daftarkan saya"
        secondaryClicked={() => null}
        message={
          <div className="flex flex-col items-center gap-y-4">
            <XCircleIcon className="h-20 w-20 text-red-light md:h-40 md:w-40" />
            <h1 className="text-center font-poppinsBold text-sm text-background-light md:text-2xl">
              Yah, kamu gagal bergabung :(
            </h1>
            <p className="text-center text-white md:text-xl">
              {' '}
              {errorMessage}{' '}
            </p>
            <Button
              variant={1}
              className="w-full px-6 py-4 md:text-[20px]"
              onClick={() => {
                setIsError(false)
                router.reload()
              }}
            >
              Baik, dimengerti.
            </Button>
          </div>
        }
        className="w-full pb-8 md:min-w-[600px]"
        primaryButtonClassname={`hidden`}
        secondaryButtonClassname={`hidden`}
      />
    </LeagueRegistrationLayout>
  )
}