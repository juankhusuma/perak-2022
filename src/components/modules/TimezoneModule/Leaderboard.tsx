import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useSession } from 'next-auth/react'
import React from 'react'
import { LeaderboardProps } from './interface'

export const Leaderboard: React.FC<LeaderboardProps> = ({
  leaderboardData,
}) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const { data: session } = useSession()

  return (
    <>
      <TableContainer id="leaderboard">
        <table className="w-full border-separate border-spacing-y-3 bg-background-light">
          <colgroup>
            <col style={{ width: '5%' }} />
            <col style={{ width: '75%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
          </colgroup>
          <TableHead className="rounded-l-lg">
            <TableRow className="rounded-lg bg-orange-dark">
              <TableCell align="center" className="font-poppinsBold text-white">
                <p className="font-poppinsBold text-white">Pos</p>
              </TableCell>
              <TableCell className="font-poppinsBold text-white">
                <p className="font-poppinsBold text-white">Nama</p>
              </TableCell>
              <TableCell align="center" className="font-poppinsBold text-white">
                <p className="font-poppinsBold text-white">Attempt</p>
              </TableCell>
              <TableCell align="center" className="font-poppinsBold text-white">
                <p className="font-poppinsBold text-white">Point</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="bg-orange-light">
            {leaderboardData?.slice(0, rowsPerPage).map((row, index) => (
              <TableRow
                className={`rounded-lg ${
                  row.user?.id === session?.user?.id && 'bg-green-light'
                }`}
              >
                <TableCell align="center">
                  <p className="font-poppins text-purple-darkest">
                    {index + 1}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="truncate font-poppins text-purple-darkest">
                    {row.user?.fullName}
                  </p>
                </TableCell>
                <TableCell align="center">
                  <p className="font-poppins text-purple-darkest">
                    {row.attempts}
                  </p>
                </TableCell>
                <TableCell align="center">
                  <p className="font-poppins text-purple-darkest">
                    {row.highScore}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {leaderboardData && leaderboardData.length > 10 && (
            <TableBody>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <p className="flex items-center justify-center font-poppinsBold text-title-large text-primary">
                    ...
                  </p>
                </TableCell>
              </TableRow>
              <TableRow className="rounded-lg bg-green-light">
                <TableCell align="center">
                  <p className="font-poppins text-purple-darkest">
                    {leaderboardData[10].rank}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="truncate font-poppins text-purple-darkest">
                    {leaderboardData[10].user?.fullName}
                  </p>
                </TableCell>
                <TableCell align="center">
                  <p className="font-poppins text-purple-darkest">
                    {leaderboardData[10].attempts}
                  </p>
                </TableCell>
                <TableCell align="center">
                  <p className="font-poppins text-purple-darkest">
                    {leaderboardData[10].highScore}
                  </p>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </table>
      </TableContainer>
    </>
  )
}

export default Leaderboard
