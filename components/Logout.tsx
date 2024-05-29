'use client';

import { Box, Button } from '@mui/material';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

export default function Logout() {
  const router = useRouter();

  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setCookie('session', '', {
      maxAge: -1,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    router.push(`/login`);
  };

  return (
    <Box className="success container mx-auto mb-5">
      <Button
        onClick={handleLogout}
        className="w-28 flex justify-center items-center text-md w-2/9"
        variant="contained"
      >
        Выйти
      </Button>
    </Box>
  );
}
