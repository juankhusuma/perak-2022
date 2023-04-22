import { Submission } from '@prisma/client'
import NextImage from 'next/image'
import { Image, Modal } from '@elements'
import { useState } from 'react'
import { ArrowDownIcon, DocumentIcon } from '@heroicons/react/24/outline'
import { Button } from '../Button'
import { toast } from 'react-hot-toast'
import { FileUploader } from 'react-drag-drop-files'
import { api } from 'src/utils/api'
import { scanme } from '@utils'
import { useSession } from 'next-auth/react'

type ChallengeCardProps = Submission & {
  Challenge: {
    description: string | null
    clue: string | null
  } | null
  index: number
}

const ChallengeCard = ({
  index,
  challengeStatusId,
  Challenge,
  updatedAt,
  submisionUrl,
  id,
}: ChallengeCardProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showSubmission, setShowSubmission] = useState(false)

  const [submission, setSubmission] = useState<File>()
  const [curSubmission, setCurSubmission] = useState(submisionUrl)
  const [loadingButton, setLoadingButton] = useState(false)
  const [toastId, setToastId] = useState('')

  const updateSubmission = api.scanMe.updateSubmission.useMutation({
    onSuccess(data, variables) {
      setLoadingButton(false)
      setCurSubmission(variables.submissionUrl)
      setIsOpen(false)
    },
  })

  const { data: session } = useSession()
  const handleSubmit = async () => {
    setLoadingButton(true)
    const toastId = toast.loading('Loading')
    setToastId(toastId)

    try {
      const url = await scanme({
        file: submission,
        userId: session?.user?.id as string,
        challengeId: id,
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

      updateSubmission.mutate({
        id,
        submissionUrl: url,
      })
      toast.success('Berhasil Upload.', {
        id: toastId,
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

  return (
    <li className="flex h-fit flex-1 break-inside-avoid flex-col gap-5 rounded-lg border-4 border-background-dark bg-background-normal p-5 lg:mb-12">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-shadow-md font-retro text-display-small shadow-orange-dark">
          Tantangan #{index}
        </h2>
      </div>
      <p className="break-words rounded border-4 border-orange-dark bg-orange-light p-3 text-center">
        {Challenge?.description}
      </p>
      <div className="">
        <p className="font-poppinsBold">Status</p>
        {challengeStatusId === 'Menunggu Bukti Tantangan' ? (
          <p className="w-max rounded bg-cream-dark py-2 px-3 font-poppinsBold text-sm text-cream-light">
            {challengeStatusId}
          </p>
        ) : challengeStatusId === 'Menunggu Konfirmasi' ? (
          <p className="w-max rounded bg-purple-light py-2 px-3 font-poppinsBold text-sm text-cream-light">
            {challengeStatusId}
          </p>
        ) : challengeStatusId === 'Bukti Terkonfirmasi' ? (
          <p className="w-max rounded bg-green-dark py-2 px-3 font-poppinsBold text-sm text-cream-light">
            {challengeStatusId}
          </p>
        ) : challengeStatusId === 'Bukti Ditolak' ? (
          <p className="w-max rounded bg-red-dark py-2 px-3 font-poppinsBold text-sm text-cream-light">
            {challengeStatusId}
          </p>
        ) : null}
      </div>
      <div className="">
        <p className="font-poppinsBold">Waktu Unggah</p>
        <p className="font-poppins">{updatedAt.toLocaleString()}</p>
      </div>
      <div className="flex items-center justify-between">
        {challengeStatusId === 'Bukti Terkonfirmasi' ? (
          <p className="font-poppinsBold">Clue Puzzle</p>
        ) : (
          <p className="font-poppinsBold">Bukti Tantangan</p>
        )}
        <button onClick={() => setShowSubmission(!showSubmission)}>
          <ArrowDownIcon
            className={`${
              showSubmission ? 'rotate-180' : ''
            } h-6 w-6 transition-all`}
          />
        </button>
      </div>
      <div
        className={`${
          showSubmission ? 'max-h-screen' : 'max-h-0'
        } overflow-hidden transition-all duration-500`}
      >
        {curSubmission ? (
          <div
            className={`${
              showSubmission ? 'max-h-screen' : 'max-h-0'
            } relative mb-3 aspect-video w-full min-w-[300px] object-cover transition-all duration-500`}
          >
            <NextImage
              src={
                challengeStatusId === 'Bukti Terkonfirmasi'
                  ? (Challenge?.clue as string)
                  : curSubmission
              }
              alt=""
              fill
              className="rounded"
            />
          </div>
        ) : (
          <div className="mb-5 py-1 text-center">
            <h1 className="">Tak ada bukti :(</h1>
          </div>
        )}
        {challengeStatusId !== 'Bukti Terkonfirmasi' && (
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant={1}
            className="w-full py-2 text-lg"
          >
            {submisionUrl ? 'Ganti' : 'Unggah'}
          </Button>
        )}
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
                Unggah bukti tantanganmu.
              </h1>
              <p className="text-xs text-[#ffffff99] md:text-base">
                file dapat kamu unggah
                <span className="font-poppinsBold text-orange-normal">
                  dalam format .png, .jpg, etc.
                </span>
              </p>
              <Image
                alt="money"
                imageUrl={'/assets/images/rubik.png'}
                className="hidden h-[350px] w-[350px] fill-inherit object-contain md:block"
                fill
              />
            </div>
            <div className="flex w-full flex-col gap-y-4 md:w-1/2">
              <FileUploader
                name="file"
                types={['JPG', 'JPEG', 'PNG', 'SVG']}
                onTypeError={() => {
                  toast.error('Hanya boleh masukkan file berbentuk image.')
                }}
                handleChange={(file: File) => {
                  // here add logic with the aws s3 and then mutate the result using all the information above
                  setSubmission(file)
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
                  {!submission ? (
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
                        <p className="underline"> {submission.name} </p>
                      </div>
                    </div>
                  )}
                </div>
              </FileUploader>
              <Button
                variant={1}
                className="px-6 py-4 font-poppinsBold !text-title-medium md:!text-title-large"
                disabled={!submission}
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
    </li>
  )
}

export default ChallengeCard
