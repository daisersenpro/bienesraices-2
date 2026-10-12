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

## Supabase

El home consulta las propiedades desde Supabase mediante funciones servidor de Next.js. Configura estas variables en `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=tu_clave_publishable
```

El esquema de la tabla y sus políticas está en [`supabase/schema.sql`](./supabase/schema.sql). La página principal usa paginación server-side con los parámetros `page`, `tipo` y `busqueda`; por ejemplo, `/?page=2&tipo=House`.

### Propiedades destacadas

La tabla `properties` incluye la bandera booleana `featured`. Cuando su valor es `true`, la propiedad aparece en **Colecciones destacadas** y no se repite en el listado paginado.

Cada propiedad usa un `id` numérico autoincremental generado por PostgreSQL como identificador interno y un `slug` único, legible y estable para URLs o referencias funcionales.

Para marcar o quitar una propiedad manualmente desde el SQL Editor:

```sql
update public.properties
set featured = true
where slug = 'casa-los-aromos';

update public.properties
set featured = false
where slug = 'glass-pavilion';
```

La migración inicial se encuentra en [`supabase/migrations/20261011_featured_property_flag.sql`](./supabase/migrations/20261011_featured_property_flag.sql).
La migración de identificadores se encuentra en [`supabase/migrations/20261011_properties_bigint_slug.sql`](./supabase/migrations/20261011_properties_bigint_slug.sql).

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
