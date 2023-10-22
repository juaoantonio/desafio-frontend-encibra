import Image from 'next/image'

type CollaboratorCardProfileProps = {
  children: React.ReactNode
  src: string
  manager: boolean
}

export function Profile({
  children,
  src,
  manager,
}: CollaboratorCardProfileProps) {
  return (
    <div className="flex gap-4 items-center">
      <Image
        src={src}
        width={64}
        height={64}
        alt="Foto de perfil"
        className="rounded-full"
      />
      <div className="flex-1">
        <p className="text-gray-800 text-xl font-medium ">{children}</p>
        <p className="text-sm text-gray-500">
          {manager ? 'Gestor(a)' : 'Colaborador(a)'}
        </p>
      </div>
    </div>
  )
}
