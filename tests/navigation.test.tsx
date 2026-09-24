// @vitest-environment jsdom
import { renderToStaticMarkup } from "react-dom/server"
import { expect, test } from "vitest"
import PhreshSample from "../app/phresh-sample"

test("the landing page exposes working destinations for documentation and source", () => {
  const document = new DOMParser().parseFromString(renderToStaticMarkup(<PhreshSample />), "text/html")
  const navigation = document.querySelector('nav[aria-label="Primary navigation"]')
  expect(navigation).not.toBeNull()
  const destinations = [...navigation!.querySelectorAll<HTMLAnchorElement>("a")].map(link => link.getAttribute("href"))
  expect(destinations).toContain("https://github.com/PhreshOS/docs")
  expect(destinations).toContain("https://github.com/PhreshOS")
  expect(document.querySelector("#top")).not.toBeNull()
})

test("installation instructions retain both supported bootstrap endpoints", () => {
  const document = new DOMParser().parseFromString(renderToStaticMarkup(<PhreshSample />), "text/html")
  const commands = [...document.querySelectorAll("code")].map(code => code.textContent)
  expect(commands).toContain("curl -fsSL https://install.phreshos.com/sh | bash")
  expect(commands).toContain('powershell -c "irm https://install.phreshos.com/ps1 | iex"')
})
