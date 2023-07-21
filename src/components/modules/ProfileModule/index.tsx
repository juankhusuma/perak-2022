import { Button, PhotoBox, Select, TextField } from '@elements'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { MenuItem, Skeleton } from '@mui/material'
import { api } from 'src/utils/api'
import { ElementType, Generation } from '@prisma/client'
import { toast } from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { ProfilePageAssets } from '@icons'
import { uploadProfilePhoto } from '@utils'
import { useRouter } from 'next/router'
import { useAuthModalContext, useOnboardingContext } from '@contexts'

export const ProfileModule: React.FC = () => {
  const [elementTypesArray, setElementTypesArray] = useState<ElementType[]>()
  const [file, setFile] = useState<any>()
  const [realFile, setRealFile] = useState<any>()
  const [isChangePhoto, setIsChangePhoto] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false)
  const [toastId, setToastId] = useState('')
  const [first, setFirst] = useState(false)

  const router = useRouter()
  const { setAuthModalOpen } = useAuthModalContext()
  const { check } = useOnboardingContext()

  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.replace('/')
      setAuthModalOpen(true)
    },
  })

  const userData = api.userData.get.useQuery({
    id: session?.user?.id as string,
  })

  const handleChange = (e: any) => {
    if (e.target.files[0]) {
      setIsChangePhoto(true)
      setRealFile(e.target.files[0])
      setFile(URL.createObjectURL(e.target.files[0]))
    }
  }

  interface FormDataType {
    fullName: string
    element: string
    generation: string
    lineId: string
    phoneNumber: string
    username: string
  }

  const defaultValues: FormDataType = {
    fullName: '',
    element: '',
    generation: '',
    lineId: '',
    phoneNumber: '',
    username: '',
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

  const generations = api.profile.getAllGenerations.useQuery()

  const elementTypes = api.profile.getAllElementTypes.useQuery()

  const mahasiswaMutation = api.onBoarding.mahasiswa.useMutation({
    onSuccess: () => {
      setIsChangePhoto(false)
      userData.refetch()
    },
  })

  const mahasiswaWithPhotoMutation =
    api.onBoarding.mahasiswaWithPhoto.useMutation({
      onSuccess: () => {
        setIsChangePhoto(false)
        userData.refetch()
      },
    })

  const otherElementsMutation = api.onBoarding.otherElements.useMutation({
    onSuccess: () => {
      setIsChangePhoto(false)
      userData.refetch()
    },
  })

  const otherElementsWithPhotoMutation =
    api.onBoarding.otherElementsWithPhoto.useMutation({
      onSuccess: () => {
        setIsChangePhoto(false)
        userData.refetch()
      },
    })

  const email = session?.user?.email

  const [isEdit, setEdit] = useState<boolean | null | undefined>(false)

  useEffect(() => {
    if (elementTypes.data) {
      setElementTypesArray(elementTypes.data)
    }
    if (userData.data) {
      reset({
        fullName: userData.data.fullName as string,
        element: userData.data.elementTypeId as string,
        generation: userData.data.generationId as string,
        lineId: userData.data.lineId as string,
        phoneNumber: userData.data.phoneNumber as string,
        username: userData.data.slug as string,
      })
      setEdit(!userData.data.isOnboarded)
      setFirst(!userData.data.isOnboarded)
    }
  }, [elementTypes.data, userData.data])

  const element = elementTypesArray?.find(
    (elementType: ElementType) => elementType.id === watch('element')
  )

  const loading = !(
    elementTypes.data &&
    generations.data &&
    session?.user &&
    userData.data
  )

  const mahasiswaError = !(
    errors.fullName == undefined &&
    errors.element == undefined &&
    errors.generation == undefined &&
    errors.lineId == undefined &&
    errors.username == undefined &&
    Boolean(watch('fullName')) &&
    Boolean(watch('element')) &&
    Boolean(watch('generation')) &&
    Boolean(watch('lineId')) &&
    Boolean(watch('username'))
  )

  const otherError = !(
    errors.fullName == undefined &&
    errors.element == undefined &&
    errors.phoneNumber == undefined &&
    errors.username == undefined &&
    watch('fullName') &&
    watch('element') &&
    watch('phoneNumber') &&
    Boolean(watch('username'))
  )

  const editTootgle = () => {
    setEdit(!isEdit)
  }

  const handleSubmitButton = async () => {
    setLoadingButton(true)
    const toastId = toast.loading('Loading')
    setToastId(toastId)
    if (isChangePhoto) {
      let url = ''
      try {
        url = await uploadProfilePhoto({
          file: realFile,
          userId: session?.user?.id as string,
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
      if (element?.name == 'Mahasiswa') {
        mahasiswaWithPhotoMutation.mutate({
          userId: session?.user?.id as string,
          elementTypeId: watch('element'),
          fullName: watch('fullName'),
          generationId: watch('generation'),
          lineId: watch('lineId'),
          awsImage: url,
          username: watch('username'),
        })
      } else {
        otherElementsWithPhotoMutation.mutate({
          userId: session?.user?.id as string,
          elementTypeId: watch('element'),
          fullName: watch('fullName'),
          phoneNumber: watch('phoneNumber'),
          awsImage: url,
          username: watch('username'),
        })
      }
    } else {
      if (element?.name == 'Mahasiswa') {
        mahasiswaMutation.mutate({
          userId: session?.user?.id as string,
          elementTypeId: watch('element'),
          fullName: watch('fullName'),
          generationId: watch('generation'),
          lineId: watch('lineId'),
          username: watch('username'),
        })
      } else {
        otherElementsMutation.mutate({
          userId: session?.user?.id as string,
          elementTypeId: watch('element'),
          fullName: watch('fullName'),
          phoneNumber: watch('phoneNumber'),
          username: watch('username'),
        })
      }
    }
  }

  useEffect(() => {
    if (
      mahasiswaMutation.status == 'loading' ||
      mahasiswaWithPhotoMutation.status == 'loading' ||
      otherElementsMutation.status == 'loading' ||
      otherElementsWithPhotoMutation.status == 'loading'
    ) {
      setLoadingButton(true)
    }
    if (
      mahasiswaMutation.status == 'success' ||
      mahasiswaWithPhotoMutation.status == 'success' ||
      otherElementsMutation.status == 'success' ||
      otherElementsWithPhotoMutation.status == 'success'
    ) {
      if (first) {
        const message = 'Berhasil Simpan.'
        toast.success(message, { id: toastId })
        check.refetch()
        check.refetch().then(() => {
          router.push('/')
        })
      } else {
        toast.success('Berhasil Simpan', { id: toastId })
      }
      setLoadingButton(false)
      setEdit(false)
    }
    if (
      mahasiswaMutation.status == 'error' ||
      mahasiswaWithPhotoMutation.status == 'error' ||
      otherElementsMutation.status == 'error' ||
      otherElementsWithPhotoMutation.status == 'error'
    ) {
      toast.error('Username telah digunakan', { id: toastId })
      setLoadingButton(false)
    }
  }, [
    mahasiswaMutation.status,
    mahasiswaWithPhotoMutation.status,
    otherElementsMutation.status,
    otherElementsWithPhotoMutation.status,
  ])

  return (
    <>
      <div className="relative flex min-h-screen w-full items-center justify-center bg-background-light pt-24">
        <div className="absolute bottom-0 left-0 hidden lg:block">
          <ProfilePageAssets />
        </div>
        <div className=" min-h-screen w-full max-w-[1920px] pb-10">
          <div className="z-10 flex flex-col items-center">
            <div className="mb-10">
              <p className="text-center font-retro text-display-medium text-[#383D75]">
                Profile Pengguna
              </p>
            </div>
            <div className="flex w-full max-w-2xl flex-col items-center gap-5 lg:flex-row lg:items-start">
              {loading ? (
                <Skeleton
                  variant={'rectangular'}
                  animation="wave"
                  className="h-[160px] w-[160px]"
                />
              ) : isEdit ? (
                <label className="h-fit w-fit cursor-pointer">
                  <div>
                    <PhotoBox
                      imageUrl={
                        isChangePhoto
                          ? file
                          : userData.data?.awsImage
                          ? userData.data?.awsImage
                          : file
                      }
                    />
                    <p className="mt-3 w-full rounded-md border border-black text-center font-poppinsBold shadow-md">
                      Ubah Foto Profile
                    </p>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/jpeg, image/jpg, image/png, image/gif"
                      onChange={handleChange}
                    />
                  </div>
                </label>
              ) : (
                <div>
                  <PhotoBox
                    imageUrl={
                      isChangePhoto
                        ? file
                        : userData.data?.awsImage
                        ? userData.data?.awsImage
                        : file
                    }
                  />
                </div>
              )}

              <div className="flex w-full flex-col gap-5 px-3 md:px-0">
                <p className="mb-1 font-poppinsBold text-title-large tracking-wide text-[#383D75] ">
                  Data Diri
                </p>
                {loading ? (
                  <Skeleton
                    variant={'rectangular'}
                    animation="wave"
                    className="h-[55px] w-full rounded-lg"
                  />
                ) : isEdit ? (
                  <TextField
                    className=" text-primary"
                    placeholder="CBKadal"
                    label="Username / Nama Panggilan"
                    name="username"
                    required
                    rules={{
                      required: 'Anda harus mengisi username!',
                      maxLength: {
                        value: 50,
                        message: 'Username tidak boleh lebih dari 50 karakter.',
                      },
                      pattern: {
                        value: /^\S+$/,
                        message:
                          'Username tidak boleh mengandung white space atau spasi.',
                      },
                    }}
                    control={control}
                  />
                ) : (
                  <div>
                    <p className="font-poppinsBold text-sm text-[#383D75]">
                      Username / Nama Panggilan
                    </p>
                    <p className="pl-3 text-base font-semibold text-black">
                      {userData.data?.slug}
                    </p>
                  </div>
                )}
                {loading ? (
                  <Skeleton
                    variant={'rectangular'}
                    animation="wave"
                    className="h-[55px] w-full rounded-lg"
                  />
                ) : isEdit ? (
                  <TextField
                    className=" text-primary"
                    placeholder="Cicak bin Kadal"
                    label="Nama Lengkap"
                    name="fullName"
                    required
                    rules={{
                      required: 'Anda harus mengisi nama!',
                      maxLength: {
                        value: 50,
                        message: 'Nama tidak boleh lebih dari 50 karakter.',
                      },
                      pattern: {
                        value: /^[a-zA-Z\s]*$/,
                        message: 'Nama hanya berupa huruf.',
                      },
                    }}
                    control={control}
                  />
                ) : (
                  <div>
                    <p className="font-poppinsBold text-sm text-[#383D75]">
                      Nama Lengkap
                    </p>
                    <p className="pl-3 text-base font-semibold text-black">
                      {userData.data?.fullName}
                    </p>
                  </div>
                )}
                {loading ? (
                  <Skeleton
                    variant={'rectangular'}
                    animation="wave"
                    className="h-[55px] w-full rounded-lg"
                  />
                ) : isEdit ? (
                  <Select
                    className=" text-primary"
                    placeholder="Placeholder"
                    label="Jenis Elemen"
                    name="element"
                    required
                    rules={{ required: 'Anda harus memilih salah satu!' }}
                    control={control}
                    select
                  >
                    {elementTypes.data &&
                      elementTypes?.data?.map(
                        (elementType: ElementType, idx: number) => (
                          <MenuItem key={idx} value={elementType.id}>
                            {elementType.name}
                          </MenuItem>
                        )
                      )}
                  </Select>
                ) : (
                  <div>
                    <p className="font-poppinsBold text-sm text-[#383D75]">
                      Jenis Elemen
                    </p>
                    <p className="pl-3 text-base font-semibold text-black">
                      {userData.data?.elementType?.name}
                    </p>
                  </div>
                )}
                {element?.name == 'Mahasiswa' &&
                  (isEdit ? (
                    <Select
                      className=" text-primary"
                      placeholder="Placeholder"
                      label="Angkatan"
                      name="generation"
                      required
                      rules={{ required: 'Anda harus memilih salah satu!' }}
                      control={control}
                      select
                    >
                      {generations.data &&
                        generations.data.map(
                          (generation: Generation, idx: number) => (
                            <MenuItem key={idx} value={generation.id}>
                              {generation.name == 'Alumni'
                                ? `${generation.name}`
                                : `${generation.name} - ${generation.year}`}
                            </MenuItem>
                          )
                        )}
                    </Select>
                  ) : (
                    <div>
                      <p className="font-poppinsBold text-sm text-[#383D75]">
                        Angkatan
                      </p>
                      <p className="pl-3 text-base font-semibold text-black">
                        {userData.data?.generation?.name == 'Alumni'
                          ? userData.data?.generation?.name
                          : `${userData.data?.generation?.name} - ${userData.data?.generation?.year}`}
                      </p>
                    </div>
                  ))}

                {loading ? (
                  <Skeleton
                    variant={'rectangular'}
                    animation="wave"
                    className="h-[55px] w-full rounded-lg"
                  />
                ) : isEdit ? (
                  <TextField
                    className={` text-primary ${
                      element
                        ? element?.name == 'Mahasiswa'
                          ? 'block'
                          : 'hidden'
                        : 'hidden'
                    }`}
                    placeholder="Id Line"
                    label="Id Line"
                    name="lineId"
                    required
                    rules={{
                      required: 'Anda harus mengisi id Line!',
                      maxLength: {
                        value: 50,
                        message: 'Id LINE tidak boleh lebih dari 50 karakter.',
                      },
                      pattern: {
                        value: /^\S+$/,
                        message: 'Id LINE tidak boleh mengandung white space.',
                      },
                    }}
                    control={control}
                  />
                ) : (
                  <div
                    className={
                      userData.data?.elementType?.name == 'Mahasiswa'
                        ? 'block'
                        : 'hidden'
                    }
                  >
                    <p className="font-poppinsBold text-sm text-[#383D75]">
                      Id Line
                    </p>
                    <p className="pl-3 text-base font-semibold text-black">
                      {userData.data?.lineId}
                    </p>
                  </div>
                )}
                {loading ? (
                  <Skeleton
                    variant={'rectangular'}
                    animation="wave"
                    className="h-[55px] w-full rounded-lg"
                  />
                ) : isEdit ? (
                  <TextField
                    className={` text-primary ${
                      element
                        ? element?.name == 'Mahasiswa'
                          ? 'hidden'
                          : 'block'
                        : 'hidden'
                    }`}
                    placeholder="Nomor Whatsapp"
                    label="Nomor Whatsapp"
                    name="phoneNumber"
                    required
                    rules={{
                      required: 'Anda harus mengisi nomor Whatsapp!',
                      pattern: {
                        value: /^[0-9]*$/,
                        message: 'Nomor telepon hanya bisa terdiri dari angka.',
                      },
                    }}
                    control={control}
                  />
                ) : (
                  <div
                    className={
                      userData.data?.elementType?.name == 'Mahasiswa'
                        ? 'hidden'
                        : 'block'
                    }
                  >
                    <p className="font-poppinsBold text-sm text-[#383D75]">
                      Nomor Whatsapp
                    </p>
                    <p className="pl-3 text-base font-semibold text-black">
                      {userData.data?.phoneNumber}
                    </p>
                  </div>
                )}

                {isEdit ? (
                  <div
                    className={`flex w-full ${
                      userData.data?.isOnboarded
                        ? 'justify-between'
                        : 'justify-end'
                    }`}
                  >
                    {userData.data?.isOnboarded && (
                      <Button
                        className="w-fit px-5 py-3"
                        variant={2}
                        onClick={editTootgle}
                      >
                        Batal
                      </Button>
                    )}
                    <Button
                      className="w-fit px-5 py-3"
                      variant={1}
                      onClick={handleSubmitButton}
                      isLoading={loadingButton}
                      disabled={
                        element?.name == 'Mahasiswa'
                          ? mahasiswaError
                          : otherError
                      }
                    >
                      Simpan Perubahan
                    </Button>
                  </div>
                ) : (
                  <div className={`flex w-full justify-end`}>
                    <Button
                      className="w-fit px-5 py-3"
                      variant={2}
                      onClick={editTootgle}
                    >
                      Edit Profil
                    </Button>
                  </div>
                )}
                <div className="z-10 mt-5 flex w-full flex-col">
                  <p className="mb-1 font-poppinsBold text-title-large tracking-wide text-[#383D75] ">
                    Data Akun
                  </p>
                  <p className=" pl-2 font-poppinsBold text-body-medium tracking-wide text-[#383D75]">
                    Email
                  </p>
                  <p className=" pl-2 font-poppinsBold text-body-medium tracking-wide text-black">
                    {loading ? <Skeleton /> : email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
