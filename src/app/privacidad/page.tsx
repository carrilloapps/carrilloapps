import { LegalDocument } from "@/components/legal/legal-document"
import { PRIVACY_POLICY } from "@/lib/data/legal"

export default function PrivacyPolicyPage() {
  return <LegalDocument {...PRIVACY_POLICY} />
}
