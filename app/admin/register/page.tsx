'use client';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { LoginData } from '@api/auth/login/types';
import { processRegister } from './lib/processRegister';
import ClientOnly from '../../login/components/ClientOnly';
import { useQuery } from '@tanstack/react-query';
import { rights } from '@prisma/client';
import { getRights } from './lib/getRights';
import { useQueryOptions } from '@lib/useQueryOptions';
import Select from 'react-select';

export const metadata = {
  title: 'Регистрация',
};

export default function LoginPage() {
  const router = useRouter();
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [rights, setRights] = useState<number>(-1);

  const rightsQuery = useQuery(['rights'], getRights, useQueryOptions);

  const getRightsLabels = (data: rights[]) => {
    return data.map((right) => {
      return {
        value: right.id,
        label: right.title,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginData: LoginData = {
      login: loginRef.current?.value || '',
      password: passwordRef.current?.value || '',
      rights_id: rights,
    };

    if (!loginData.login || !loginData.password) {
      return;
    }

    const jwt = await processRegister(loginData);

    if (jwt.login) {
      router.push('/success');
    }
  };

  if (!rightsQuery.data) return <></>;

  return (
    <ClientOnly>
      <section className="py-5 container mx-auto px-5 max-w-5xl">
        <h2 className="text-xl md:text-5xl text-center font-bold py-10">{metadata.title}</h2>

        {/* { isError && <Error message="Неправильный логин или пароль!"></Error>} */}
        {/* { isSuccess && <Success message="Вы успешно вошли в систему!"></Success>} */}

        <div className="container mx-auto flex justify-between py-5 border-b">
          <h3>Введите данные нового пользователя:</h3>
        </div>
        <div className="container mx-auto flex justify-between py-5">
          <form onSubmit={handleSubmit}>
            <div className="container flex justify-between py-5 flex-col gap-2 w-96">
              <h3>Логин: </h3>
              <input
                type="text"
                placeholder="Логин"
                ref={loginRef}
                className="border w-full px-5 py-3 focus:outline-none rounded-md"
              />
            </div>
            <div className="container flex justify-between py-5 flex-col gap-2 w-96">
              <h3>Пароль: </h3>
              <input
                type="password"
                placeholder="Пароль"
                ref={passwordRef}
                className="border w-full px-5 py-3 focus:outline-none rounded-md"
              />
            </div>
            <div className="container flex justify-between py-5 flex-col gap-2 w-96">
              <h3>Права: </h3>
              <Select
                onChange={(choice) => setRights(choice?.value || -1)}
                noOptionsMessage={() => 'Не найдено'}
                placeholder="Права"
                options={getRightsLabels(rightsQuery.data)}
              />
            </div>
            <button
              type="submit"
              className="flex justify-center items-center text-md w-1/3 bg-green-500 text-black px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500"
            >
              Войти
            </button>
          </form>
        </div>
      </section>
    </ClientOnly>
  );
}
