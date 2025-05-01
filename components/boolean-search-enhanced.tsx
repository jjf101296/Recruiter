"use client"

import { useState, useEffect, useRef } from "react"
import { useToast } from "@/hooks/use-toast"

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
}

// Define US visa types with descriptions
const US_VISA_TYPES = {
  "H-1B":
    "Specialty occupation visa for professionals in specialized fields requiring theoretical and practical application of highly specialized knowledge.",
  "L-1":
    "Intracompany transferee visa for employees of international companies (L-1A for managers/executives, L-1B for specialized knowledge).",
  "O-1":
    "Extraordinary ability visa for individuals with exceptional abilities in sciences, arts, education, business, or athletics.",
  TN: "NAFTA Professional visa for citizens of Canada and Mexico in specific professional categories.",
  "E-3": "Specialty occupation visa specifically for Australian citizens.",
  "H-1B1": "Free Trade Agreement visa for professionals from Chile and Singapore.",
  "E-1/E-2":
    "Treaty Trader/Investor visas for individuals from countries with commerce and navigation treaties with the US.",
  "EB-1":
    "Employment-based first preference for priority workers (extraordinary ability, outstanding professors/researchers, multinational executives).",
  "EB-2": "Employment-based second preference for professionals with advanced degrees or exceptional ability.",
  "EB-3": "Employment-based third preference for skilled workers, professionals, and other workers.",
  "EB-5": "Immigrant Investor Program visa for those investing significant capital in US businesses.",
  "J-1": "Exchange visitor visa for educational and cultural exchange programs.",
  "F-1": "Student visa for academic studies with Optional Practical Training (OPT) allowing temporary employment.",
  "H-4":
    "Dependent visa for spouses and children of H-1B visa holders, with work authorization eligibility for certain spouses.",
  "L-2":
    "Dependent visa for spouses and children of L-1 visa holders, with work authorization eligibility for spouses.",
  "O-3": "Dependent visa for spouses and children of O-1 visa holders.",
  "H-2B": "Temporary non-agricultural workers visa for seasonal needs.",
  "H-2A": "Temporary agricultural workers visa.",
  "P-1": "Visa for internationally recognized athletes or entertainment groups.",
  "R-1": "Religious worker visa for ministers and religious professionals.",
  "B-1": "Business visitor visa for short-term business activities.",
  "STEM OPT":
    "Extension of F-1 OPT for students with degrees in science, technology, engineering, and mathematics fields.",
  CPT: "Curricular Practical Training for F-1 students as part of their curriculum.",
  EAD: "Employment Authorization Document allowing foreign nationals to work legally in the US.",
  "Green Card": "Permanent resident card granting authorization to live and work in the United States permanently.",
}

