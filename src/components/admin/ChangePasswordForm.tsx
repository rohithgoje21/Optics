"use client"

import { useActionState, useEffect, useRef } from "react"
import { changePasswordAction, type ChangePasswordState } from "@/app/admin/(dashboard)/settings/password-actions"

const initialState: ChangePasswordState = { status: "idle" }

export function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState(changePasswordAction, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <form ref={formRef} action={formAction} className="max-w-md space-y-4">
      {state.status === "success" && state.message ? (
        <p className="rounded bg-green-50 p-3 text-sm text-green-700">{state.message}</p>
      ) : null}
      {state.status === "error" && state.message ? (
        <p className="rounded bg-red-50 p-3 text-sm text-red-700">{state.message}</p>
      ) : null}

      <div>
        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
          Current Password
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {state.fieldErrors?.currentPassword && (
          <p className="mt-1 text-sm text-red-600">{state.fieldErrors.currentPassword}</p>
        )}
      </div>

      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          required
          autoComplete="new-password"
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {state.fieldErrors?.newPassword && (
          <p className="mt-1 text-sm text-red-600">{state.fieldErrors.newPassword}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm New Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          autoComplete="new-password"
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {state.fieldErrors?.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{state.fieldErrors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-brand-accent px-5 py-2.5 font-semibold text-brand-primary hover:brightness-95 disabled:opacity-60"
      >
        {pending ? "Updating..." : "Update Password"}
      </button>
    </form>
  )
}
