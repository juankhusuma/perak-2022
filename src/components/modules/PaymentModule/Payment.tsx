import { useRegistration } from '@contexts'
import { Button, Image, Modal, Select, Tag } from '@elements'
import { DocumentIcon } from '@heroicons/react/24/outline'
import { Clipboard, Dashboard, Wallet } from '@icons'
import { MenuItem } from '@mui/material'
import { PaymentMethod } from '@prisma/client'
import { moneyFormater, uploadPaymentReciept } from '@utils'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { api } from 'src/utils/api'
import { PAYMENT_DETAIL } from './constant'
import { PaymentProps } from './interface'
import { Highlight } from './module-exports/Highlight'

export const Payment: React.FC<PaymentProps> = ({ game, participant }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const {
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })
  const { data: session } = useSession()

  const [paymentProof, setPaymentProof] = useState<File>()
  const [loadingButton, setLoadingButton] = useState(false)
  const [toastId, setToastId] = useState('')

  const router = useRouter()
  const { id } = router.query

  const team = api.team.getTeamById.useQuery({
    id: id as string,
  })

  const [statusColor, setStatusColor] = useState<string>('bg-orange-dark')

  useEffect(() => {
    switch (team.data?.teamStatus?.name) {
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
  }, [team.data?.teamStatus?.name])

  const paymentCheck = api.registration.checkPayment.useQuery({
    teamId: id as string,
    userId: session?.user?.id as string,
  })

  const payment = api.registration.payment.useMutation()

  const buttonError = !(
    errors.payment == undefined &&
    Boolean(watch('payment')) &&
    paymentProof != undefined
  )

  const handleSubmit = async () => {
    setLoadingButton(true)
    const toastId = toast.loading('Loading')
    setToastId(toastId)
    if (paymentCheck.data == false) {
      setLoadingButton(false)
      toast.error('Dilarang untuk post.', { id: toastId })
      return
    }
    try {
      const url = await uploadPaymentReciept({
        file: paymentProof,
        userId: id as string,
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          const total2 = total ? (total as number) : 0
          const percent = Math.round((loaded / total2) * 100)

          const message = `Uploading... ${percent}%`

          toast.loading(message, {
            id: toastId,
          })
        },
      })

      payment.mutateAsync({
        teamId: id as string,
        url: url,
        paymentMethod: watch('payment'),
      })
    } catch (e: any) {
      if (e.message) {
        toast.error(e.message, {
          id: toastId,
        })
      } else {
        toast.error('Masalah dengan AWS S3', {
          id: toastId,
        })
      }
    }
  }

  useEffect(() => {
    if (payment.status == 'success') {
      toast.success('Berhasil Upload', { id: toastId })
      setLoadingButton(false)
      router.push(`/dashboard`)
    }
    if (payment.status == 'error') {
      toast.error(payment.error.message, { id: toastId })
      setLoadingButton(false)
    }
  }, [payment.status])

  return (
    <>
      <div className="flex flex-col gap-y-6 px-8 py-12">
        <h1 className="font-poppinsBold text-title-large text-primary md:text-display-small">
          Pembayaran
        </h1>
        <p>
          Silakan transfer ke rekening/emoney berikut dan upload bukti
          pembayaran.
        </p>
        <Highlight title="Nominal Pembayaran">
          <p className="text-title-large text-green-dark">
            {/* add this when isIndividual or anything really attribute has been added to participant schema */}
            {/* {F(participant?.isIndividual ? game?.individualCost as number : game?.teamCost as number)} */}
            {moneyFormater(
              (team.data?.game?.isIndividual
                ? team.data.game.individualCost
                : team.data?.isTeamButIndividual
                ? team.data.game?.individualCost
                : team.data?.game?.teamCost) as number
            )}
          </p>
        </Highlight>
        <h2 className="font-poppinsBold text-title-medium text-purple-dark">
          Detail Pembayaran
        </h2>
        <div className="flex flex-col gap-y-2">
          {team.data &&
            team.data?.game?.paymentMethod.map(
              (paymentMethod: PaymentMethod, idx: number) => (
                <div
                  className="flex items-center gap-x-2 text-title-small tracking-wider"
                  key={paymentMethod.id}
                >
                  {/* <i> {PAYMENT_DETAIL[key % PAYMENT_DETAIL.length]} </i> */}
                  <p>
                    {paymentMethod.accountNo} a.n. {paymentMethod.accountName} (
                    {paymentMethod.accountProvider})
                  </p>
                  <div
                    className="bg-orange-light p-1"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        paymentMethod.accountNo as string
                      )
                      toast.success('Successfuly copied to clipboard!')
                    }}
                  >
                    <Clipboard
                      stroke="#383D75"
                      className="cursor-pointer"
                      size={'w-4 h-4'}
                    />
                  </div>
                </div>
              )
            )}
        </div>
        <div className="flex flex-col gap-y-1">
          <h2 className="font-poppinsBold text-title-medium text-purple-dark">
            Status
          </h2>
          <Tag
            text={team.data?.teamStatus?.name as string}
            variant={2}
            className={`${statusColor} text-background-light`}
            flex
          />
        </div>
        <Highlight
          title="In Game Name" // will change to {participant.isIndividual ? "In Game Name" : "Team Name"}
        >
          <p className="text-label-large">
            {participant?.ign}
            {/* change to {participant.isIndividual ? participant?.ign : team?.name */}
          </p>
        </Highlight>
        <div className="flex flex-col gap-y-4">
          <Button
            variant={1}
            className="px-6 py-4"
            rightIcon={<Wallet />}
            onClick={() => setIsOpen(true)}
          >
            Unggah bukti pembayaran
          </Button>
          <Link href="/dashboard">
            <Button
              variant={2}
              className="w-full px-6 py-4"
              rightIcon={<Dashboard />}
            >
              Kunjungi Dashboard
            </Button>
          </Link>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
        title={``}
        variant={3}
        canClose
        exitCross={'#E0CDF2'}
        message={
          <div className="flex flex-col gap-4 md:flex-row md:gap-12">
            <div className="flex w-full flex-col items-center gap-y-4 md:w-1/2 md:text-center">
              <h1 className="font-retro text-4xl lg:text-7xl">
                Unggah bukti pembayaranmu.
              </h1>
              <p className="text-xs text-[#ffffff99] md:text-base">
                file dapat kamu unggah
                <span className="font-poppinsBold text-orange-normal">
                  dalam format .png, .jpg, etc.
                </span>
              </p>
              <Image
                alt="money"
                imageUrl={'/assets/images/LeagueRegistration/Money.svg'}
                className="hidden h-[350px] w-[350px] fill-inherit object-contain md:block"
                fill
              />
            </div>
            <div className="flex w-full flex-col gap-y-4 md:w-1/2">
              <div className="flex flex-col">
                <h2 className="font-poppinsBold text-title-small md:text-title-large">
                  Pilih Rekening Tujuan*
                </h2>
                <p className="text-xs text-purple-lightest opacity-50 md:text-base">
                  Wajib dipilih
                </p>
              </div>
              <Select
                label="Pilih metode pembayaran"
                control={control}
                name="payment"
                required
                rules={{ required: 'Anda harus mengisi ini!' }}
                select
              >
                {game?.paymentMethod?.map(
                  (paymentMethod: PaymentMethod, idx: number) => (
                    <MenuItem
                      value={paymentMethod.id}
                      key={idx}
                      className="text-xs md:text-base"
                    >
                      {paymentMethod.accountNo} a.n. {paymentMethod.accountName}
                      ({paymentMethod.accountProvider})
                    </MenuItem>
                  )
                )}
              </Select>
              <FileUploader
                name="file"
                types={['JPG', 'JPEG', 'PNG', 'SVG']}
                onTypeError={() => {
                  toast.error('Hanya boleh masukkan file berbentuk image.')
                }}
                handleChange={(file: File) => {
                  // here add logic with the aws s3 and then mutate the result using all the information above
                  setPaymentProof(file)
                }}
                required
              >
                <div className="custom-border flex w-full flex-col items-center justify-center gap-y-8 p-8 md:h-[400px]">
                  <Image
                    alt="stamp"
                    imageUrl={'/assets/images/LeagueRegistration/Stamps.svg'}
                    className="h-32 w-32 fill-inherit object-contain md:h-52 md:w-52"
                    fill
                  />
                  {!!!paymentProof ? (
                    <h2 className="text-center font-poppinsBold text-sm text-white sm:text-xl xl:text-3xl">
                      Drag atau <span className="text-blue-normal">upload</span>
                      file kamu di sini
                    </h2>
                  ) : (
                    <div className="flex flex-col gap-y-4">
                      <h2 className="text-center font-poppinsBold text-base text-white xl:text-3xl">
                        File kamu berhasil diupload.
                      </h2>
                      <div className="flex w-full items-center justify-center gap-x-2 font-poppinsBold text-blue-normal">
                        <i>
                          <DocumentIcon className="h-4 w-4" />
                        </i>
                        <p className="underline"> {paymentProof.name} </p>
                      </div>
                    </div>
                  )}
                </div>
              </FileUploader>
              <Button
                variant={1}
                className="px-6 py-4 font-poppinsBold !text-title-medium md:!text-title-large"
                disabled={buttonError}
                onClick={handleSubmit}
                isLoading={loadingButton}
              >
                Unggah bukti
              </Button>
            </div>
          </div>
        }
        className="w-full max-w-[1600px] pb-8 text-purple-lightest md:px-16"
      />
    </>
  )
}
