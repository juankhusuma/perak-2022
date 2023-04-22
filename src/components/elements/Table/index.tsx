import React from 'react'
import { TableProps } from './interface'

export const Table: React.FC<TableProps> = ({ header, content }) => {
  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="w-full table-auto border-separate border-spacing-y-2 text-left">
          <thead className="bg-orange-dark">
            <tr className="font-poppinsBold text-white">
              {header.map((header) => (
                <th className="px-4 py-2">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr></tr>
            {content.map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={
                      cellIndex === 1
                        ? 'bg-green-dark px-4 py-2 text-white'
                        : 'bg-orange-light px-4 py-2 text-purple-darkest'
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
