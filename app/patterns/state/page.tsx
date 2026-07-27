import { notFound } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { PatternSample } from "@/components/showcase/pattern-sample"
import { STATE_SAMPLES } from "@/components/patterns/state-samples"
import { getPatternEntry } from "@/lib/patterns/registry"

export default function StatePatternsPage() {
  const entry = getPatternEntry("state")
  if (!entry) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Patterns
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight">{entry.title}</h1>
        <p className="max-w-prose text-sm text-muted-foreground">{entry.description}</p>
      </section>

      {STATE_SAMPLES.map((sample) => (
        <PatternSample key={sample.num} {...sample} />
      ))}
    </div>
  )
}
