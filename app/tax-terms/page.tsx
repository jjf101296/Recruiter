import { EnhancedTaxTerms } from "@/components/enhanced-tax-terms"
import { BackToHome } from "@/components/back-to-home"

export default function TaxTermsPage() {
  return (
    <div className="container mx-auto py-8">
      <BackToHome />
      <EnhancedTaxTerms />
    </div>
  )
}
