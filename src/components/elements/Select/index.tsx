import { createTheme, InputAdornment, ThemeProvider } from '@mui/material'
import { Controller } from 'react-hook-form'
import { SelectFieldProps } from './interface'
import { CustomSelectField } from './styled'

export const Select: React.FC<SelectFieldProps> = ({
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
  select = false,
  children,
}) => {
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
          <ThemeProvider
            theme={createTheme({
              components: {
                MuiMenuItem: {
                  styleOverrides: {
                    root: {
                      fontFamily: 'Poppins',
                      color: '#383D75',
                      fontWeight: 'bold',
                      '&:hover': {
                        color: '#DC8F1A',
                        fontWeight: 'bold',
                      },
                      '&.Mui-focusVisible': {
                        color: '#DC8F1A',
                        fontWeight: 'bold',
                      },

                      '&.Mui-selected': {
                        color: '#DC8F1A',
                        fontWeight: 'bold',
                        '&:hover': {
                          color: '#DC8F1A',
                          fontWeight: 'bold',
                        },
                        '&.Mui-focusVisible': {
                          color: '#383D75',
                          fontWeight: 'bold',
                        },
                      },
                    },
                  },
                },
              },
            })}
          >
            <CustomSelectField
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
              select={select}
              InputProps={{
                disableUnderline: true,
                startAdornment: leftIcon ? (
                  <InputAdornment position="start">{leftIcon}</InputAdornment>
                ) : undefined,
                endAdornment: rightIcon ? (
                  <InputAdornment position="end">{rightIcon}</InputAdornment>
                ) : undefined,
              }}
            >
              {children}
            </CustomSelectField>
          </ThemeProvider>
        </div>
      )}
    />
  )
}