// Define US states with detailed information
const US_STATES = {
  AL: {
    name: "Alabama",
    timeZone: "Central Time Zone (CT)",
    topCompanies: ["Regions Financial", "Vulcan Materials", "Encompass Health"],
    demographics: "Population: ~5 million, with growing tech hubs in Birmingham and Huntsville",
    culturalInsights: "Strong southern hospitality culture, aerospace industry presence, and growing biotech sector",
  },
  AK: {
    name: "Alaska",
    timeZone: "Alaska Time Zone (AKT)",
    topCompanies: ["Alaska Air Group", "GCI", "ASRC Energy Services"],
    demographics: "Population: ~730,000, with resource industry concentration",
    culturalInsights:
      "Resource-driven economy, outdoor lifestyle, and unique work schedules due to seasonal daylight variations",
  },
  AZ: {
    name: "Arizona",
    timeZone: "Mountain Time Zone (MT) - Arizona does not observe Daylight Saving Time",
    topCompanies: ["Intel", "Banner Health", "Amazon", "Raytheon Technologies"],
    demographics: "Population: ~7.3 million, with tech hubs in Phoenix and Tucson",
    culturalInsights: "Growing tech ecosystem, retirement destination, and strong aerospace/defense industry presence",
  },
  AR: {
    name: "Arkansas",
    timeZone: "Central Time Zone (CT)",
    topCompanies: ["Walmart", "Tyson Foods", "J.B. Hunt Transport"],
    demographics: "Population: ~3 million, with retail and logistics concentration",
    culturalInsights:
      "Home to world's largest retailer (Walmart), strong logistics industry, and growing startup scene in Northwest Arkansas",
  },
  CA: {
    name: "California",
    timeZone: "Pacific Time Zone (PT)",
    topCompanies: ["Apple", "Google", "Facebook", "Disney", "Netflix", "Salesforce"],
    demographics: "Population: ~39.5 million, with major tech hubs in Silicon Valley, San Francisco, and Los Angeles",
    culturalInsights:
      "Innovation-driven culture, diverse workforce, competitive talent market, and high cost of living",
  },
  CO: {
    name: "Colorado",
    timeZone: "Mountain Time Zone (MT)",
    topCompanies: ["Arrow Electronics", "DaVita", "Ball Corporation", "Palantir Technologies"],
    demographics: "Population: ~5.8 million, with tech concentration in Denver-Boulder corridor",
    culturalInsights: "Outdoor-oriented lifestyle, strong work-life balance culture, and growing tech ecosystem",
  },
  CT: {
    name: "Connecticut",
    timeZone: "Eastern Time Zone (ET)",
    topCompanies: ["General Electric", "Aetna", "United Technologies", "The Hartford"],
    demographics: "Population: ~3.6 million, with finance and insurance industry concentration",
    culturalInsights: "Strong corporate culture, proximity to NYC, and established insurance/finance sectors",
  },
  DE: {
    name: "Delaware",
    timeZone: "Eastern Time Zone (ET)",
    topCompanies: ["DuPont", "ChristianaCare", "Bank of America", "JPMorgan Chase"],
    demographics: "Population: ~990,000, with banking and chemical industry concentration",
    culturalInsights: "Business-friendly environment, strong corporate law expertise, and banking industry presence",
  },
  FL: {
    name: "Florida",
    timeZone: "Eastern Time Zone (ET) / Central Time Zone (CT) in western panhandle",
    topCompanies: ["Publix", "Jabil", "NextEra Energy", "Carnival Corporation"],
    demographics: "Population: ~21.5 million, with tourism, healthcare, and aerospace sectors",
    culturalInsights: "Diverse population, tourism-driven economy, and growing tech hubs in Miami and Orlando",
  },
  GA: {
    name: "Georgia",
    timeZone: "Eastern Time Zone (ET)",
    topCompanies: ["Home Depot", "UPS", "Coca-Cola", "Delta Air Lines"],
    demographics: "Population: ~10.6 million, with major business hub in Atlanta",
    culturalInsights: "Strong corporate presence, film industry growth, and diverse workforce in Atlanta metro area",
  },
  HI: {
    name: "Hawaii",
    timeZone: "Hawaii-Aleutian Time Zone (HAT) - does not observe Daylight Saving Time",
    topCompanies: ["Hawaiian Airlines", "Bank of Hawaii", "Hawaiian Electric Industries"],
    demographics: "Population: ~1.4 million, with tourism and military sectors",
    culturalInsights: "Unique island work culture, emphasis on work-life balance, and multicultural environment",
  },
  ID: {
    name: "Idaho",
    timeZone: "Mountain Time Zone (MT) / Pacific Time Zone (PT) in northern panhandle",
    topCompanies: ["Micron Technology", "Albertsons", "Idaho National Laboratory"],
    demographics: "Population: ~1.8 million, with agriculture and technology sectors",
    culturalInsights: "Growing tech scene in Boise, outdoor-oriented lifestyle, and agricultural heritage",
  },
  IL: {
    name: "Illinois",
    timeZone: "Central Time Zone (CT)",
    topCompanies: ["Boeing", "Walgreens Boots Alliance", "State Farm", "Caterpillar"],
    demographics: "Population: ~12.7 million, with major business center in Chicago",
    culturalInsights: "Strong financial services sector, diverse workforce in Chicago, and midwestern work ethic",
  },
  IN: {
    name: "Indiana",
    timeZone: "Eastern Time Zone (ET) / Central Time Zone (CT) in some western counties",
    topCompanies: ["Eli Lilly", "Cummins", "Anthem", "Steel Dynamics"],
    demographics: "Population: ~6.7 million, with manufacturing and healthcare sectors",
    culturalInsights: "Strong manufacturing heritage, growing life sciences sector, and midwestern values",
  },
  IA: {
    name: "Iowa",
    timeZone: "Central Time Zone (CT)",
    topCompanies: ["Principal Financial", "Collins Aerospace", "Hy-Vee", "John Deere"],
    demographics: "Population: ~3.2 million, with agriculture and insurance sectors",
    culturalInsights: "Strong agricultural focus, insurance industry hub in Des Moines, and education emphasis",
  },
  KS: {
    name: "Kansas",
    timeZone: "Central Time Zone (CT) / Mountain Time Zone (MT) in western counties",
    topCompanies: ["Spirit AeroSystems", "Garmin", "Sprint", "Cargill Meat Solutions"],
    demographics: "Population: ~2.9 million, with agriculture and aerospace sectors",
    culturalInsights: "Aerospace manufacturing hub in Wichita, agricultural heritage, and midwestern work ethic",
  },
  KY: {
    name: "Kentucky",
    timeZone: "Eastern Time Zone (ET) / Central Time Zone (CT) in western portion",
    topCompanies: ["Humana", "Yum! Brands", "Brown-Forman", "Toyota Motor Manufacturing"],
    demographics: "Population: ~4.5 million, with manufacturing and healthcare sectors",
    culturalInsights: "Manufacturing strength, bourbon industry heritage, and southern hospitality",
  },
  LA: {
    name: "Louisiana",
    timeZone: "Central Time Zone (CT)",
    topCompanies: ["Entergy", "CenturyLink", "Ochsner Health System", "Shaw Group"],
    demographics: "Population: ~4.6 million, with energy and tourism sectors",
    culturalInsights: "Unique cultural heritage, energy industry focus, and tourism-influenced economy",
  },
  ME: {
    name: "Maine",
    timeZone: "Eastern Time Zone (ET)",
    topCompanies: ["L.L. Bean", "IDEXX Laboratories", "WEX", "Jackson Laboratory"],
    demographics: "Population: ~1.3 million, with tourism and healthcare sectors",
    culturalInsights: "Strong work ethic, outdoor lifestyle influence, and growing biotech sector",
  },
  MD: {
    name: "Maryland",
    timeZone: "Eastern Time Zone (ET)",
    topCompanies: ["Lockheed Martin", "Marriott International", "Johns Hopkins Health System", "T. Rowe Price"],
    demographics: "Population: ~6.1 million, with government, defense, and biotech sectors",
    culturalInsights: "Proximity to DC, government/defense contractor presence, and strong biotech corridor",
  },
  MA: {
    name: "Massachusetts",
    timeZone: "Eastern Time Zone (ET)",
    topCompanies: ["General Electric", "Raytheon", "Biogen", "Fidelity Investments", "HubSpot"],
    demographics: "Population: ~6.9 million, with education, biotech, and finance sectors",
    culturalInsights: "Innovation ecosystem, strong academic influence, and established biotech/tech sectors",
  },
  MI: {
    name: "Michigan",
    timeZone: "Eastern Time Zone (ET) / Central Time Zone (CT) in western Upper Peninsula",
    topCompanies: ["General Motors", "Ford", "Dow Chemical", "Whirlpool"],
    demographics: "Population: ~10 million, with automotive and manufacturing sectors",
    culturalInsights: "Automotive industry heritage, manufacturing expertise, and growing tech scene in Detroit",
  },
  MN: {
    name: "Minnesota",
    timeZone: "Central Time Zone (CT)",
    topCompanies: ["UnitedHealth Group", "3M", "Target", "Best Buy", "Mayo Clinic"],
    demographics: "Population: ~5.6 million, with healthcare, retail, and manufacturing sectors",
    culturalInsights:
      "Strong healthcare innovation, corporate headquarters presence, and Scandinavian work ethic influence",
  },
  MS: {
    name: "Mississippi",
    timeZone: "Central Time Zone (CT)",
    topCompanies: ["Sanderson Farms", "Ergon", "Ingalls Shipbuilding", "Nissan North America"],
    demographics: "Population: ~3 million, with manufacturing and agriculture sectors",
    culturalInsights: "Manufacturing growth, southern hospitality, and emerging automotive industry",
  },
  MO: {
    name: "Missouri",
    timeZone: "Central Time Zone (CT)",
    topCompanies: ["Centene", "Emerson Electric", "Monsanto", "Cerner", "H&R Block"],
    demographics: "Population: ~6.1 million, with healthcare, agriculture, and financial services sectors",
    culturalInsights: "Diverse economy with both agricultural and urban business centers in St. Louis and Kansas City",
  },
  MT: {
    name: "Montana",
    timeZone: "Mountain Time Zone (MT)",
    topCompanies: ["Glacier Bancorp", "Washington Companies", "Stillwater Mining"],
    demographics: "Population: ~1.1 million, with natural resources and tourism sectors",
    culturalInsights: "Outdoor lifestyle influence, natural resource economy, and growing remote work population",
  },
  NE: {
    name: "Nebraska",
    timeZone: "Central Time Zone (CT) / Mountain Time Zone (MT) in western portion",
    topCompanies: ["Berkshire Hathaway", "Union Pacific", "ConAgra Foods", "Mutual of Omaha"],
    demographics: "Population: ~1.9 million, with agriculture, insurance, and transportation sectors",
    culturalInsights: "Strong work ethic, insurance industry presence, and agricultural heritage",
  },
  NV: {
    name: "Nevada",
    timeZone: "Pacific Time Zone (PT) / Mountain Time Zone (MT) in some eastern areas",
    topCompanies: ["Las Vegas Sands", "MGM Resorts", "Caesars Entertainment", "Switch"],
    demographics: "Population: ~3.1 million, with tourism, gaming, and mining sectors",
    culturalInsights: "Tourism-driven economy, 24/7 work culture in Las Vegas, and growing tech presence in Reno",
  },
  NH: {
    name: "New Hampshire",
    timeZone: "Eastern Time Zone (ET)",
    topCompanies: ["Dartmouth-Hitchcock", "BAE Systems", "Hypertherm", "Timberland"],
    demographics: "Population: ~1.4 million, with healthcare and manufacturing sectors",
    culturalInsights: "Independent work culture, no income tax advantage, and growing tech sector",
  },
  NJ: {
    name: "New Jersey",
    timeZone: "Eastern Time Zone (ET)",
    topCompanies: ["Johnson & Johnson", "Prudential Financial", "Merck", "Honeywell"],
    demographics: "Population: ~9 million, with pharmaceutical, financial services, and telecommunications sectors",
    culturalInsights: "Pharmaceutical industry hub, proximity to NYC, and diverse workforce",
  },
  NM: {
    name: "New Mexico",
    timeZone: "Mountain Time Zone (MT)",
    topCompanies: [
      "Los Alamos National Laboratory",
      "Sandia National Laboratories",
      "Presbyterian Healthcare Services",
    ],
    demographics: "Population: ~2.1 million, with government, energy, and aerospace sectors",
    culturalInsights: "Strong government/defense research presence, cultural diversity, and emerging film industry",
  },
  NY: {
    name: "New York",
    timeZone: "Eastern Time Zone (ET)",
    topCompanies: ["JPMorgan Chase", "IBM", "Citigroup", "Goldman Sachs", "Pfizer", "Google"],
    demographics: "Population: ~19.5 million, with financial services, media, and technology sectors",
    culturalInsights:
      "Fast-paced work environment in NYC, global financial center, competitive talent market, and diverse workforce",
  },
  NC: {
    name: "North Carolina",
    timeZone: "Eastern Time Zone (ET)",
    topCompanies: ["Bank of America", "Duke Energy", "Lowe's", "Epic Games", "Red Hat"],
    demographics: "Population: ~10.5 million, with banking, technology, and research sectors",
    culturalInsights: "Research Triangle innovation hub, banking center in Charlotte, and growing tech ecosystem",
  },
  ND: {
    name: "North Dakota",
    timeZone: "Central Time Zone (CT) / Mountain Time Zone (MT) in southwestern portion",
    topCompanies: ["MDU Resources", "Scheels", "Bobcat Company", "Microsoft (Fargo campus)"],
    demographics: "Population: ~760,000, with energy, agriculture, and technology sectors",
    culturalInsights: "Energy industry focus, agricultural heritage, and strong work ethic",
  },
  OH: {
    name: "Ohio",
    timeZone: "Eastern Time Zone (ET)",
    topCompanies: ["Procter & Gamble", "Kroger", "Progressive", "Cardinal Health", "Nationwide"],
    demographics: "Population: ~11.7 million, with manufacturing, healthcare, and financial services sectors",
    culturalInsights: "Manufacturing heritage, insurance industry presence, and midwestern work values",
  },
  OK: {
    name: "Oklahoma",
    timeZone: "Central Time Zone (CT)",
    topCompanies: ["Devon Energy", "Chesapeake Energy", "Love's Travel Stops", "Paycom"],
    demographics: "Population: ~4 million, with energy, agriculture, and aviation sectors",
    culturalInsights: "Energy industry focus, aerospace sector growth, and Native American cultural influence",
  },
  OR: {
    name: "Oregon",
    timeZone: "Pacific Time Zone (PT) / Mountain Time Zone (MT) in eastern portion",
    topCompanies: ["Nike", "Intel", "Columbia Sportswear", "Dutch Bros Coffee"],
    demographics: "Population: ~4.2 million, with technology, sportswear, and forestry sectors",
    culturalInsights: "Work-life balance focus, outdoor lifestyle, and growing tech scene in Portland",
  },
  PA: {
    name: "Pennsylvania",
    timeZone: "Eastern Time Zone (ET)",
    topCompanies: ["Comcast", "AmerisourceBergen", "Rite Aid", "PNC Financial Services", "Hershey"],
    demographics: "Population: ~12.8 million, with healthcare, manufacturing, and financial services sectors",
    culturalInsights:
      "Manufacturing heritage, healthcare innovation in Pittsburgh, and financial services in Philadelphia",
  },
  RI: {
    name: "Rhode Island",
    timeZone: "Eastern Time Zone (ET)",
    topCompanies: ["CVS Health", "Textron", "Citizens Financial Group", "Hasbro"],
    demographics: "Population: ~1.1 million, with healthcare, education, and manufacturing sectors",
    culturalInsights: "Strong healthcare and education sectors, maritime heritage, and growing tech scene",
  },
  SC: {
    name: "South Carolina",
    timeZone: "Eastern Time Zone (ET)",
    topCompanies: ["Boeing", "BMW Manufacturing", "Michelin", "Sonoco"],
    demographics: "Population: ~5.1 million, with manufacturing, aerospace, and tourism sectors",
    culturalInsights: "Manufacturing growth, automotive industry presence, and southern hospitality",
  },
  SD: {
    name: "South Dakota",
    timeZone: "Central Time Zone (CT) / Mountain Time Zone (MT) in western portion",
    topCompanies: ["Sanford Health", "Citibank", "Black Hills Corporation", "Daktronics"],
    demographics: "Population: ~885,000, with agriculture, financial services, and healthcare sectors",
    culturalInsights:
      "Banking industry presence due to favorable regulations, agricultural heritage, and strong work ethic",
  },
  TN: {
    name: "Tennessee",
    timeZone: "Eastern Time Zone (ET) / Central Time Zone (CT) in middle and western portions",
    topCompanies: ["FedEx", "HCA Healthcare", "Dollar General", "AutoZone", "Nissan North America"],
    demographics: "Population: ~6.9 million, with healthcare, transportation, and automotive sectors",
    culturalInsights: "Music industry influence in Nashville, logistics hub in Memphis, and growing healthcare sector",
  },
  TX: {
    name: "Texas",
    timeZone: "Central Time Zone (CT) / Mountain Time Zone (MT) in western portion",
    topCompanies: ["ExxonMobil", "AT&T", "Dell", "Texas Instruments", "USAA", "Tesla"],
    demographics: "Population: ~29 million, with energy, technology, and healthcare sectors",
    culturalInsights:
      "Business-friendly environment, energy industry heritage, and growing tech hubs in Austin and Dallas",
  },
  UT: {
    name: "Utah",
    timeZone: "Mountain Time Zone (MT)",
    topCompanies: ["Zions Bancorporation", "Qualtrics", "Ancestry.com", "Adobe (Utah campus)", "Pluralsight"],
    demographics: "Population: ~3.2 million, with technology, finance, and healthcare sectors",
    culturalInsights: 'Growing tech scene in "Silicon Slopes", family-oriented work culture, and outdoor lifestyle',
  },
  VT: {
    name: "Vermont",
    timeZone: "Eastern Time Zone (ET)",
    topCompanies: ["Ben & Jerry's", "GlobalFoundries", "Keurig Dr Pepper", "Dealer.com"],
    demographics: "Population: ~624,000, with tourism, manufacturing, and agriculture sectors",
    culturalInsights: "Environmental consciousness, work-life balance focus, and small business entrepreneurship",
  },
  VA: {
    name: "Virginia",
    timeZone: "Eastern Time Zone (ET)",
    topCompanies: ["Capital One", "General Dynamics", "Northrop Grumman", "Booz Allen Hamilton", "Amazon HQ2"],
    demographics: "Population: ~8.5 million, with government, defense, and technology sectors",
    culturalInsights: "Government and defense contractor presence, cybersecurity hub, and growing tech scene",
  },
  WA: {
    name: "Washington",
    timeZone: "Pacific Time Zone (PT)",
    topCompanies: ["Amazon", "Microsoft", "Boeing", "Starbucks", "Costco", "T-Mobile"],
    demographics: "Population: ~7.6 million, with technology, aerospace, and retail sectors",
    culturalInsights: "Tech-driven economy in Seattle, work-life balance focus, and outdoor lifestyle influence",
  },
  WV: {
    name: "West Virginia",
    timeZone: "Eastern Time Zone (ET)",
    topCompanies: ["West Virginia University Medicine", "Mylan Pharmaceuticals", "Toyota Motor Manufacturing"],
    demographics: "Population: ~1.8 million, with energy, healthcare, and manufacturing sectors",
    culturalInsights: "Energy industry heritage, manufacturing growth, and strong community ties",
  },
  WI: {
    name: "Wisconsin",
    timeZone: "Central Time Zone (CT)",
    topCompanies: ["Northwestern Mutual", "Johnson Controls", "Kohl's", "Harley-Davidson", "Epic Systems"],
    demographics: "Population: ~5.8 million, with manufacturing, healthcare, and insurance sectors",
    culturalInsights: "Manufacturing heritage, healthcare IT innovation, and strong work ethic",
  },
  WY: {
    name: "Wyoming",
    timeZone: "Mountain Time Zone (MT)",
    topCompanies: ["Cloud Peak Energy", "Wyoming Medical Center", "Union Wireless"],
    demographics: "Population: ~580,000, with energy, tourism, and agriculture sectors",
    culturalInsights: "Energy industry focus, outdoor lifestyle, and growing remote work population",
  },
  DC: {
    name: "District of Columbia",
    timeZone: "Eastern Time Zone (ET)",
    topCompanies: ["Danaher", "Fannie Mae", "Carlyle Group", "Marriott International (nearby)"],
    demographics: "Population: ~700,000, with government, nonprofit, and professional services sectors",
    culturalInsights: "Government-centric economy, international organizations presence, and highly educated workforce",
  },
}

