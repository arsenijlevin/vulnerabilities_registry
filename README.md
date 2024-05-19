## Переменные окружения (.env)

```
DATABASE_URL=postgres://<login>:<password>@<host>:<port>/<dbname>
NEXTAUTH_URL=http://localhost:3000/
SECRET_KEY=verysecretkey
```

## Запуск

node -v
v14.18.0+

npm -v
6.14.5+
```bash

$ git clone https://github.com/arsenijlevin/vulnerabilities_registry
$ cd vulnerabilities_registry
$ npm i
$ npx prisma db push # Создание таблиц в базе данных
$ npx prisma generate # Генерация типов на основе таблиц в базе данных
$ npm run dev

```