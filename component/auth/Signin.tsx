"use client";

import { signinAction, type SigninResult } from "@/app/actions/auth";
import AuthShell from "@/component/auth/AuthShell";
import PasswordInput from "@/component/auth/PasswordInput";
import { ArrowRight, AtSign, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

const inputClassName =
  "h-12 w-full rounded-xl border border-foreground/10 bg-foreground/[0.025] pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-foreground/35 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-white/[0.04]";
const initialSigninState: SigninResult = { ok: false };

const Signin = ({ callbackUrl = "/" }: { callbackUrl?: string }) => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    signinAction,
    initialSigninState,
  );

  useEffect(() => {
    if (!state.ok || !state.redirectTo) return;
    router.replace(state.redirectTo);
    router.refresh();
  }, [router, state.ok, state.redirectTo]);

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to your"
      highlightedWord="account"
      description="Access your saved products, shopping cart, and customer details using your email address or phone number."
    >
      <form
        action={formAction}
        className="space-y-5"
        aria-label="Customer sign in form"
      >
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        {state.error && (
          <div
            role="alert"
            aria-live="polite"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300"
          >
            {state.error}
          </div>
        )}
        <div>
          <label
            htmlFor="signin-identifier"
            className="mb-2 block text-xs font-bold text-foreground/75"
          >
            Email or phone
          </label>
          <div className="relative">
            <AtSign
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary"
            />
            <input
              id="signin-identifier"
              name="identifier"
              type="text"
              autoComplete="username"
              placeholder="you@example.com or +8801..."
              className={inputClassName}
              required
              aria-invalid={Boolean(state.error)}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <label
              htmlFor="signin-password"
              className="block text-xs font-bold text-foreground/75"
            >
              Password
            </label>
            <button
              type="button"
              className="text-xs font-semibold text-primary transition-colors hover:text-[#008c75]"
            >
              Forgot password?
            </button>
          </div>
          <PasswordInput
            id="signin-password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            required
            ariaInvalid={Boolean(state.error)}
          />
        </div>

        <label className="flex w-fit cursor-pointer items-center gap-2.5 text-xs text-foreground/60">
          <input
            type="checkbox"
            name="remember"
            className="h-4 w-4 rounded border-foreground/20 accent-primary"
          />
          Keep me signed in
        </label>

        <button
          type="submit"
          disabled={isPending}
          className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-[#008c75] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {isPending ? (
            <>
              <LoaderCircle
                aria-hidden="true"
                className="h-4 w-4 animate-spin"
              />
              Signing in…
            </>
          ) : (
            <>
              Sign in
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </>
          )}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-foreground/55">
        New to Fish Me Aqua?{" "}
        <Link
          href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          className="font-bold text-primary transition-colors hover:text-[#008c75]"
        >
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
};

export default Signin;
