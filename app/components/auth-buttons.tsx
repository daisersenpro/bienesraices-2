"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "../../lib/supabase/client";

type Mode = "login" | "signup";

type AuthLabels = {
  github: string;
  email: string;
  password: string;
  login: string;
  signup: string;
  switchToSignup: string;
  switchToLogin: string;
  accountCreated: string;
};

export function AuthButtons({ labels }: { labels: AuthLabels }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function signInWithGithub() {
    setError("");
    setMessage("");
    setLoading(true);
    const supabase = getSupabaseBrowserClient();
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });

    if (authError) {
      setLoading(false);
      setError(authError.message);
    }
  }

  async function signInWithEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    const supabase = getSupabaseBrowserClient();
    const result = mode === "login"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    setLoading(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }

    if (mode === "signup" && !result.data.session) {
      setMessage(labels.accountCreated);
      setMode("login");
      return;
    }

    router.push("/");
  }

  return (
    <div className="space-y-4">
      <button type="button" onClick={signInWithGithub} disabled={loading} className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-lg border border-[#dce7ed] bg-white p-3.5 font-medium text-nordic transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft disabled:cursor-wait disabled:opacity-60">
        <span className="absolute inset-0 translate-y-full bg-hint/30 transition-transform duration-300 group-hover:translate-y-0" />
        <GithubIcon />
        <span className="relative z-10">{loading ? "..." : labels.github}</span>
      </button>

      <div className="relative flex items-center py-1">
        <div className="flex-grow border-t border-[#dce7ed]" />
        <span className="mx-3 flex-shrink text-xs text-nordic/45">o</span>
        <div className="flex-grow border-t border-[#dce7ed]" />
      </div>

      <form onSubmit={signInWithEmail} className="space-y-3">
        <label className="block text-sm font-medium text-nordic">
          {labels.email}
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" className="mt-1.5 w-full rounded-lg border border-[#dce7ed] px-3.5 py-3 font-normal outline-none transition focus:border-mosque focus:ring-2 focus:ring-mosque/20" />
        </label>
        <label className="block text-sm font-medium text-nordic">
          {labels.password}
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} autoComplete={mode === "login" ? "current-password" : "new-password"} className="mt-1.5 w-full rounded-lg border border-[#dce7ed] px-3.5 py-3 font-normal outline-none transition focus:border-mosque focus:ring-2 focus:ring-mosque/20" />
        </label>
        <button type="submit" disabled={loading} className="w-full rounded-lg bg-mosque p-3.5 font-semibold text-white transition hover:bg-nordic disabled:cursor-wait disabled:opacity-60">
          {loading ? "..." : mode === "login" ? labels.login : labels.signup}
        </button>
      </form>

      <button type="button" onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setMessage(""); }} className="w-full text-center text-sm font-medium text-mosque hover:text-nordic">
        {mode === "login" ? labels.switchToSignup : labels.switchToLogin}
      </button>

      {message && <p role="status" className="text-center text-sm text-green-700">{message}</p>}
      {error && <p role="alert" className="text-center text-sm text-red-600">{error}</p>}
    </div>
  );
}

function GithubIcon() {
  return <svg aria-hidden="true" className="relative z-10 h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>;
}
