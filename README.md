# Starter kit for AdonisJS 6

⚠️ For AdonisJS v5 : [here](https://github.com/batosai/adonis-starter)

🔥 @adonisjs/drive support

A Node.js, TypeScript & sqlite starter built upon [Adonis JS](https://adonisjs.com) framework.

🔋 Batteries included:

- [x] Sign in form
- [x] Logout
- [x] List / create / delete users in admin page
- [x] Avatar upload by [adonis-attachment](https://adonis-attachment.jrmc.dev)
- [x] Forgot password
- [x] Email create password
- [x] Roles and permissions with AdonisJS bouncers
- [x] i18n
- [x] Last login at
- [x] Form component
- [x] Impersonating users
- [x] [Health](https://docs.adonisjs.com/guides/digging-deeper/health-checks)
- [x] [Drive](https://docs.adonisjs.com/guides/digging-deeper/drive)
- [x] [Auditable](https://adonis-auditing.stouder.io)
- [x] [DaysiUI](https://daisyui.com/)
- [x] [Tailwind](https://tailwindcss.com/)
- [x] [Alpinejs](https://alpinejs.dev/)
- [x] [Unpoly](https://unpoly.com/)
- [x] [Vite](https://vitejs.dev/)
- [x] Tests

# Installation

```bash
npm init adonisjs@latest -- -K="batosai/adonis-starter-kit"
cd my-adonisjs-app
cp .env.example .env
node ace generate:key
node ace migration:run
node ace db:seed
```

## Developing

```bash
npm run dev
visite http://localhost:3333/admin

npm test
```

<img src="https://raw.githubusercontent.com/batosai/adonis-starter-kit/main/screenshots/screen1.png">
<img src="https://raw.githubusercontent.com/batosai/adonis-starter-kit/main/screenshots/screen2.png">

## Support

[Issues](https://github.com/batosai/adonis-starter-kit/issues)

[Discord](https://discord.gg/89eMn2vB)
