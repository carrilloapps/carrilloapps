"use client"

import { useEffect, useMemo, useState } from "react"

import { CountrySelect } from "@/components/ui/country-select"
import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
  getExampleNumber,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js"
import examples from "libphonenumber-js/examples.mobile.json"

/**
 * A phone field that knows what a phone number looks like where you are.
 *
 * The form used to be a plain `type="tel"` with a Colombian placeholder, which
 * assumed both the country and the shape. Someone in México types ten digits,
 * someone in España nine, and the WhatsApp link needs E.164 regardless — so the
 * field asks for the country explicitly and formats the rest as it is typed.
 *
 * `libphonenumber-js` does the parsing and formatting; the interface is ours.
 * A prebuilt phone input would have arrived with its own boxes, dropdowns and
 * flag sprites, none of which exist in this design.
 *
 * Country names come from `Intl.DisplayNames`, which the platform already has —
 * no list to ship, no list to keep in sync, and it follows the page language.
 */

const REGION_NAMES = new Intl.DisplayNames(["es"], { type: "region" })

/**
 * Built once, and only in the browser.
 *
 * `Intl.DisplayNames` does not agree between Node and Chrome — different ICU
 * data, different Spanish names, and therefore a different sort order for 245
 * countries. Rendered on the server that produced a hydration mismatch on every
 * load (React #418). The list is now client-only: the server renders the single
 * selected country, and the full set arrives after mount, which is before
 * anyone can open a closed `<select>` anyway.
 */
function buildCountries() {
  return getCountries()
    .map((code) => ({
      code,
      dial: `+${getCountryCallingCode(code)}`,
      name: REGION_NAMES.of(code) ?? code,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "es"))
}

type Country = ReturnType<typeof buildCountries>[number]
let cachedCountries: Country[] | null = null

export interface PhoneValue {
  /** What the visitor sees, formatted for the selected country. */
  national: string
  /** E.164 (`+573003328389`) when the number is valid, otherwise empty. */
  e164: string
  country: CountryCode
  isValid: boolean
}

export const EMPTY_PHONE: PhoneValue = {
  national: "",
  e164: "",
  country: "CO",
  isValid: false,
}

interface PhoneFieldProps {
  id: string
  value: PhoneValue
  onChange: (value: PhoneValue) => void
  disabled?: boolean
  required?: boolean
}

export function PhoneField({ id, value, onChange, disabled, required }: PhoneFieldProps) {
  const [touched, setTouched] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const countries = useMemo(() => {
    if (!mounted) {
      // Server and first client render agree on exactly this one option.
      return [
        {
          code: value.country,
          dial: `+${getCountryCallingCode(value.country)}`,
          name: value.country,
        },
      ]
    }
    cachedCountries ??= buildCountries()
    return cachedCountries
  }, [mounted, value.country])

  /**
   * A real mobile number for this country, formatted nationally.
   *
   * The placeholder used to be a Colombian number padded with zeros for
   * everyone else, which told a visitor in España that nine zeros was the
   * expected shape. `examples.mobile.json` is 4 KB and carries one valid mobile
   * per country, which is precisely the hint the field should give.
   */
  const placeholder = useMemo(() => {
    try {
      return getExampleNumber(value.country, examples)?.formatNational() ?? ""
    } catch {
      return ""
    }
  }, [value.country])

  const update = (national: string, country: CountryCode) => {
    // `AsYouType` is stateful per instance, so it gets a fresh one each keypress
    // rather than being reused — reusing it makes the caret jump on deletion.
    const formatted = new AsYouType(country).input(national)
    const parsed = parsePhoneNumberFromString(formatted, country)

    onChange({
      national: formatted,
      e164: parsed?.isValid() ? parsed.number : "",
      country,
      isValid: !!parsed?.isValid(),
    })
  }

  const showError = touched && value.national.length > 0 && !value.isValid

  return (
    <div>
      {/* Same surface and same rule as every other field: this wrapper carried
          `bg-ink-raised` while the inputs moved to `bg-field`, and the identical
          border read lighter against the darker ground. */}
      <div
        data-field-group
        className="group flex items-stretch border border-rule bg-field transition-colors hover:border-rule-strong"
      >
        <CountrySelect
          triggerClassName="w-[7.5rem] border-r"
          label="País"
          value={value.country}
          options={countries}
          disabled={disabled}
          onChange={(code) => update(value.national, code as CountryCode)}
        />

        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          required={required}
          disabled={disabled}
          value={value.national}
          onBlur={() => setTouched(true)}
          onChange={(e) => update(e.target.value, value.country)}
          placeholder={placeholder}
          aria-invalid={showError}
          aria-describedby={showError ? `${id}-error` : `${id}-hint`}
          data-bare-field
          className="min-h-[48px] w-full bg-transparent px-3 font-mono text-base text-paper placeholder:text-paper-faint focus:outline-none disabled:cursor-not-allowed"
        />
      </div>

      {/* Once it parses, the hint shows the exact string that will travel:
          E.164 is what WhatsApp receives, and seeing it removes any doubt about
          whether the country code got picked up. */}
      {showError ? (
        <p id={`${id}-error`} role="alert" className="mt-2 font-mono text-xs text-stamp-text">
          Ese número no es válido en {REGION_NAMES.of(value.country)}.
        </p>
      ) : (
        <p id={`${id}-hint`} className="mt-2 font-mono text-[11px] text-paper-faint">
          {value.e164 || "Elige el país y escribe el número"}
        </p>
      )}
    </div>
  )
}
