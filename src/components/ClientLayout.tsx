import { SimpleNavigation } from './SimpleNavigation'

interface ClientLayoutProps {
  children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <SimpleNavigation />
      <main className="pt-[84px]">
        {children}
      </main>
    </>
  )
}