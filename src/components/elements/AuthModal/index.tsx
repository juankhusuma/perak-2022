import { FC, Fragment, useEffect, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { Cross, Github, Google, Twitter } from '@icons'
import AuthModalImage from '@images/AuthModalImage.svg'
import { getProviders, signIn } from 'next-auth/react'
import { AuthModalProps } from './interface'

export const AuthModal: FC<AuthModalProps> = ({
  icon,
  title,
  message,
  onClose = () => {},
  isOpen,
  canClose = true,
}) => {
  // TODO: Write element's logic
  const [providers, setProviders] = useState<any>(null)

  useEffect(() => {
    getProviders().then((data) => {
      setProviders(data)
    })
  }, [])

  const renderProviderIcon = (providerId: string) => {
    switch (providerId) {
      case 'google':
        return <Google className="h-6 w-6" />
      case 'twitter':
        return <Twitter className="h-6 w-6" />
      case 'github':
        return <Github className="h-6 w-6" fill="black" />
      default:
        return null
    }
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={canClose ? onClose : () => {}}
        >
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
                <Dialog.Panel className="w-full max-w-[300px] transform overflow-hidden rounded-2xl bg-primary p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex w-full justify-end">
                    <div onClick={onClose}>
                      <XCircleIcon className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <div className="mb-5 flex w-full items-center justify-center">
                    {icon ?? <AuthModalImage className="-ml-2" />}
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-center font-poppinsBold text-title-large font-[1000] text-white"
                  >
                    {title ?? 'Ayo, mulai petualanganmu!'}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-center font-poppins text-label-large text-white">
                      {message ?? 'Bergabung bersama di pesta penuh hiburan'}
                    </p>
                  </div>

                  <div className="mt-4 space-y-3">
                    {providers &&
                      Object.values(providers).map((provider: any) => (
                        <button
                          key={provider.id}
                          type="button"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-orange-dark px-4 py-3 font-poppins text-label-medium text-sm tracking-[0.5px] text-white hover:drop-shadow-md"
                          onClick={() => {
                            signIn(provider.id, {
                              callbackUrl: '/',
                            })
                          }}
                        >
                          {renderProviderIcon(provider.id)}
                          Masuk dengan {provider.name}
                        </button>
                      ))}
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
