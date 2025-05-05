import { VisaTypesList } from "@/components/visa-types-list"

export default function VisaTypesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">US Visa Types</h1>
      <VisaTypesList />
    </div>
  )
}
