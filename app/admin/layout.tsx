import { getCookie } from 'cookies-next';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookie = getCookie('jwt');

  return (
    <div>
      <p>{cookie}</p>
      {children}
    </div>
  );
}
