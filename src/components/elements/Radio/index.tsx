import React from 'react'
import { RadioProps } from './interface'

export const Radio: React.FC<RadioProps> = ({
  children,
  name,
  value,
  handleChange,
  isSelected,
}) => {
  const handleChangeId = (e: any) => {
    const { id } = e.currentTarget
    handleChange(id)
  }
  return (
    <div className="flex">
      <input
        type="radio"
        className="w-0 opacity-0"
        onChange={handleChangeId}
        id={value}
        name={name}
        value={value}
      ></input>
      <label htmlFor={value} className="cursor-pointer">
        <div className="group flex select-none items-center justify-center space-x-2 font-sans">
          <div
            className={`bg-black-700 h-5 w-5 cursor-pointer rounded-full ${
              isSelected
                ? 'border-primary bg-onPrimaryContainer'
                : 'border-primary outline-primary'
            }  flex items-center justify-center border-2 border-primary outline-primary transition-colors ease-in-out`}
          >
            <div
              className={`h-2 w-2 rounded-full  ${
                isSelected ? 'bg-primary' : 'bg-transparent'
              } transition-all ease-in-out group-hover:ring-4 group-hover:ring-onPrimaryContainer`}
            ></div>
          </div>
          <p className="font-poppinsBold text-label-large font-extrabold text-primary">
            {children}
          </p>
        </div>
      </label>
    </div>
  )
}
