import { Checkbox as MUICheckbox, checkboxClasses, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useController } from 'react-hook-form'
import { CheckboxProps, optionType } from './interface'

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  options,
  name,
  required,
  disabled,
  setValue,
  control,
  className,
  rules,
}): JSX.Element => {
  // TODO: Update to support forms
  const [selectedItems, setSelectedItems] = useState<any>([])

  const handleSelect = (value: any) => {
    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter((item: any) => item !== value))
    } else {
      setSelectedItems([...selectedItems, value])
    }
  }

  useEffect(() => {
    setValue(name, selectedItems)
  }, [selectedItems])

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
          <p className="font-poppinsBold text-base">
            {label} {required && <span className="text-red-normal">*</span>}
          </p>
          {options.map(({ label, value }: optionType, idx: number) => {
            return (
              <div className="flex flex-row items-center">
                <MUICheckbox
                  key={idx}
                  name={`${name}.${value ?? label}`}
                  value={value ?? label}
                  checked={!selectedItems.includes(value ?? label)}
                  checkedIcon={<CustomCheckboxIcon />}
                  icon={<CustomCheckboxCheckedIcon />}
                  onChange={() => {
                    handleSelect(value ?? label)
                  }}
                  disabled={disabled}
                />
                <p>{label}</p>
              </div>
            )
          })}
          {!!errors[name] && (
            <p className="flex flex-row items-center gap-x-2 pt-2 text-sm text-red-normal">
              {errors[name]!['type'] == 'required'
                ? 'Mohon pilih salah satu dari pilihan diatas'
                : errors[name]!['message']?.toString()}
            </p>
          )}
        </div>
      )}
    />
  )
}

const CustomCheckboxIcon = styled('span')(({ theme }) => ({
  borderRadius: 4,
  width: 20,
  height: 20,
  boxShadow: 'inset 0 0 0 2px #272B52',
  backgroundColor: '#F4EFD3',
  'input:hover ~ &': {
    backgroundColor: '#F4EFD3',
  },
  'input:disabled ~ &': {
    background: '#4F579E',
  },
}))

const CustomCheckboxCheckedIcon = styled(CustomCheckboxIcon)({
  backgroundColor: '#FEB048',
  backgroundImage:
    'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 20,
    height: 20,
    backgroundImage: "url('/assets/images/mark.svg')",
    backgroundSize: '12px 12px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#FEB048',
  },
  'input:disabled ~ &': {
    background: '#4F579E',
  },
})
