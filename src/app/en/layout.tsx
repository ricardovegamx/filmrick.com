import { LanguageProvider } from '@/contexts/LanguageContext'

export const metadata = {
  title: "FILMRICK",
  description: "Film photography from Mexico City",
}

export default function EnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider locale="en">
      {children}
    </LanguageProvider>
  )
}