import { Control, RegisterOptions } from 'react-hook-form'

export interface TextFieldProps {
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
  type?: string
  placeholder?: string
  id?: string
  name: string
  label: string
  title?: string
  subTitle?: string
  leftIcon?: any
  rightIcon?: any
  className?: string
}
