"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Search, Copy, Info, X, Plus, Check } from "lucide-react"

// Define skill categories with descriptions
const SKILL_CATEGORIES = {
  programming: {
    name: "Programming Languages",
    description: "Core programming languages used in development",
    skills: {
      JavaScript:
        "A scripting language that enables interactive web pages and is an essential part of web applications.",
      TypeScript:
        "A strongly typed programming language that builds on JavaScript, giving better tooling at any scale.",
      Python:
        "An interpreted, high-level, general-purpose programming language, great for data science and backend development.",
      Java: "A class-based, object-oriented programming language designed for portability and cross-platform development.",
      "C#": "A modern, object-oriented programming language developed by Microsoft for the .NET platform.",
      "C++": "A general-purpose programming language with a bias toward systems programming.",
      Go: "A statically typed, compiled language designed at Google, known for simplicity and efficiency.",
      Rust: "A multi-paradigm programming language focused on performance and safety.",
      PHP: "A popular general-purpose scripting language suited for web development.",
      Ruby: "A dynamic, open source programming language focused on simplicity and productivity.",
      Swift: "A powerful and intuitive programming language for iOS, macOS, and other Apple platforms.",
      Kotlin: "A modern programming language that makes developers happier, designed for JVM and Android.",
      Scala: "A strong static type system that combines object-oriented and functional programming.",
      R: "A language for statistical computing and graphics supported by the R Core Team.",
      MATLAB: "A programming platform designed specifically for engineers and scientists.",
      Perl: "A family of two high-level, general-purpose, interpreted, dynamic programming languages.",
      Groovy: "A Java-syntax-compatible object-oriented programming language for the Java platform.",
      "Objective-C": "A general-purpose, object-oriented programming language used by Apple.",
      Dart: "A client-optimized language for fast apps on any platform, used with Flutter.",
      Haskell: "A statically typed, purely functional programming language with type inference and lazy evaluation.",
    },
  },
  frameworks: {
    name: "Frameworks & Libraries",
    description: "Software frameworks and libraries for application development",
    skills: {
      React: "A JavaScript library for building user interfaces, particularly single-page applications.",
      Angular: "A platform and framework for building single-page client applications using HTML and TypeScript.",
      "Vue.js": "A progressive framework for building user interfaces, designed to be incrementally adoptable.",
      "Next.js": "A React framework that enables server-side rendering and generating static websites.",
      "Express.js": "A minimal and flexible Node.js web application framework.",
      Django: "A high-level Python web framework that encourages rapid development and clean, pragmatic design.",
      Flask: "A lightweight WSGI web application framework in Python.",
      "Spring Boot": "An extension of the Spring framework that simplifies the initial setup of Spring applications.",
      "Ruby on Rails": "A server-side web application framework written in Ruby.",
      Laravel: "A PHP web application framework with expressive, elegant syntax.",
      "ASP.NET": "A web framework for building modern web apps and services with .NET.",
      jQuery: "A fast, small, and feature-rich JavaScript library for HTML document traversal and manipulation.",
      Svelte: "A radical new approach to building user interfaces, compiling code to tiny, framework-less vanilla JS.",
      "Ember.js": "A framework for ambitious web developers, focusing on convention over configuration.",
      Meteor: "A full-stack JavaScript platform for developing modern web and mobile applications.",
      FastAPI: "A modern, fast web framework for building APIs with Python based on standard Python type hints.",
      NestJS: "A progressive Node.js framework for building efficient, reliable and scalable server-side applications.",
      Gatsby: "A React-based open source framework for creating websites and apps.",
      Flutter:
        "Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.",
      Xamarin:
        "A Microsoft-owned platform for building modern and performant iOS, Android, and Windows apps with .NET.",
    },
  },
  cloud: {
    name: "Cloud & DevOps",
    description: "Cloud platforms, services, and DevOps tools",
    skills: {
      AWS: "Amazon Web Services, a comprehensive cloud computing platform.",
      Azure: "Microsoft's cloud computing service for building, testing, deploying, and managing applications.",
      "Google Cloud": "Google's suite of cloud computing services that runs on the same infrastructure as Google.",
      Docker: "A platform for developing, shipping, and running applications in containers.",
      Kubernetes:
        "An open-source system for automating deployment, scaling, and management of containerized applications.",
      Jenkins: "An open-source automation server that enables developers to build, test, and deploy software.",
      Terraform:
        "An open-source infrastructure as code software tool that enables provisioning and managing cloud infrastructure.",
      Ansible: "An open-source software provisioning, configuration management, and application-deployment tool.",
      CircleCI: "A continuous integration and delivery platform that automates build, test, and deployment.",
      "GitHub Actions": "GitHub's built-in continuous integration and continuous delivery (CI/CD) platform.",
      "GitLab CI/CD": "GitLab's built-in continuous integration and delivery tool.",
      Prometheus:
        "An open-source monitoring system with a dimensional data model, flexible query language, and alerting.",
      Grafana:
        "An open-source platform for monitoring and observability that allows you to query, visualize, and alert on metrics.",
      "ELK Stack": "Elasticsearch, Logstash, and Kibana, used for searching, analyzing, and visualizing log data.",
      Serverless:
        "A cloud-computing execution model where the cloud provider runs the server and dynamically manages resource allocation.",
      Heroku:
        "A platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.",
      Netlify:
        "A web developer platform that multiplies productivity through a git-based workflow and powerful serverless platform.",
      Vercel:
        "A deployment and collaboration platform for frontend developers, providing a frictionless developer experience.",
      CloudFormation: "AWS service that helps you model and set up your AWS resources.",
      Pulumi: "An open-source infrastructure as code tool for creating, deploying, and managing cloud infrastructure.",
    },
  },
  databases: {
    name: "Databases & Storage",
    description: "Database systems and data storage technologies",
    skills: {
      MySQL: "An open-source relational database management system.",
      PostgreSQL: "A powerful, open-source object-relational database system.",
      MongoDB: "A source-available cross-platform document-oriented database program.",
      Redis: "An in-memory data structure store, used as a database, cache, and message broker.",
      SQLite: "A C-language library that implements a small, fast, self-contained SQL database engine.",
      Oracle: "A multi-model database management system produced and marketed by Oracle Corporation.",
      "SQL Server": "Microsoft's relational database management system.",
      DynamoDB: "A fully managed proprietary NoSQL database service by Amazon.",
      Cassandra: "A free and open-source, distributed, wide-column store, NoSQL database management system.",
      Elasticsearch: "A distributed, RESTful search and analytics engine.",
      Firebase: "Google's platform for mobile and web application development.",
      Neo4j: "A graph database management system.",
      Couchbase: "An open-source, distributed multi-model NoSQL document-oriented database.",
      MariaDB: "A community-developed, commercially supported fork of the MySQL relational database management system.",
      CouchDB: "An open-source document-oriented NoSQL database, focusing on ease of use.",
      Firestore:
        "A flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud.",
      InfluxDB: "An open-source time series database developed by InfluxData.",
      RethinkDB: "The first open-source scalable database built for realtime applications.",
      Supabase: "An open source Firebase alternative with a PostgreSQL database, Authentication, and Storage.",
      PlanetScale: "A MySQL-compatible serverless database platform powered by Vitess.",
    },
  },
  frontend: {
    name: "Frontend Technologies",
    description: "Technologies for building user interfaces and frontend applications",
    skills: {
      HTML: "The standard markup language for documents designed to be displayed in a web browser.",
      CSS: "A style sheet language used for describing the presentation of a document written in HTML.",
      "SASS/SCSS": "A preprocessor scripting language that is interpreted or compiled into CSS.",
      Less: "A backwards-compatible language extension for CSS.",
      "Tailwind CSS": "A utility-first CSS framework for rapidly building custom user interfaces.",
      Bootstrap: "A free and open-source CSS framework directed at responsive, mobile-first front-end web development.",
      "Material UI": "A popular React UI framework implementing Google's Material Design.",
      "Styled Components":
        "A library for React and React Native that allows you to use component-level styles in your application.",
      Emotion: "A library designed for writing CSS styles with JavaScript.",
      Webpack: "A static module bundler for modern JavaScript applications.",
      Babel:
        "A JavaScript compiler that converts ECMAScript 2015+ code into a backwards compatible version of JavaScript.",
      Vite: "A build tool that aims to provide a faster and leaner development experience for modern web projects.",
      Rollup:
        "A module bundler for JavaScript which compiles small pieces of code into something larger and more complex.",
      Parcel: "A web application bundler, differentiated by its zero-configuration.",
      Storybook: "An open source tool for building UI components and pages in isolation.",
      Redux: "A predictable state container for JavaScript apps.",
      MobX: "A simple, scalable state management solution.",
      GraphQL: "A query language for APIs and a runtime for fulfilling those queries with your existing data.",
      "Apollo Client":
        "A comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL.",
      WebAssembly:
        "A binary instruction format for a stack-based virtual machine, designed as a portable target for compilation of high-level languages.",
    },
  },
  backend: {
    name: "Backend Technologies",
    description: "Technologies for server-side application development",
    skills: {
      "Node.js":
        "A JavaScript runtime built on Chrome's V8 JavaScript engine for building scalable network applications.",
      Deno: "A secure runtime for JavaScript and TypeScript, built on V8, Rust, and Tokio.",
      "REST API": "Representational State Transfer, an architectural style for distributed hypermedia systems.",
      "GraphQL API": "A query language for APIs and a runtime for fulfilling those queries with your existing data.",
      gRPC: "A high-performance, open-source universal RPC framework.",
      WebSockets:
        "A communication protocol that provides full-duplex communication channels over a single TCP connection.",
      Microservices:
        "An architectural style that structures an application as a collection of services that are independently deployable.",
      Serverless:
        "A cloud-computing execution model where the cloud provider runs the server and dynamically manages resource allocation.",
      OAuth:
        "An open standard for access delegation, commonly used as a way for Internet users to grant websites or applications access to their information.",
      JWT: "JSON Web Token, a compact, URL-safe means of representing claims to be transferred between two parties.",
      "Socket.IO":
        "A library that enables real-time, bidirectional and event-based communication between the browser and the server.",
      RabbitMQ:
        "An open-source message-broker software that originally implemented the Advanced Message Queuing Protocol.",
      Kafka:
        "An open-source distributed event streaming platform used for high-performance data pipelines, streaming analytics, and data integration.",
      "Redis Pub/Sub":
        "A messaging paradigm where senders (publishers) send messages to channels, without knowledge of what subscribers there may be.",
      Celery: "An asynchronous task queue/job queue based on distributed message passing.",
      Bull: "A Node library that implements a fast and robust queue system based on Redis.",
      "Swagger/OpenAPI":
        "A specification for machine-readable interface files for describing, producing, consuming, and visualizing RESTful web services.",
      Postman: "A collaboration platform for API development.",
      Nginx: "A web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache.",
      Apache: "A free and open-source cross-platform web server software.",
    },
  },
  testing: {
    name: "Testing & QA",
    description: "Tools and frameworks for software testing and quality assurance",
    skills: {
      Jest: "A delightful JavaScript Testing Framework with a focus on simplicity.",
      Mocha: "A feature-rich JavaScript test framework running on Node.js and in the browser.",
      Chai: "A BDD / TDD assertion library for node and the browser that can be paired with any javascript testing framework.",
      Cypress: "A next generation front end testing tool built for the modern web.",
      Selenium: "A portable framework for testing web applications.",
      JUnit: "A simple framework to write repeatable tests for Java.",
      PyTest:
        "A testing framework that makes it easy to write small tests, yet scales to support complex functional testing.",
      TestNG: "A testing framework inspired from JUnit and NUnit but introducing new functionalities.",
      Jasmine: "A behavior-driven development framework for testing JavaScript code.",
      Karma: "A test runner that lets you execute JavaScript code in multiple real browsers.",
      Protractor: "An end-to-end test framework for Angular and AngularJS applications.",
      Puppeteer:
        "A Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol.",
      Playwright:
        "A framework for Web Testing and Automation that allows testing Chromium, Firefox and WebKit with a single API.",
      Cucumber: "A tool that supports Behavior-Driven Development (BDD).",
      RSpec: "A testing tool for Ruby, created for behavior-driven development.",
      PHPUnit: "A programmer-oriented testing framework for PHP.",
      XCTest:
        "A testing framework included with Xcode that can be used to write unit tests, performance tests, and UI tests for Swift code.",
      Espresso: "A testing framework for Android to write concise, beautiful, and reliable Android UI tests.",
      Appium: "An open-source test automation framework for use with native, hybrid, and mobile web apps.",
      SonarQube: "An open-source platform for continuous inspection of code quality.",
    },
  },
  mobile: {
    name: "Mobile Development",
    description: "Technologies for mobile application development",
    skills: {
      "React Native": "A framework for building native apps using React.",
      Flutter:
        "Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.",
      Swift: "A powerful and intuitive programming language for iOS, macOS, and other Apple platforms.",
      Kotlin: "A modern programming language that makes developers happier, designed for JVM and Android.",
      "Objective-C": "A general-purpose, object-oriented programming language used by Apple.",
      "Java (Android)": "The primary programming language for Android development.",
      Xamarin:
        "A Microsoft-owned platform for building modern and performant iOS, Android, and Windows apps with .NET.",
      Ionic: "A complete open-source SDK for hybrid mobile app development.",
      Cordova:
        "A mobile application development framework that allows you to use standard web technologies for cross-platform development.",
      NativeScript: "An open-source framework to develop apps on the Apple iOS and Android platforms.",
      SwiftUI: "A user interface toolkit that lets you design apps in a declarative way for Apple platforms.",
      "Jetpack Compose": "Android's modern toolkit for building native UI.",
      "Android SDK":
        "A software development kit that enables developers to create applications for the Android platform.",
      "iOS SDK":
        "A software development kit that allows for the development of mobile apps on Apple's iOS operating system.",
      Expo: "An open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React.",
      "App Center": "A platform to build, test, release, and monitor mobile apps.",
      Firebase: "Google's platform for mobile and web application development.",
      Realm: "A mobile database that runs directly inside phones, tablets or wearables.",
      Unity:
        "A cross-platform game engine developed by Unity Technologies, primarily used to develop video games and simulations.",
      "Unreal Engine": "A game engine developed by Epic Games, with a high degree of portability.",
    },
  },
  ai_ml: {
    name: "AI & Machine Learning",
    description: "Technologies for artificial intelligence and machine learning",
    skills: {
      TensorFlow: "An end-to-end open source platform for machine learning.",
      PyTorch: "An open source machine learning framework based on the Torch library.",
      "Scikit-learn": "A free software machine learning library for the Python programming language.",
      Keras: "An open-source software library that provides a Python interface for artificial neural networks.",
      NLTK: "A leading platform for building Python programs to work with human language data.",
      spaCy: "An open-source software library for advanced natural language processing.",
      OpenCV: "A library of programming functions mainly aimed at real-time computer vision.",
      Pandas: "A software library written for the Python programming language for data manipulation and analysis.",
      NumPy:
        "A library for the Python programming language, adding support for large, multi-dimensional arrays and matrices.",
      SciPy: "A free and open-source Python library used for scientific computing and technical computing.",
      Matplotlib:
        "A plotting library for the Python programming language and its numerical mathematics extension NumPy.",
      "Hugging Face": "A company that develops tools for building applications using machine learning.",
      ONNX: "An open format built to represent machine learning models.",
      MLflow: "An open source platform for managing the end-to-end machine learning lifecycle.",
      DVC: "An open-source version control system for machine learning projects.",
      "Weights & Biases":
        "A machine learning platform for developers to track experiments, version datasets, and collaborate.",
      H2O: "An open source, in-memory, distributed, fast, and scalable machine learning and predictive analytics platform.",
      Databricks: "A company founded by the creators of Apache Spark that provides a unified analytics platform.",
      Kubeflow: "A machine learning toolkit for Kubernetes.",
      Ray: "An open-source project that makes it simple to scale AI and Python applications.",
    },
  },
  data: {
    name: "Data Engineering & Analytics",
    description: "Technologies for data processing, analytics, and visualization",
    skills: {
      SQL: "Structured Query Language, used to communicate with a database.",
      Hadoop:
        "An open-source software framework for storing data and running applications on clusters of commodity hardware.",
      Spark: "A unified analytics engine for large-scale data processing.",
      Airflow: "A platform to programmatically author, schedule, and monitor workflows.",
      Tableau: "A visual analytics platform.",
      "Power BI": "A business analytics service by Microsoft.",
      Looker: "A business intelligence software and big data analytics platform.",
      Snowflake: "A cloud-based data warehousing company.",
      BigQuery:
        "Google's fully managed, serverless data warehouse that enables scalable analysis over petabytes of data.",
      Redshift: "Amazon's fully managed, petabyte-scale data warehouse service in the cloud.",
      Databricks: "A company founded by the creators of Apache Spark that provides a unified analytics platform.",
      dbt: "A command line tool that enables data analysts and engineers to transform data in their warehouse.",
      Presto:
        "An open source distributed SQL query engine for running interactive analytic queries against data sources of all sizes.",
      Hive: "A data warehouse software project built on top of Apache Hadoop for providing data query and analysis.",
      Kafka:
        "An open-source distributed event streaming platform used for high-performance data pipelines, streaming analytics, and data integration.",
      Flink: "An open-source, unified stream-processing and batch-processing framework.",
      Talend: "A software integration platform that helps connect data and applications in real time.",
      Informatica: "A software development company focused on enterprise cloud data management.",
      Alteryx: "A software company that produces products for data science and analytics.",
      KNIME: "A free and open-source data analytics, reporting and integration platform.",
    },
  },
  security: {
    name: "Security",
    description: "Technologies for cybersecurity and secure development",
    skills: {
      OWASP:
        "The Open Web Application Security Project, a nonprofit foundation that works to improve the security of software.",
      "Penetration Testing":
        "A method of evaluating the security of a computer system or network by simulating an attack.",
      Encryption: "The process of encoding information in such a way that only authorized parties can access it.",
      OAuth:
        "An open standard for access delegation, commonly used as a way for Internet users to grant websites or applications access to their information.",
      SAML: "Security Assertion Markup Language, an open standard for exchanging authentication and authorization data between parties.",
      SSO: "Single Sign-On, an authentication scheme that allows a user to log in with a single ID and password to any of several related, yet independent, software systems.",
      MFA: "Multi-Factor Authentication, a security system that requires more than one method of authentication from independent categories of credentials.",
      IAM: "Identity and Access Management, a framework of policies and technologies for ensuring that the right users have the appropriate access to technology resources.",
      WAF: "Web Application Firewall, a filter for HTTP requests and responses.",
      SIEM: "Security Information and Event Management, a subsection of the computer security field, where software products and services combine security information management and security event management.",
      "Vulnerability Scanning":
        "A technique used to identify security weaknesses in computers, networks, and communications equipment.",
      "Secure Coding":
        "The practice of developing computer software in a way that guards against the accidental introduction of security vulnerabilities.",
      "Threat Modeling":
        "A process by which potential threats can be identified, enumerated, and prioritized – all from a hypothetical attacker's point of view.",
      "Zero Trust":
        "A security concept centered on the belief that organizations should not automatically trust anything inside or outside its perimeters.",
      DevSecOps: "An augmentation of DevOps to allow for security practices to be integrated into the DevOps approach.",
      GDPR: "General Data Protection Regulation, a regulation in EU law on data protection and privacy in the European Union and the European Economic Area.",
      HIPAA:
        "Health Insurance Portability and Accountability Act, US legislation that provides data privacy and security provisions for safeguarding medical information.",
      "SOC 2": "Service Organization Control 2, a technical auditing process that ensures secure data management.",
      "PCI DSS":
        "Payment Card Industry Data Security Standard, an information security standard for organizations that handle branded credit cards.",
      Cryptography: "The practice and study of techniques for secure communication in the presence of third parties.",
    },
  },
  soft_skills: {
    name: "Soft Skills",
    description: "Non-technical skills that are valuable in the workplace",
    skills: {
      Communication: "The ability to convey information effectively and efficiently.",
      Teamwork:
        "The collaborative effort of a group to achieve a common goal or to complete a task in the most effective and efficient way.",
      "Problem Solving": "The process of finding solutions to difficult or complex issues.",
      "Critical Thinking": "The objective analysis and evaluation of an issue in order to form a judgment.",
      "Time Management":
        "The process of planning and exercising conscious control of time spent on specific activities, especially to increase effectiveness, efficiency, and productivity.",
      Leadership:
        "The ability of an individual or organization to lead or guide other individuals, teams, or entire organizations.",
      Adaptability: "The quality of being able to adjust to new conditions or environments.",
      Creativity: "The use of the imagination or original ideas, especially in the production of an artistic work.",
      "Emotional Intelligence":
        "The capacity to be aware of, control, and express one's emotions, and to handle interpersonal relationships judiciously and empathetically.",
      "Conflict Resolution":
        "The process of resolving a dispute or a conflict by meeting at least some of each side's needs and addressing their interests.",
      "Decision Making":
        "The cognitive process resulting in the selection of a belief or a course of action among several possible alternative options.",
      Negotiation: "A dialogue between two or more people or parties intended to reach a beneficial outcome.",
      "Presentation Skills":
        "The skills required to deliver an effective and engaging presentation to a variety of audiences.",
      "Project Management":
        "The practice of initiating, planning, executing, controlling, and closing the work of a team to achieve specific goals and meet specific success criteria at the specified time.",
      Mentoring:
        "A relationship in which a more experienced or more knowledgeable person helps to guide a less experienced or less knowledgeable person.",
      "Customer Service":
        "The assistance and advice provided by a company to those people who buy or use its products or services.",
      "Work Ethic":
        "A belief in the moral benefit and importance of work and its inherent ability to strengthen character.",
      "Attention to Detail": "The ability to achieve thoroughness and accuracy when accomplishing a task.",
      Resilience: "The capacity to recover quickly from difficulties; toughness.",
      "Cultural Awareness":
        "The understanding of the differences between themselves and people from other countries or other backgrounds, especially differences in attitudes and values.",
    },
  },
  certifications: {
    name: "Certifications",
    description: "Professional certifications and credentials",
    skills: {
      "AWS Certified Solutions Architect": "Certification for designing distributed systems on AWS.",
      "AWS Certified Developer": "Certification for developing applications on AWS.",
      "AWS Certified DevOps Engineer": "Certification for implementing DevOps practices on AWS.",
      "Microsoft Certified: Azure Solutions Architect": "Certification for designing solutions that run on Azure.",
      "Microsoft Certified: Azure Developer": "Certification for developing applications on Azure.",
      "Google Cloud Professional Cloud Architect": "Certification for designing and managing solutions on GCP.",
      "Certified Kubernetes Administrator": "Certification for Kubernetes administration.",
      "Certified Kubernetes Application Developer": "Certification for developing applications for Kubernetes.",
      "Certified Information Systems Security Professional (CISSP)": "Advanced security certification.",
      "Certified Ethical Hacker (CEH)": "Certification for ethical hacking and penetration testing.",
      "Offensive Security Certified Professional (OSCP)": "Hands-on penetration testing certification.",
      "Project Management Professional (PMP)": "Certification for project management.",
      "Scrum Master Certification": "Certification for Scrum methodology.",
      "Certified ScrumMaster (CSM)": "Certification from Scrum Alliance for Scrum Masters.",
      "Professional Scrum Master (PSM)": "Certification from Scrum.org for Scrum Masters.",
      "Certified Scrum Product Owner (CSPO)": "Certification for product owners in Scrum.",
      "Cisco Certified Network Associate (CCNA)": "Entry-level certification for Cisco networking.",
      "Cisco Certified Network Professional (CCNP)": "Professional-level certification for Cisco networking.",
      "CompTIA Security+": "Vendor-neutral security certification.",
      "CompTIA Network+": "Vendor-neutral networking certification.",
    },
  },
  industry_specific: {
    name: "Industry-Specific Skills",
    description: "Skills specific to particular industries",
    skills: {
      "Healthcare IT": "Information technology specifically for healthcare organizations.",
      "Electronic Health Records (EHR)": "Digital version of patients' paper charts in healthcare.",
      "HIPAA Compliance": "Compliance with healthcare privacy regulations.",
      "Financial Services": "Services provided by the finance industry.",
      "Anti-Money Laundering (AML)": "Set of procedures to prevent illegal money laundering.",
      "Know Your Customer (KYC)": "Process of identifying and verifying client identity.",
      "Retail Analytics": "Analysis of retail data to improve business decisions.",
      "Supply Chain Management": "Management of the flow of goods and services.",
      Logistics: "Detailed organization and implementation of a complex operation.",
      "Manufacturing Processes": "Methods used to create or transform products.",
      "Quality Assurance": "Maintenance of a desired level of quality in a service or product.",
      "Six Sigma": "Set of techniques for process improvement.",
      "Lean Manufacturing": "Methodology that focuses on minimizing waste.",
      "Digital Marketing": "Marketing of products or services using digital technologies.",
      "SEO/SEM": "Search Engine Optimization and Search Engine Marketing.",
      "Content Marketing": "Marketing focused on creating and distributing valuable content.",
      Telecommunications: "Transmission of information over significant distances.",
      "5G Technology": "Fifth generation technology standard for cellular networks.",
      "IoT (Internet of Things)": "Extension of Internet connectivity into physical devices and everyday objects.",
      Blockchain: "Growing list of records, called blocks, that are linked using cryptography.",
    },
  },
}

