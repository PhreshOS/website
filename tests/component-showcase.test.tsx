// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterAll, afterEach, beforeAll, expect, test, vi } from "vitest"
import {
  ButtonShowcase,
  CalendarShowcase,
  ContextMenuShowcase,
  DateFieldShowcase,
  DatePickerShowcase,
  DateRangePickerShowcase,
  ListBoxShowcase,
  ProgressBarShowcase,
  RangeCalendarShowcase,
  SpinnerShowcase,
  TabsShowcase,
  TimeFieldShowcase,
  TreeShowcase,
  WindowShowcase,
} from "../components/showcase"
import { colorOptions } from "../components/showcase/showcase"

const docsTheme = vi.hoisted(() => ({ resolvedTheme: "dark" as "dark" | "light" | undefined }))

vi.mock("fumadocs-ui/provider/base", () => ({
  useTheme: () => ({ resolvedTheme: docsTheme.resolvedTheme }),
}))

afterEach(() => {
  cleanup()
  docsTheme.resolvedTheme = "dark"
})

beforeAll(() => {
  Object.defineProperty(Element.prototype, "getAnimations", {
    configurable: true,
    value: () => []
  })
})

afterAll(() => {
  Reflect.deleteProperty(Element.prototype, "getAnimations")
})

test("shared color controls offer the component default and every Appearance role", () => {
  expect(colorOptions.map(option => option.value)).toEqual([
    "",
    "default",
    "background",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "info",
  ])
})

test("showcases start from each component's own default color", () => {
  const button = render(<ButtonShowcase />)
  expect(screen.getByLabelText("Color").textContent).toContain("Default")
  button.unmount()

  render(<SpinnerShowcase />)
  expect(screen.getByLabelText("Color").textContent).toContain("Default")
})

test("the button showcase puts the action in a window and applies controls", () => {
  render(<ButtonShowcase />)
  expect(document.querySelector<HTMLElement>(".component-showcase-stage")?.style.backgroundImage)
    .toContain("/component-preview/dark.png")
  expect(screen.getByLabelText("Properties")).toBeTruthy()
  expect(screen.getByText("Button")).toBeTruthy()
  expect(screen.getByRole("button", { name: "Save" })).toBeTruthy()
  fireEvent.click(screen.getByLabelText("Disabled"))
  expect((screen.getByRole("button", { name: "Save" }) as HTMLButtonElement).disabled).toBe(true)
})

test("the Window showcase uses the complete Window composition", () => {
  render(<WindowShowcase />)

  const content = screen.getByText("Three notes, last edited a minute ago.")
  const window = content.parentElement
  expect(window?.style.display).toBe("flex")
  expect(window?.style.flexDirection).toBe("column")
  expect(screen.getByRole("button", { name: "Maximize" })).toBeTruthy()
})

test("the preview stage follows the light documentation theme", () => {
  docsTheme.resolvedTheme = "light"
  render(<ButtonShowcase />)

  expect(document.querySelector<HTMLElement>(".component-showcase-stage")?.style.backgroundImage)
    .toContain("/component-preview/light.png")
})

test("the preview withholds React UI until the documentation theme resolves", () => {
  docsTheme.resolvedTheme = undefined
  const view = render(<ButtonShowcase />)

  expect(document.querySelector(".component-showcase-stage")).toBeNull()
  expect(screen.getByRole("status").textContent).toContain("Loading preview")

  docsTheme.resolvedTheme = "dark"
  view.rerender(<ButtonShowcase />)

  expect(document.querySelector<HTMLElement>(".component-showcase-stage")?.style.backgroundImage)
    .toContain("/component-preview/dark.png")
  expect(screen.queryByRole("status")).toBeNull()
})

test("the Context Menu showcase is operable", () => {
  render(<ContextMenuShowcase />)

  fireEvent.contextMenu(screen.getByRole("button", { name: "Context actions" }))

  expect(screen.getByRole("menu", { name: "Context actions" })).toBeTruthy()
  expect(screen.getByRole("menuitem", { name: "Open" })).toBeTruthy()
})

