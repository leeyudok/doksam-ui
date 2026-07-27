import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import SaasFeedPage from "@/app/templates/saas/feed/page"
import { FEED_POSTS, FEED_WORKSPACES } from "@/app/templates/saas/_lib/data"

describe("SaasFeedPage", () => {
  it("renders the feed heading and every post by default", () => {
    render(<SaasFeedPage />)
    expect(screen.getByRole("heading", { level: 1, name: "업데이트 피드" })).toBeInTheDocument()
    for (const post of FEED_POSTS) {
      expect(screen.getByText(post.title)).toBeInTheDocument()
    }
  })

  it("filters posts by workspace facet", () => {
    render(<SaasFeedPage />)
    const workspace = FEED_WORKSPACES[0]
    fireEvent.click(screen.getByRole("button", { name: new RegExp(workspace.label) }))

    const expectedTitles = FEED_POSTS.filter((p) => p.workspace === workspace.key)
    const otherTitles = FEED_POSTS.filter((p) => p.workspace !== workspace.key)

    for (const post of expectedTitles) {
      expect(screen.getByText(post.title)).toBeInTheDocument()
    }
    for (const post of otherTitles) {
      expect(screen.queryByText(post.title)).not.toBeInTheDocument()
    }
  })
})
