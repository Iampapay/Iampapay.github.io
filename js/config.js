/**
 * ============================================================================
 * SUBHADIP BETAL — PORTFOLIO CONFIGURATION (Single Source of Truth)
 * ============================================================================
 * Edit this file to customize personal details, colors, rotating roles,
 * skills, experience, projects, education, services, testimonials, or contact form.
 */
window.PORTFOLIO_CONFIG = {
  meta: {
    siteUrl: "https://iampapay.github.io",
    title: "Subhadip Betal — Associate Software Developer | Laravel & Full-Stack Engineer",
    description: "Portfolio of Subhadip Betal, Associate Software Developer at Arctwist Technology Solutions (Kolkata). Building web apps, REST APIs, eCommerce platforms, and CMS solutions with PHP, Laravel, MySQL, and JavaScript.",
    defaultTheme: "system" // "dark" | "light" | "system"
  },

  personal: {
    name: "Subhadip Betal",
    initials: "SB",
    role: "Associate Software Developer",
    company: "Arctwist Technology Solutions",
    companyLocation: "Rajarhat, Kolkata",
    tenureStart: "Nov 2022",
    statusText: "Available for Full-Stack & Backend Engineering Opportunities",
    rotatingRoles: [
      "Web Developer",
      "Laravel Engineer",
      "API Builder",
      "Full-Stack Problem Solver"
    ],
    summary: "Software developer who builds innovative web solutions, loves collaborating with talented teams, tackling challenging projects and learning emerging technologies.",
    aboutLead: "I am an Associate Software Developer at Arctwist Technology Solutions in Rajarhat, Kolkata (since November 2022), crafting fast, dependable web platforms and database-driven backends.",
    aboutBody: "My work spans the complete web lifecycle—from designing normalized MySQL schemas and building modular Laravel backends to crafting responsive Bootstrap, JavaScript, jQuery, and Ajax front-end experiences. Whether integrating automated WhatsApp Business APIs for student placement alerts or engineering secure multi-step eCommerce checkouts, I focus on clean code, team alignment, and real-world reliability.",
    location: "Kolkata, West Bengal, India",
    email: "subhadipbetal316@gmail.com",
    phone: "7908435173",
    phoneDisplay: "+91 7908435173",
    github: "https://github.com/Iampapay",
    githubUser: "Iampapay",
    linkedin: "https://www.linkedin.com/in/subhadip316",
    linkedinUser: "subhadip316",
    resumePath: "assets/resume.pdf",
    languages: ["Bengali", "English", "Hindi"],
    hobbies: ["Photography", "Table tennis"],
    interests: ["Web development", "Mobile development", "APIs", "Cloud computing"],
    photos: {
      studio: "assets/images/profile-studio.jpg",
      candid: "assets/images/profile-candid.jpg",
      studioLabel: "Studio Portrait • ISO 100 • 50mm f/1.8",
      candidLabel: "Candid Office View • Rajarhat, Kolkata"
    }
  },

  metrics: [
    { target: 3, suffix: "+", decimals: 0, label: "Years in Production", sub: "Since Nov 2022 at Arctwist" },
    { target: 87.9, suffix: "%", decimals: 1, label: "MCA Score", sub: "Calcutta Institute of Technology" },
    { target: 14, suffix: "+", decimals: 0, label: "Core Tech Stack", sub: "Frontend, Backend, DB & DevOps" },
    { target: 3, suffix: "", decimals: 0, label: "Flagship Systems", sub: "CMS, eCommerce & Institute ERP" }
  ],

  skills: {
    frontend: [
      { name: "HTML", level: 95, detail: "Semantic HTML5, SEO & ARIA Accessibility" },
      { name: "CSS", level: 92, detail: "Modern Grid, Flexbox, Variables & Animations" },
      { name: "JavaScript", level: 88, detail: "ES6+, DOM Manipulation & Event Architecture" },
      { name: "Bootstrap", level: 94, detail: "Mobile-First Component Systems & Layouts" },
      { name: "jQuery", level: 92, detail: "Dynamic UI Scripting & Plugin Integration" },
      { name: "Ajax", level: 90, detail: "Asynchronous JSON Requests & Zero-Reload UX" }
    ],
    backend: [
      { name: "PHP", level: 92, detail: "Object-Oriented Server-Side Engineering" },
      { name: "Laravel", level: 94, detail: "MVC, Eloquent ORM, Middleware & Auth" },
      { name: "Composer", level: 88, detail: "PHP Package & Autoloading Management" },
      { name: "MySQL", level: 91, detail: "Relational Modeling, Joins & Query Tuning" }
    ],
    tools: [
      { name: "Git", level: 91, detail: "Branching Strategies, Merging & Version Control" },
      { name: "GitHub", level: 92, detail: "Repositories, Pull Requests & GitHub Pages" },
      { name: "Jira", level: 87, detail: "Agile Sprint Planning, Backlog & Issue Tracking" },
      { name: "Bitbucket", level: 88, detail: "Enterprise Git Repositories & Team Workflows" }
    ],
    soft: [
      { name: "Consistency", icon: "target", desc: "Shipping clean, predictable code across every sprint and milestone." },
      { name: "Communication", icon: "message", desc: "Bridging technical decisions and business goals with clarity." },
      { name: "Leadership", icon: "compass", desc: "Taking end-to-end ownership of features and guiding team workflows." },
      { name: "Teamwork", icon: "users", desc: "Collaborating closely with designers, QA, and fellow engineers." }
    ]
  },

  experience: [
    {
      role: "Associate Software Developer",
      company: "Arctwist Technology Solutions",
      location: "Rajarhat, Kolkata",
      period: "Nov 2022 – Present",
      badge: "Current Position",
      description: "Full-stack development and maintenance of production web applications, eCommerce storefronts, and training management ERPs.",
      bullets: [
        "Architect and build scalable web applications using PHP, Laravel, and MySQL with clean MVC patterns and secure authentication.",
        "Craft responsive user interfaces and real-time interactions using HTML, CSS, Bootstrap, JavaScript, jQuery, and Ajax.",
        "Design and consume RESTful APIs, including integrating WhatsApp API workflows for automated student placement notifications.",
        "Collaborate with cross-functional teams using Git, GitHub, Bitbucket, and Jira to plan sprints, review code, and deliver on schedule."
      ],
      tags: ["PHP", "Laravel", "MySQL", "JavaScript", "jQuery", "Ajax", "Bootstrap", "Git", "Jira", "Bitbucket"]
    }
  ],

  projects: [
    {
      id: "byteguide-master",
      title: "ByteGuide-Master",
      subtitle: "Training Institute Management System",
      period: "Jun 2023 – Present",
      categories: ["laravel", "mysql", "live"],
      status: "Live Production",
      description: "Manages faculty, batches, courses and students, and sends placement opportunity messages through an integrated WhatsApp API.",
      highlights: [
        "Centralized management for faculty profiles, course syllabi, batch timetables, and student enrollments.",
        "Integrated WhatsApp API engine that broadcasts targeted placement alerts and interview updates directly to students.",
        "Role-based admin dashboard built with Laravel, MySQL, Bootstrap, and jQuery for fast daily institute operations."
      ],
      stack: ["Bootstrap", "jQuery", "Laravel", "MySQL", "WhatsApp API"],
      repoUrl: null,
      liveUrl: "https://cineteq.in/cineteq/login",
      accent: "#06b6d4",
      mockupType: "institute"
    },
    {
      id: "cartwonders",
      title: "CartWonders",
      subtitle: "Full-Stack eCommerce Application",
      period: "Dec 2022 – Present",
      categories: ["laravel", "mysql", "ecommerce"],
      status: "Open Source Repo",
      description: "An eCommerce app where admins add products and users browse, add to cart, use wishlists and check out securely.",
      highlights: [
        "Admin control panel for managing product catalogs, categories, pricing, stock levels, and customer orders.",
        "Interactive customer storefront featuring instant Ajax add-to-cart, persistent wishlists, and dynamic filtering.",
        "Secure session management and structured MySQL order pipeline built on Laravel."
      ],
      stack: ["Bootstrap", "jQuery", "Laravel", "MySQL"],
      repoUrl: "https://github.com/Iampapay/CartWonders",
      liveUrl: null,
      accent: "#6366f1",
      mockupType: "ecommerce"
    },
    {
      id: "narrativenest",
      title: "NarrativeNest",
      subtitle: "Content Management System (CMS)",
      period: "Apr 2021 – Jun 2021",
      categories: ["php", "mysql", "cms"],
      status: "Open Source Repo",
      description: "A CMS where users create, edit, collaborate on, publish and store articles, blogs and images.",
      highlights: [
        "Multi-user publishing workflow enabling writers to compose, revise, collaborate on, and publish long-form articles.",
        "Built-in media manager for uploading, storing, and embedding images across blog posts.",
        "Custom PHP and MySQL backend with jQuery interactivity and responsive HTML/CSS reader templates."
      ],
      stack: ["HTML", "CSS", "jQuery", "PHP", "MySQL"],
      repoUrl: "https://github.com/Iampapay/NarrativeNest",
      liveUrl: null,
      accent: "#10b981",
      mockupType: "cms"
    }
  ],

  education: [
    {
      degree: "MCA (Master of Computer Applications)",
      school: "Calcutta Institute of Technology",
      score: 87.9,
      scoreText: "87.9%",
      level: "Postgraduate Degree",
      detail: "Specialized in software engineering, relational database systems, full-stack web architectures, and cloud computing."
    },
    {
      degree: "BCA (Bachelor of Computer Applications)",
      school: "Mahishadal Raj College",
      score: 73.67,
      scoreText: "73.67%",
      level: "Undergraduate Degree",
      detail: "Core foundation in programming, data structures, computer networks, PHP, and database management."
    },
    {
      degree: "Higher Secondary (12th)",
      school: "Mahishadal Raj High School",
      score: 63.2,
      scoreText: "63.2%",
      level: "Higher Secondary Certificate",
      detail: "Senior secondary education with emphasis on analytical problem-solving and computer fundamentals."
    },
    {
      degree: "Secondary (10th)",
      school: "Mahishadal Raj High School",
      score: 69.85,
      scoreText: "69.85%",
      level: "Secondary Certificate",
      detail: "Strong academic foundation in mathematics, science, and languages."
    }
  ],

  services: [
    {
      title: "Web Applications",
      tag: "Full-Stack Engineering",
      description: "Custom, responsive web applications built from the ground up using Laravel, PHP, MySQL, Bootstrap, and modern JavaScript.",
      points: ["MVC Architecture & Clean Code", "Responsive Mobile-First Layouts", "Asynchronous Ajax User Flows"]
    },
    {
      title: "REST APIs & Integrations",
      tag: "Backend & Messaging",
      description: "Reliable RESTful API development and third-party service integrations including automated WhatsApp Business messaging and webhooks.",
      points: ["Structured JSON Endpoints", "WhatsApp API Notification Flows", "Secure Token & Session Auth"]
    },
    {
      title: "E-Commerce Solutions",
      tag: "Online Storefronts",
      description: "Conversion-focused shopping platforms with product catalog management, dynamic carts, wishlists, and secure checkout pipelines.",
      points: ["Dynamic Catalog & Inventory", "Real-Time Cart & Wishlist", "Secure Order Processing"]
    },
    {
      title: "Admin Panels & CMS",
      tag: "Operations & Publishing",
      description: "Role-based enterprise dashboards, training institute ERPs, and collaborative content management systems tailored to team workflows.",
      points: ["Multi-Role Access Control", "Faculty, Batch & Student ERPs", "Optimized MySQL Reporting"]
    }
  ],

  testimonials: [
    {
      quote: "Subhadip brings exceptional consistency to our Laravel and MySQL builds. His WhatsApp API integration on the institute management portal made student placement alerts effortless.",
      name: "Engineering Team Lead",
      role: "Arctwist Technology Solutions • Editable Placeholder",
      project: "ByteGuide-Master ERP"
    },
    {
      quote: "From crafting responsive Bootstrap interfaces to optimizing complex database queries, Subhadip communicates clearly and delivers dependable production code every sprint.",
      name: "Senior Full-Stack Collaborator",
      role: "Product Delivery Team • Editable Placeholder",
      project: "CartWonders eCommerce"
    },
    {
      quote: "A proactive problem solver who genuinely enjoys tackling tough workflows and mentoring teammates through full-stack architectural challenges.",
      name: "Project Coordinator",
      role: "Web Solutions Division • Editable Placeholder",
      project: "Full-Stack Delivery"
    }
  ],

  contact: {
    // Paste your Formspree endpoint below (e.g. "https://formspree.io/f/mxxxxxxx")
    // If left as the placeholder ID, submitting the form validates all fields, shows the animated
    // success state, and offers a 1-click direct email dispatch to subhadipbetal316@gmail.com.
    formspreeUrl: "https://formspree.io/f/your_formspree_id",
    recipientEmail: "subhadipbetal316@gmail.com"
  }
};
