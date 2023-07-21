import { FC, Fragment } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { CalendlyProps } from './interface'
import { Cross } from '@icons'
import { InlineWidget } from 'react-calendly'

export const Calendly: FC<CalendlyProps> = ({
  onClose = () => {},
  isOpen,
  canClose = true,
  url,
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
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative h-full max-h-screen w-full transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all md:max-w-[400px] md:rounded-2xl">
                  <div className="absolute left-1 top-1 md:hidden">
                    <div onClick={onClose}>
                      <Cross className="cursor-pointer" />
                    </div>
                  </div>
                  <InlineWidget url={url} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
