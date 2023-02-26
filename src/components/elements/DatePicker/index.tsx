import { Calendar } from '@icons'
import { InputAdornment } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { CustomTextField } from '../Textfield/styled'
import { DatePickerProps } from './interface'

export const DatePicker: React.FC<DatePickerProps> = ({
  control,
  label,
  setValue,
  rules,
  id,
  name,
  disabled,
  minDate,
  maxDate,
  minTime,
  maxTime,
  minDateTime,
  maxDateTime,
  required,
  placeholder,
  className,
  title,
  subTitle,
}): JSX.Element => {
  // TODO: Write element's logic
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onBlur }, fieldState: { error } }) => (
        <div onBlur={onBlur} className={className}>
          {title && (
            <div className="flex flex-col">
              <label
                htmlFor={id}
                className="pb-2 font-poppinsBold text-title-medium"
              >
                {title} {required && <span className="text-red-normal">*</span>}
                {!!subTitle && (
                  <p className="flex flex-row items-center gap-x-2 font-poppins text-title-small">
                    {subTitle}
                  </p>
                )}
              </label>
            </div>
          )}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label={label}
              value={value}
              onChange={(newValue) => {
                setValue(name, newValue)
              }}
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
                    <CustomTextField
                      variant="filled"
                      fullWidth
                      onChange={(e) => {
                        params?.inputProps?.onChange &&
                          params.inputProps.onChange(e)
                      }}
                      label={params?.label as string}
                      placeholder={
                        placeholder ?? params?.inputProps?.placeholder
                      }
                      value={params?.inputProps?.value}
                      error={!!error}
                      disabled={disabled}
                      id={id ?? name}
                      type="text"
                      helperText={!!error && error!['message']?.toString()}
                      InputProps={{
                        disableUnderline: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Calendar
                              className="cursor-pointer transition-all hover:scale-125"
                              stroke="#272B52"
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </>
              )}
            />
          </LocalizationProvider>
        </div>
      )}
    />
  )
}
