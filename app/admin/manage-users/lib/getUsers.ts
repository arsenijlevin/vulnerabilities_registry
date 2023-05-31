"use server"


export async function getUsers() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}api/users/getAll`);
  const users = await res.json();
  console.log(users)
  return users;
}