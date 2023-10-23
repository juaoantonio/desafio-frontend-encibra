import { Home, Users, FolderGit2 } from 'lucide-react'
import { ActiveLink } from './ActiveLink'

export function Nav() {
  return (
    <nav className="flex min-[550px]:flex-col gap-10 items-center">
      <ActiveLink href="/dashboard" exact>
        <Home className="stroke-gray-50" width={32} height={32} />
      </ActiveLink>
      <ActiveLink href="/dashboard/colaboradores">
        <Users className="stroke-gray-50" width={32} height={32} />
      </ActiveLink>
      <ActiveLink href="/dashboard/projetos">
        <FolderGit2 className="stroke-gray-50" width={32} height={32} />
      </ActiveLink>
    </nav>
  )
}
