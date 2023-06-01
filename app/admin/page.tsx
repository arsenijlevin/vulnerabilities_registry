"use client"

import Link from 'next/link';
import AddButton from '../components/AddButton';
import Logout from '../components/Logout';

export default function AdminPage() {
  return (
    <section className="py-5 px-10 container mx-auto">
      <h2 className="text-xl md:text-5xl text-center font-bold py-10">
        Админ-панель
      </h2>
      <div className="left flex flex-col">
        <AddButton></AddButton>
        <Logout></Logout>
      </div>
      <div className="container mx-auto flex justify-between py-5 border-b">
        <h3>Выберите таблицу: </h3>
      </div>
      <div className="container mx-auto flex justify-between py-5">
        <ul>
          <li><Link href="admin/manage-users">Пользователи</Link></li>
          <li><Link href="admin/manage-hardware">Оборудование</Link></li>
          <li><Link href="admin/manage-locations">Местоположения оборудования</Link></li>
        </ul>
      </div>
      {/* <div className="container mx-auto flex justify-between py-5 border-b">
        <h3>Создание отчётов: </h3>
      </div>
      <div className="container mx-auto flex justify-between py-5">
        <ul>
          <li>
            <Link href="accountant/doctors">По врачам</Link>
          </li>
          <li>
            <Link href="accountant/departments">По отделениям</Link>
          </li>
        </ul>
      </div> */}
    </section>
  );
}

