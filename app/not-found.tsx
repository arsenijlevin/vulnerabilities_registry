import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Ошибка: запрашиваемая страница не найдена!</h2>
      <p>
        <Link href="/">На главную</Link>
      </p>
    </div>
  );
}
