import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { api } from 'src/utils/api'
import { NextSeo } from 'next-seo'

export const ScanMeLeaderboardModule: React.FC = () => {
  const { data: users } = api.scanMe.getLeaderboard.useQuery()

  return (
    <>
      <NextSeo title="Leaderboard Scan Me" />
      <main className="min-h-screen bg-background-light p-4 pt-28 md:p-20">
        <div className="my-2 mt-4">
          <h1 className="text-center font-retro text-display-medium text-[#383D75]">
            Papan Peringkat Permainan
          </h1>
        </div>
        <TableContainer>
          <Table
            sx={{ minWidth: 300 }}
            className="border-separate border-spacing-y-3 bg-background-light"
          >
            <colgroup>
              <col style={{ width: '10%' }} />
              <col style={{ width: '75%' }} />
              <col style={{ width: '15%' }} />
            </colgroup>
            <TableHead className="rounded-l-lg">
              <TableRow className="rounded-lg bg-orange-dark">
                <TableCell
                  align="center"
                  className="font-poppinsBold text-white"
                >
                  Pos
                </TableCell>
                <TableCell className="font-poppinsBold text-white">
                  Nama
                </TableCell>
                <TableCell
                  align="center"
                  className="font-poppinsBold text-white"
                >
                  Point
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="bg-orange-light">
              {users?.map((user, index) => (
                <TableRow className="rounded-lg">
                  <TableCell
                    align="center"
                    className="font-poppins text-purple-darkest"
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-poppins text-purple-darkest">
                    {user?.name?.substring(0, 25)}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="font-poppins text-purple-darkest"
                  >
                    {user.scanMeScore ?? 0}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </>
  )
}

export default ScanMeLeaderboardModule