// Define job platforms with their specific boolean search formats
const SEARCH_PLATFORMS = {
  dice: {
    name: "Dice",
    description: "Tech job board with advanced boolean search capabilities",
    format:
      "Uses standard boolean operators (AND, OR, NOT) with parentheses for grouping. Supports exact phrase matching with quotes.",
    example: '("java developer" OR "javascript developer") AND (react OR angular) NOT junior',
    specialFeatures: "Supports proximity searches with ~N (e.g., 'java ~5 developer' finds terms within 5 words)",
  },
  linkedin: {
    name: "LinkedIn",
    description: "Professional networking platform with job search functionality",
    format: "Uses standard boolean operators (AND, OR, NOT, parentheses). Supports quotes for exact phrases.",
    example: '("product manager" OR "program manager") AND (agile OR scrum) NOT intern',
    specialFeatures: "Supports company-specific searches with 'company:' and title-specific searches with 'title:'",
  },
  indeed: {
    name: "Indeed",
    description: "General job board with simple boolean search",
    format: "Uses standard boolean operators. Quotes for exact phrases. Use site: for specific domains.",
    example: '"software engineer" AND (python OR javascript) NOT entry level',
    specialFeatures: "Supports location-specific searches and salary filters",
  },
  monster: {
    name: "Monster",
    description: "General job board with boolean search capabilities",
    format: "Uses standard boolean operators. Supports quotes for exact phrases.",
    example: '"data analyst" AND (SQL OR tableau) NOT junior',
    specialFeatures: "Supports wildcards with * for partial word matches",
  },
  careerbuilder: {
    name: "CareerBuilder",
    description: "General job board with boolean search",
    format: "Uses standard boolean operators. Supports quotes for exact phrases.",
    example: '"marketing manager" AND (digital OR social) NOT assistant',
    specialFeatures: "Supports proximity searches with NEAR operator",
  },
  glassdoor: {
    name: "Glassdoor",
    description: "Job board with company reviews and boolean search",
    format: "Uses standard boolean operators. Supports quotes for exact phrases.",
    example: '"software developer" AND (java OR python) NOT intern',
    specialFeatures: "Integrates company ratings and salary information",
  },
  ziprecruiter: {
    name: "ZipRecruiter",
    description: "Job marketplace with boolean search capabilities",
    format: "Uses standard boolean operators. Supports quotes for exact phrases.",
    example: '"customer service" AND (healthcare OR medical) NOT sales',
    specialFeatures: "AI-powered job matching technology",
  },
}

