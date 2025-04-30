"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Copy,
  Wand2,
  CheckCircle2,
  Info,
  Code,
  Zap,
  Award,
  Clock,
  Users,
  Tag,
  FileText,
  Download,
  BookOpen,
  Globe,
  Settings,
  Search,
  X,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Domain-specific skill sets
const domainSkills = {
  "network engineer": [
    { name: "router", description: "Network device that forwards data packets between computer networks" },
    { name: "switch", description: "Network device that connects devices on a computer network" },
    {
      name: "firewall",
      description: "Network security device that monitors and filters incoming and outgoing network traffic",
    },
    { name: "CCNA", description: "Cisco Certified Network Associate certification" },
    { name: "CCNP", description: "Cisco Certified Network Professional certification" },
    { name: "CCIE", description: "Cisco Certified Internetwork Expert certification" },
    { name: "Cisco", description: "Leading networking equipment manufacturer" },
    { name: "Juniper", description: "Network equipment manufacturer specializing in routing and switching" },
    { name: "load balancer", description: "Device that distributes network traffic across multiple servers" },
    { name: "VPN", description: "Virtual Private Network for secure connections" },
    { name: "OSPF", description: "Open Shortest Path First routing protocol" },
    { name: "BGP", description: "Border Gateway Protocol for internet routing" },
    { name: "MPLS", description: "Multiprotocol Label Switching for high-performance networks" },
    { name: "SDN", description: "Software-Defined Networking" },
    { name: "network automation", description: "Tools and processes to automate network operations" },
    { name: "Wireshark", description: "Network protocol analyzer" },
    { name: "Tcpdump", description: "Command-line packet analyzer" },
    { name: "VLAN", description: "Virtual Local Area Network" },
    { name: "subnetting", description: "Dividing networks into subnetworks" },
    { name: "IPv6", description: "Internet Protocol version 6" },
    { name: "QoS", description: "Quality of Service for network traffic prioritization" },
  ],
  "cyber security": [
    { name: "NIST", description: "National Institute of Standards and Technology framework" },
    { name: "penetration testing", description: "Method of evaluating security by simulating attacks" },
    { name: "vulnerability assessment", description: "Process of identifying security vulnerabilities" },
    { name: "SIEM", description: "Security Information and Event Management" },
    { name: "SOC", description: "Security Operations Center" },
    { name: "incident response", description: "Organized approach to addressing security breaches" },
    { name: "threat hunting", description: "Proactively searching for cyber threats" },
    { name: "CISSP", description: "Certified Information Systems Security Professional" },
    { name: "CEH", description: "Certified Ethical Hacker certification" },
    { name: "ISO 27001", description: "Information security management standard" },
    { name: "zero trust", description: "Security model that requires verification for all users" },
    { name: "malware analysis", description: "Process of studying malicious software" },
    { name: "OSCP", description: "Offensive Security Certified Professional" },
    { name: "SANS", description: "Information security training organization" },
    { name: "GIAC", description: "Global Information Assurance Certification" },
    { name: "CISM", description: "Certified Information Security Manager" },
    { name: "CISA", description: "Certified Information Systems Auditor" },
    { name: "IDS/IPS", description: "Intrusion Detection/Prevention Systems" },
    { name: "endpoint security", description: "Security approach focusing on end-user devices" },
    { name: "DLP", description: "Data Loss Prevention" },
    { name: "red team", description: "Group that simulates attacks to test security" },
    { name: "blue team", description: "Group that defends against cyber attacks" },
    { name: "forensics", description: "Analysis of security incidents and data breaches" },
  ],
  "software developer": [
    { name: "JavaScript", description: "Programming language for web development" },
    { name: "TypeScript", description: "Typed superset of JavaScript" },
    { name: "React", description: "JavaScript library for building user interfaces" },
    { name: "Angular", description: "TypeScript-based web application framework" },
    { name: "Vue.js", description: "JavaScript framework for building user interfaces" },
    { name: "Node.js", description: "JavaScript runtime built on Chrome's V8 JavaScript engine" },
    { name: "Python", description: "High-level programming language" },
    { name: "Java", description: "Object-oriented programming language" },
    { name: "C#", description: "Programming language developed by Microsoft" },
    { name: "SQL", description: "Structured Query Language for managing databases" },
    { name: "NoSQL", description: "Database that provides a mechanism for storage and retrieval of data" },
    { name: "Git", description: "Distributed version control system" },
    { name: "CI/CD", description: "Continuous Integration and Continuous Deployment" },
    { name: "Agile", description: "Software development methodology" },
    { name: "Scrum", description: "Agile framework for managing work" },
    { name: "RESTful API", description: "Architectural style for distributed systems" },
    { name: "GraphQL", description: "Query language and runtime for APIs" },
    { name: "Docker", description: "Platform for containerized applications" },
    { name: "Kubernetes", description: "Container orchestration platform" },
    { name: "AWS", description: "Amazon Web Services cloud platform" },
    { name: "Azure", description: "Microsoft cloud computing service" },
    { name: "GCP", description: "Google Cloud Platform" },
    { name: "microservices", description: "Software architecture style" },
    { name: "TDD", description: "Test-Driven Development methodology" },
    { name: "Redux", description: "State management library for JavaScript" },
    { name: "Spring Boot", description: "Java-based framework for microservices" },
    { name: "Ruby on Rails", description: "Web application framework" },
    { name: "Django", description: "Python web framework" },
    { name: "Express", description: "Web framework for Node.js" },
  ],
  "data scientist": [
    { name: "machine learning", description: "Field of AI focused on building systems that learn from data" },
    { name: "deep learning", description: "Subset of machine learning using neural networks" },
    { name: "Python", description: "Programming language commonly used in data science" },
    { name: "R", description: "Programming language for statistical computing" },
    { name: "TensorFlow", description: "Open-source machine learning framework" },
    { name: "PyTorch", description: "Open-source machine learning library" },
    { name: "SQL", description: "Language for managing and querying databases" },
    { name: "data visualization", description: "Graphical representation of information and data" },
    { name: "statistical analysis", description: "Collection and interpretation of data" },
    { name: "Pandas", description: "Data manipulation and analysis library" },
    { name: "NumPy", description: "Library for numerical computations" },
    { name: "Jupyter", description: "Web application for creating and sharing documents with live code" },
    { name: "scikit-learn", description: "Machine learning library for Python" },
    { name: "SAS", description: "Software suite for advanced analytics" },
    { name: "SPSS", description: "Statistical software package" },
    { name: "data mining", description: "Process of discovering patterns in large datasets" },
    { name: "NLP", description: "Natural Language Processing" },
    { name: "computer vision", description: "Field of AI that enables computers to interpret visual information" },
    { name: "feature engineering", description: "Process of selecting and transforming variables for models" },
    { name: "A/B testing", description: "Method of comparing two versions of something" },
    { name: "Hadoop", description: "Framework for distributed storage and processing" },
    { name: "Spark", description: "Unified analytics engine for big data processing" },
    { name: "big data", description: "Data sets too large for traditional data processing" },
    { name: "time series analysis", description: "Analysis of data points collected over time" },
    { name: "regression", description: "Statistical method for modeling relationships" },
    { name: "classification", description: "Machine learning task of categorizing data" },
    { name: "clustering", description: "Grouping similar data points together" },
  ],
  "devops engineer": [
    { name: "Docker", description: "Platform for developing, shipping, and running applications in containers" },
    { name: "Kubernetes", description: "Container orchestration system" },
    { name: "AWS", description: "Amazon Web Services cloud platform" },
    { name: "Azure", description: "Microsoft's cloud computing service" },
    { name: "GCP", description: "Google Cloud Platform" },
    { name: "Terraform", description: "Infrastructure as code software tool" },
    {
      name: "Ansible",
      description: "Open-source software provisioning, configuration management, and application-deployment tool",
    },
    { name: "Jenkins", description: "Open-source automation server" },
    { name: "CI/CD", description: "Continuous Integration and Continuous Deployment" },
    { name: "Git", description: "Distributed version control system" },
    { name: "monitoring", description: "Observing and checking the progress or quality of something over time" },
    { name: "logging", description: "Recording of events in a system" },
    { name: "ELK stack", description: "Elasticsearch, Logstash, and Kibana for log management" },
    { name: "Prometheus", description: "Monitoring and alerting toolkit" },
    { name: "Grafana", description: "Analytics and monitoring platform" },
    { name: "GitLab", description: "Web-based DevOps lifecycle tool" },
    { name: "GitHub Actions", description: "CI/CD platform from GitHub" },
    { name: "ArgoCD", description: "Declarative, GitOps continuous delivery tool for Kubernetes" },
    { name: "Helm", description: "Package manager for Kubernetes" },
    { name: "IaC", description: "Infrastructure as Code" },
    { name: "microservices", description: "Architectural approach for building applications" },
    { name: "Linux", description: "Open-source operating system" },
    { name: "shell scripting", description: "Writing scripts for shell interpreters" },
    { name: "Chef", description: "Configuration management tool" },
    { name: "Puppet", description: "Configuration management tool" },
    { name: "SRE", description: "Site Reliability Engineering" },
  ],
  "cloud architect": [
    { name: "AWS", description: "Amazon Web Services cloud platform" },
    { name: "Azure", description: "Microsoft's cloud computing service" },
    { name: "GCP", description: "Google Cloud Platform" },
    { name: "multi-cloud", description: "Using services from multiple cloud providers" },
    { name: "cloud migration", description: "Process of moving applications to the cloud" },
    { name: "serverless", description: "Cloud computing execution model" },
    { name: "IaaS", description: "Infrastructure as a Service" },
    { name: "PaaS", description: "Platform as a Service" },
    { name: "SaaS", description: "Software as a Service" },
    { name: "CloudFormation", description: "AWS service for infrastructure as code" },
    { name: "ARM templates", description: "Azure Resource Manager templates" },
    { name: "cloud security", description: "Policies and technologies to protect cloud data" },
    { name: "FinOps", description: "Cloud financial management discipline" },
    { name: "cost optimization", description: "Strategies to reduce cloud spending" },
    { name: "high availability", description: "System design approach to ensure uptime" },
    { name: "disaster recovery", description: "Tools and processes for recovering from failures" },
    { name: "AWS Well-Architected", description: "Framework for building secure, efficient systems" },
    { name: "hybrid cloud", description: "Mix of on-premises and cloud infrastructure" },
    { name: "VPC", description: "Virtual Private Cloud" },
    { name: "cloud native", description: "Building applications specifically for cloud environments" },
    { name: "Terraform", description: "Infrastructure as code software tool" },
    { name: "containers", description: "Lightweight, portable computing environments" },
  ],
}

