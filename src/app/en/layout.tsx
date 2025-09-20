import { LanguageProvider } from '@/contexts/LanguageContext'

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