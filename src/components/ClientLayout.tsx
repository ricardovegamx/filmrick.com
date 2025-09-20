import { SimpleNavigation } from './SimpleNavigation'
import { Footer } from './Footer'

interface ClientLayoutProps {
  children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <SimpleNavigation />
      <div className="pt-28">
        {children}
      </div>
      <Footer />
    </>
  )
}