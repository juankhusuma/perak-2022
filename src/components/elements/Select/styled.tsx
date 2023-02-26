import { styled, TextField as Input } from '@mui/material'

export const CustomSelectField = styled(Input)(({ theme }) => ({
  '& .MuiFilledInput-root': {
    overflow: 'hidden',
    fontFamily: 'Poppins',
    color: '#383D75',
    fontWeight: 'bold',
    background: '#FFFFFF',
    border: '2px solid #383D75',
    borderRadius: 10,
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&.Mui-focused': {
      color: '#DC8F1A',
      border: '2px solid #DC8F1A',
      background: '#FFFFFF',
    },
    '&.Mui-error': {
      border: '2px solid #6D2223',
      color: '#DC8F1A',
      background: '#FFFFFF',
    },
    '&.Mui-disabled': {
      border: '2px solid #A39B74',
      background: '#FFFFFF',
    },
    '&:hover': {
      border: '2px solid #DC8F1A',
      background: '#FFFFFF',
    },
  },
  '& label': {
    marginTop: '2px',
    fontFamily: 'Poppins',
    color: '#FEB048',
    fontWeight: 'bold',
    '&.Mui-focused': {
      color: '#FEB048',
      fontWeight: 'bold',
    },
    '&.Mui-error': {
      color: '#A33233',
      fontWeight: 'bold',
    },
    '&.Mui-disabled': {
      color: '#888BAC',
      fontWeight: 'bold',
    },
  },
  '& .MuiFormHelperText-root': {
    marginLeft: 0,
    fontFamily: 'Poppins',
    color: '#383D75',
    fontSize: '12px',
    '&.Mui-error': {
      color: '#A33233',
    },
    '&.Mui-disabled': {
      color: '#A39B74',
    },
  },
}))
