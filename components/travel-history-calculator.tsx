"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Plus, Trash2, Download, Calculator } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface TravelEntry {
  id: string
  entryDate: Date
  exitDate: Date | null
  status: string
  daysSpent: number
}

export function TravelHistoryCalculator() {
  const [activeTab, setActiveTab] = useState("calculator")
  const [travelEntries, setTravelEntries] = useState<TravelEntry[]>([])
  const [entryDate, setEntryDate] = useState<Date | undefined>(undefined)
  const [exitDate, setExitDate] = useState<Date | undefined>(undefined)
  const [visaStatus, setVisaStatus] = useState("B1/B2")
  const [showInfoDialog, setShowInfoDialog] = useState(false)

  const addTravelEntry = () => {
    if (!entryDate) return

    const newEntry: TravelEntry = {
      id: Date.now().toString(),
      entryDate: entryDate,
      exitDate: exitDate || null,
      status: visaStatus,
      daysSpent: exitDate ? Math.ceil((exitDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24)) + 1 : 0,
    }

    setTravelEntries([...travelEntries, newEntry])
    setEntryDate(undefined)
    setExitDate(undefined)
  }

  const removeTravelEntry = (id: string) => {
    setTravelEntries(travelEntries.filter((entry) => entry.id !== id))
  }

  const totalDaysSpent = travelEntries.reduce((total, entry) => total + entry.daysSpent, 0)

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator">I94 Calculator</TabsTrigger>
          <TabsTrigger value="history">Travel History</TabsTrigger>
          <TabsTrigger value="info">Visa Information</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 mr-2 text-purple-500" />
                Add Travel Entry
              </CardTitle>
              <CardDescription>Add your travel entries to calculate days spent in the United States</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Entry Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {entryDate ? format(entryDate, "PPP") : <span>Select entry date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={entryDate} onSelect={setEntryDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Exit Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          disabled={!entryDate}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {exitDate ? format(exitDate, "PPP") : <span>Select exit date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={exitDate}
                          onSelect={setExitDate}
                          disabled={(date) => date < (entryDate || new Date())}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Visa/Status</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={visaStatus}
                    onChange={(e) => setVisaStatus(e.target.value)}
                  >
                    <option value="B1/B2">B1/B2 Visitor</option>
                    <option value="F1">F1 Student</option>
                    <option value="J1">J1 Exchange Visitor</option>
                    <option value="H-1B">H-1B Worker</option>
                    <option value="L-1">L-1 Intracompany Transferee</option>
                    <option value="O-1">O-1 Extraordinary Ability</option>
                    <option value="TN">TN NAFTA Professional</option>
                    <option value="ESTA">ESTA/Visa Waiver</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <Button onClick={addTravelEntry} disabled={!entryDate || !exitDate} className="w-full">
                  <Plus className="h-4 w-4 mr-2" /> Add Travel Entry
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Travel Summary</CardTitle>
              <CardDescription>Overview of your travel history and days spent in the United States</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 p-4 rounded-md border border-slate-200 text-center">
                    <p className="text-sm text-slate-500">Total Entries</p>
                    <p className="text-2xl font-bold">{travelEntries.length}</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-md border border-slate-200 text-center">
                    <p className="text-sm text-slate-500">Total Days</p>
                    <p className="text-2xl font-bold">{totalDaysSpent}</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-md border border-slate-200 text-center">
                    <p className="text-sm text-slate-500">Last 180 Days</p>
                    <p className="text-2xl font-bold">--</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-md border border-slate-200 text-center">
                    <p className="text-sm text-slate-500">Last 365 Days</p>
                    <p className="text-2xl font-bold">--</p>
                  </div>
                </div>

                {travelEntries.length > 0 ? (
                  <div className="border rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-slate-200">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Entry Date
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Exit Date
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Days
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {travelEntries.map((entry) => (
                          <tr key={entry.id}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              {format(entry.entryDate, "MMM d, yyyy")}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              {entry.exitDate ? format(entry.exitDate, "MMM d, yyyy") : "Present"}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              <Badge variant="outline">{entry.status}</Badge>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">{entry.daysSpent}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              <Button variant="ghost" size="sm" onClick={() => removeTravelEntry(entry.id)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 border rounded-md bg-slate-50">
                    <p className="text-slate-500">No travel entries added yet.</p>
                    <p className="text-slate-400 text-sm mt-1">Add your first entry using the form above.</p>
                  </div>
                )}

                {travelEntries.length > 0 && (
                  <div className="flex justify-end">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" /> Export Data
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Travel History</CardTitle>
              <CardDescription>View and manage your complete travel history</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>

        <TabsContent value="info" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Visa Information</CardTitle>
              <CardDescription>Information about different visa types.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This section will provide information about different visa types and their requirements.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
