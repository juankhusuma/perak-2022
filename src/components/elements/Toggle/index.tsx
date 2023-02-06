import { useState } from 'react'
import { Switch } from '@headlessui/react'
import { ToggleProps } from './interface'

export const Toggle: React.FC<ToggleProps> = ({ enabled, setEnabled }) => {
  return (
    <div className="">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled
            ? 'bg-orange-normal ring-2 ring-orange-normal'
            : 'bg-orange-normal bg-opacity-30 ring-2 ring-orange-normal'
        }
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-primary shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  )
}