// US Visa Types with detailed information
const visaTypes = {
  work: [
    {
      type: "H-1B",
      name: "Specialty Occupation Workers",
      description: "For professionals in specialty occupations requiring at least a bachelor's degree",
      duration: "Initial 3 years, extendable up to 6 years total",
      sponsorship: "Employer must petition",
      dependents: "H-4 visa for spouse and unmarried children under 21",
    },
    {
      type: "L-1",
      name: "Intracompany Transferees",
      description:
        "For managers, executives (L-1A) or specialized knowledge employees (L-1B) transferring within a company",
      duration: "L-1A: Up to 7 years, L-1B: Up to 5 years",
      sponsorship: "Employer must petition",
      dependents: "L-2 visa for spouse and unmarried children under 21",
    },
    {
      type: "O-1",
      name: "Individuals with Extraordinary Ability",
      description: "For people with extraordinary ability in sciences, arts, education, business, or athletics",
      duration: "Initially up to 3 years, then 1-year extensions",
      sponsorship: "Employer must petition",
      dependents: "O-3 visa for spouse and unmarried children under 21",
    },
    {
      type: "TN",
      name: "NAFTA/USMCA Professionals",
      description:
        "For Canadian and Mexican citizens in professional occupations specified under USMCA (formerly NAFTA)",
      duration: "Up to 3 years, renewable indefinitely",
      sponsorship: "Self-petition at port of entry (Canadians) or consulate (Mexicans)",
      dependents: "TD visa for spouse and unmarried children under 21",
    },
    {
      type: "E-3",
      name: "Australian Specialty Occupation Workers",
      description: "Similar to H-1B but exclusively for Australian citizens",
      duration: "2 years, renewable indefinitely",
      sponsorship: "Employer must offer position",
      dependents: "E-3D visa for spouse and unmarried children under 21",
    },
  ],
  business: [
    {
      type: "E-1",
      name: "Treaty Traders",
      description: "For individuals conducting substantial trade between the US and their country",
      duration: "2 years initially, renewable indefinitely",
      sponsorship: "Self-sponsorship or company sponsorship",
      dependents: "E-1 visa for spouse and unmarried children under 21",
    },
    {
      type: "E-2",
      name: "Treaty Investors",
      description: "For investors who have made substantial investment in a US business",
      duration: "2 years initially, renewable indefinitely",
      sponsorship: "Self-sponsorship or company sponsorship",
      dependents: "E-2 visa for spouse and unmarried children under 21",
    },
    {
      type: "B-1",
      name: "Business Visitors",
      description: "For short-term business activities like negotiations, conferences, etc.",
      duration: "Up to 6 months, possible extension",
      sponsorship: "Self-sponsorship",
      dependents: "Family members need separate visas",
    },
  ],
  student: [
    {
      type: "F-1",
      name: "Academic Students",
      description: "For full-time students at accredited academic institutions",
      duration: "Duration of study program + optional practical training",
      sponsorship: "Educational institution issues I-20 form",
      dependents: "F-2 visa for spouse and unmarried children under 21",
    },
    {
      type: "J-1",
      name: "Exchange Visitors",
      description: "For educational and cultural exchange programs",
      duration: "Depends on program, typically 1-5 years",
      sponsorship: "Designated sponsor organization",
      dependents: "J-2 visa for spouse and unmarried children under 21",
    },
    {
      type: "M-1",
      name: "Vocational Students",
      description: "For students attending vocational or non-academic programs",
      duration: "Length of program, up to 1 year",
      sponsorship: "Educational institution issues I-20 form",
      dependents: "M-2 visa for spouse and unmarried children under 21",
    },
  ],
  permanent: [
    {
      type: "EB-1",
      name: "Priority Workers",
      description:
        "For persons of extraordinary ability, outstanding professors/researchers, and multinational executives",
      duration: "Permanent (Green Card)",
      sponsorship: "Employer petition (sometimes self-petition for extraordinary ability)",
      dependents: "Spouse and unmarried children under 21 included",
    },
    {
      type: "EB-2",
      name: "Advanced Degree Professionals",
      description: "For professionals with advanced degrees or exceptional ability",
      duration: "Permanent (Green Card)",
      sponsorship: "Employer petition (sometimes self-petition with National Interest Waiver)",
      dependents: "Spouse and unmarried children under 21 included",
    },
    {
      type: "EB-3",
      name: "Skilled Workers and Professionals",
      description: "For skilled workers, professionals, and unskilled workers",
      duration: "Permanent (Green Card)",
      sponsorship: "Employer petition",
      dependents: "Spouse and unmarried children under 21 included",
    },
    {
      type: "DV",
      name: "Diversity Visa (Lottery)",
      description: "Random selection of immigrants from countries with low immigration rates to the US",
      duration: "Permanent (Green Card)",
      sponsorship: "Self-application through lottery system",
      dependents: "Spouse and unmarried children under 21 included",
    },
  ],
  other: [
    {
      type: "H-2A",
      name: "Temporary Agricultural Workers",
      description: "For seasonal agricultural workers",
      duration: "Up to 3 years",
      sponsorship: "Employer petition",
      dependents: "H-4 visa for spouse and unmarried children under 21",
    },
    {
      type: "H-2B",
      name: "Temporary Non-Agricultural Workers",
      description: "For seasonal non-agricultural workers",
      duration: "Up to 3 years",
      sponsorship: "Employer petition",
      dependents: "H-4 visa for spouse and unmarried children under 21",
    },
    {
      type: "P-1",
      name: "Athletes and Entertainers",
      description: "For internationally recognized athletes and entertainment groups",
      duration: "Up to 5 years for athletes, 1 year for entertainment groups",
      sponsorship: "Employer petition",
      dependents: "P-4 visa for spouse and unmarried children under 21",
    },
    {
      type: "R-1",
      name: "Religious Workers",
      description: "For ministers and religious workers",
      duration: "Up to 5 years",
      sponsorship: "Sponsoring religious organization",
      dependents: "R-2 visa for spouse and unmarried children under 21",
    },
  ],
}

