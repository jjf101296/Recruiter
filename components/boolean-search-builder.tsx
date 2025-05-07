"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, Search, X, Plus, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SkillGroup {
  category: string
  skills: string[]
}

export function BooleanSearchBuilder() {
  const [jobTitle, setJobTitle] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<SkillGroup[]>([])
  const [booleanString, setBooleanString] = useState("")
  const [isCopied, setIsCopied] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const { toast } = useToast()

  // Define common skill suggestions by job title
  const skillSuggestions: Record<string, SkillGroup[]> = {
    "Software Engineer": [
      { category: "Programming Languages", skills: ["JavaScript", "TypeScript", "Python", "Java", "C#", "Go", "Ruby"] },
      {
        category: "Frameworks",
        skills: ["React", "Angular", "Vue.js", "Node.js", "Django", "Spring Boot", ".NET Core"],
      },
      { category: "Tools", skills: ["Git", "Docker", "Kubernetes", "Jenkins", "AWS", "Azure", "GCP"] },
    ],
    "Frontend Developer": [
      { category: "Core", skills: ["HTML", "CSS", "JavaScript", "TypeScript"] },
      { category: "Frameworks", skills: ["React", "Angular", "Vue.js", "Svelte", "Next.js", "Gatsby"] },
      { category: "Styling", skills: ["SASS", "LESS", "Tailwind CSS", "styled-components", "CSS Modules"] },
      { category: "Build Tools", skills: ["Webpack", "Vite", "Babel", "ESLint", "Prettier"] },
    ],
    "Backend Developer": [
      { category: "Languages", skills: ["Node.js", "Python", "Java", "C#", "Go", "Ruby", "PHP"] },
      {
        category: "Frameworks",
        skills: ["Express", "Django", "Spring Boot", "ASP.NET Core", "Laravel", "Ruby on Rails"],
      },
      { category: "Databases", skills: ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis", "Elasticsearch"] },
      { category: "APIs", skills: ["REST", "GraphQL", "gRPC", "WebSockets"] },
    ],
    "Data Scientist": [
      { category: "Languages", skills: ["Python", "R", "SQL", "Julia"] },
      { category: "Libraries", skills: ["NumPy", "Pandas", "Scikit-learn", "TensorFlow", "PyTorch", "Keras"] },
      { category: "Tools", skills: ["Jupyter", "Tableau", "Power BI", "SPSS", "SAS"] },
      {
        category: "Concepts",
        skills: ["Machine Learning", "Deep Learning", "NLP", "Data Visualization", "Statistical Analysis"],
      },
    ],
  }

  // Default job titles
  const defaultJobTitles = Object.keys(skillSuggestions)

  // Generic skills for other job titles
  const genericSkills: SkillGroup[] = [
    {
      category: "Technical Skills",
      skills: ["Java", "Python", "JavaScript", "SQL", "AWS", "Azure", "Docker", "Kubernetes"],
    },
    {
      category: "Soft Skills",
      skills: ["Communication", "Teamwork", "Problem Solving", "Leadership", "Time Management"],
    },
  ]

  const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value)
    setShowSuggestions(e.target.value.length > 0)
    // Clear selected skills when job title changes
    setSelectedSkills([])
    setBooleanString("")
  }

  const handleSelectJobTitle = (title: string) => {
    setJobTitle(title)
    setShowSuggestions(false)

    // Get skill suggestions for the selected job title
    const suggestions = skillSuggestions[title] || genericSkills
    setSelectedSkills(suggestions)

    // Generate boolean string with job title
    generateBooleanString(title, suggestions)
  }

  const handleToggleSkill = (category: string, skill: string) => {
    const updatedSkills = selectedSkills.map((group) => {
      if (group.category === category) {
        // Check if skill is already selected
        if (group.skills.includes(skill)) {
          // Remove skill
          return {
            ...group,
            skills: group.skills.filter((s) => s !== skill),
          }
        } else {
          // Add skill
          return {
            ...group,
            skills: [...group.skills, skill],
          }
        }
      }
      return group
    })

    setSelectedSkills(updatedSkills)
    generateBooleanString(jobTitle, updatedSkills)
  }

  const handleAddSkill = (category: string, skill: string) => {
    // Find if category already exists
    const categoryExists = selectedSkills.find((group) => group.category === category)

    let updatedSkills

    if (categoryExists) {
      // Update existing category
      updatedSkills = selectedSkills.map((group) => {
        if (group.category === category) {
          return {
            ...group,
            skills: [...group.skills, skill],
          }
        }
        return group
      })
    } else {
      // Add new category
      updatedSkills = [...selectedSkills, { category, skills: [skill] }]
    }

    setSelectedSkills(updatedSkills)
    generateBooleanString(jobTitle, updatedSkills)
  }

  const handleRemoveSkill = (category: string, skill: string) => {
    const updatedSkills = selectedSkills
      .map((group) => {
        if (group.category === category) {
          return {
            ...group,
            skills: group.skills.filter((s) => s !== skill),
          }
        }
        return group
      })
      .filter((group) => group.skills.length > 0) // Remove empty categories

    setSelectedSkills(updatedSkills)
    generateBooleanString(jobTitle, updatedSkills)
  }

  const generateBooleanString = (title: string, skills: SkillGroup[]) => {
    // Start with the job title
    let booleanQuery = `"${title}"`

    // Add skill groups with OR within groups and AND between groups
    skills.forEach((group) => {
      if (group.skills.length > 0) {
        const skillsString = group.skills.map((skill) => `"${skill}"`).join(" OR ")
        booleanQuery += ` AND (${skillsString})`
      }
    })

    setBooleanString(booleanQuery)
  }

  const handleCopyClick = () => {
    if (booleanString) {
      navigator.clipboard.writeText(booleanString)
      setIsCopied(true)
      toast({
        title: "Copied!",
        description: "Boolean search string copied to clipboard.",
      })
      setTimeout(() => setIsCopied(false), 3000)
    }
  }

  return (
    <Card className="border-t-4 border-t-indigo-500 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Search className="h-5 w-5 text-indigo-500 mr-2" />
          Boolean Search Builder
        </CardTitle>
        <CardDescription>Build a customized Boolean search string for specific job titles and skills</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <label htmlFor="jobTitle" className="block text-sm font-medium mb-1">
            Job Title
          </label>
          <Input id="jobTitle" placeholder="Enter a job title..." value={jobTitle} onChange={handleJobTitleChange} />

          {/* Job title suggestions */}
          {showSuggestions && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
              <ul className="py-1 max-h-48 overflow-auto">
                {defaultJobTitles
                  .filter((title) => title.toLowerCase().includes(jobTitle.toLowerCase()))
                  .map((title) => (
                    <li
                      key={title}
                      onClick={() => handleSelectJobTitle(title)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {title}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>

        {selectedSkills.length > 0 && (
          <div className="space-y-4">
            {selectedSkills.map((group, groupIndex) => (
              <div key={groupIndex} className="border rounded-md p-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">{group.category}</h3>
                  <Badge variant="outline" className="text-xs">
                    {group.skills.length} selected
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      className="flex items-center gap-1 bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(group.category, skill)}
                        className="ml-1 hover:text-indigo-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 px-2 rounded-full"
                    onClick={() => {
                      const skill = prompt("Add a new skill to " + group.category)
                      if (skill && !group.skills.includes(skill)) {
                        handleAddSkill(group.category, skill)
                      }
                    }}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add
                  </Button>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const category = prompt("Enter a new skill category")
                const skill = prompt("Enter a skill for this category")
                if (category && skill) {
                  handleAddSkill(category, skill)
                }
              }}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Skill Category
            </Button>

            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">Boolean Search String</h3>
              <div className="relative">
                <div className="bg-slate-100 rounded-lg p-3 font-mono text-sm overflow-x-auto">
                  {booleanString || "Please select a job title and skills to generate a Boolean search string."}
                </div>
                {booleanString && (
                  <div className="absolute top-2 right-2">
                    <Button size="sm" variant="ghost" onClick={handleCopyClick} className="h-8 w-8 p-0">
                      {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      <span className="sr-only">Copy</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
