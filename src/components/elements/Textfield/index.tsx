import { InputAdornment } from '@mui/material'
import { Controller, useController } from 'react-hook-form'
import { TextFieldProps } from './interface'
import { CustomTextField } from './styled'

export const TextField: React.FC<TextFieldProps> = ({
  id,
  name,
  type,
  required,
  label,
  title,
  subTitle,
  control,
  rules,
  disabled,
  placeholder,
  leftIcon,
  rightIcon,
  className,
}): JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <div className={className}>
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
          <CustomTextField
            onBlur={onBlur}
            variant="filled"
            disabled={disabled}
            onChange={onChange}
            value={value}
            error={!!error}
            label={label}
            placeholder={placeholder}
            helperText={!!error && error!['message']?.toString()}
            fullWidth
            type={type}
            name={name}
            id={id ?? name}
            InputProps={{
              disableUnderline: true,
              startAdornment: leftIcon ? (
                <InputAdornment position="start">{leftIcon}</InputAdornment>
              ) : undefined,
              endAdornment: rightIcon ? (
                <InputAdornment position="end">{rightIcon}</InputAdornment>
              ) : undefined,
            }}
          />
        </div>
      )}
    />
  )
}
