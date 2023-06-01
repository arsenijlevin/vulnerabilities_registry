import { cookies } from 'next/headers';

export default function Home() {
  const jwt = cookies().get("jwt");


  return (
    <div>
      <h2>{
        jwt?.value ? `Пользователь авторизован. Токен ${jwt.value}` : "Пользователь не авторизован"}
      </h2>
    </div>
  );
}