// Define US visa types with descriptions
const US_VISA_TYPES = {
  "H-1B": {
    name: "H-1B Specialty Occupation",
    description:
      "For professionals in specialized fields requiring theoretical and practical application of highly specialized knowledge.",
    duration: "3 years, extendable to 6 years total",
    sponsorship: "Employer must sponsor and file petition",
    renewability: "Renewable once for additional 3 years (6 years total)",
    dependents: "H-4 visa for spouse and unmarried children under 21",
    workEligibility: "Only for sponsoring employer",
    path: "Dual intent visa, can pursue permanent residency",
    quota: "Annual cap of 85,000 (20,000 reserved for US master's degree holders)",
    notes: "Premium processing available for expedited adjudication",
  },
  "L-1": {
    name: "L-1 Intracompany Transferee",
    description:
      "For employees of international companies transferring to a US office (L-1A for managers/executives, L-1B for specialized knowledge).",
    duration: "L-1A: Up to 7 years, L-1B: Up to 5 years",
    sponsorship: "Employer must have qualifying relationship with foreign entity",
    renewability: "Increments of 2 years until maximum duration",
    dependents: "L-2 visa for spouse and unmarried children under 21 (spouses eligible for work authorization)",
    workEligibility: "Only for sponsoring employer",
    path: "Dual intent visa, can pursue permanent residency",
    notes: "No annual quota, blanket petitions available for large companies",
  },
  "O-1": {
    name: "O-1 Extraordinary Ability",
    description: "For individuals with extraordinary abilities in sciences, arts, education, business, or athletics.",
    duration: "Initially up to 3 years",
    sponsorship: "Employer or agent must sponsor",
    renewability: "1-year increments with no maximum duration",
    dependents: "O-3 visa for spouse and unmarried children under 21 (no work authorization)",
    workEligibility: "Limited to activities specified in petition",
    path: "Can pursue permanent residency",
    notes: "Requires substantial documentation of extraordinary ability",
  },
  TN: {
    name: "TN NAFTA Professional",
    description: "For citizens of Canada and Mexico in specific professional categories under USMCA (formerly NAFTA).",
    duration: "Up to 3 years",
    sponsorship: "Job offer required but no petition needed for Canadians",
    renewability: "Unlimited renewals in 3-year increments",
    dependents: "TD visa for spouse and unmarried children under 21 (no work authorization)",
    workEligibility: "Only for specific profession and employer",
    path: "Not dual intent, challenges with immigrant intent",
    notes: "Limited to professions listed in USMCA agreement",
  },
  "E-3": {
    name: "E-3 Australian Professional",
    description: "Specialty occupation visa specifically for Australian citizens.",
    duration: "2 years",
    sponsorship: "Employer must provide job offer",
    renewability: "Unlimited 2-year extensions",
    dependents: "E-3D for spouse and unmarried children under 21 (spouses eligible for work authorization)",
    workEligibility: "Only for sponsoring employer",
    path: "Not technically dual intent but can pursue permanent residency",
    quota: "Annual cap of 10,500 visas",
  },
  "H-1B1": {
    name: "H-1B1 Free Trade Agreement",
    description: "Specialty occupation visa for professionals from Chile and Singapore.",
    duration: "1 year for Chileans, 2 years for Singaporeans",
    sponsorship: "Employer must sponsor",
    renewability: "Unlimited extensions",
    dependents: "H-4 visa for spouse and unmarried children under 21",
    workEligibility: "Only for sponsoring employer",
    path: "Not dual intent, challenges with immigrant intent",
    quota: "1,400 for Chileans, 5,400 for Singaporeans annually",
  },
  "E-1/E-2": {
    name: "E-1/E-2 Treaty Trader/Investor",
    description: "For individuals from countries with commerce and navigation treaties with the US.",
    duration: "Initially 2 years",
    sponsorship: "Self-sponsorship possible with substantial investment/trade",
    renewability: "Unlimited 2-year extensions",
    dependents: "Same E visa for spouse and unmarried children under 21 (spouses eligible for work authorization)",
    workEligibility: "Only for the treaty enterprise",
    path: "Not dual intent, challenges with immigrant intent",
    notes: "Requires substantial investment or trade with treaty country",
  },
  "EB-1": {
    name: "EB-1 Priority Workers",
    description:
      "Employment-based first preference for priority workers (extraordinary ability, outstanding professors/researchers, multinational executives).",
    duration: "Permanent residency (Green Card)",
    sponsorship: "Employer sponsorship or self-petition (for extraordinary ability)",
    renewability: "N/A (permanent)",
    dependents: "Spouse and unmarried children under 21 included",
    workEligibility: "Unrestricted work authorization",
    path: "Direct path to permanent residency",
    notes: "No labor certification required, priority processing",
  },
  "EB-2": {
    name: "EB-2 Advanced Degree Professionals",
    description: "Employment-based second preference for professionals with advanced degrees or exceptional ability.",
    duration: "Permanent residency (Green Card)",
    sponsorship: "Employer sponsorship or self-petition with National Interest Waiver",
    renewability: "N/A (permanent)",
    dependents: "Spouse and unmarried children under 21 included",
    workEligibility: "Unrestricted work authorization",
    path: "Direct path to permanent residency",
    notes: "Labor certification typically required unless waived",
  },
  "EB-3": {
    name: "EB-3 Skilled Workers and Professionals",
    description: "Employment-based third preference for skilled workers, professionals, and other workers.",
    duration: "Permanent residency (Green Card)",
    sponsorship: "Employer sponsorship required",
    renewability: "N/A (permanent)",
    dependents: "Spouse and unmarried children under 21 included",
    workEligibility: "Unrestricted work authorization",
    path: "Direct path to permanent residency",
    notes: "Labor certification required, longer wait times than EB-1/EB-2",
  },
  "EB-5": {
    name: "EB-5 Immigrant Investor",
    description: "For those investing significant capital in US businesses that create jobs.",
    duration: "Permanent residency (Green Card)",
    sponsorship: "Self-sponsored through investment",
    renewability: "N/A (permanent)",
    dependents: "Spouse and unmarried children under 21 included",
    workEligibility: "Unrestricted work authorization",
    path: "Direct path to permanent residency",
    notes: "Requires minimum investment of $800,000-$1,050,000 and creation of 10 full-time jobs",
  },
  "J-1": {
    name: "J-1 Exchange Visitor",
    description: "For educational and cultural exchange programs.",
    duration: "Varies by program category (typically 1-5 years)",
    sponsorship: "Designated sponsor organization required",
    renewability: "Varies by program category",
    dependents: "J-2 visa for spouse and unmarried children under 21 (eligible for work authorization)",
    workEligibility: "Limited to program activities",
    path: "Some categories subject to 2-year home residency requirement",
    notes: "Multiple categories including researchers, professors, students, au pairs, etc.",
  },
  "F-1": {
    name: "F-1 Student",
    description: "For academic studies with Optional Practical Training (OPT) allowing temporary employment.",
    duration: "Duration of study program plus grace periods",
    sponsorship: "Accredited educational institution",
    renewability: "Valid as long as maintaining student status",
    dependents: "F-2 visa for spouse and unmarried children under 21 (no work authorization)",
    workEligibility: "On-campus employment, CPT, OPT, and STEM OPT extension",
    path: "Not dual intent, but can change to dual intent status",
    notes: "12 months OPT, additional 24 months for STEM degrees",
  },
  "H-4": {
    name: "H-4 Dependent",
    description: "For spouses and children of H-1B visa holders.",
    duration: "Same as primary H-1B holder",
    sponsorship: "Derived from H-1B holder",
    renewability: "Same as primary H-1B holder",
    workEligibility: "EAD available for spouses of certain H-1B holders (those with approved I-140)",
    path: "Follows primary H-1B holder's path",
    notes: "Children lose status at age 21",
  },
  "L-2": {
    name: "L-2 Dependent",
    description: "For spouses and children of L-1 visa holders.",
    duration: "Same as primary L-1 holder",
    sponsorship: "Derived from L-1 holder",
    renewability: "Same as primary L-1 holder",
    workEligibility: "Spouses eligible for work authorization",
    path: "Follows primary L-1 holder's path",
    notes: "Children lose status at age 21",
  },
  "O-3": {
    name: "O-3 Dependent",
    description: "For spouses and children of O-1 visa holders.",
    duration: "Same as primary O-1 holder",
    sponsorship: "Derived from O-1 holder",
    renewability: "Same as primary O-1 holder",
    workEligibility: "No work authorization",
    path: "Follows primary O-1 holder's path",
    notes: "Children lose status at age 21",
  },
  "H-2B": {
    name: "H-2B Temporary Non-Agricultural Worker",
    description: "For temporary non-agricultural workers for seasonal needs.",
    duration: "Up to 1 year initially",
    sponsorship: "Employer must sponsor and obtain labor certification",
    renewability: "Maximum of 3 years total",
    dependents: "H-4 visa for spouse and unmarried children under 21 (no work authorization)",
    workEligibility: "Only for sponsoring employer",
    path: "Not dual intent, must maintain foreign residence",
    quota: "Annual cap of 66,000 visas",
  },
  "H-2A": {
    name: "H-2A Temporary Agricultural Worker",
    description: "For temporary agricultural workers.",
    duration: "Up to 1 year initially",
    sponsorship: "Employer must sponsor and obtain labor certification",
    renewability: "Maximum of 3 years total",
    dependents: "H-4 visa for spouse and unmarried children under 21 (no work authorization)",
    workEligibility: "Only for sponsoring employer",
    path: "Not dual intent, must maintain foreign residence",
    notes: "No annual cap",
  },
  "P-1": {
    name: "P-1 Athlete/Entertainer",
    description: "For internationally recognized athletes or entertainment groups.",
    duration: "Up to 5 years for athletes, 1 year for entertainment groups",
    sponsorship: "Employer or agent must sponsor",
    renewability: "5 year maximum for athletes, 1 year increments for entertainment groups",
    dependents: "P-4 visa for spouse and unmarried children under 21 (no work authorization)",
    workEligibility: "Limited to activities in petition",
    path: "Not dual intent, challenges with immigrant intent",
    notes: "Requires international recognition",
  },
  "R-1": {
    name: "R-1 Religious Worker",
    description: "For ministers and religious professionals.",
    duration: "Up to 30 months initially",
    sponsorship: "Religious organization must sponsor",
    renewability: "Up to 5 years total",
    dependents: "R-2 visa for spouse and unmarried children under 21 (no work authorization)",
    workEligibility: "Only for sponsoring religious organization",
    path: "Can pursue permanent residency through EB-4 category",
    notes: "Must have been a member of religious denomination for at least 2 years",
  },
  "B-1": {
    name: "B-1 Business Visitor",
    description: "For short-term business activities.",
    duration: "Up to 6 months, typically granted for shorter periods",
    sponsorship: "No sponsor required",
    renewability: "Extensions possible in 6-month increments",
    dependents: "Each family member needs separate B visa",
    workEligibility: "No work authorization, limited to business activities",
    path: "Not dual intent, must maintain foreign residence",
    notes: "Cannot receive salary from US source",
  },
  "STEM OPT": {
    name: "STEM OPT Extension",
    description:
      "Extension of F-1 OPT for students with degrees in science, technology, engineering, and mathematics fields.",
    duration: "24 months extension after regular 12-month OPT",
    sponsorship: "Requires E-Verify employer",
    renewability: "One-time extension per degree level",
    workEligibility: "Must be related to STEM field of study",
    path: "Provides longer time to secure H-1B or other work visa",
    notes: "Requires formal training plan (I-983)",
  },
  CPT: {
    name: "Curricular Practical Training",
    description: "For F-1 students as part of their curriculum.",
    duration: "Varies based on program requirements",
    sponsorship: "Authorized by school's DSO",
    renewability: "Based on curriculum requirements",
    workEligibility: "Must be integral part of established curriculum",
    path: "Part of F-1 status",
    notes: "12+ months of full-time CPT eliminates OPT eligibility",
  },
  EAD: {
    name: "Employment Authorization Document",
    description: "Document allowing foreign nationals to work legally in the US.",
    duration: "Typically 1-2 years depending on category",
    sponsorship: "Varies by underlying status",
    renewability: "Varies by category",
    workEligibility: "Unrestricted work authorization",
    path: "Not a visa itself, but provides work authorization",
    notes: "Available to various categories including asylum seekers, students on OPT, adjustment of status applicants",
  },
  "Green Card": {
    name: "Permanent Resident Card",
    description: "Authorization to live and work in the United States permanently.",
    duration: "10-year card (2 years for conditional)",
    sponsorship: "Family, employer, investment, or humanitarian grounds",
    renewability: "Card renewal required, status is permanent",
    dependents: "Spouse and unmarried children under 21 included in application or can be petitioned",
    workEligibility: "Unrestricted work authorization",
    path: "Can apply for US citizenship after 3-5 years",
    notes: "Conditional cards require removal of conditions after 2 years",
  },
}

