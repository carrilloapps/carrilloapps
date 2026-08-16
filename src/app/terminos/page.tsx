import { LegalDocument } from "@/components/legal/legal-document"
import { TERMS } from "@/lib/data/legal"

export default function TermsPage() {
  return <LegalDocument {...TERMS} />
}
