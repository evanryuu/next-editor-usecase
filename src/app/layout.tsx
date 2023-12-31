import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import './globals.css'
import 'remixicon/fonts/remixicon.css'
// import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Toaster } from 'sonner'

// const fontSans = FontSans({
//   subsets: ['latin'],
//   variable: '--font-sans',
// })
// const inter = Inter({ subsets: ['latin'] })
const ToasterProvider = () => {
  return <Toaster theme={'system'} />
}
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-white dark:bg-black dark:text-neutral-50 font-sans antialiased')}>
        <ToasterProvider />
        {children}
      </body>
    </html>
  )
}
