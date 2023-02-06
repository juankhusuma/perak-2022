import { Dayjs } from 'dayjs'

export interface DatePickerProps {
  label: string
  value: string
  message?: string
  error?: any
  onChange: (value: any) => void
  disabled?: boolean
  minDate?: Dayjs
  maxDate?: Dayjs
  minTime?: Dayjs
  maxTime?: Dayjs
  minDateTime?: Dayjs
  maxDateTime?: Dayjs
}
