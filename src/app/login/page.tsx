import Image from 'next/image'
import { LoginForm } from './components/LoginForm'

export default function LoginPage() {
  return (
    <main className="h-screen flex justify-center items-center ">
      <div className="flex flex-col items-center max-w-lg w-full gap-12">
        <div className="flex flex-col items-center gap-2">
          <Image src="/logo.svg" width={100} height={100} alt="Logo CoopDev" />
          <h1 className="font-bold text-4xl">CoopDev</h1>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
