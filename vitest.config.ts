import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    pool: "forks",
    maxWorkers: 2,
    projects: [
      {
        extends: true,
        test: {
          name: "default",
          include: [
            "tests/**/*.test.{ts,tsx,mjs}"
          ],
          exclude: [
            "tests/**/*.platform.test.*",
            "tests/**/*.live.test.*"
          ],
          environment: "node",
          testTimeout: 30000
        }
      }
    ]
  }
})
