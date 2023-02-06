import React from 'react'

import { Toasterror, Toastsuccess } from '@icons'
import { toast } from 'react-hot-toast'
import { ToastProps } from './interface'

export const Toast = (params: ToastProps) => {
  {
    params.type === 'success' &&
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } pointer-events-auto flex max-w-md items-center justify-between rounded-lg border-2 border-solid border-green-light bg-green-normal px-3 py-1 shadow-lg`}
        >
          <Toastsuccess />
          <div className="flex flex-col justify-center px-4 py-2">
            <div className="text-md font-poppinsBold text-cream-light">
              {params.message ?? 'Success'}
            </div>
            <div className="font-poppins text-sm text-cream-light/70">
              {params.description ?? ''}
            </div>
          </div>
        </div>
      ))
  }
  {
    params.type === 'error' &&
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } pointer-events-auto flex max-w-md items-center justify-between rounded-lg border-2 border-solid border-red-light bg-red-normal px-3 py-1 shadow-lg`}
        >
          <Toasterror />
          <div className="flex flex-col justify-center px-4 py-2">
            <div className="text-md font-poppinsBold text-cream-light">
              {params.message ?? 'Success'}
            </div>
            <div className="font-poppins text-sm text-cream-light/70">
              {params.description ?? ''}
            </div>
          </div>
        </div>
      ))
  }
}