test("the List Box showcase presents an operable visible collection", () => {
  render(<ListBoxShowcase />)

  expect(screen.getByRole("listbox", { name: "Tools" })).toBeTruthy()
  expect(screen.getByRole("option", { name: "Editor" }).getAttribute("aria-selected")).toBe("true")
  expect(screen.getByRole("option", { name: "Archive" }).getAttribute("aria-disabled")).toBe("true")
})

test("the Tabs showcase connects each tab to its panel", () => {
  render(<TabsShowcase />)

  fireEvent.click(screen.getByRole("tab", { name: "Activity" }))
  expect(screen.getByRole("tabpanel", { name: "Activity" }).textContent).toContain("Last synced a minute ago.")
})

test("the Progress Bar showcase switches between measured and indeterminate activity", () => {
  render(<ProgressBarShowcase />)

  const progress = screen.getByRole("progressbar", { name: "Uploading archive" })
  expect(progress.getAttribute("aria-valuenow")).toBe("64")

  fireEvent.click(screen.getByLabelText("Indeterminate"))
  expect(progress.getAttribute("aria-valuenow")).toBeNull()
})

test("the Spinner showcase names its indeterminate activity", () => {
  render(<SpinnerShowcase />)

  const spinner = screen.getByRole("progressbar", { name: "Loading workspace" })
  expect(spinner.getAttribute("aria-valuenow")).toBeNull()
})

test("the Date Field showcase exposes one locale-aware date value", () => {
  render(<DateFieldShowcase />)

  expect(screen.getByRole("group", { name: "Due date" })).toBeTruthy()
  expect(screen.getAllByRole("spinbutton")).toHaveLength(3)
})

test("the Time Field showcase changes its visible precision", () => {
  render(<TimeFieldShowcase />)

  expect(screen.getByRole("group", { name: "Start time" })).toBeTruthy()
  expect(screen.queryByRole("spinbutton", { name: /second/i })).toBeNull()
  fireEvent.click(screen.getByRole("button", { name: /smallest unit/i }))
  fireEvent.click(screen.getByRole("option", { name: "Second" }))
  expect(screen.getByRole("spinbutton", { name: /second/i })).toBeTruthy()
})

test("the Date Picker showcase opens its calendar", () => {
  render(<DatePickerShowcase />)

  fireEvent.click(screen.getByRole("button", { name: /calendar/i }))
  expect(screen.getByRole("dialog")).toBeTruthy()
  expect(screen.getByRole("grid")).toBeTruthy()
})

test("the Calendar showcase presents one visible month", () => {
  render(<CalendarShowcase />)

  expect(screen.getByRole("grid", { name: /Release date, September 2026/i })).toBeTruthy()
  expect(screen.getByRole("heading", { name: /September 2026/i })).toBeTruthy()
})

test("the Range Calendar showcase presents one selected range", () => {
  render(<RangeCalendarShowcase />)

  expect(screen.getByRole("grid", { name: /Trip dates, September 2026/i })).toBeTruthy()
  expect(document.querySelectorAll("[aria-selected=true]").length).toBeGreaterThan(1)
})

test("the Date Range Picker showcase opens its range calendar", () => {
  render(<DateRangePickerShowcase />)

  expect(screen.getAllByRole("spinbutton")).toHaveLength(6)
  fireEvent.click(screen.getByRole("button", { name: /calendar/i }))
  expect(screen.getByRole("dialog")).toBeTruthy()
  expect(screen.getByRole("grid")).toBeTruthy()
})

test("the Tree showcase preserves selection while branches expand and collapse", () => {
  render(<TreeShowcase />)

  expect(screen.getByRole("row", { name: "tree.tsx" }).getAttribute("aria-selected")).toBe("true")
  fireEvent.click(screen.getByRole("button", { name: "Collapse source" }))
  expect(screen.queryByRole("row", { name: "tree.tsx" })).toBeNull()
  fireEvent.click(screen.getByRole("button", { name: "Expand source" }))
  expect(screen.getByRole("row", { name: "tree.tsx" }).getAttribute("aria-selected")).toBe("true")
  expect(screen.getByRole("row", { name: "archive" }).getAttribute("aria-disabled")).toBe("true")
})
