import { useRegistration } from '@contexts'
import { Button, Modal, TextField, TipCard } from '@elements'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Chevrondown, Joystick } from '@icons'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { api } from 'src/utils/api'
import { REGISTRATION_DESCRIPTION } from '../constant'
import { FormProps, RegistrationFormProps } from '../interface'
import { InformationCard } from './elements'
import { WarningCard } from './elements/WarningCard'

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  type,
  game,
  setIsSendiri,
  isSendiri,
}) => {
  const { currentPage, setCurrentPage, setIGN, setTeamName, ign, teamName } =
    useRegistration()
  const router = useRouter()
  const { gameName } = router.query
  const { data: session } = useSession()
  const [toastId, setToastId] = useState('')
  const [loadingButton, setLoadingButton] = useState(false)

  interface FormDataType {
    ign: string
    teamName: string
  }

  const defaultValues: FormDataType = {
    ign: '',
    teamName: '',
  }

  const {
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormDataType>({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const submitForm: SubmitHandler<FormProps> = (data) => {
    setIsOpen(true)
  }

  const registration = api.registration.add.useMutation()

  const gameData = api.game.getGameByName.useQuery({
    slugName: gameName as string,
  })

  const onSubmit = () => {
    setIsOpen(false)
    setLoadingButton(true)
    const toastId = toast.loading('Loading')
    setToastId(toastId)
    registration.mutate({
      gameid: gameData.data?.id as string,
      ign: watch('ign'),
      teamName: watch('teamName'),
      userId: session?.user?.id as string,
      isTeamButIndividual: isSendiri,
      isIndiviual: (isSendiri || gameData.data?.isIndividual) as boolean,
    })
  }

  const teamError = !(
    errors.ign == undefined &&
    errors.teamName == undefined &&
    Boolean(watch('ign')) &&
    Boolean(watch('teamName'))
  )

  const individualError = !(errors.ign == undefined && Boolean(watch('ign')))

  useEffect(() => {
    if (registration.status == 'success') {
      toast.success('Berhasil daftar.', { id: toastId })
      setLoadingButton(false)
      router.push(`/payment/${registration.data.teamId}`)
    }
    if (registration.status == 'error') {
      toast.error(registration.error.message, { id: toastId })
      setLoadingButton(false)
    }
  }, [registration.status])

  return (
    <>
      <div className="flex flex-col gap-y-6 px-2 py-2 md:px-8 md:py-12">
        <h1 className="text-center font-poppinsBold text-title-large text-primary md:text-start md:text-display-small">
          Registrasi
        </h1>
        <p className="text-sm md:text-base">{REGISTRATION_DESCRIPTION[type]}</p>
        <div className="flex flex-col gap-y-1">
          <p className="font-poppinsBold text-primary"> Informasi Pendaftar </p>
          <div className="flex flex-col gap-y-4">
            {type == 'team' && gameData.data && !gameData.data.isIndividual && (
              <TextField
                control={control}
                label="Nama Tim"
                name="teamName"
                leftIcon={<Joystick stroke="#383D75" />}
                placeholder="Nama Tim"
                rules={{
                  required: 'Anda harus masukkan nama tim anda!',
                  maxLength: {
                    value: 50,
                    message: 'Nama tim tidak boleh lebih dari 50 karakter!',
                  },
                }}
                required
              />
            )}
            <TextField
              control={control}
              label="In Game Name"
              name="ign"
              leftIcon={<Joystick stroke="#383D75" />}
              placeholder="In Game Name"
              rules={{
                required: 'Anda harus masukkan In Game Name!',
                maxLength: {
                  value: 50,
                  message: 'In Game Name tidak boleh lebih dari 50 karakter!',
                },
              }}
              required
            />
            <Button
              variant={1}
              className="px-6 py-4"
              onClick={() => setIsOpen(true)}
              disabled={type === 'personal' ? individualError : teamError}
              isLoading={loadingButton}
            >
              <p className="text-xs md:text-base">Daftarkan Diri</p>
            </Button>
          </div>
        </div>
        <WarningCard type="question">
          <div className="flex flex-col py-2">
            <p className="text-xs md:text-base">
              Mendaftar sebagai anggota? Silakan hubungi ketua tim untuk
              mendapatkan link invite.
            </p>
          </div>
        </WarningCard>
        <Button
          className="w-fit px-3 py-2 text-base md:px-6 md:py-4"
          variant={2}
          leftIcon={<Chevrondown className="rotate-90" />}
          onClick={() => {
            const { ign, team } = control._formValues
            setIGN(ign)
            if (type === 'team') {
              setTeamName(team)
            }
            setCurrentPage(currentPage - 1)
            setIsSendiri(false)
          }}
        >
          <p className="text-xs md:text-base">Kembali</p>
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
        title={`Pendaftaran ${type === 'personal' ? 'Individu' : 'Tim'}`}
        variant={1}
        canClose={false}
        primary="Ya, daftarkan saya"
        primaryClicked={() => onSubmit()}
        secondary="Tidak"
        secondaryClicked={() => setIsOpen(false)}
        message={
          <div className="flex flex-col items-center gap-y-4">
            <p className="text-center text-sm text-white md:text-base">
              Apakah anda yakin ingin mendaftarkan diri
              {type === 'personal' ? ' secara' : ' sebagai ketua tim'}
              <span className="font-poppinsBold text-orange-normal">
                {type === 'personal' ? ' Individu ' : ` ${watch('teamName')} `}
              </span>
              pada permainan
              <span className="font-poppinsBold text-orange-normal">
                {game?.name}
              </span>
              di PERAK 2023?
            </p>
            {!gameData.data?.isIndividual && isSendiri && (
              <TipCard
                message="Tim akan kami carikan secara random."
                icon={<ExclamationTriangleIcon className="h-7 w-7" />}
                variant="red"
              />
            )}
          </div>
        }
        className="w-full max-w-[600px] pb-8"
        primaryButtonClassname="!bg-orange-dark text-background-light"
        secondaryButtonClassname="bg-onPrimaryContainer"
      />
    </>
  )
}
