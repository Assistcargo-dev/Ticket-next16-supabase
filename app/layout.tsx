import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "@/app/providers"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "App Interna 2025",
  description: "Next.js 16 + Supabase + NextAuth v5",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}