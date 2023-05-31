import './globals.css'
import Providers from './components/provider'

export const metadata = {
  title: 'Реестр уязвимостей оборудования',
  description: 'Реестр уязвимостей оборудования',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
