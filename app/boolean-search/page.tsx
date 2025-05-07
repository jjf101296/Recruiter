import { BackToHome } from "@/components/back-to-home"
import { BooleanSearchJobParser } from "@/components/boolean-search-job-parser"
import { BooleanSearchBuilder } from "@/components/boolean-search-builder"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BooleanSearchPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <BackToHome />

      <h1 className="text-3xl font-bold text-center mb-8">Boolean Search Generator</h1>

      <Tabs defaultValue="job-parser" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="job-parser">Job Description Parser</TabsTrigger>
          <TabsTrigger value="builder">Boolean Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="job-parser">
          <BooleanSearchJobParser />
        </TabsContent>

        <TabsContent value="builder">
          <BooleanSearchBuilder />
        </TabsContent>
      </Tabs>
    </div>
  )
}
