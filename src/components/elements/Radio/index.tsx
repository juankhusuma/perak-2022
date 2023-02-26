import React, { useState } from 'react'
import { Controller, useController } from 'react-hook-form'
import { optionType, RadioProps } from './interface'

export const Radio: React.FC<RadioProps> = ({
  label,
  subLabel,
  options,
  name,
  required,
  disabled,
  setValue,
  control,
  rules,
  flexRow,
  className,
}): JSX.Element => {
  const [selectedItem, setSelectedItem] = useState<string>('')
  const handleChangeId = (e: any) => {
    const { id } = e.currentTarget
    setSelectedItem(id)
    setValue(name, id)
  }

  const {
    formState: { errors },
  } = useController({
    name,
    control,
    defaultValue: [],
  })

  return (
    <Controller
      name={name}
      key={label}
      control={control}
      rules={rules}
      render={({ field: { onBlur } }) => (
        <div onBlur={onBlur} className={className}>
          {label && (
            <div className="flex flex-col">
              <label className="font-poppinsBold text-title-medium">
                {label} {required && <span className="text-red-normal">*</span>}
                {!!subLabel && (
                  <p className="flex flex-row items-center gap-x-2 font-poppins text-title-small">
                    {subLabel}
                  </p>
                )}
              </label>
            </div>
          )}
          <div className={`flex ${flexRow ? 'flex-row gap-2' : 'flex-col'}`}>
            {options.map(({ label, value }: optionType, idx: number) => {
              return (
                <div className="flex items-center">
                  <input
                    type="radio"
                    className="w-0 opacity-0"
                    onChange={handleChangeId}
                    id={value?.toString() ?? label}
                    name={name}
                    value={value ?? label}
                    disabled={disabled}
                  ></input>
                  <label
                    htmlFor={value?.toString() ?? label}
                    className="cursor-pointer"
                  >
                    <div className="group flex select-none items-center justify-center space-x-2 p-2">
                      <div
                        className={`bg-black-700 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full transition-colors ease-in-out ${
                          disabled
                            ? 'bg-orange-light'
                            : `border-2 border-primary outline-primary ${
                                selectedItem === (value?.toString() ?? label)
                                  ? 'border-primary bg-onPrimary'
                                  : 'border-primary bg-cream-light outline-primary'
                              }`
                        }`}
                      >
                        <div
                          className={`h-2 w-2 rounded-full transition-all ease-in-out ${
                            disabled
                              ? 'bg-primary'
                              : `group-hover:ring-4 group-hover:ring-onPrimary ${
                                  selectedItem === (value?.toString() ?? label)
                                    ? 'bg-primary'
                                    : 'bg-transparent'
                                }`
                          }`}
                        ></div>
                      </div>
                      <p className="text-body-large">{label}</p>
                    </div>
                  </label>
                </div>
              )
            })}
          </div>
          {!!errors[name] && (
            <p className="flex flex-row items-center gap-x-2 text-label-medium text-red-normal">
              {errors[name]!['message']?.toString()}
            </p>
          )}
        </div>
      )}
    />
  )
}
