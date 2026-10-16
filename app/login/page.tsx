import Link from "next/link";
import { cookies } from "next/headers";
import { AuthButtons } from "../components/auth-buttons";
import { isLocale, translations } from "../i18n/config";

export const instant = false;

export default async function LoginPage() {
  const cookieLocale = (await cookies()).get("casas-senpro-locale")?.value;
  const locale = isLocale(cookieLocale) ? cookieLocale : "es";
  const t = translations[locale];

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#e7f2fb] p-4 text-nordic">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-hint/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-mosque/10 blur-3xl" />
      <section className="relative z-10 w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-nordic text-3xl text-white shadow-soft">⌂</div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-nordic">{t.welcome}</h1>
          <p className="text-nordic/60">{t.loginDescription}</p>
        </div>
        <div className="rounded-2xl border border-white/70 bg-white p-8 shadow-soft sm:p-10">
          <AuthButtons labels={{
            github: t.continueGithub,
            email: t.email,
            password: t.password,
            login: t.signIn,
            signup: t.signUp,
            switchToSignup: t.switchToSignUp,
            switchToLogin: t.switchToSignIn,
            accountCreated: t.accountCreated,
          }} />
          <p className="mt-8 text-center text-sm text-nordic/70">
            Al continuar, aceptas nuestros términos y condiciones.
          </p>
        </div>
        <nav className="mt-8 flex justify-center gap-6 text-xs text-nordic/50">
          <Link href="/" className="transition-colors hover:text-nordic">Volver al inicio</Link>
          <a href="#" className="transition-colors hover:text-nordic">Privacidad</a>
          <a href="#" className="transition-colors hover:text-nordic">Ayuda</a>
        </nav>
      </section>
    </main>
  );
}
