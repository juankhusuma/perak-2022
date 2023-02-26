import { Control, RegisterOptions } from 'react-hook-form'
import { Dayjs } from 'dayjs'

export interface DatePickerProps {
  control: Control<any>
  name: string
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
  id?: string
  label: string
  setValue: any
  disabled?: boolean
  minDate?: Dayjs
  maxDate?: Dayjs
  minTime?: Dayjs
  maxTime?: Dayjs
  minDateTime?: Dayjs
  maxDateTime?: Dayjs
  required?: boolean
  className?: string
  placeholder?: string
  title?: string
  subTitle?: string
}
