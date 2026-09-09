"use client"

import { useActionState, useEffect, useState } from "react"
import { createAppointment, type BookingState } from "@/app/(public)/book-appointment/actions"

const initialState: BookingState = { status: "idle" }

interface SlotsResult {
  date: string
  slots: string[]
}

export function BookingForm() {
  const [state, formAction, pending] = useActionState(createAppointment, initialState)
  const [date, setDate] = useState("")
  const [slotsResult, setSlotsResult] = useState<SlotsResult | null>(null)

  useEffect(() => {
    if (!date) return

    let cancelled = false
    fetch(`/book-appointment/slots?date=${date}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setSlotsResult({ date, slots: data.slots ?? [] })
      })
    return () => {
      cancelled = true
    }
  }, [date])

  const loadingSlots = date !== "" && slotsResult?.date !== date
  const visibleSlots = !loadingSlots && slotsResult ? slotsResult.slots : []
  const today = new Date().toISOString().slice(0, 10)

  if (state.status === "success") {
    return (
      <div className="rounded-lg bg-green-50 p-6 text-green-800">
        {state.message}
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.status === "error" && state.message ? (
        <p className="rounded bg-red-50 p-3 text-sm text-red-700">{state.message}</p>
      ) : null}

      <div>
        <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700">
          Preferred Date
        </label>
        <input
          id="preferredDate"
          type="date"
          name="preferredDate"
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {state.fieldErrors?.preferredDate && (
          <p className="mt-1 text-sm text-red-600">{state.fieldErrors.preferredDate}</p>
        )}
      </div>

      <div>
        <label htmlFor="slotTime" className="block text-sm font-medium text-gray-700">
          Preferred Time
        </label>
        <select
          id="slotTime"
          name="slotTime"
          required
          disabled={!date || loadingSlots}
          defaultValue=""
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 disabled:bg-gray-100"
        >
          <option value="" disabled>
            {loadingSlots ? "Loading times..." : date ? "Select a time" : "Pick a date first"}
          </option>
          {visibleSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
        {date && !loadingSlots && visibleSlots.length === 0 ? (
          <p className="mt-1 text-sm text-amber-600">
            No slots available that day — the shop may be closed or fully booked.
          </p>
        ) : null}
        {state.fieldErrors?.slotTime && (
          <p className="mt-1 text-sm text-red-600">{state.fieldErrors.slotTime}</p>
        )}
      </div>

      <div>
        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
          Your Name
        </label>
        <input
          id="customerName"
          name="customerName"
          required
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {state.fieldErrors?.customerName && (
          <p className="mt-1 text-sm text-red-600">{state.fieldErrors.customerName}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {state.fieldErrors?.phone && (
          <p className="mt-1 text-sm text-red-600">{state.fieldErrors.phone}</p>
        )}
      </div>

      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
          Reason / Notes (optional)
        </label>
        <textarea
          id="reason"
          name="reason"
          rows={3}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-brand-accent px-6 py-3 font-semibold text-brand-primary hover:brightness-95 disabled:opacity-60"
      >
        {pending ? "Booking..." : "Book Appointment"}
      </button>
    </form>
  )
}
