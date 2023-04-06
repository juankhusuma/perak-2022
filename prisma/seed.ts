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
  for (const game of games) {
    const gameData = await prisma.game.findFirst({
      where: {
        name: game.name,
      },
    })
    if (!gameData) {
      await prisma.game.create({
        data: game,
      })
    } else {
      await prisma.game.update({
        where: {
          id: gameData.id,
        },
        data: game,
      })
    }
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
