import { cookies } from 'next/headers';

export default function Home() {
  const jwt = cookies().get("jwt");
    

  return (
    <div>
      <h2>Основная страница {jwt?.value}</h2>
    </div>
  );
}