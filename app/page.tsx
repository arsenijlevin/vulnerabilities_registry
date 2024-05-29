import { cookies } from 'next/headers';

export default function Home() {
  const jwt = cookies().get('token')?.value;

  return (
    <div>
      <h2>{jwt ? `Пользователь авторизован. Токен ${jwt}` : 'Пользователь не авторизован'}</h2>
    </div>
  );
}
