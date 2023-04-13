/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        retro: 'Retro',
        poppins: 'Poppins',
        poppinsBold: 'PoppinsBold',
      },
      colors: {
        primary: '#272B52',
        onPrimary: '#DC8F1A',
        primaryContainer: '#A3AA10',
        onPrimaryContainer: '#E9DEA6',
        success: '#B6F2D7',
        onSuccess: '#10613D',
        successContainer: '#188C58',
        onSuccessContainer: '#DCFAED',
        danger: '#F2B8B5',
        onDanger: '#601410',
        dangerContainer: '#8C1D18',
        onDangerContainer: '#F9DEDC',
        red: {
          light: '#CA5355',
          normal: '#A33233',
          dark: '#6D2223',
        },
        grey: {
          light: '#242A2B4D',
          normal: '#242A2BB2',
          dark: '#242A2B',
        },
        pink: {
          light: '#EFABD6',
          normal: '#E975BE',
          dark: '#C04994',
        },
        blue: {
          light: '#00E5AC',
          normal: '#6DB8C2',
          dark: '#2F7A84',
        },
        orange: {
          light: '#EABB76',
          normal: '#FEB048',
          dark: '#F36A22',
        },
        purple: {
          lightest: '#E0CDF2',
          light: '#BB83F2',
          normal: '#8C3FD9',
          dark: '#383D75',
          darkest: '#272B52',
        },
        cream: {
          light: '#F4EFD3',
          normal: '#E9DEA6',
          dark: '#A39B74',
        },
        green: {
          light: '#C7CC70',
          normal: '#A3AA10',
          dark: '#71770B',
        },
        background: {
          light: '#F4EFD3',
          normal: '#E9DEA6',
          dark: '#A39B74',
        },
      },
      fontSize: {
        'display-large': '57px',
        'display-medium': '45px',
        'display-small': '36px',
        'headline-large': '32px',
        'headline-medium': '28px',
        'headline-small': '24px',
        'title-large': '22px',
        'title-medium': '16px',
        'title-small': '14px',
        'label-large': '14px',
        'label-medium': '12px',
        'label-small': '11px',
        'body-large': '16px',
        'body-medium': '14px',
        'body-small': '12px',
        'p-md': '16px',
        'p-sm': '12px',
      },
      animation: {
        enter: 'enter 200ms ease-out',
        'slide-in': 'slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)',
        'slide-up': 'slide-up 1.2s cubic-bezier(.41,.73,.51,1.02)',
        leave: 'leave 150ms ease-in forwards',
      },
      keyframes: {
        enter: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        leave: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0.9)', opacity: 0 },
        },
        'slide-in': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      scale: {
        '-100': '-1',
      },
    },
  },
  plugins: [],
}
