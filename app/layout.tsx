import './globals.css';
import ProvidesTheQueryClient from './provider';

export const metadata = {
  title: 'Реестр уязвимостей оборудования',
  description: 'Реестр уязвимостей оборудования',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <ProvidesTheQueryClient>{children}</ProvidesTheQueryClient>
      </body>
    </html>
  );
}
