"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, Search, X, Plus, Check, Lightbulb } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SkillGroup {
  category: string
  skills: string[]
}

// Define job title to skills mapping
const JOB_TITLE_SKILLS: Record<string, SkillGroup[]> = {
  "full stack developer": [
    {
      category: "Frontend",
      skills: ["React", "Angular", "Vue.js", "JavaScript", "TypeScript", "HTML", "CSS", "Redux", "Next.js"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express", "Django", "Flask", "Spring Boot", "ASP.NET", "Java", "Python", "C#"],
    },
    {
      category: "Database",
      skills: ["MongoDB", "PostgreSQL", "MySQL", "SQL Server", "Redis", "Firebase", "DynamoDB"],
    },
    {
      category: "DevOps",
      skills: ["Docker", "Kubernetes", "AWS", "Azure", "GCP", "CI/CD", "Jenkins", "GitHub Actions"],
    },
  ],
  "frontend developer": [
    {
      category: "Core",
      skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Angular", "Vue.js"],
    },
    {
      category: "Frameworks",
      skills: ["Next.js", "Gatsby", "Nuxt.js", "React Native", "Svelte", "Remix"],
    },
    {
      category: "State Management",
      skills: ["Redux", "MobX", "Zustand", "Context API", "Recoil", "Pinia", "Vuex"],
    },
    {
      category: "Styling",
      skills: ["Tailwind CSS", "Styled Components", "SASS", "LESS", "CSS Modules", "Material UI", "Bootstrap"],
    },
  ],
  "backend developer": [
    {
      category: "Languages",
      skills: ["Java", "Python", "C#", "Node.js", "Go", "Ruby", "PHP"],
    },
    {
      category: "Frameworks",
      skills: ["Spring Boot", "Django", "Express", "ASP.NET Core", "Laravel", "Ruby on Rails", "FastAPI"],
    },
    {
      category: "Databases",
      skills: ["PostgreSQL", "MySQL", "MongoDB", "SQL Server", "Oracle", "Redis", "Elasticsearch"],
    },
    {
      category: "API",
      skills: ["REST", "GraphQL", "gRPC", "WebSockets", "Swagger", "OpenAPI"],
    },
  ],
  "data scientist": [
    {
      category: "Languages",
      skills: ["Python", "R", "SQL", "Scala", "Julia"],
    },
    {
      category: "Libraries",
      skills: ["NumPy", "Pandas", "Scikit-learn", "TensorFlow", "PyTorch", "Keras", "Matplotlib", "Seaborn"],
    },
    {
      category: "Big Data",
      skills: ["Spark", "Hadoop", "Hive", "Kafka", "Airflow", "Databricks"],
    },
    {
      category: "Statistics",
      skills: ["Regression", "Classification", "Clustering", "Time Series", "A/B Testing", "Hypothesis Testing"],
    },
  ],
  "devops engineer": [
    {
      category: "Cloud",
      skills: ["AWS", "Azure", "GCP", "Terraform", "CloudFormation", "Pulumi"],
    },
    {
      category: "Containers",
      skills: ["Docker", "Kubernetes", "ECS", "AKS", "GKE", "Helm", "Istio"],
    },
    {
      category: "CI/CD",
      skills: ["Jenkins", "GitHub Actions", "GitLab CI", "CircleCI", "ArgoCD", "Travis CI"],
    },
    {
      category: "Monitoring",
      skills: ["Prometheus", "Grafana", "ELK Stack", "Datadog", "New Relic", "Splunk"],
    },
  ],
  "product manager": [
    {
      category: "Product Skills",
      skills: ["Product Strategy", "Roadmapping", "User Stories", "Prioritization", "Market Research", "A/B Testing"],
    },
    {
      category: "Tools",
      skills: ["JIRA", "Confluence", "Asana", "Trello", "Figma", "Miro", "Amplitude", "Mixpanel"],
    },
    {
      category: "Methodologies",
      skills: ["Agile", "Scrum", "Kanban", "Lean", "Design Thinking", "Jobs to be Done"],
    },
    {
      category: "Business",
      skills: ["KPIs", "OKRs", "Revenue Models", "Go-to-Market", "Competitive Analysis", "User Personas"],
    },
  ],
}

export function BooleanSearchBuilder() {
  const [jobTitle, setJobTitle] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<SkillGroup[]>([])
  const [booleanString, setBooleanString] = useState("")
  const [isCopied, setIsCopied] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestedSkills, setSuggestedSkills] = useState<SkillGroup[]>([])
  const [customSkill, setCustomSkill] = useState("")

  const { toast } = useToast()

  // Define common job titles for suggestions
  const commonJobTitles = [
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Data Scientist",
    "DevOps Engineer",
    "Product Manager",
    "UX Designer",
    "QA Engineer",
    "Project Manager",
    "Software Engineer",
  ]

  useEffect(() => {
    // Check if the job title matches any of our predefined titles
    const normalizedTitle = jobTitle.toLowerCase()

    // Find exact matches first
    let matchedSkills = JOB_TITLE_SKILLS[normalizedTitle]

    // If no exact match, try to find partial matches
    if (!matchedSkills) {
      for (const [title, skills] of Object.entries(JOB_TITLE_SKILLS)) {
        if (normalizedTitle.includes(title) || title.includes(normalizedTitle)) {
          matchedSkills = skills
          break
        }
      }
    }

    if (matchedSkills) {
      setSuggestedSkills(matchedSkills)
    } else {
      setSuggestedSkills([])
    }
  }, [jobTitle])

  const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value)
    setShowSuggestions(e.target.value.length > 0)
  }

  const handleSelectJobTitle = (title: string) => {
    setJobTitle(title)
    setShowSuggestions(false)

    // Get skill suggestions for the selected job title
    const normalizedTitle = title.toLowerCase()
    const matchedSkills = JOB_TITLE_SKILLS[normalizedTitle]

    if (matchedSkills) {
      setSelectedSkills(matchedSkills)
      generateBooleanString(title, matchedSkills)
    } else {
      setSelectedSkills([])
      setBooleanString("")
    }
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
    setCustomSkill("")
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
                {commonJobTitles
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

        {/* Suggested Skills */}
        {suggestedSkills.length > 0 && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center mb-2">
              <Lightbulb className="h-4 w-4 text-blue-600 mr-2" />
              <h3 className="text-sm font-medium text-blue-800">Suggested Skills for {jobTitle}</h3>
            </div>
            <div className="space-y-3">
              {suggestedSkills.map((group, groupIndex) => (
                <div key={groupIndex}>
                  <h4 className="text-xs font-medium text-blue-700 mb-1">{group.category}</h4>
                  <div className="flex flex-wrap gap-1">
                    {group.skills.map((skill, skillIndex) => {
                      const isSelected = selectedSkills.some(
                        (g) => g.category === group.category && g.skills.includes(skill),
                      )
                      return (
                        <Badge
                          key={skillIndex}
                          variant={isSelected ? "default" : "outline"}
                          className={`cursor-pointer ${
                            isSelected ? "bg-blue-500" : "hover:bg-blue-100 hover:text-blue-800"
                          }`}
                          onClick={() => handleToggleSkill(group.category, skill)}
                        >
                          {skill}
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Skill Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Add a custom skill..."
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            className="flex-1"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (customSkill.trim()) {
                handleAddSkill("Custom Skills", customSkill.trim())
              }
            }}
            disabled={!customSkill.trim()}
          >
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
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
                </div>
              </div>
            ))}

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
