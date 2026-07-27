import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import ContentFeedPatternsPage from "@/app/patterns/content-feed/page"
import { CONTENT_FEED_SAMPLES } from "@/components/patterns/content-feed-samples"

describe("ContentFeedPatternsPage", () => {
  it("renders the page heading from the pattern registry", () => {
    render(<ContentFeedPatternsPage />)
    expect(screen.getByRole("heading", { level: 1, name: "콘텐츠 피드 패턴" })).toBeInTheDocument()
  })

  it("renders every content-feed sample as a numbered section", () => {
    render(<ContentFeedPatternsPage />)
    for (const sample of CONTENT_FEED_SAMPLES) {
      expect(screen.getByRole("heading", { level: 2, name: sample.title })).toBeInTheDocument()
      expect(screen.getByText(`#${sample.num}`)).toBeInTheDocument()
    }
  })

  it("renders 2 samples", () => {
    render(<ContentFeedPatternsPage />)
    expect(CONTENT_FEED_SAMPLES.length).toBe(3)
  })
})
