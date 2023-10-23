import { isManager } from '@/lib/utils'

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const manager = isManager()

  if (!manager) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-3xl text-gray-950 font-semibold">
          Você não tem permissão para acessar essa página
        </h1>
      </div>
    )
  }

  return <>{children}</>
}
