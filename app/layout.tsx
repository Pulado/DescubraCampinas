import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins' 
})

export const metadata: Metadata = {
  title: 'Descubra Campinas',
  description: 'Descubra o melhor de Campinas - Produtores locais, feiras orgânicas, eventos culturais e pequenos negócios',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${poppins.variable} font-sans bg-background text-text overflow-x-hidden`}>
        <div className="flex min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
