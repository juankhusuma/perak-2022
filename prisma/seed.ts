import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding db...')

  console.log('Seeding Generation table')
  const angkatanList = [
    {
      name: 'Alumni',
      year: null,
    },
    {
      name: 'Maung',
      year: 2019,
    },
    {
      name: 'Chronos',
      year: 2020,
    },
    {
      name: 'Bakung',
      year: 2021,
    },
    {
      name: 'Apollo',
      year: 2022,
    },
  ]
  for (const angkatan of angkatanList) {
    const generation = await prisma.generation.findFirst({
      where: angkatan,
    })
    if (!generation) {
      await prisma.generation.create({
        data: angkatan,
      })
    } else {
      await prisma.generation.update({
        where: {
          id: generation.id,
        },
        data: angkatan,
      })
    }
  }

  console.log('Seeding ElementType table')
  const elementType = ['Dosen', 'Kantin', 'Mahasiswa', 'Satpam']
  for (const type of elementType) {
    const elementType = await prisma.elementType.findFirst({
      where: {
        name: type,
      },
    })
    if (!elementType) {
      await prisma.elementType.create({
        data: {
          name: type,
        },
      })
    } else {
      await prisma.elementType.update({
        where: {
          id: elementType.id,
        },
        data: {
          name: type,
        },
      })
    }
  }

  console.log('Seeding TeamStatus table')
  const statuses = [
    {
      name: 'Menunggu Pembayaran',
      message: null,
    },
    {
      name: 'Menunggu Konfirmasi',
      message: null,
    },
    {
      name: 'Konfirmasi Gagal',
      message: 'Dana tidak masuk atau gambar tidak jelas.',
    },
    {
      name: 'Terkonfirmasi',
      message: null,
    },
    {
      name: 'Terfinalisasi',
      message: null,
    },
  ]
  for (const status of statuses) {
    const teamStatus = await prisma.teamStatus.findFirst({
      where: status,
    })
    if (!teamStatus) {
      await prisma.teamStatus.create({
        data: status,
      })
    } else {
      await prisma.teamStatus.update({
        where: {
          id: teamStatus.id,
        },
        data: status,
      })
    }
  }

  console.log('Seeding GameType table')
  const gameType = ['Competitive Games', 'Master League', 'Family Games']
  for (const type of gameType) {
    const gameType = await prisma.gameType.findFirst({
      where: {
        name: type,
      },
    })
    if (!gameType) {
      await prisma.gameType.create({
        data: {
          name: type,
        },
      })
    } else {
      await prisma.gameType.update({
        where: {
          id: gameType.id,
        },
        data: {
          name: type,
        },
      })
    }
  }

  console.log('Seeding Game table')
  const games = [
    {
      slug: 'dota2',
      name: 'Dota 2',
      gameTypeName: 'Competitive Games',
      teamCost: 60_000,
      individualCost: 12_000,
      startDate: '2023-04-14T00:00:00.000Z',
      endDate: '2023-06-11T00:00:00.000Z',
      minimumMembers: 5,
      maximumMembers: 10,
      idealMembers: 5,
      lineGroup: null,
      isIndividual: false,
    },
    {
      slug: 'valorant',
      name: 'Valorant',
      gameTypeName: 'Competitive Games',
      teamCost: 60_000,
      individualCost: 12_000,
      startDate: '2023-04-14T00:00:00.000Z',
      endDate: '2023-06-11T00:00:00.000Z',
      minimumMembers: 5,
      maximumMembers: 10,
      idealMembers: 5,
      lineGroup: null,
      isIndividual: false,
    },
    {
      slug: 'apex',
      name: 'Apex Legends',
      gameTypeName: 'Competitive Games',
      teamCost: 30_000,
      individualCost: 10_000,
      startDate: '2023-04-14T00:00:00.000Z',
      endDate: '2023-06-11T00:00:00.000Z',
      minimumMembers: 3,
      maximumMembers: 5,
      idealMembers: 5,
      lineGroup: null,
      isIndividual: false,
    },
    {
      slug: 'ml',
      name: 'Mobile Legends',
      gameTypeName: 'Competitive Games',
      teamCost: 60_000,
      individualCost: 12_000,
      startDate: '2023-04-14T00:00:00.000Z',
      endDate: '2023-06-11T00:00:00.000Z',
      minimumMembers: 5,
      maximumMembers: 10,
      idealMembers: 5,
      lineGroup: null,
      isIndividual: false,
    },
    {
      slug: 'chess',
      name: 'Chess',
      gameTypeName: 'Competitive Games',
      teamCost: null,
      individualCost: 15_000,
      startDate: '2023-04-14T00:00:00.000Z',
      endDate: '2023-06-11T00:00:00.000Z',
      minimumMembers: 1,
      maximumMembers: 1,
      idealMembers: 1,
      lineGroup: null,
      isIndividual: true,
    },
    {
      slug: 'fifa23',
      name: 'Fifa 23',
      gameTypeName: 'Competitive Games',
      teamCost: null,
      individualCost: 15_000,
      startDate: '2023-04-14T00:00:00.000Z',
      endDate: '2023-06-11T00:00:00.000Z',
      minimumMembers: 1,
      maximumMembers: 1,
      idealMembers: 1,
      lineGroup: null,
      isIndividual: true,
    },
    {
      slug: 'fg',
      name: 'Family Games',
      gameTypeName: 'Family Games',
      teamCost: 40_000,
      individualCost: null,
      startDate: '2023-04-14T00:00:00.000Z',
      endDate: '2023-06-11T00:00:00.000Z',
      minimumMembers: 4,
      maximumMembers: 4,
      idealMembers: 4,
      lineGroup: null,
      isIndividual: false,
    },
    {
      slug: 'futsal',
      name: 'Futsal',
      gameTypeName: 'Master League',
      teamCost: 350_000,
      individualCost: null,
      startDate: '2023-05-06T00:00:00.000Z',
      endDate: '2023-07-01T00:00:00.000Z',
      minimumMembers: 8,
      maximumMembers: 15,
      idealMembers: 8,
      lineGroup: 'https://line.me/ti/g/yYkVvHmr-v',
      isIndividual: false,
    },
    {
      slug: 'basket',
      name: 'Basket 3x3',
      gameTypeName: 'Master League',
      teamCost: 350_000,
      individualCost: null,
      startDate: '2023-05-06T00:00:00.000Z',
      endDate: '2023-07-01T00:00:00.000Z',
      minimumMembers: 4,
      maximumMembers: 7,
      idealMembers: 4,
      lineGroup: 'https://line.me/ti/g/W5npXxdKF0',
      isIndividual: false,
    },
  ]

  const games_list = []

  for (const game of games) {
    const gameData = await prisma.game.findFirst({
      where: {
        name: game.name,
      },
    })
    let tempGame
    if (!gameData) {
      tempGame = await prisma.game.create({
        data: game,
      })
    } else {
      tempGame = await prisma.game.update({
        where: {
          id: gameData.id,
        },
        data: game,
      })
    }
    games_list.push(tempGame.id)
  }

  console.log('Seeding ChallengeStatuses table')
  const challengeStatuses = [
    'Menunggu Bukti Tantangan',
    'Menunggu Konfirmasi',
    'Bukti Terkonfirmasi',
    'Bukti Ditolak',
  ]
  for (const challengeStatus of challengeStatuses) {
    const status = await prisma.challengeStatus.findFirst({
      where: {
        name: challengeStatus,
      },
    })
    if (!status) {
      await prisma.challengeStatus.create({
        data: {
          name: challengeStatus,
        },
      })
    } else {
      await prisma.challengeStatus.update({
        where: {
          id: status.id,
        },
        data: {
          name: challengeStatus,
        },
      })
    }
  }

  console.log('Seeding Team Table')
  const teams = [
    {
      slug: 'stepbro',
      name: 'Step Bro',
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
    },
    {
      slug: 'perak',
      name: 'PERAK Fasilkom',
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
    },
    {
      slug: 'valulrant',
      name: 'VALOMEGALULRANT',
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
    },
    {
      slug: 'ml',
      name: 'Mobile Legenda',
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
    },
    {
      slug: 'magnus',
      name: 'Magnus Carlsen',
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
    },
    {
      slug: 'fifa23',
      name: 'FIFA 23',
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
    },
  ]

  const team_list = []
  for (const team of teams) {
    let teamTemp

    const teamData = await prisma.team.findFirst({
      where: {
        name: team?.name,
      },
    })
    if (!teamData) {
      teamTemp = await prisma.team.create({
        data: team,
      })
    } else {
      teamTemp = await prisma.team.update({
        where: {
          id: teamData.id,
        },
        data: team,
      })
    }
    team_list.push(teamTemp?.id)
  }

  console.log('Seeding Schedule Table')
  const schedules = [
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'Quarter Final',
      date: new Date('2023-07-04T00:00:00.000Z'),
    },
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'Semi Final',
      date: new Date('2024-07-05T00:00:00.000Z'),
    },
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'Semi Final',
      date: new Date('2023-08-01T00:00:00.000Z'),
    },
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'Grand Final',
      date: new Date('2025-06-09T00:00:00.000Z'),
    },
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'Grand Final',
      date: new Date('2023-07-08T00:00:00.000Z'),
    },
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'Quarter Final',
      date: new Date('2023-07-02T00:00:00.000Z'),
    },
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'Semi Final',
      date: new Date('2023-07-03T00:00:00.000Z'),
    },
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'Group Stage',
      date: new Date('2023-07-06T00:00:00.000Z'),
    },
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'All Star Match',
      date: new Date('2023-07-06T00:00:00.000Z'),
    },
  ]
  for (const schedule of schedules) {
    await prisma.schedule.create({
      data: {
        gameId: schedule?.gameId,
        date: schedule?.date,
        title: schedule?.title,
        team: {
          connect: schedule.teamId.map((id) => ({ id })),
        },
      },
    })
  }

  console.log('Seeding Result Table')
  const results = [
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'Quarter Final',
      team1Score: '12',
      team2Score: '0',
      date: new Date('2023-07-04T00:00:00.000Z'),
      videoLink: 'https://youtube.com',
    },
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'Semi Final',
      team1Score: '9',
      team2Score: '7',
      date: new Date('2024-07-05T00:00:00.000Z'),
      videoLink: 'https://youtube.com',
    },
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'Semi Final',
      team1Score: '2',
      team2Score: '1',
      date: new Date('2023-08-01T00:00:00.000Z'),
      videoLink: 'https://youtube.com',
    },
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'Grand Final',
      team1Score: '3',
      team2Score: '2',
      date: new Date('2025-06-09T00:00:00.000Z'),
      videoLink: 'https://youtube.com',
    },
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'Grand Final',
      team1Score: '5',
      team2Score: '2',
      date: new Date('2023-07-08T00:00:00.000Z'),
      videoLink: 'https://youtube.com',
    },
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'Quarter Final',
      team1Score: '1',
      team2Score: '0',
      date: new Date('2023-07-02T00:00:00.000Z'),
      videoLink: 'https://youtube.com',
    },
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'Semi Final',
      team1Score: '0',
      team2Score: '2',
      date: new Date('2023-07-03T00:00:00.000Z'),
      videoLink: 'https://youtube.com',
    },
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'Group Stage',
      team1Score: '1',
      team2Score: '2',
      date: new Date('2023-07-06T00:00:00.000Z'),
      videoLink: 'https://youtube.com',
    },
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'All Star Match',
      team1Score: '2',
      team2Score: '3',
      date: new Date('2023-07-06T00:00:00.000Z'),
      videoLink: 'https://youtube.com',
    },
  ]
  for (const result of results) {
    await prisma.result.create({
      data: {
        gameId: result?.gameId,
        date: result?.date,
        title: result?.title,
        team1Score: result?.team1Score,
        team2Score: result?.team2Score,
        team: {
          connect: result.teamId.map((id) => ({ id })),
        },
        videoLink: result?.videoLink,
      },
    })
  }

  console.log('Seeding Live Table')
  const liveItems = [
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'Quarter Final',
      team1Score: '12',
      team2Score: '0',
      date: new Date('2023-07-04T00:00:00.000Z'),
      link: 'https://www.youtube.com/',
    },
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'Semi Final',
      team1Score: '9',
      team2Score: '7',
      date: new Date('2024-07-05T00:00:00.000Z'),
      link: 'https://www.youtube.com/',
    },
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'Semi Final',
      team1Score: '2',
      team2Score: '1',
      date: new Date('2023-08-01T00:00:00.000Z'),
      link: 'https://www.youtube.com/',
    },
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'Grand Final',
      team1Score: '3',
      team2Score: '2',
      date: new Date('2025-06-09T00:00:00.000Z'),
      link: 'https://www.youtube.com/',
    },
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'Grand Final',
      team1Score: '5',
      team2Score: '2',
      date: new Date('2023-07-08T00:00:00.000Z'),
      link: 'https://www.youtube.com/',
    },
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'Quarter Final',
      team1Score: '1',
      team2Score: '0',
      date: new Date('2023-07-02T00:00:00.000Z'),
      link: 'https://www.youtube.com/',
    },
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'Semi Final',
      team1Score: '0',
      team2Score: '2',
      date: new Date('2023-07-03T00:00:00.000Z'),
      link: 'https://www.youtube.com/',
    },
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'Group Stage',
      team1Score: '1',
      team2Score: '2',
      date: new Date('2023-07-06T00:00:00.000Z'),
      link: 'https://www.youtube.com/',
    },
    {
      gameId: games_list[Math.floor(Math.random() * games_list.length)],
      teamId: [
        team_list[Math.floor(Math.random() * team_list.length)],
        team_list[Math.floor(Math.random() * team_list.length)],
      ],
      title: 'All Star Match',
      team1Score: '2',
      team2Score: '3',
      date: new Date('2023-07-06T00:00:00.000Z'),
      link: 'https://www.youtube.com/',
    },
  ]
  for (const item of liveItems) {
    await prisma.live.create({
      data: {
        gameId: item?.gameId,
        date: item?.date,
        title: item?.title,
        team1Score: item?.team1Score,
        team2Score: item?.team2Score,
        link: item?.link,
        team: {
          connect: item.teamId.map((id) => ({ id })),
        },
      },
    })
  }
}

main()
  .then(async () => {
    console.log('Done!')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    console.log('Error in seeding')
    await prisma.$disconnect()
    process.exit(1)
  })
