import { TextField } from '@elements'
import { Calendar } from '@icons'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import React, { useState } from 'react'
import { DatePickerProps } from './interface'

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  message,
  error,
  disabled = false,
  minDate,
  maxDate,
  minTime,
  maxTime,
  minDateTime,
  maxDateTime,
}) => {
  // TODO: Write element's logic
  // const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-07'))
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={label}
        value={value}
        onChange={onChange}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        PopperProps={{
          placement: 'bottom-end',
          anchorEl: anchorEl,
        }}
        minDate={minDate}
        maxDate={maxDate}
        minTime={minTime}
        maxTime={maxTime}
        minDateTime={minDateTime}
        maxDateTime={maxDateTime}
        disabled={disabled}
        renderInput={(params) => (
          <>
            <div
              className="block w-full"
              onClick={(e) => {
                setOpen(true)
                setAnchorEl(e.currentTarget)
              }}
            >
              <TextField
                onChange={(e) => {
                  params?.inputProps?.onChange && params.inputProps.onChange(e)
                }}
                label={params?.label as string}
                placeholder={params?.inputProps?.placeholder}
                value={params?.inputProps?.value}
                message={message}
                error={Boolean(error)}
                disabled={disabled}
                rightIcon={
                  <Calendar
                    className="cursor-pointer transition-all hover:scale-125"
                    stroke="#272B52"
                  />
                }
              />
            </div>
          </>
        )}
      />
    </LocalizationProvider>
  )
}
