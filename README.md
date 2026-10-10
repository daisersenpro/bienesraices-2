# Bienes Raíces

Aplicación inmobiliaria moderna construida con Next.js, React y Tailwind CSS.

## Requisitos

- Node.js 20 o superior
- npm

## Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/daisersenpro/bienesraices-2.git
cd bienesraices-2
npm install
```

Si el proyecto necesita variables de entorno, crea un archivo `.env.local` a partir de `.env.example`. No subas `.env.local` ni ningún archivo con credenciales al repositorio.

## Desarrollo

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Scripts disponibles

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera la compilación de producción.
- `npm run start`: sirve la compilación de producción.
- `npm run lint`: ejecuta ESLint.

## Flujo de trabajo

- La rama principal de trabajo es `master`.
- Crea ramas descriptivas para cambios y abre un pull request hacia `master`.

## Tecnologías

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Despliegue

El proyecto puede desplegarse en [Vercel](https://vercel.com/) o en cualquier plataforma compatible con aplicaciones Next.js.
