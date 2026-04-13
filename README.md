# Демо-фронтенд (портфолио)

Репозиторий подготовлен как **портфолио**: без прод-аналитики, с `noindex`, вымышленными контактами и внешними URL через переменные окружения (см. `.env.example`). Для локального запуска скопируйте `.env.example` в `.env` и задайте `BASE_URL` под свой бэкенд или мок.

Статика блоков с иллюстрациями лежит в `public/img/demo-section`.

Официальная документация Nuxt: [nuxt.com/docs](https://nuxt.com/docs/getting-started/introduction).


## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Сервер разработки слушает порт **3333** (см. `package.json` → `dev`).

```bash
yarn dev
# или: npm run dev
```

Откройте http://localhost:3333

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