// Define US states with detailed information
const US_STATES = {
  AL: {
    name: "Alabama",
    timeZone: "Central Time Zone (CT)",
    topCompanies: ["Regions Financial", "Vulcan Materials", "Encompass Health"],
    demographics: "Population: ~5 million, with growing tech hubs in Birmingham and Huntsville",
    culturalInsights: "Strong southern hospitality culture, aerospace industry presence, and growing biotech sector",
    flag: "🇺🇸 with state flag featuring red X on white background",
    party: "Republican",
    governor: "Kay Ivey",
  },
  AK: {
    name: "Alaska",
    timeZone: "Alaska Time Zone (AKT)",
    topCompanies: ["Alaska Air Group", "GCI", "ASRC Energy Services"],
    demographics: "Population: ~730,000, with resource industry concentration",
    culturalInsights:
      "Resource-driven economy, outdoor lifestyle, and unique work schedules due to seasonal daylight variations",
    flag: "🇺🇸 with state flag featuring Big Dipper and North Star on blue background",
    party: "Republican",
    governor: "Mike Dunleavy",
  },
  AZ: {
    name: "Arizona",
    timeZone: "Mountain Time Zone (MT) - Arizona does not observe Daylight Saving Time",
    topCompanies: ["Intel", "Banner Health", "Amazon", "Raytheon Technologies"],
    demographics: "Population: ~7.3 million, with tech hubs in Phoenix and Tucson",
    culturalInsights: "Growing tech ecosystem, retirement destination, and strong aerospace/defense industry presence",
    flag: "🇺🇸 with state flag featuring copper star and red/yellow rays",
    party: "Democratic",
    governor: "Katie Hobbs",
  },
  // Additional states omitted for brevity but would continue in the same format
  // The full list would include all 50 states
}

