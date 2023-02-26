import React, { useState, Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { OnBoardingFormProps, OnBoardingProps } from './interface'
import { SubmitHandler, useForm } from 'react-hook-form'
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

  const { handleSubmit, control } = useForm<OnBoardingFormProps>({
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<OnBoardingFormProps> = (data) => {
    const email = session?.user?.email as string
    mutation.mutate({
      email: email,
      fullName: data.nama,
      npm: data.npm,
      lineId: data.idLine,
      phone: data.noTlp,
    })
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
                  <div className="space-y-4">
                    <TextField
                      className="text-primary"
                      label="Nama"
                      name="nama"
                      required
                      rules={{
                        required: 'Anda harus memasukkan nama.',
                        pattern: {
                          value: /^[a-zA-Z\s]*$/,
                          message: 'Nama hanya berupa huruf.',
                        },
                      }}
                      control={control}
                    />
                    <TextField
                      className="text-primary"
                      label="NPM"
                      name="npm"
                      required
                      rules={{
                        required: 'Anda harus memasukkan NPM.',
                        pattern: {
                          value: /^\d{10}$/,
                          message: 'NPM hanya berupa angka yang panjangnya 10.',
                        },
                      }}
                      control={control}
                    />
                    <TextField
                      className="text-primary"
                      label="Id LINE"
                      name="idLine"
                      required
                      rules={{
                        required: 'Anda harus memasukkan Id LINE.',
                        pattern: {
                          value: /^\S+$/,
                          message:
                            'Id LINE tidak boleh mengandung white space.',
                        },
                      }}
                      control={control}
                    />
                    <TextField
                      className="text-primary"
                      label="Nomor Telepon"
                      name="noTlp"
                      required
                      rules={{
                        required: 'Anda harus memasukkan nomor telepon.',
                        pattern: {
                          value: /^[0-9]*$/,
                          message:
                            'Nomor telepon hanya bisa terdiri dari angka.',
                        },
                      }}
                      control={control}
                    />
                  </div>
                  <div className={`mt-4 space-y-2`}>
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-orange-normal px-4 py-3 font-poppinsBold text-sm font-bold text-primary hover:drop-shadow-md"
                      onClick={handleSubmit(onSubmit)}
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
