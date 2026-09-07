import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, LogIn, ShieldCheck, AlertCircle } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";

const logo = "/favicon.png";

const title = "Admin Sign In | BPMR SAP FICO Training Institute";
const description =
  "Secure sign-in for the BPMR SAP FICO admin dashboard to review saved contact enquiries.";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Sign In | BPMR SAP FICO" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    void supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (sessionError) {
        console.error(`[auth] getSession failed: ${sessionError.message}`);
        return;
      }
      if (data.session) void navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setNotice("");

    if (!email.trim() || !password) {
      setError("Enter both your email address and password.");
      return;
    }
    if (mode === "signup" && password.length < 8) {
      setError("Choose a password with at least 8 characters.");
      return;
    }

    setBusy(true);
    try {
      if (mode === "signin") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (signInError) {
          console.error(
            `[auth] sign-in failed (${signInError.status ?? "no status"}): ${signInError.message}`,
          );
          setError(
            signInError.message.toLowerCase().includes("invalid")
              ? "Email or password is incorrect."
              : `Sign in failed: ${signInError.message}`,
          );
          return;
        }
        await navigate({ to: "/admin", replace: true });
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth` },
        });
        if (signUpError) {
          console.error(
            `[auth] sign-up failed (${signUpError.status ?? "no status"}): ${signUpError.message}`,
          );
          setError(`Could not create the account: ${signUpError.message}`);
          return;
        }
        setNotice("Account created. Confirm your email if prompted, then sign in.");
        setMode("signin");
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-navy-900 flex items-center justify-center px-5 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern opacity-60" />
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-7 sm:p-9">
        <div className="flex items-center gap-3">
          <img src={logo} alt="BPMR SAP FICO logo" className="w-12 h-12 object-contain" />
          <div>
            <h1 className="text-lg font-bold text-navy-900 leading-tight">Admin Sign In</h1>
            <p className="text-xs text-slate-500">BPMR SAP FICO Training Institute</p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-gold-500" />
          Only accounts granted admin access can view enquiries.
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="admin-email"
              className="block text-sm font-semibold text-slate-700 mb-1.5"
            >
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 outline-none text-slate-900 text-sm"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="admin-password"
              className="block text-sm font-semibold text-slate-700 mb-1.5"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 outline-none text-slate-900 text-sm"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="flex items-start gap-2.5 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              {error}
            </div>
          )}
          {notice && (
            <div className="px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
              {notice}
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-navy-900 hover:bg-navy-800 disabled:opacity-60 text-white font-bold text-sm transition-colors"
          >
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
            {mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError("");
            setNotice("");
          }}
          className="mt-5 w-full text-center text-sm text-navy-700 hover:text-gold-600 font-semibold"
        >
          {mode === "signin" ? "Need an account? Create one" : "Already have an account? Sign in"}
        </button>

        <a href="/" className="mt-4 block text-center text-xs text-slate-400 hover:text-slate-600">
          Back to website
        </a>
      </div>
    </main>
  );
}
