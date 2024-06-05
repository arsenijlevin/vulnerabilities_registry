import './globals.css';
import ProvidesTheQueryClient from './provider';

export const metadata = {
  title: 'Реестр уязвимостей оборудования',
  description: 'Реестр уязвимостей оборудования',
};

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <ProvidesTheQueryClient>{children}</ProvidesTheQueryClient>
      </body>
    </html>
  );
}
