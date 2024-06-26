'use client';

import { FormEvent, useRef } from 'react';

import { useRouter } from 'next/navigation';
import ClientOnly from '../../../../components/utils/ClientOnly';
import { LoginData } from '@api/auth/types';
import { processLogin } from './lib/processLogin';
import { setCookie } from 'cookies-next';

export default function LoginPage() {
  const router = useRouter();
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const login = loginRef.current?.value;
    const password = passwordRef.current?.value;

    if (!login || !password) {
      return;
    }

    const loginData: LoginData = {
      login: loginRef.current.value,
      password: passwordRef.current.value,
    };

    const jwt = await processLogin(loginData);

    setCookie('session', jwt?.token, {
      maxAge: 60 * 60 * 4,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    router.refresh();
  };

  return (
    <ClientOnly>
      <section className="py-5 container mx-auto px-5 max-w-5xl">
        <h2 className="text-xl md:text-5xl text-center font-bold py-10">Вход</h2>

        {/* { isError && <Error message="Неправильный логин или пароль!"></Error>} */}
        {/* { isSuccess && <Success message="Вы успешно вошли в систему!"></Success>} */}

        <div className="container mx-auto flex justify-between py-5 border-b">
          <h3>Для продолжения войдите в свою учётную запись:</h3>
        </div>
        <div className="container mx-auto flex justify-between py-5">
          <form onSubmit={handleSubmit}>
            <div className="container flex justify-between py-5 flex-col gap-2 w-96">
              <h3>Логин: </h3>
              <input
                type="text"
                defaultValue="asdasda"
                placeholder="Логин"
                ref={loginRef}
                className="border w-full px-5 py-3 focus:outline-none rounded-md"
              />
            </div>
            <div className="container flex justify-between py-5 flex-col gap-2 w-96">
              <h3>Пароль: </h3>
              <input
                defaultValue="mypass"
                type="password"
                placeholder="Пароль"
                ref={passwordRef}
                className="border w-full px-5 py-3 focus:outline-none rounded-md"
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