// Platform-specific search string formats
const platformFormats = {
  linkedin: {
    name: "LinkedIn",
    description: "Professional social network",
    example: '(skill1 OR skill2) AND ("Java Developer" OR "Software Engineer") AND (experience OR senior)',
    tips: [
      "Use parentheses to group search terms",
      "Use quotation marks for exact phrases",
      "LinkedIn has a character limit for search strings",
    ],
  },
  indeed: {
    name: "Indeed",
    description: "Job search engine",
    example: 'title:("software engineer" OR "software developer") AND (java OR python)',
    tips: [
      "Use title: to search in job titles",
      "Use company: to search for specific companies",
      "Use location: for geographic searches",
    ],
  },
  dice: {
    name: "Dice",
    description: "Tech job board",
    example: '("software engineer" OR "software developer") AND (java OR python OR "machine learning")',
    tips: [
      "Dice supports standard Boolean operators (AND, OR, NOT)",
      "Use exact match with quotation marks for multi-word terms",
      "Dice works best with technical skills clearly separated",
    ],
  },
  monster: {
    name: "Monster",
    description: "Job board",
    example: 'java AND (senior OR lead) AND "software engineer"',
    tips: ["Use AND between terms that must be included", "Use OR for alternatives", "Use NOT to exclude terms"],
  },
}

