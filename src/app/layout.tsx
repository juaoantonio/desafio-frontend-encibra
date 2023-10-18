import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CoopDev | Perfil de Colaboradores',
  description:
    'Plataforma que visa organizar perfis de colaboradores em diversas áreas de atuação, como Frontend, Backend, Design e entre outras, além de facilitar a administração de perfis de colaboradores',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