// Function to count skill occurrences in text
const countSkillOccurrences = (text, skills) => {
  const results = {}
  const lowerText = text.toLowerCase()

  Object.entries(skills).forEach(([category, data]) => {
    Object.keys(data.skills).forEach((skill) => {
      const skillLower = skill.toLowerCase()
      // Handle special characters in skill names for regex
      const escapedSkill = skillLower.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

      // Create regex to find whole word matches
      const regex = new RegExp(`\\b${escapedSkill}\\b`, "gi")
      const matches = lowerText.match(regex) || []

      if (matches.length > 0) {
        results[skill] = {
          count: matches.length,
          category: category,
          description: data.skills[skill],
        }
      }
    })
  })

  return results
}

export default function BooleanSearchEnhanced() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [jobDescriptionFile, setJobDescriptionFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [highlightedJD, setHighlightedJD] = useState("");
  const [extractedSkills, setExtractedSkills] = useState([]);
  const [booleanStrings, setBooleanStrings] = useState({
    dice: "",
    linkedin: "",
    indeed: "",
    custom: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(null);
  const [activeTab, setActiveTab] = useState("jd-text");
  const [resumeTab, setResumeTab] = useState("resume-text");
  const [jobType, setJobType] = useState("");
  const [searchComplexity, setSearchComplexity] = useState("medium");
  const [selectedPlatform, setSelectedPlatform] = useState("dice");
  const [showUSMap, setShowUSMap] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [showVisaInfo, setShowVisaInfo] = useState(false);
  const [atsResults, setAtsResults] = useState(null);
  const [skillFrequency, setSkillFrequency] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const { toast } = useToast();
  const jdContentRef = useRef(null);

  // Handle file uploads
  const handleJobDescriptionUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setJobDescriptionFile(e.target.files[0]);

      // Read the file content
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const content = event.target.result;
          setJobDescription(content);
        }
      };
      reader.readAsText(e.target.files[0]);

      toast({
        title: "Job Description Uploaded",
        description: `File: ${e.target.files[0].name}`,
      });
    }
  };

  const handleResumeUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);

      // Read the file content
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const content = event.target.result;
          setResumeText(content);
        }
      };
      reader.readAsText(e.target.files[0]);

      toast({
        title: "Resume Uploaded",
        description: `File: ${e.target.files[0].name}`,
      });
    }
  };

  // Process job description when it changes
  useEffect(() => {
    if (jobDescription) {
      highlightJobDescription(jobDescription);
      detectJobType(jobDescription);
      
      // Count skill occurrences
      const skillCounts = {};
      Object.entries(SKILL_CATEGORIES).forEach(([category, data]) => {
        Object.keys(data.skills).forEach(skill => {
          const regex = new RegExp(`\\b${skill}\\b`, 'gi');
          const matches = jobDescription.match(regex) || [];
          if (matches.length > 0) {
            skillCounts[skill] = {
              count: matches.length,
              category: category,
              description: data.skills[skill]
            };
          }
        });
      });
      setSkillFrequency(skillCounts);
    }
  }, [jobDescription]);

  // Detect job type from job description
  const detectJobType = (text) => {
    const lowerText = text.toLowerCase();
    
    // Define job type patterns
    const jobTypePatterns = {
      "software developer": [
        "software developer", "software engineer", "web developer", "full stack", "frontend", "backend", 
        "javascript developer", "python developer", "java developer", "react developer", "angular developer"
      ],
      "data scientist": [
        "data scientist", "machine learning", "data analyst", "ai engineer", "ml engineer", "data engineer",
        "analytics", "big data", "statistical analysis", "predictive modeling"
      ],
      "network engineer": [
        "network engineer", "network administrator", "network architect", "cisco", "juniper", "routing",
        "switching", "network security", "network infrastructure", "ccna", "ccnp"
      ],
      "cyber security": [
        "security engineer", "security analyst", "cybersecurity", "information security", "security operations",
        "soc analyst", "penetration tester", "ethical hacker", "security consultant", "cissp"
      ],
      "devops engineer": [
        "devops engineer", "site reliability", "platform engineer", "cloud engineer", "infrastructure engineer",
        "ci/cd", "kubernetes", "docker", "aws", "azure", "gcp", "terraform", "ansible"
      ],
      "product manager": [
        "product manager", "product owner", "program manager", "scrum master", "agile coach",
        "product development", "product strategy", "roadmap", "user stories", "backlog"
      ],
      "ux designer": [
        "ux designer", "ui designer", "user experience", "user interface", "interaction designer",
        "ux researcher", "usability", "wireframing", "prototyping", "user-centered design"
      ],
      "marketing specialist": [
        "marketing specialist", "digital marketing", "seo specialist", "content marketing", "social media",
        "marketing manager", "brand manager", "growth hacker", "marketing strategist", "campaign manager"
      ],
      "sales representative": [
        "sales representative", "account executive", "business development", "sales manager", "account manager",
        "sales director", "customer success", "client relationship", "territory manager", "sales consultant"
      ],
      "project manager": [
        "project manager", "project coordinator", "project lead", "program director", "pmp",
        "project planning", "project delivery", "prince2", "project lifecycle", "project governance"
      ]
    };

    // Check for job type keywords
    for (const [type, patterns] of Object.entries(jobTypePatterns)) {
      for (const pattern of patterns) {
        if (lowerText.includes(pattern)) {
          setJobType(type);
          return;
        }
      }
    }

    setJobType("");
  };

  // Highlight job description with HTML spans for different categories
  const highlightJobDescription = (text) => {
    // Define regex patterns for different elements
    const yearsPattern = /\b([0-9]+[+]?)\s*(years?|yrs?)\b|\b([0-9]+[+]?)\s*\+\s*(years?|yrs?)\b/gi;
    const certificationPattern = /\b(certification|certified|certificate|AWS|Azure|GCP|PMP|CISSP|CISM|CISA|ITIL|Scrum|CSM|CSPO|CSD|SAFe|CompTIA|MCSE|CCNA|CCNP|CCIE|CEH|OS