export function BooleanSearch() {
  const [jobDescription, setJobDescription] = useState("")
  const [extractedSkills, setExtractedSkills] = useState<
    { name: string; description: string; priority: number; type?: string }[]
  >([])
  const [booleanStrings, setBooleanStrings] = useState({
    basic: "",
    advanced: "",
    expert: "",
    platform: {
      linkedin: "",
      indeed: "",
      dice: "",
      monster: "",
    },
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [jobType, setJobType] = useState<string>("")
  const [activePlatform, setActivePlatform] = useState("linkedin")
  const [showVisaInfo, setShowVisaInfo] = useState(false)
  const { toast } = useToast()
  const resultRef = useRef<HTMLDivElement>(null)

  const detectJobType = (text: string) => {
    const lowerText = text.toLowerCase()
    const jobTypes = {
      "network engineer": ["network engineer", "network administrator", "network architect", "cisco", "networking"],
      "cyber security": ["cyber security", "information security", "security analyst", "security engineer", "infosec"],
      "software developer": ["software developer", "software engineer", "programmer", "developer", "web developer"],
      "data scientist": ["data scientist", "data analyst", "machine learning", "data engineer", "analytics"],
      "devops engineer": ["devops", "site reliability", "platform engineer", "infrastructure engineer"],
      "cloud architect": [
        "cloud architect",
        "cloud engineer",
        "solutions architect",
        "aws architect",
        "azure architect",
      ],
    }

    for (const [type, keywords] of Object.entries(jobTypes)) {
      if (keywords.some((keyword) => lowerText.includes(keyword))) {
        return type
      }
    }

    return ""
  }

  const extractSkillsFromJD = (text: string) => {
    // Detect job type
    const detectedJobType = detectJobType(text)
    setJobType(detectedJobType)

    // Base skills data - expanded with more skills and details
    const skillsData = [
      // Technical Skills - Programming Languages
      {
        name: "JavaScript",
        description: "A programming language that enables interactive web pages and applications",
        priority: 3,
        type: "programming",
      },
      {
        name: "TypeScript",
        description: "A strongly typed programming language that builds on JavaScript",
        priority: 3,
        type: "programming",
      },
      {
        name: "Python",
        description: "A high-level, interpreted programming language for general-purpose programming",
        priority: 3,
        type: "programming",
      },
      {
        name: "Java",
        description: "A class-based, object-oriented programming language designed to minimize dependencies",
        priority: 3,
        type: "programming",
      },
      {
        name: "C#",
        description: "A multi-paradigm programming language developed by Microsoft within the .NET initiative",
        priority: 3,
        type: "programming",
      },
      {
        name: "C++",
        description: "A general-purpose programming language created as an extension of the C programming language",
        priority: 3,
        type: "programming",
      },
      {
        name: "PHP",
        description: "A server-side scripting language designed for web development",
        priority: 3,
        type: "programming",
      },
      {
        name: "Ruby",
        description: "A dynamic, open source programming language focused on simplicity and productivity",
        priority: 3,
        type: "programming",
      },
      {
        name: "Go",
        description: "An open source programming language designed at Google to be efficient and readable",
        priority: 3,
        type: "programming",
      },
      {
        name: "Swift",
        description: "A programming language for iOS, macOS, watchOS, and tvOS development",
        priority: 3,
        type: "programming",
      },
      {
        name: "Kotlin",
        description: "A modern programming language that makes developers happier, primarily for Android development",
        priority: 3,
        type: "programming",
      },
      {
        name: "Rust",
        description: "A systems programming language focused on safety and performance",
        priority: 3,
        type: "programming",
      },

      // Frameworks and Libraries
      {
        name: ".NET",
        description: "A free, cross-platform, open-source developer platform for building many types of applications",
        priority: 3,
        type: "framework",
      },
      {
        name: ".NET Core",
        description: "A cross-platform version of .NET for building websites, services, and console apps",
        priority: 3,
        type: "framework",
      },
      {
        name: "ASP.NET",
        description: "A web framework for building web apps and services with .NET",
        priority: 3,
        type: "framework",
      },
      {
        name: "React",
        description: "A JavaScript library for building user interfaces maintained by Facebook",
        priority: 3,
        type: "framework",
      },
      {
        name: "Angular",
        description: "A platform for building mobile and desktop web applications maintained by Google",
        priority: 3,
        type: "framework",
      },
      {
        name: "Vue.js",
        description: "A progressive framework for building user interfaces",
        priority: 3,
        type: "framework",
      },
      {
        name: "Node.js",
        description: "A JavaScript runtime built on Chrome's V8 JavaScript engine for server-side applications",
        priority: 3,
        type: "framework",
      },
      {
        name: "Express",
        description: "A minimal and flexible Node.js web application framework",
        priority: 3,
        type: "framework",
      },
      {
        name: "Spring Boot",
        description: "An extension of the Spring Framework to simplify Java application development",
        priority: 3,
        type: "framework",
      },
      {
        name: "Django",
        description: "A high-level Python web framework that encourages rapid development",
        priority: 3,
        type: "framework",
      },
      {
        name: "Flask",
        description: "A lightweight WSGI web application framework for Python",
        priority: 3,
        type: "framework",
      },
      {
        name: "Ruby on Rails",
        description: "A server-side web application framework written in Ruby",
        priority: 3,
        type: "framework",
      },
      {
        name: "Laravel",
        description: "A PHP web application framework with elegant syntax",
        priority: 3,
        type: "framework",
      },

      // Databases
      {
        name: "SQL",
        description: "A domain-specific language used for managing data in relational databases",
        priority: 3,
        type: "database",
      },
      {
        name: "NoSQL",
        description: "A mechanism for storage and retrieval of data modeled differently from relational databases",
        priority: 3,
        type: "database",
      },
      {
        name: "MySQL",
        description: "An open-source relational database management system",
        priority: 3,
        type: "database",
      },
      {
        name: "PostgreSQL",
        description: "A powerful, open source object-relational database system",
        priority: 3,
        type: "database",
      },
      {
        name: "MongoDB",
        description: "A cross-platform document-oriented database program",
        priority: 3,
        type: "database",
      },
      {
        name: "Oracle",
        description: "A multi-model database management system produced by Oracle Corporation",
        priority: 3,
        type: "database",
      },
      {
        name: "SQL Server",
        description: "Microsoft's relational database management system",
        priority: 3,
        type: "database",
      },
      {
        name: "Redis",
        description: "An open source in-memory data structure store, used as database, cache, and message broker",
        priority: 3,
        type: "database",
      },
      {
        name: "Cassandra",
        description: "A free and open-source, distributed, wide-column store NoSQL database",
        priority: 3,
        type: "database",
      },
      {
        name: "DynamoDB",
        description: "A fully managed proprietary NoSQL database service by Amazon Web Services",
        priority: 3,
        type: "database",
      },

      // Cloud & DevOps
      { name: "AWS", description: "Amazon Web Services - a cloud computing platform", priority: 3, type: "cloud" },
      { name: "Azure", description: "Microsoft's cloud computing service", priority: 3, type: "cloud" },
      {
        name: "GCP",
        description: "Google Cloud Platform - a suite of cloud computing services",
        priority: 3,
        type: "cloud",
      },
      {
        name: "Docker",
        description: "A platform for developing, shipping, and running applications in containers",
        priority: 3,
        type: "devops",
      },
      {
        name: "Kubernetes",
        description:
          "An open-source system for automating deployment, scaling, and management of containerized applications",
        priority: 3,
        type: "dev  scaling, and management of containerized applications",
        priority: 3,
        type: "devops",
      },
      {
        name: "Jenkins",
        description: "An open source automation server for CI/CD pipelines",
        priority: 3,
        type: "devops",
      },
      {
        name: "GitLab CI",
        description: "Continuous Integration service included with GitLab",
        priority: 3,
        type: "devops",
      },
      {
        name: "GitHub Actions",
        description: "CI/CD platform integrated with GitHub repositories",
        priority: 3,
        type: "devops",
      },
      {
        name: "Terraform",
        description: "An open-source infrastructure as code software tool",
        priority: 3,
        type: "devops",
      },
      {
        name: "Ansible",
        description: "An open-source software provisioning, configuration management, and deployment tool",
        priority: 3,
        type: "devops",
      },

      // Certifications
      {
        name: "AWS Certified",
        description: "Certification validating cloud expertise with Amazon Web Services",
        priority: 2,
        type: "certification",
      },
      {
        name: "Azure Certified",
        description: "Microsoft certification for Azure cloud skills",
        priority: 2,
        type: "certification",
      },
      {
        name: "CCNA",
        description: "Cisco Certified Network Associate - Entry-level networking certification",
        priority: 2,
        type: "certification",
      },
      {
        name: "CCNP",
        description: "Cisco Certified Network Professional - Advanced networking certification",
        priority: 2,
        type: "certification",
      },
      {
        name: "CompTIA",
        description: "Technology industry certifications including A+, Security+, and Network+",
        priority: 2,
        type: "certification",
      },
      {
        name: "PMP",
        description: "Project Management Professional - certification for project managers",
        priority: 2,
        type: "certification",
      },
      {
        name: "CISSP",
        description: "Certified Information Systems Security Professional",
        priority: 2,
        type: "certification",
      },
      {
        name: "CISM",
        description: "Certified Information Security Manager",
        priority: 2,
        type: "certification",
      },
      {
        name: "CISA",
        description: "Certified Information Systems Auditor",
        priority: 2,
        type: "certification",
      },
      {
        name: "Scrum Master",
        description: "Certification for Agile Scrum methodology",
        priority: 2,
        type: "certification",
      },

      // Soft Skills
      { name: "leadership", description: "Ability to lead and guide teams", priority: 1, type: "soft skill" },
      {
        name: "communication",
        description: "Effective verbal and written communication skills",
        priority: 1,
        type: "soft skill",
      },
      {
        name: "teamwork",
        description: "Ability to work collaboratively in a team environment",
        priority: 1,
        type: "soft skill",
      },
      {
        name: "problem solving",
        description: "Ability to identify and resolve complex issues",
        priority: 1,
        type: "soft skill",
      },
      {
        name: "critical thinking",
        description: "Analytical thinking and evaluation skills",
        priority: 1,
        type: "soft skill",
      },
      {
        name: "project management",
        description: "Organizing and managing resources to complete projects",
        priority: 1,
        type: "soft skill",
      },
      {
        name: "time management",
        description: "Ability to use time effectively and productively",
        priority: 1,
        type: "soft skill",
      },
    ]

    // Add domain-specific skills if job type is detected
    let allSkills = [...skillsData]
    if (detectedJobType && domainSkills[detectedJobType]) {
      const domainSpecificSkills = domainSkills[detectedJobType].map((skill) => ({
        name: skill.name,
        description: skill.description,
        priority: 3, // High priority for domain-specific skills
        type: "domain skill",
      }))
      allSkills = [...allSkills, ...domainSpecificSkills]
    }

    // Create a set of found skills
    const foundSkillNames = new Set()
    const lowerText = text.toLowerCase()

    // Check for each skill in the text
    allSkills.forEach((skill) => {
      const skillNameLower = skill.name.toLowerCase()
      // Check for exact match (with word boundaries)
      const exactRegex = new RegExp(`\\b${skillNameLower}\\b`, "i")
      // Check for partial match for multi-word skills
      const partialMatch = skillNameLower.includes(" ") && lowerText.includes(skillNameLower)

      if (exactRegex.test(lowerText) || partialMatch) {
        foundSkillNames.add(skillNameLower)
      }
    })

    // Extract years of experience - using a simpler regex to avoid syntax issues
    const yearsRegex = /\d+\s*(?:years?|yrs?)/gi
    const yearsMatches = text.match(yearsRegex) || []

    if (yearsMatches.length > 0) {
      yearsMatches.forEach((match) => {
        // Extract just the number
        const years = match.match(/\d+/)[0]
        const yearsText = `${years}+ years experience`
        foundSkillNames.add(yearsText.toLowerCase())
        allSkills.push({
          name: yearsText,
          description: `At least ${years} years of professional experience required`,
          priority: 3,
          type: "experience",
        })
      })
    }

    // Filter the skills data to only include found skills
    const foundSkills = allSkills.filter(
      (skill) =>
        foundSkillNames.has(skill.name.toLowerCase()) ||
        [...foundSkillNames].some(
          (name) =>
            typeof name === "string" &&
            (name.includes(skill.name.toLowerCase()) || skill.name.toLowerCase().includes(name)),
        ),
    )

    // Sort by priority (higher priority first)
    foundSkills.sort((a, b) => b.priority - a.priority)

    // Limit to top 20 skills for better results
    return foundSkills.slice(0, 20)
  }

  const generateBooleanStrings = (skills: { name: string; description: string; priority: number; type?: string }[]) => {
    if (skills.length === 0)
      return {
        basic: "",
        advanced: "",
        expert: "",
        platform: {
          linkedin: "",
          indeed: "",
          dice: "",
          monster: "",
        },
      }

    // Extract just the skill names
    const skillNames = skills.map((skill) => skill.name)

    // Basic Boolean string (OR between all skills)
    const basic = skillNames.map((skill) => (skill.includes(" ") ? `"${skill}"` : skill)).join(" OR ")

    // Advanced Boolean string (group skills by category with AND/OR)
    const highPrioritySkills = skills.filter((skill) => skill.priority === 3).map((skill) => skill.name)
    const mediumPrioritySkills = skills.filter((skill) => skill.priority === 2).map((skill) => skill.name)

    let advanced = ""
    if (highPrioritySkills.length >= 2) {
      // Take the top 2-3 high priority skills and connect with AND
      const primaryString = highPrioritySkills
        .slice(0, Math.min(3, highPrioritySkills.length))
        .map((skill) => (skill.includes(" ") ? `"${skill}"` : skill))
        .join(" AND ")

      // Take the rest of the skills and connect with OR
      const secondarySkills = [...highPrioritySkills.slice(3), ...mediumPrioritySkills]
      const secondaryString =
        secondarySkills.length > 0
          ? secondarySkills.map((skill) => (skill.includes(" ") ? `"${skill}"` : skill)).join(" OR ")
          : ""

      advanced = secondaryString ? `(${primaryString}) AND (${secondaryString})` : primaryString
    } else {
      // If we don't have enough high priority skills, use the top skills
      const primarySkills = skillNames.slice(0, Math.min(3, skillNames.length))
      const secondarySkills = skillNames.slice(Math.min(3, skillNames.length))

      const primaryString = primarySkills.map((skill) => (skill.includes(" ") ? `"${skill}"` : skill)).join(" AND ")

      const secondaryString =
        secondarySkills.length > 0
          ? secondarySkills.map((skill) => (skill.includes(" ") ? `"${skill}"` : skill)).join(" OR ")
          : ""

      advanced = secondaryString ? `(${primaryString}) AND (${secondaryString})` : primaryString
    }

    // Expert Boolean string (more complex grouping with proximity operators)
    // Group by skill types
    const technicalSkills = skills
      .filter(
        (skill) =>
          skill.type === "programming" ||
          skill.type === "framework" ||
          skill.type === "database" ||
          skill.type === "cloud" ||
          skill.type === "devops" ||
          skill.type === "domain skill",
      )
      .map((skill) => skill.name)

    const certifications = skills.filter((skill) => skill.type === "certification").map((skill) => skill.name)

    const experienceReqs = skills.filter((skill) => skill.type === "experience").map((skill) => skill.name)

    const softSkills = skills.filter((skill) => skill.type === "soft skill").map((skill) => skill.name)

    // Build expert string with specific exclusions
    const expertParts = []

    if (technicalSkills.length > 0) {
      expertParts.push(`(${technicalSkills.map((s) => (s.includes(" ") ? `"${s}"` : s)).join(" OR ")})`)
    }

    if (certifications.length > 0) {
      expertParts.push(`(${certifications.map((s) => (s.includes(" ") ? `"${s}"` : s)).join(" OR ")})`)
    }

    if (experienceReqs.length > 0) {
      expertParts.push(`(${experienceReqs.map((s) => (s.includes(" ") ? `"${s}"` : s)).join(" OR ")})`)
    }

    const expert =
      expertParts.join(" AND ") +
      (softSkills.length > 0 ? ` AND (${softSkills.map((s) => (s.includes(" ") ? `"${s}"` : s)).join(" OR ")})` : "") +
      ` NOT (intern OR internship OR "entry level" OR junior)`

    // Generate platform-specific strings
    const linkedin = advanced.length < 2900 ? advanced : basic.slice(0, 2900) // LinkedIn has character limit

    // Indeed search string - customize for Indeed's syntax
    const primarySkills = highPrioritySkills.slice(0, Math.min(5, highPrioritySkills.length))
    const indeed = `(${primarySkills.map((s) => (s.includes(" ") ? `"${s}"` : s)).join(" OR ")}) AND (title:("${jobType}" OR "${jobType.replace(" ", " ")}"))`

    // Dice search string - more technical with domain-specific skills
    const domainSpecificSkills = skills.filter((s) => s.type === "domain skill").map((s) => s.name)
    const programmingSkills = skills.filter((s) => s.type === "programming").map((s) => s.name)
    const frameworkSkills = skills.filter((s) => s.type === "framework").map((s) => s.name)

    const diceSkills = [...new Set([...domainSpecificSkills, ...programmingSkills, ...frameworkSkills])].slice(0, 10)
    const dice = `(${diceSkills.map((s) => (s.includes(" ") ? `"${s}"` : s)).join(" OR ")})`

    // Monster search string
    const monster = `${highPrioritySkills
      .slice(0, 3)
      .map((s) => (s.includes(" ") ? `"${s}"` : s))
      .join(" AND ")}`

    return {
      basic,
      advanced,
      expert,
      platform: {
        linkedin,
        indeed,
        dice,
        monster,
      },
    }
  }

  const handleGenerate = () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Empty Job Description",
        description: "Please paste a job description to generate search strings.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate processing time
    setTimeout(() => {
      const skills = extractSkillsFromJD(jobDescription)
      setExtractedSkills(skills)
      setBooleanStrings(generateBooleanStrings(skills))
      setIsGenerating(false)

      // Scroll to results
      if (resultRef.current) {
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 100)
      }
    }, 1500)
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)

    toast({
      title: "Copied!",
      description: `${type} search string has been copied to clipboard.`,
    })
  }

  const getSkillBadgeClass = (type?: string) => {
    switch (type) {
      case "programming":
        return "bg-blue-50 border-blue-200 text-blue-700"
      case "framework":
        return "bg-indigo-50 border-indigo-200 text-indigo-700"
      case "database":
        return "bg-teal-50 border-teal-200 text-teal-700"
      case "domain skill":
        return "bg-purple-50 border-purple-200 text-purple-700"
      case "cloud":
        return "bg-sky-50 border-sky-200 text-sky-700"
      case "devops":
        return "bg-cyan-50 border-cyan-200 text-cyan-700"
      case "certification":
        return "bg-green-50 border-green-200 text-green-700"
      case "experience":
        return "bg-amber-50 border-amber-200 text-amber-700"
      case "soft skill":
        return "bg-pink-50 border-pink-200 text-pink-700"
      default:
        return "bg-slate-50 border-slate-200 text-slate-700"
    }
  }

  const getSkillIcon = (type?: string) => {
    switch (type) {
      case "programming":
        return <Code className="h-3 w-3" />
      case "framework":
        return <BookOpen className="h-3 w-3" />
      case "database":
        return <FileText className="h-3 w-3" />
      case "cloud":
        return <Globe className="h-3 w-3" />
      case "devops":
        return <Settings className="h-3 w-3" />
      case "domain skill":
        return <Zap className="h-3 w-3" />
      case "certification":
        return <Award className="h-3 w-3" />
      case "experience":
        return <Clock className="h-3 w-3" />
      case "soft skill":
        return <Users className="h-3 w-3" />
      default:
        return <Tag className="h-3 w-3" />
    }
  }

  const exportToCsv = () => {
    if (extractedSkills.length === 0) return

    // Create CSV content
    const headers = "Skill,Description,Type\n"
    const rows = extractedSkills
      .map((skill) => `"${skill.name}","${skill.description}","${skill.type || "General"}"`)
      .join("\n")

    const csvContent = `${headers}${rows}`
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    // Create download link
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "extracted_skills.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Export Successful",
      description: "Skills exported to CSV file",
    })
  }

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-500" />
                Job Description
              </CardTitle>
              <CardDescription>Paste the job description you want to analyze</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste job description here..."
                className="min-h-[300px] font-mono text-sm"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <Button
                className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Search Strings
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    1
                  </div>
                  <p className="font-medium">Paste Job Description</p>
                </div>
                <p className="text-sm text-slate-600 pl-10">
                  Copy and paste the complete job description from any source.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    2
                  </div>
                  <p className="font-medium">Extract Key Skills</p>
                </div>
                <p className="text-sm text-slate-600 pl-10">
                  Our AI analyzes the text to identify key skills and requirements.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    3
                  </div>
                  <p className="font-medium">Generate Search Strings</p>
                </div>
                <p className="text-sm text-slate-600 pl-10">
                  Choose from basic, advanced, or expert Boolean search strings for different platforms.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    4
                  </div>
                  <p className="font-medium">Copy & Search</p>
                </div>
                <p className="text-sm text-slate-600 pl-10">
                  Copy the string and paste it into LinkedIn, Dice, Indeed, or your ATS.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <Button variant="outline" className="w-full" onClick={() => setShowVisaInfo(!showVisaInfo)}>
                  {showVisaInfo ? "Hide Visa Information" : "View US Visa Types"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* US Visa Information Section */}
      {showVisaInfo && (
        <Card className="border-t-4 border-t-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-purple-500" />
              US Visa Types Reference
            </CardTitle>
            <CardDescription>
              Comprehensive information about US visa categories for international recruitment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="work">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="work">Work Visas</TabsTrigger>
                <TabsTrigger value="business">Business Visas</TabsTrigger>
                <TabsTrigger value="student">Student Visas</TabsTrigger>
                <TabsTrigger value="permanent">Permanent Visas</TabsTrigger>
              </TabsList>

              <TabsContent value="work">
                <div className="grid md:grid-cols-2 gap-4">
                  {visaTypes.work.map((visa) => (
                    <Card key={visa.type} className="overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            {visa.type}
                          </Badge>
                          {visa.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <p>{visa.description}</p>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <div>
                            <p className="font-medium text-xs text-slate-500">Duration</p>
                            <p>{visa.duration}</p>
                          </div>
                          <div>
                            <p className="font-medium text-xs text-slate-500">Sponsorship</p>
                            <p>{visa.sponsorship}</p>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-xs text-slate-500">Dependents</p>
                          <p>{visa.dependents}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="business">
                <div className="grid md:grid-cols-2 gap-4">
                  {visaTypes.business.map((visa) => (
                    <Card key={visa.type} className="overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {visa.type}
                          </Badge>
                          {visa.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <p>{visa.description}</p>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <div>
                            <p className="font-medium text-xs text-slate-500">Duration</p>
                            <p>{visa.duration}</p>
                          </div>
                          <div>
                            <p className="font-medium text-xs text-slate-500">Sponsorship</p>
                            <p>{visa.sponsorship}</p>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-xs text-slate-500">Dependents</p>
                          <p>{visa.dependents}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="student">
                <div className="grid md:grid-cols-2 gap-4">
                  {visaTypes.student.map((visa) => (
                    <Card key={visa.type} className="overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {visa.type}
                          </Badge>
                          {visa.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <p>{visa.description}</p>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <div>
                            <p className="font-medium text-xs text-slate-500">Duration</p>
                            <p>{visa.duration}</p>
                          </div>
                          <div>
                            <p className="font-medium text-xs text-slate-500">Sponsorship</p>
                            <p>{visa.sponsorship}</p>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-xs text-slate-500">Dependents</p>
                          <p>{visa.dependents}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="permanent">
                <div className="grid md:grid-cols-2 gap-4">
                  {visaTypes.permanent.map((visa) => (
                    <Card key={visa.type} className="overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-amber-500 to-yellow-500"></div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            {visa.type}
                          </Badge>
                          {visa.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <p>{visa.description}</p>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <div>
                            <p className="font-medium text-xs text-slate-500">Duration</p>
                            <p>{visa.duration}</p>
                          </div>
                          <div>
                            <p className="font-medium text-xs text-slate-500">Sponsorship</p>
                            <p>{visa.sponsorship}</p>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-xs text-slate-500">Dependents</p>
                          <p>{visa.dependents}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {extractedSkills.length > 0 && (
        <div className="space-y-8" ref={resultRef}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-blue-500" />
                Extracted Skills
              </CardTitle>
              <CardDescription>
                Key skills and keywords identified from the job description
                {jobType && <span className="font-medium"> (Detected Job Type: {jobType})</span>}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {extractedSkills.map((skill, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Badge
                              variant="outline"
                              className={`text-sm cursor-pointer flex items-center gap-1.5 py-1 ${getSkillBadgeClass(skill.type)}`}
                            >
                              {getSkillIcon(skill.type)}
                              {skill.name}
                            </Badge>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Info className="h-5 w-5 text-blue-500" />
                                {skill.name}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                              <p>{skill.description}</p>
                              <div className="mt-4 pt-4 border-t border-slate-200">
                                <h4 className="text-sm font-medium mb-2">Type:</h4>
                                <Badge className={getSkillBadgeClass(skill.type)}>{skill.type || "Skill"}</Badge>
                              </div>
                              <div className="mt-4 pt-4 border-t border-slate-200">
                                <h4 className="text-sm font-medium mb-2">Search Example:</h4>
                                <p className="text-sm text-slate-600">
                                  <code className="bg-slate-100 p-1 rounded">
                                    {skill.name.includes(" ") ? `"${skill.name}"` : skill.name}
                                  </code>{" "}
                                  OR (
                                  {skill.type === "programming"
                                    ? "developer OR engineer"
                                    : skill.type === "certification"
                                      ? "certified OR certification"
                                      : "expert OR specialist"}
                                  )
                                </p>
                              </div>
                            </div>
                            <DialogClose asChild>
                              <Button variant="outline" className="absolute top-2 right-2 h-8 w-8 p-0">
                                <X className="h-4 w-4" />
                              </Button>
                            </DialogClose>
                          </DialogContent>
                        </Dialog>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click for details about {skill.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" onClick={exportToCsv} className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  Export Skills
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-blue-500" />
                Boolean Search Strings
              </CardTitle>
              <CardDescription>Ready-to-use search strings for LinkedIn, Dice, Indeed, or your ATS</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  <TabsTrigger value="expert">Expert</TabsTrigger>
                </TabsList>

                <TabsContent value="basic">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Basic Search String</h4>
                        <p className="text-sm text-slate-500">Simple OR operator between all skills</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-50">
                          Beginner
                        </Badge>
                        <Progress value={33} className="w-20 h-2" />
                      </div>
                    </div>

                    <div className="relative">
                      <div className="bg-slate-50 p-4 rounded-md font-mono text-sm overflow-auto max-h-[200px]">
                        {booleanStrings.basic}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(booleanStrings.basic, "Basic")}
                      >
                        {copied === "Basic" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="advanced">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Advanced Search String</h4>
                        <p className="text-sm text-slate-500">Grouped skills with AND/OR operators</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50">
                          Intermediate
                        </Badge>
                        <Progress value={66} className="w-20 h-2" />
                      </div>
                    </div>

                    <div className="relative">
                      <div className="bg-slate-50 p-4 rounded-md font-mono text-sm overflow-auto max-h-[200px]">
                        {booleanStrings.advanced}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(booleanStrings.advanced, "Advanced")}
                      >
                        {copied === "Advanced" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="expert">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Expert Search String</h4>
                        <p className="text-sm text-slate-500">Complex grouping with NOT operators</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-purple-50">
                          Expert
                        </Badge>
                        <Progress value={100} className="w-20 h-2" />
                      </div>
                    </div>

                    <div className="relative">
                      <div className="bg-slate-50 p-4 rounded-md font-mono text-sm overflow-auto max-h-[200px]">
                        {booleanStrings.expert}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(booleanStrings.expert, "Expert")}
                      >
                        {copied === "Expert" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Platform-specific search strings */}
              <div className="mt-8">
                <h3 className="font-medium text-lg mb-4">Platform-Specific Search Strings</h3>
                <Select value={activePlatform} onValueChange={setActivePlatform}>
                  <SelectTrigger className="w-full mb-4">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="indeed">Indeed</SelectItem>
                    <SelectItem value="dice">Dice</SelectItem>
                    <SelectItem value="monster">Monster</SelectItem>
                  </SelectContent>
                </Select>

                <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{platformFormats[activePlatform].name}</h4>
                      <p className="text-sm text-slate-500">{platformFormats[activePlatform].description}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(booleanStrings.platform[activePlatform], activePlatform)}
                    >
                      {copied === activePlatform ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <div className="font-mono text-sm bg-white p-3 rounded border border-slate-200 overflow-auto max-h-[150px] mb-3">
                    {booleanStrings.platform[activePlatform]}
                  </div>

                  <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                    <h5 className="text-sm font-medium text-blue-700 mb-2">Platform Tips:</h5>
                    <ul className="text-xs text-blue-600 space-y-1">
                      {platformFormats[activePlatform].tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-1.5">
                          <div className="mt-1 h-1 w-1 rounded-full bg-blue-400"></div>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
