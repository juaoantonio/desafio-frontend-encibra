import { ChevronRight } from 'lucide-react'
import { CollaboratorsSlide } from './components/CollaboratorsSlide'
import Link from 'next/link'
import { ProjectsSlide } from './components/ProjectsSlide'
import { Profile } from './components/Profile'

export default async function DashboardHome() {
  return (
    <>
      <Profile />

      <main className="mx-auto max-w-7xl py-10 px-5">
        <h1 className="text-gray-950 font-semibold text-3xl mb-10">
          Visão Geral
        </h1>

        <div className="space-y-10">
          <section className="space-y-4">
            <Link
              href={'/dashboard/colaboradores'}
              className="font-semibold text-2xl text-gray-800 flex items-center gap-1 "
            >
              Colaboradores
              <ChevronRight
                width={28}
                height={28}
                className="stroke-gray-700"
              />
            </Link>
            <CollaboratorsSlide />
          </section>
          <section className="space-y-4">
            <Link
              href={'dashboard/projetos'}
              className="font-semibold text-2xl text-gray-800 flex items-center gap-1"
            >
              Projetos
              <ChevronRight
                width={28}
                height={28}
                className="stroke-gray-700"
              />
            </Link>
            <ProjectsSlide />
          </section>
        </div>
      </main>
    </>
  )
}
