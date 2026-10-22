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
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

En producción, configura `NEXT_PUBLIC_SITE_URL` con la URL pública real de la aplicación. Esta variable se usa para generar URLs canónicas y metadatos Open Graph/Twitter absolutos al compartir propiedades.

El esquema de la tabla y sus políticas está en [`supabase/schema.sql`](./supabase/schema.sql). La página principal usa paginación server-side con los parámetros `page`, `tipo` y `busqueda`; por ejemplo, `/?page=2&tipo=House`.

### Propiedades destacadas

La tabla `properties` incluye la bandera booleana `featured`. Cuando su valor es `true`, la propiedad aparece en **Colecciones destacadas** y no se repite en el listado paginado.

Cada propiedad usa un `id` numérico autoincremental generado por PostgreSQL como identificador interno y un `slug` único, legible y estable para URLs o referencias funcionales.

Las propiedades tienen `image_url` para la imagen de portada y la tabla relacionada `property_images` para la galería completa. La migración de desarrollo [`supabase/migrations/20261013_property_images_development_seed.sql`](./supabase/migrations/20261013_property_images_development_seed.sql) agrega tres imágenes adicionales por propiedad de forma idempotente.

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
La migración de galería y coordenadas se encuentra en [`supabase/migrations/20261013_property_images_and_location.sql`](./supabase/migrations/20261013_property_images_and_location.sql).
La migración de filtros de búsqueda se encuentra en [`supabase/migrations/20261013_property_search_filters.sql`](./supabase/migrations/20261013_property_search_filters.sql).
Los datos adicionales para probar búsqueda, filtros y galerías se encuentran en [`supabase/migrations/20261013_properties_development_seed.sql`](./supabase/migrations/20261013_properties_development_seed.sql). Ejecuta primero la migración de filtros y después el seed de propiedades.

### Autenticación con GitHub y correo electrónico

La pantalla [`app/login/page.tsx`](./app/login/page.tsx) usa Supabase Auth para iniciar sesión con GitHub o con correo electrónico y contraseña. También permite crear cuentas manuales para desarrollo sin depender de proveedores que requieran facturación.

1. En Supabase, entra a **Authentication → Providers** y activa **Email** y **GitHub**.
2. Configura únicamente las credenciales OAuth de GitHub.
3. En Supabase, agrega como redirect URL de desarrollo `http://localhost:3000/auth/callback`.
4. En producción, agrega la URL equivalente de tu dominio.
5. Si está activa la confirmación de correo, las cuentas manuales deben confirmar su email antes de iniciar sesión.

La aplicación usa el `avatar_url` o `picture` entregado por GitHub y lo muestra en el navbar cuando existe. Si el proveedor no entrega avatar, se muestran las iniciales del usuario.

### Dashboard administrativo y roles

El dashboard protegido está disponible en [`/admin`](./app/admin/page.tsx) y redirige a las pantallas dedicadas:

- [`/admin/properties`](./app/admin/properties/page.tsx): gestión visual de propiedades, métricas y enlaces a sus detalles.
- [`/admin/users`](./app/admin/users/page.tsx): directorio visual de usuarios y edición de roles.

Ambas vistas requieren el rol `admin` y siguen la paleta actual de la aplicación.

Ejecuta [`supabase/migrations/20261019_user_roles.sql`](./supabase/migrations/20261019_user_roles.sql) en el SQL Editor de Supabase. La migración crea `public.user_roles`, sincroniza nuevos usuarios de Auth mediante un trigger y activa políticas RLS. Después de ejecutarla, promueve manualmente al primer administrador:

```sql
update public.user_roles
set role = 'admin'
where email = 'tu-correo@example.com';
```

La protección se realiza en `proxy.ts` para redirigir solicitudes no autorizadas y se repite en la página y en la Server Action. No se utiliza la service role key en el navegador ni en el dashboard.

El formulario de administración de propiedades está disponible en [`/admin/properties/new`](./app/admin/properties/new/page.tsx) y la edición en [`/admin/properties/[id]/edit`](./app/admin/properties/[id]/edit/page.tsx). Para habilitar altas, edición de propiedades y carga de imágenes, ejecuta también [`supabase/migrations/20261021_property_management.sql`](./supabase/migrations/20261021_property_management.sql). Esta migración crea el bucket público `property-images`, añade `description` y configura políticas para administradores. Las imágenes se guardan en Storage y sus URLs en `property_images`.

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
