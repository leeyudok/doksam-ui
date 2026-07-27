"use client"

import { useState } from "react"

import { MultiSelect } from "@/components/multi-select"

const FRAMEWORKS = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt", label: "Nuxt" },
]

export function MultiSelectDemo() {
  const [value, setValue] = useState<string[]>(["next", "astro"])

  return <MultiSelect options={FRAMEWORKS} value={value} onValueChange={setValue} />
}
