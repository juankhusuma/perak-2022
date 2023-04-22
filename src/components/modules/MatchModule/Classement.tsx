import { Table } from '@elements'
import { useState } from 'react'

export const Classement: React.FC = () => {
  const [header, setHeader] = useState(['Pos', 'Team', 'Match', '+/-', 'Point'])
  const [content, setContent] = useState([
    ['1', 'Liverpool', '99', '+99', '111'],
    ['1', 'Liverpool', '99', '+99', '111'],
    ['1', 'Liverpool', '99', '+99', '111'],
    ['1', 'Liverpool', '99', '+99', '111'],
    ['1', 'Liverpool', '99', '+99', '111'],
  ])

  return (
    <>
      <div className="grid w-full justify-center gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
        {[...Array(4)].map((item, key) => (
          <div className="w-full overflow-x-auto">
            <p className="font-poppinsBold text-title-large text-purple-dark">
              Group A
            </p>
            <Table header={header} content={content} />
          </div>
        ))}
      </div>
    </>
  )
}
