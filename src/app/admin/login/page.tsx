"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = { status: "idle" };

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <Link
        href="/"
        className="mb-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-brand-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to site
      </Link>

      <h1 className="text-xl font-bold text-brand-primary">Admin Login</h1>
      <p className="mt-1 text-sm text-gray-600">Jai Durga Eye Care & Opticals</p>

      <form action={formAction} className="mt-6 space-y-4">
        {state.status === "error" && state.message ? (
          <p className="rounded bg-red-50 p-3 text-sm text-red-700">{state.message}</p>
        ) : null}

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            name="username"
            required
            autoComplete="username"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-md bg-brand-accent px-4 py-2 font-semibold text-brand-primary hover:brightness-95 disabled:opacity-60"
        >
          {pending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
