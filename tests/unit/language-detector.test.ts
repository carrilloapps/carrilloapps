import { describe, it, expect } from "vitest"
import { detectLanguage, getFileExtension } from "@/lib/language-detector"

describe("detectLanguage", () => {
  it("detects JSON", () => {
    expect(detectLanguage('{ "a": 1, "b": [2, 3] }')).toBe("json")
  })

  it("detects Go before JavaScript", () => {
    expect(detectLanguage('package main\n\nfunc main() {\n  fmt.Println("hi")\n}')).toBe("go")
  })

  it("detects TypeScript via type annotations", () => {
    expect(detectLanguage("interface User { name: string }")).toBe("typescript")
  })

  it("detects JavaScript", () => {
    expect(detectLanguage("const x = 1\nconsole.log(x)")).toBe("javascript")
  })

  it("detects Python", () => {
    expect(detectLanguage("def main():\n    print('hi')")).toBe("python")
  })

  it("detects SQL case-insensitively", () => {
    expect(detectLanguage("SELECT id FROM users WHERE id = 1")).toBe("sql")
  })

  it("falls back to text for unknown content", () => {
    expect(detectLanguage("just some plain words here")).toBe("text")
  })
})

describe("getFileExtension", () => {
  it("maps known languages to extensions", () => {
    expect(getFileExtension("typescript")).toBe("ts")
    expect(getFileExtension("python")).toBe("py")
    expect(getFileExtension("go")).toBe("go")
  })

  it("is case-insensitive", () => {
    expect(getFileExtension("TypeScript")).toBe("ts")
  })

  it("returns the input when the language is unknown", () => {
    expect(getFileExtension("brainfuck")).toBe("brainfuck")
  })
})