const BooleanSearchEnhanced = () => {
  const [booleanQuery, setBooleanQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isCopied, setIsCopied] = useState(false)
  const [isExampleDialogOpen, setIsExampleDialogOpen] = useState(false)
  const [isSkillCategoriesDialogOpen, setIsSkillCategoriesDialogOpen] = useState(false)
  const [isVisaTypesDialogOpen, setIsVisaTypesDialogOpen] = useState(false)
  const [isUSStatesDialogOpen, setIsUSStatesDialogOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState("skills") // 'skills', 'visas', 'states'
  const [skillCategoryFilter, setSkillCategoryFilter] = useState("all")
  const [visaTypeFilter, setVisaTypeFilter] = useState("all")
  const [usStateFilter, setUSStateFilter] = useState("all")
  const [showAllSkills, setShowAllSkills] = useState(false)
  const [showAllVisaTypes, setShowAllVisaTypes] = useState(false)
  const [showAllUSStates, setShowAllUSStates] = useState(false)
  const [expandedSkills, setExpandedSkills] = useState<string[]>([])
  const [expandedVisaTypes, setExpandedVisaTypes] = useState<string[]>([])
  const [expandedUSStates, setExpandedUSStates] = useState<string[]>([])
  const [showWelcomePage, setShowWelcomePage] = useState(true)
  const [showUSMap, setShowUSMap] = useState(false)
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [stateDetails, setStateDetails] = useState<any>(null)
  const [showStateDetailsDialog, setShowStateDetailsDialog] = useState(false)
  const [showStateList, setShowStateList] = useState(false)
  const [showVisaList, setShowVisaList] = useState(false)
  const [showSkillList, setShowSkillList] = useState(false)
  const [jobDescription, setJobDescription] = useState("")
  const [extractedSkills, setExtractedSkills] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [skillDefinitionOpen, setSkillDefinitionOpen] = useState(false)
  const [currentSkill, setCurrentSkill] = useState<{ name: string; description: string } | null>(null)

  const { toast } = useToast()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (jobDescription) {
      extractSkillsFromJobDescription(jobDescription)
    }
  }, [jobDescription])

  useEffect(() => {
    updateBooleanQuery()
  }, [selectedSkills])

  const extractSkillsFromJobDescription = (text: string) => {
    // This is a simplified extraction - in a real app, you'd use NLP or a more sophisticated algorithm
    const allSkills: string[] = []

    // Flatten all skills from all categories
    Object.values(SKILL_CATEGORIES).forEach((category) => {
      Object.keys(category.skills).forEach((skill) => {
        allSkills.push(skill.toLowerCase())
      })
    })

    // Find skills in the job description
    const foundSkills: string[] = []
    allSkills.forEach((skill) => {
      if (text.toLowerCase().includes(skill.toLowerCase())) {
        // Find the original casing from the SKILL_CATEGORIES
        const originalCasing = Object.values(SKILL_CATEGORIES).reduce((result, category) => {
          const found = Object.keys(category.skills).find((s) => s.toLowerCase() === skill.toLowerCase())
          return found || result
        }, skill)

        foundSkills.push(originalCasing)
      }
    })

    // Add some related skills based on found skills
    const relatedSkills = findRelatedSkills(foundSkills)

    // Combine and deduplicate
    const combined = [...new Set([...foundSkills, ...relatedSkills])]

    setExtractedSkills(combined)
  }

  const findRelatedSkills = (skills: string[]): string[] => {
    // This is a simplified relation finder - in a real app, you'd use a more sophisticated algorithm
    const related: string[] = []

    skills.forEach((skill) => {
      // Find category of this skill
      Object.entries(SKILL_CATEGORIES).forEach(([categoryKey, category]) => {
        if (Object.keys(category.skills).some((s) => s.toLowerCase() === skill.toLowerCase())) {
          // Add 2-3 random skills from the same category
          const categorySkills = Object.keys(category.skills).filter((s) => s.toLowerCase() !== skill.toLowerCase())

          // Get 2-3 random skills
          const randomCount = Math.min(3, categorySkills.length)
          for (let i = 0; i < randomCount; i++) {
            const randomIndex = Math.floor(Math.random() * categorySkills.length)
            related.push(categorySkills[randomIndex])
            // Remove to avoid duplicates
            categorySkills.splice(randomIndex, 1)
          }
        }
      })
    })

    return related
  }

  const updateBooleanQuery = () => {
    if (selectedSkills.length === 0) {
      setBooleanQuery("")
      return
    }

    // Group skills by category for better organization
    const skillsByCategory: Record<string, string[]> = {}

    selectedSkills.forEach((skill) => {
      // Find which category this skill belongs to
      Object.entries(SKILL_CATEGORIES).forEach(([categoryKey, category]) => {
        if (Object.keys(category.skills).includes(skill)) {
          if (!skillsByCategory[categoryKey]) {
            skillsByCategory[categoryKey] = []
          }
          skillsByCategory[categoryKey].push(skill)
        }
      })
    })

    // Build the query with grouped skills
    const queryParts: string[] = []

    Object.entries(skillsByCategory).forEach(([category, skills]) => {
      if (skills.length === 1) {
        queryParts.push(`"${skills[0]}"`)
      } else if (skills.length > 1) {
        const skillsString = skills.map((s) => `"${s}"`).join(" OR ")
        queryParts.push(`(${skillsString})`)
      }
    })

    setBooleanQuery(queryParts.join(" AND "))
  }

  const toggleSkillSelection = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const showSkillDefinition = (skill: string) => {
    // Find the skill definition
    let foundSkill = null
    let foundDescription = ""

    Object.values(SKILL_CATEGORIES).forEach((category) => {
      if (category.skills[skill]) {
        foundSkill = skill
        foundDescription = category.skills[skill]
      }
    })

    if (foundSkill) {
      setCurrentSkill({
        name: foundSkill,
        description: foundDescription,
      })
      setSkillDefinitionOpen(true)
    }
  }

  const handleCopyClick = () => {
    if (textareaRef.current) {
      textareaRef.current.select()
      document.execCommand("copy")
      setIsCopied(true)
      toast({
        title: "Copied!",
        description: "Boolean query copied to clipboard.",
      })
      setTimeout(() => setIsCopied(false), 3000)
    }
  }

  const handleExampleDialogOpen = () => {
    setIsExampleDialogOpen(true)
  }

  const handleExampleDialogClose = () => {
    setIsExampleDialogOpen(false)
  }

  const handleSkillCategoriesDialogOpen = () => {
    setIsSkillCategoriesDialogOpen(true)
  }

  const handleSkillCategoriesDialogClose = () => {
    setIsSkillCategoriesDialogOpen(false)
  }

  const handleVisaTypesDialogOpen = () => {
    setIsVisaTypesDialogOpen(true)
  }

  const handleVisaTypesDialogClose = () => {
    setIsVisaTypesDialogOpen(false)
  }

  const handleUSStatesDialogOpen = () => {
    setIsUSStatesDialogOpen(true)
  }

  const handleUSStatesDialogClose = () => {
    setIsUSStatesDialogOpen(false)
  }

  const handleTabChange = (value: string) => {
    setSelectedTab(value)
  }

  const toggleSkill = (skill: string) => {
    if (expandedSkills.includes(skill)) {
      setExpandedSkills(expandedSkills.filter((s) => s !== skill))
    } else {
      setExpandedSkills([...expandedSkills, skill])
    }
  }

  const toggleVisaType = (visaType: string) => {
    if (expandedVisaTypes.includes(visaType)) {
      setExpandedVisaTypes(expandedVisaTypes.filter((v) => v !== visaType))
    } else {
      setExpandedVisaTypes([...expandedVisaTypes, visaType])
    }
  }

  const toggleUSState = (usState: string) => {
    if (expandedUSStates.includes(usState)) {
      setExpandedUSStates(expandedUSStates.filter((u) => u !== usState))
    } else {
      setExpandedUSStates([...expandedUSStates, usState])
    }
  }

  const handleStateClick = (stateCode: string) => {
    setSelectedState(stateCode)
    setStateDetails(US_STATES[stateCode])
    setShowStateDetailsDialog(true)
  }

  const handleCloseStateDetailsDialog = () => {
    setShowStateDetailsDialog(false)
    setSelectedState(null)
    setStateDetails(null)
  }

  const handleWelcomePageClose = () => {
    setShowWelcomePage(false)
    setShowUSMap(true)
  }

  const handleShowStateList = () => {
    setShowUSMap(false)
    setShowStateList(true)
  }

  const handleBackToMap = () => {
    setShowUSMap(true)
    setShowStateList(false)
  }

  const handleShowVisaList = () => {
    setShowVisaList(true)
  }

  const handleShowSkillList = () => {
    setShowSkillList(true)
  }

  const handleSearch = async () => {
    setIsLoading(true)
    setError(null)
    setResults([])

    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate results based on the boolean query
      const simulatedResults = [
        {
          id: 1,
          title: "Software Engineer",
          description: "A software engineer with experience in React and Node.js.",
        },
        {
          id: 2,
          title: "Data Scientist",
          description: "A data scientist with experience in Python and machine learning.",
        },
      ]

      setResults(simulatedResults)
    } catch (err: any) {
      setError(err.message || "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const filteredSkills =
    skillCategoryFilter === "all"
      ? SKILL_CATEGORIES
      : Object.fromEntries(Object.entries(SKILL_CATEGORIES).filter(([category]) => category === skillCategoryFilter))

  const filteredVisaTypes =
    visaTypeFilter === "all"
      ? US_VISA_TYPES
      : Object.fromEntries(Object.entries(US_VISA_TYPES).filter(([visaType]) => visaType === visaTypeFilter))

  const filteredUSStates =
    usStateFilter === "all"
      ? US_STATES
      : Object.fromEntries(Object.entries(US_STATES).filter(([usState]) => usState === usStateFilter))

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full mx-auto mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Boolean Search Generator</CardTitle>
          <CardDescription>
            Generate boolean search queries for finding candidates with specific skills, visa types, and locations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Job Description</h3>
              <Textarea
                placeholder="Paste job description here to extract skills..."
                className="min-h-[150px]"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            {extractedSkills.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Extracted Skills</h3>
                <p className="text-sm text-slate-500 mb-3">
                  Click on a skill to add it to your search query. Click the info icon to see the skill definition.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {extractedSkills.map((skill) => (
                    <div key={skill} className="flex items-center">
                      <Badge
                        variant={selectedSkills.includes(skill) ? "default" : "outline"}
                        className="cursor-pointer flex items-center gap-1"
                        onClick={() => toggleSkillSelection(skill)}
                      >
                        {selectedSkills.includes(skill) ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                        {skill}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 ml-1"
                        onClick={() => showSkillDefinition(skill)}
                      >
                        <Info className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedSkills.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Selected Skills</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedSkills.map((skill) => (
                    <Badge key={skill} variant="default" className="cursor-pointer">
                      {skill}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-5 w-5 p-0 ml-1"
                        onClick={() => toggleSkillSelection(skill)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label htmlFor="booleanQuery" className="block text-sm font-medium mb-1">
                Boolean Query
              </label>
              <div className="flex space-x-2">
                <textarea
                  id="booleanQuery"
                  ref={textareaRef}
                  value={booleanQuery}
                  onChange={(e) => setBooleanQuery(e.target.value)}
                  className="flex-1 min-h-[100px] p-2 border rounded-md"
                  placeholder='Example: ("React" OR "Angular") AND ("Node.js" OR "Express") AND "JavaScript"'
                />
                <Button onClick={handleCopyClick} className="self-start">
                  {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? "Searching..." : <Search className="h-4 w-4 mr-2" />}
                Search
              </Button>
              <Button variant="outline" onClick={handleExampleDialogOpen}>
                View Examples
              </Button>
              <Button variant="outline" onClick={handleSkillCategoriesDialogOpen}>
                Browse Skills
              </Button>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            {results.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Results</h3>
                <div className="space-y-2">
                  {results.map((result) => (
                    <div key={result.id} className="border p-2 rounded-md">
                      <h4 className="font-medium">{result.title}</h4>
                      <p className="text-sm">{result.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Skill Definition Dialog */}
      <Dialog open={skillDefinitionOpen} onOpenChange={setSkillDefinitionOpen}>
        <DialogContent className="max-w-md">
          {currentSkill && (
            <>
              <DialogHeader>
                <DialogTitle>{currentSkill.name}</DialogTitle>
                <DialogDescription>Skill Definition</DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <p>{currentSkill.description}</p>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={() => {
                    if (currentSkill) {
                      toggleSkillSelection(currentSkill.name)
                    }
                    setSkillDefinitionOpen(false)
                  }}
                >
                  {selectedSkills.includes(currentSkill.name) ? "Remove from Query" : "Add to Query"}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Example Dialog */}
      <Dialog open={isExampleDialogOpen} onOpenChange={handleExampleDialogClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Boolean Search Examples</DialogTitle>
            <DialogDescription>Here are some examples of boolean search queries you can use.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Basic Boolean Operators</h3>
              <ul className="list-disc pl-5 text-sm">
                <li>AND: Requires both terms to be present</li>
                <li>OR: Requires either term to be present</li>
                <li>NOT: Excludes a term</li>
                <li>Parentheses: Group terms together</li>
                <li>Quotes: Search for exact phrases</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Example Queries</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Frontend Developer:</span> ("React" OR "Angular" OR "Vue") AND
                  "JavaScript" AND ("CSS" OR "SCSS" OR "Tailwind")
                </p>
                <p>
                  <span className="font-medium">Backend Developer:</span> ("Node.js" OR "Python" OR "Java") AND ("API"
                  OR "REST") AND ("SQL" OR "NoSQL")
                </p>
                <p>
                  <span className="font-medium">DevOps Engineer:</span> ("AWS" OR "Azure" OR "GCP") AND ("Docker" OR
                  "Kubernetes") AND ("CI/CD" OR "Jenkins" OR "GitHub Actions")
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BooleanSearchEnhanced
