import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const collaborators: Prisma.CollaboratorCreateInput[] = [
  {
    name: 'Alice Johnson',
    age: 30,
    gender: 'Feminino',
    email: 'alice.johnson@example.com',
    phone: '1234567890',
    fieldOfWork: ['BACKEND'],
    employmentType: 'CLT',
    manager: false,
    salary: 60000,
    password: 'senha123',
    imgUrl: 'https://randomuser.me/api/portraits/women/34.jpg',
    address: 'Rua 1, 123',
  },
  {
    name: 'Bob Smith',
    age: 28,
    gender: 'Masculino',
    email: 'bob.smith@example.com',
    phone: '9876543210',
    fieldOfWork: ['FRONTEND'],
    employmentType: 'PJ',
    manager: false,
    salary: 55000,
    password: 'senha456',
    imgUrl: 'https://randomuser.me/api/portraits/men/29.jpg',
    address: 'Rua 2, 456',
  },
  {
    name: 'Charlie Brown',
    age: 35,
    gender: 'Masculino',
    email: 'charlie.brown@example.com',
    phone: '5555555555',
    fieldOfWork: ['DEVOPS', 'MANAGEMENT'],
    employmentType: 'CLT',
    manager: true,
    salary: 75000,
    password: 'senha789',
    imgUrl: 'https://randomuser.me/api/portraits/men/71.jpg',
    address: 'Rua 3, 789',
  },
  {
    name: 'Diana Smith',
    age: 26,
    gender: 'Feminino',
    email: 'diana.smith@example.com',
    phone: '4444444444',
    fieldOfWork: ['DESIGN'],
    employmentType: 'PJ',
    manager: false,
    salary: 60000,
    password: 'senha101',
    imgUrl: 'https://randomuser.me/api/portraits/women/86.jpg',
    address: 'Rua 3, 789',
  },
  {
    name: 'Edward Anderson',
    age: 32,
    gender: 'Masculino',
    email: 'edward.anderson@example.com',
    phone: '7777777777',
    fieldOfWork: ['MANAGEMENT'],
    employmentType: 'CLT',
    manager: true,
    salary: 80000,
    password: 'senha111',
    imgUrl: 'https://randomuser.me/api/portraits/men/70.jpg',
    address: 'Rua 4, 101',
  },
  {
    name: 'Fiona Clark',
    age: 29,
    gender: 'Feminino',
    email: 'fiona.clark@example.com',
    phone: '8888888888',
    fieldOfWork: ['REQUIREMENTS'],
    employmentType: 'CLT',
    manager: false,
    salary: 62000,
    password: 'senha222',
    imgUrl: 'https://randomuser.me/api/portraits/women/80.jpg',
    address: 'Rua 5, 112',
  },
  {
    name: 'George Wilson',
    age: 31,
    gender: 'Masculino',
    email: 'george.wilson@example.com',
    phone: '9999999999',
    fieldOfWork: ['BACKEND'],
    employmentType: 'PJ',
    manager: false,
    salary: 56000,
    password: 'senha333',
    imgUrl: 'https://randomuser.me/api/portraits/men/60.jpg',
    address: 'Rua 6, 131',
  },
  {
    name: 'Hannah Taylor',
    age: 27,
    gender: 'Feminino',
    email: 'hannah.taylor@example.com',
    phone: '1111111111',
    fieldOfWork: ['FRONTEND'],
    employmentType: 'CLT',
    manager: false,
    salary: 58000,
    password: 'senha444',
    imgUrl: 'https://randomuser.me/api/portraits/women/49.jpg',
    address: 'Rua 7, 141',
  },
  {
    name: 'Isaac Harris',
    age: 34,
    gender: 'Masculino',
    email: 'isaac.harris@example.com',
    phone: '2222222222',
    fieldOfWork: ['DEVOPS'],
    employmentType: 'PJ',
    manager: false,
    salary: 61000,
    password: 'senha555',
    imgUrl: 'https://randomuser.me/api/portraits/men/62.jpg',
    address: 'Rua 8, 151',
  },
  {
    name: 'Jasmine White',
    age: 33,
    gender: 'Feminino',
    email: 'jasmine.white@example.com',
    phone: '3333333333',
    fieldOfWork: ['DESIGN'],
    employmentType: 'CLT',
    manager: false,
    salary: 59000,
    password: 'senha666',
    imgUrl: 'https://randomuser.me/api/portraits/women/30.jpg',
    address: 'Rua 9, 161',
  },
  {
    name: 'Admin',
    age: 30,
    gender: 'Masculino',
    email: 'admin@admin.com',
    phone: '1234567890',
    fieldOfWork: ['MANAGEMENT'],
    employmentType: 'CLT',
    manager: true,
    salary: 100000,
    password: 'admin',
    imgUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    address: 'Rua 10, 171',
  },
]

const projects: Prisma.ProjectCreateInput[] = [
  {
    name: 'Projeto 1',
    description: 'Descrição do projeto 1',
    deadline: new Date('2023-12-31').toDateString(),
    technologies: ['NodeJS', 'ReactJS', 'React Native'],

    collaborators: {
      connect: [
        { email: 'edward.anderson@example.com' },
        { email: 'jasmine.white@example.com' },
        { email: 'isaac.harris@example.com' },
        { email: 'george.wilson@example.com' },
        { email: 'hannah.taylor@example.com' },
        { email: 'admin@admin.com' },
      ],
    },
  },

  {
    name: 'Projeto 2',
    description: 'Descrição do projeto 2',
    deadline: new Date('2023-12-31').toDateString(),
    technologies: ['NodeJS', 'ReactJS', 'React Native'],

    collaborators: {
      connect: [
        { email: 'jasmine.white@example.com' },
        { email: 'george.wilson@example.com' },
        { email: 'diana.smith@example.com' },
        { email: 'hannah.taylor@example.com' },
        { email: 'charlie.brown@example.com' },
      ],
    },
  },

  {
    name: 'Projeto 3',
    description: 'Descrição do projeto 3',
    deadline: new Date('2023-12-31').toDateString(),
    technologies: ['NodeJS', 'ReactJS', 'React Native'],

    collaborators: {
      connect: [
        { email: 'jasmine.white@example.com' },
        { email: 'george.wilson@example.com' },
        { email: 'hannah.taylor@example.com' },
        { email: 'charlie.brown@example.com' },
        { email: 'alice.johnson@example.com' },
      ],
    },
  },
  {
    name: 'Projeto 4',
    description: 'Descrição do projeto 4',
    deadline: new Date('2023-12-31').toDateString(),
    technologies: ['NodeJS', 'ExpressJS', 'VueJS'],

    collaborators: {
      connect: [
        { email: 'jasmine.white@example.com' },
        { email: 'george.wilson@example.com' },
        { email: 'diana.smith@example.com' },
        { email: 'charlie.brown@example.com' },
        { email: 'fiona.clark@example.com' },
      ],
    },
  },
]

async function main() {
  for (const collaborator of collaborators) {
    await prisma.collaborator.upsert({
      where: { email: collaborator.email },
      update: {},
      create: collaborator,
    })
  }

  for (const project of projects) {
    await prisma.project.upsert({
      where: { name: project.name },
      update: {},
      create: project,
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
