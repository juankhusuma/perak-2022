import { Control, RegisterOptions } from 'react-hook-form'

export interface CheckboxProps {
  control: Control<any>
  rules?: Pick<
    RegisterOptions,
    | 'required'
    | 'min'
    | 'max'
    | 'minLength'
    | 'maxLength'
    | 'pattern'
    | 'validate'
  >
  required?: boolean
  disabled?: boolean
  label: string
  subLabel?: string
  id?: string
  name: string
  setValue?: any
  options: optionType[]
  className?: string
}

export interface optionType {
  label: string
  value?: string | number
}
