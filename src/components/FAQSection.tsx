"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import type { FaqEntry } from "@prisma/client"

type Lang = "en" | "te"

function FaqItem({ lang, question, answer }: { lang: Lang; question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <span lang={lang} className="font-medium text-brand-primary">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
        <p lang={lang} className="mt-2 text-gray-700">
          {answer}
        </p>
      ) : null}
    </div>
  )
}

export function FAQSection({ entries }: { entries: FaqEntry[] }) {
  const [lang, setLang] = useState<Lang>("en")

  if (entries.length === 0) {
    return <p className="text-gray-500">No FAQs yet — check back soon.</p>
  }

  return (
    <div>
      <div className="ml-auto flex w-fit justify-end gap-1 rounded-full border border-gray-200 bg-gray-50 p-1 text-sm font-medium">
        <button
          type="button"
          onClick={() => setLang("en")}
          className={`rounded-full px-4 py-1.5 ${
            lang === "en" ? "bg-brand-primary text-white" : "text-gray-600 hover:text-brand-primary"
          }`}
        >
          English
        </button>
        <button
          type="button"
          onClick={() => setLang("te")}
          className={`rounded-full px-4 py-1.5 ${
            lang === "te" ? "bg-brand-primary text-white" : "text-gray-600 hover:text-brand-primary"
          }`}
        >
          తెలుగు
        </button>
      </div>

      <div className="mt-4">
        {entries.map((entry) => (
          <FaqItem
            key={entry.id}
            lang={lang}
            question={lang === "en" ? entry.questionEn : entry.questionTe}
            answer={lang === "en" ? entry.answerEn : entry.answerTe}
          />
        ))}
      </div>
    </div>
  )
}
