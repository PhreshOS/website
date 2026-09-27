// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react"
import { hydrateRoot } from "react-dom/client"
import { renderToString } from "react-dom/server"
import { afterEach, expect, test, vi } from "vitest"
import { usePreferences } from "@phreshos/react-ui"
import { ComponentPreview } from "../components/component-preview"

const docsTheme = vi.hoisted(() => ({ resolvedTheme: "dark" as "dark" | "light" | undefined }))
vi.mock("fumadocs-ui/provider/base", () => ({ useTheme: () => docsTheme }))

afterEach(cleanup)

function ThemeProbe() {
  return <output aria-label="Preview theme">{usePreferences().theme}</output>
}

function Example() {
  return <ComponentPreview code="Example source" language="text">
    <ThemeProbe />
  </ComponentPreview>
}

test("the preview follows the docs theme and switches between result and source", () => {
  docsTheme.resolvedTheme = "dark"
  const view = render(<Example />)
  expect(screen.getByLabelText("Preview theme").textContent).toBe("dark")
  expect(document.querySelector(".component-showcase-stage")?.classList.contains("not-prose")).toBe(true)
  docsTheme.resolvedTheme = "light"
  view.rerender(<Example />)
  expect(screen.getByLabelText("Preview theme").textContent).toBe("light")
  fireEvent.click(screen.getByRole("tab", { name: "Code" }))
  // The code block also carries its own copy button; the source is its code.
  expect(screen.getByRole("tabpanel").querySelector("pre")?.textContent).toBe("Example source")
  fireEvent.click(screen.getByRole("tab", { name: "Preview" }))
  expect(screen.getByLabelText("Preview theme").textContent).toBe("light")
})

test("server markup hydrates without a theme mismatch before adopting the docs theme", async () => {
  docsTheme.resolvedTheme = undefined
  const container = document.createElement("div")
  container.innerHTML = renderToString(<Example />)
  expect(container.querySelector("output")).toBeNull()
  expect(container.querySelector('[role="status"]')?.textContent).toContain("Loading preview")

  docsTheme.resolvedTheme = "dark"
  const errors: unknown[] = []
  let root: ReturnType<typeof hydrateRoot> | undefined
  try {
    await act(async () => {
      root = hydrateRoot(container, <Example />, { onRecoverableError: error => errors.push(error) })
    })
    expect(errors).toEqual([])
    expect(container.querySelector("output")?.textContent).toBe("dark")
    expect(container.querySelector('[role="status"]')).toBeNull()
  } finally {
    await act(async () => root?.unmount())
  }
})
