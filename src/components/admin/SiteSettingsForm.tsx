"use client"

import { useActionState } from "react"
import { updateSiteSettingsAction, type SettingsFormState } from "@/app/admin/(dashboard)/settings/actions"
import type { SiteSettings } from "@prisma/client"

const initialState: SettingsFormState = { status: "idle" }

function Field({
  label,
  name,
  defaultValue,
  error,
  textarea,
  required = true,
}: {
  label: string
  name: string
  defaultValue?: string | null
  error?: string
  textarea?: boolean
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          defaultValue={defaultValue ?? ""}
          required={required}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
      ) : (
        <input
          id={name}
          name={name}
          defaultValue={defaultValue ?? ""}
          required={required}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}

export function SiteSettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction, pending] = useActionState(updateSiteSettingsAction, initialState)

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      {state.status === "success" && state.message ? (
        <p className="rounded bg-green-50 p-3 text-sm text-green-700">{state.message}</p>
      ) : null}
      {state.status === "error" && state.message ? (
        <p className="rounded bg-red-50 p-3 text-sm text-red-700">{state.message}</p>
      ) : null}

      <Field label="Shop Name" name="shopName" defaultValue={settings.shopName} error={state.fieldErrors?.shopName} />
      <Field label="Tagline (English)" name="tagline" defaultValue={settings.tagline} error={state.fieldErrors?.tagline} />
      <Field
        label="Tagline (Telugu, optional)"
        name="taglineTelugu"
        defaultValue={settings.taglineTelugu}
        error={state.fieldErrors?.taglineTelugu}
        required={false}
      />
      <Field label="Phone" name="phone" defaultValue={settings.phone} error={state.fieldErrors?.phone} />
      <Field label="Address" name="address" defaultValue={settings.address} error={state.fieldErrors?.address} />
      <Field
        label="Map Embed URL (optional)"
        name="mapEmbedUrl"
        defaultValue={settings.mapEmbedUrl}
        error={state.fieldErrors?.mapEmbedUrl}
        required={false}
      />
      <Field label="Hours" name="hoursText" defaultValue={settings.hoursText} error={state.fieldErrors?.hoursText} />
      <Field
        label="Services Description"
        name="servicesText"
        defaultValue={settings.servicesText}
        error={state.fieldErrors?.servicesText}
        textarea
      />
      <Field
        label="About Text"
        name="aboutText"
        defaultValue={settings.aboutText}
        error={state.fieldErrors?.aboutText}
        textarea
      />

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-brand-accent px-5 py-2.5 font-semibold text-brand-primary hover:brightness-95 disabled:opacity-60"
      >
        {pending ? "Saving..." : "Save Settings"}
      </button>
    </form>
  )
}
