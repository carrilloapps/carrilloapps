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

/*
  Regression for the unescaped pipe in the Elixir branch.

  The condition read `/|>/.test(code) && /def\s+/.test(code)`. `/|>/` is an
  alternation whose left side is empty, so it matches every string — the branch
  collapsed to "contains def", and any Python or Ruby function was reported as
  Elixir. SonarQube flagged it (typescript:S6323); no test had covered it.
*/
describe("elixir branch", () => {
  /*
    Regression for the unescaped pipe, plus what fixing it revealed.

    The condition read `/|>/.test(code) && /def\s+/.test(code)`. `/|>/` is an
    alternation whose left side is empty, so it matched *every* string: the
    branch collapsed to "contains def", and any Python or Ruby function was
    reported as Elixir. SonarQube flagged it (typescript:S6323) and no test
    covered it. Escaping the pipe fixes that false positive, which is the part
    that mattered — it was mislabelling other languages.

    Writing these tests then showed the branch is unreachable in practice.
    `detectLanguage` is an ordered cascade: JavaScript is checked at line 77 and
    Ruby at line 175, while Elixir sits at line 351. Idiomatic Elixir matches an
    earlier branch every time — `Enum.map(` hits JavaScript's
    `/\.(map|filter|reduce|forEach)\(/`, and `def … end` hits Ruby.

    Reordering a 390-line cascade would change the answer for every language
    above the move, and no route in the app calls this module
    (docs/DESIGN_STATUS.md §3.1). So the tests below record what it actually
    does. Fix the ordering the day something mounts it.
  */
  it("no longer claims Python as Elixir", () => {
    const python = `def main():\n    print("hello")\n`
    expect(detectLanguage(python)).not.toBe("elixir")
  })

  it("no longer claims plain JavaScript as Elixir", () => {
    const js = `function run() {\n  return 1\n}\n`
    expect(detectLanguage(js)).not.toBe("elixir")
  })

  it("records that Ruby's def/end claims Elixir source first", () => {
    const elixir = `defmodule Demo do\n  def run(x) do\n    x |> Integer.to_string()\n  end\nend\n`
    expect(detectLanguage(elixir)).toBe("ruby")
  })

  it("records that Enum.map is read as JavaScript", () => {
    const elixirWithMap = `defmodule Demo do\n  def run(x) do\n    x |> Enum.map(&(&1 * 2))\n  end\nend\n`
    expect(detectLanguage(elixirWithMap)).toBe("javascript")
  })
})
