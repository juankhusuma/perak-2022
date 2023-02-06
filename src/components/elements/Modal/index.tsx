import { FC, Fragment } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { ModalProps } from './interface'
import { Cross } from '@icons'

export const Modal: FC<ModalProps> = ({
  className,
  icon,
  title,
  message,
  onClose = () => {},
  onOpen = () => {},
  isOpen,
  primary,
  primaryClicked = () => {},
  secondary,
  secondaryClicked = () => {},
  variant,
  canClose = true,
}) => {
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
                  <div
                    className={`flex w-full justify-end ${
                      variant != 3 && 'hidden'
                    }`}
                  >
                    <div onClick={onClose}>
                      <Cross className="cursor-pointer" />
                    </div>
                  </div>
                  <div className="mb-5 flex w-full items-center justify-center">
                    {icon}
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-center font-poppinsBold text-title-large font-[1000] text-orange-normal"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-center font-poppins text-label-large text-white">
                      {message}
                    </p>
                  </div>

                  <div
                    className={`mt-4 ${
                      variant == 2 ? 'flex gap-2' : 'space-y-2'
                    } ${variant == 3 && 'hidden'}`}
                  >
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-orange-normal px-4 py-3 font-poppinsBold text-sm font-bold text-primary hover:drop-shadow-md"
                      onClick={primaryClicked}
                    >
                      {primary}
                    </button>
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-primaryContainer px-4 py-3 font-poppinsBold text-sm font-bold text-primary hover:drop-shadow-md"
                      onClick={secondaryClicked}
                    >
                      {secondary}
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
