import React, { useState, Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { OnBoardingProps } from './interface'
import { Controller, useForm } from 'react-hook-form'
import { TextField } from '@elements'
import { useSession } from 'next-auth/react'
import { api } from 'src/utils/api'
import { toast } from 'react-hot-toast'

export const Onboarding: React.FC<OnBoardingProps> = ({ children }) => {
  // TODO: Write element's logic

  const [isOpenBoarded, setIsOpenBoarded] = useState(false)

  const [loading, setLoading] = useState(false)

  const [toastId, setToastId] = useState('')

  const { data: session, status } = useSession()

  const onBoarding = api.onBoarding.check.useQuery({
    email: session?.user?.email as string,
  })

  const mutation = api.onBoarding.add.useMutation()

  useEffect(() => {
    if (status == 'authenticated') {
      if (!onBoarding.data?.isOnboarded) {
        setIsOpenBoarded(true)
      }
    }
  }, [onBoarding.isSuccess])

  const onClose = () => {}

  const {
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  })

  const handleClick = () => {
    if (
      Boolean(errors.nama || errors.npm || errors.idLine || errors.noTlp) ||
      !Boolean(watch('nama')) ||
      !Boolean(watch('npm')) ||
      !Boolean(watch('idLine')) ||
      !Boolean(watch('noTlp'))
    ) {
      toast.error('Harap masukan input yang benar!')
    } else {
      const nama = watch('nama') as string
      const npm = watch('npm') as string
      const idLine = watch('idLine') as string
      const noTlp = watch('noTlp') as string
      const email = session?.user?.email as string
      mutation.mutate({
        email: email,
        fullName: nama,
        npm: npm,
        lineId: idLine,
        phone: noTlp,
      })
    }
  }

  useEffect(() => {
    if (mutation.status == 'loading') {
      const toastId = toast.loading('Loading')
      setLoading(true)
      setToastId(toastId)
    }
    if (mutation.status == 'success') {
      toast.success('Berhasil On Boarding', { id: toastId })
      setIsOpenBoarded(false)
      setLoading(false)
    }
    if (mutation.status == 'error') {
      toast.error(mutation.error.message, { id: toastId })
      setLoading(false)
    }
  }, [mutation.status])

  return (
    <>
      {children}
      <Transition appear show={isOpenBoarded} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[300px] transform overflow-hidden rounded-2xl bg-primary p-6 text-left align-middle shadow-xl transition-all md:max-w-[500px]">
                  <div className="mb-5 flex w-full items-center justify-center"></div>
                  <Dialog.Title
                    as="h3"
                    className="text-center font-poppinsBold text-title-large font-[1000] text-orange-normal"
                  >
                    On Boarding
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="mb-5 text-center font-poppins text-label-large text-white">
                      Kamu sudah login, harap untuk melengkapi data-data yang
                      ada di bawah ini untuk melanjutkan.
                    </p>
                  </div>

                  <Controller
                    name="nama"
                    control={control}
                    rules={{
                      required: 'Anda harus memasukkan nama.',
                      pattern: {
                        value: /^\d{10}$/,
                        message: 'Nama hanya berupa huruf.',
                      },
                    }}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => {
                      return (
                        <div onBlur={onBlur} className="mt-2 w-full max-w-md">
                          <TextField
                            error={Boolean(error)}
                            message={error?.message}
                            value={value}
                            onChange={onChange}
                            label="Nama"
                            className=""
                          />
                        </div>
                      )
                    }}
                  />
                  <Controller
                    name="npm"
                    control={control}
                    rules={{
                      required: 'Anda harus memasukkan NPM.',
                      pattern: {
                        value: /^[0-9]*$/,
                        message: 'NPM hanya berupa angka.',
                      },
                    }}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => {
                      return (
                        <div onBlur={onBlur} className="mt-2 w-full max-w-md">
                          <TextField
                            error={Boolean(error)}
                            message={error?.message}
                            value={value}
                            onChange={onChange}
                            label="NPM"
                            className=""
                          />
                        </div>
                      )
                    }}
                  />
                  <Controller
                    name="idLine"
                    control={control}
                    rules={{
                      required: 'Anda harus memasukkan Id LINE.',
                      pattern: {
                        value: /^\S+$/,
                        message:
                          'Id LINE hanya bisa terdiri dari huruf dan angka.',
                      },
                    }}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => {
                      return (
                        <div onBlur={onBlur} className="mt-2 w-full max-w-md">
                          <TextField
                            error={Boolean(error)}
                            message={error?.message}
                            value={value}
                            onChange={onChange}
                            label="Id LINE"
                          />
                        </div>
                      )
                    }}
                  />
                  <Controller
                    name="noTlp"
                    control={control}
                    rules={{
                      required: 'Anda harus memasukkan nomor telepon.',
                      pattern: {
                        value: /^[0-9]*$/,
                        message: 'Nomor telepon hanya bisa terdiri dari angka.',
                      },
                    }}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => {
                      return (
                        <div onBlur={onBlur} className="mt-2 w-full max-w-md">
                          <TextField
                            error={Boolean(error)}
                            message={error?.message}
                            value={value}
                            onChange={onChange}
                            label="Nomor Telepon"
                          />
                        </div>
                      )
                    }}
                  />
                  <div className={`mt-4 space-y-2`}>
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-orange-normal px-4 py-3 font-poppinsBold text-sm font-bold text-primary hover:drop-shadow-md"
                      onClick={handleClick}
                      disabled={loading}
                    >
                      Simpan
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
