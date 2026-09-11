"use client"

import { useActionState } from "react"
import type { FaqFormState } from "@/app/admin/(dashboard)/faq/actions"
import type { FaqEntry } from "@prisma/client"

const initialState: FaqFormState = { status: "idle" }

export function FaqForm({
  action,
  faq,
}: {
  action: (prevState: FaqFormState, formData: FormData) => Promise<FaqFormState>
  faq?: FaqEntry
}) {
  const [state, formAction, pending] = useActionState(action, initialState)

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      {state.status === "error" && state.message ? (
        <p className="rounded bg-red-50 p-3 text-sm text-red-700">{state.message}</p>
      ) : null}

      <div>
        <label htmlFor="questionEn" className="block text-sm font-medium text-gray-700">
          Question (English)
        </label>
        <input
          id="questionEn"
          name="questionEn"
          defaultValue={faq?.questionEn}
          required
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {state.fieldErrors?.questionEn && (
          <p className="mt-1 text-sm text-red-600">{state.fieldErrors.questionEn}</p>
        )}
      </div>

      <div>
        <label htmlFor="questionTe" className="block text-sm font-medium text-gray-700">
          Question (Telugu)
        </label>
        <input
          id="questionTe"
          name="questionTe"
          defaultValue={faq?.questionTe}
          required
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {state.fieldErrors?.questionTe && (
          <p className="mt-1 text-sm text-red-600">{state.fieldErrors.questionTe}</p>
        )}
      </div>

      <div>
        <label htmlFor="answerEn" className="block text-sm font-medium text-gray-700">
          Answer (English)
        </label>
        <textarea
          id="answerEn"
          name="answerEn"
          rows={3}
          defaultValue={faq?.answerEn}
          required
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {state.fieldErrors?.answerEn && (
          <p className="mt-1 text-sm text-red-600">{state.fieldErrors.answerEn}</p>
        )}
      </div>

      <div>
        <label htmlFor="answerTe" className="block text-sm font-medium text-gray-700">
          Answer (Telugu)
        </label>
        <textarea
          id="answerTe"
          name="answerTe"
          rows={3}
          defaultValue={faq?.answerTe}
          required
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {state.fieldErrors?.answerTe && (
          <p className="mt-1 text-sm text-red-600">{state.fieldErrors.answerTe}</p>
        )}
      </div>

      <div>
        <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">
          Sort Order
        </label>
        <input
          id="sortOrder"
          name="sortOrder"
          type="number"
          defaultValue={faq?.sortOrder ?? 0}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-brand-accent px-5 py-2.5 font-semibold text-brand-primary hover:brightness-95 disabled:opacity-60"
      >
        {pending ? "Saving..." : faq ? "Save Changes" : "Add FAQ"}
      </button>
    </form>
  )
}
