import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Badge } from "@/components/ui/badge"

describe("Testing Library + jsdom smoke", () => {
  it("renders a Badge with its children into the DOM", () => {
    render(<Badge>Destacado</Badge>)
    expect(screen.getByText("Destacado")).toBeInTheDocument()
  })
})
