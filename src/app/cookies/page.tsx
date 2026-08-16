import { LegalDocument } from "@/components/legal/legal-document"
import { COOKIE_POLICY } from "@/lib/data/legal"

export default function CookiePolicyPage() {
  return <LegalDocument {...COOKIE_POLICY} />
}
