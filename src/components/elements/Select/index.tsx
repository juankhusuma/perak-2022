import { createTheme, InputAdornment, ThemeProvider } from '@mui/material'
import { SelectFieldProps } from './interface'
import { CustomSelectField } from './styled'

export const Select: React.FC<SelectFieldProps> = ({
  className,
  disabled = false,
  label,
  placeholder,
  message,
  leftIcon,
  rightIcon,
  value,
  onChange,
  name,
  error = false,
  ref,
  type,
  select = false,
  children,
}) => {
  return (
    <div className={className}>
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
          ref={ref}
          variant="filled"
          disabled={disabled}
          onChange={onChange}
          value={value}
          error={error}
          label={label}
          placeholder={placeholder}
          helperText={message}
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
  )
}
