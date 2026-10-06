/**
 * Mesanda Sethumika — Featured Engineering Projects
 * Curated case studies, architectural specifications, and production codebases.
 * Enhanced with thevinuvinan.com visual showcase structure.
 */

const PROJECTS_DATA = [
  {
    id: "mediconnect",
    name: "MediConnect",
    title: "Healthcare Microservices Platform",
    headline: "MediConnect<br>Healthcare Microservices Platform",
    boldLead: "Decoupled 5-tier microservice architecture with Gemini AI triage.",
    tagline: "Decoupled 5-tier microservice architecture with Gemini-powered triage and live telemetry.",
    category: "microservices",
    categoryLabel: "Microservices",
    badge: "Distributed Systems",
    status: "Completed",
    year: "2025",
    featured: true,
    image: "assets/mediconnect-3d-mockup.jpg",
    actionText: "See full project",
    githubUrl: "https://github.com/mesanda456/hospital-frontend-main",
    additionalRepos: [
      { name: "Admin Service", url: "https://github.com/mesanda456/hospital-admin-microservice-master" },
      { name: "Doctor Service", url: "https://github.com/mesanda456/hospital-doctor-service-master" },
      { name: "Patient Service", url: "https://github.com/mesanda456/hospital-patient-microservice-master" },
      { name: "Room Service", url: "https://github.com/mesanda456/hospital-room-service-master" },
      { name: "Appointment Service", url: "https://github.com/mesanda456/hospital-appointment-microservice-master" }
    ],
    skills: ["Spring Boot 3", "Java 17", "React 18", "Docker", "Google Gemini AI", "MySQL", "REST APIs"],
    shortDesc: "An enterprise-grade hospital management platform built on independent Spring Boot microservices with AI symptom assessment and real-time patient queueing.",
    fullDesc: "MediConnect was engineered to eliminate single points of failure common in legacy monolithic hospital systems. The system isolates core hospital domains (Patient Admissions, Staff Scheduling, Room Allocation, and Appointments) into independently scalable Spring Boot microservices backed by dedicated database instances.",
    highlights: [
      "Modular Architecture: 5 decoupled Spring Boot services with dedicated schemas communicating over RESTful contracts.",
      "Intelligent Triage: Integrated Google Gemini 2.0 Flash to analyze incoming symptoms, suggest urgency levels, and prepare clinician intake summaries.",
      "Real-Time Monitoring: React dashboard visualizing ward capacity, doctor availability, and patient queue metrics.",
      "Containerized Workflow: Orchestrated with Docker Compose for seamless local and multi-container cloud deployments."
    ],
    architecture: `[ React 18 Web Client ]
          │ (HTTPS / JSON REST)
          ▼
┌────────────────── API Gateway / Reverse Proxy ──────────────────┐
│                                                                 │
│  ┌──────────────┐   ┌──────────────┐   ┌─────────────────────┐  │
│  │ Patient-MS   │   │  Doctor-MS   │   │   Appointment-MS    │  │
│  │ (Port 8081)  │   │  (Port 8082) │   │   (Port 8083)       │  │
│  └──────┬───────┘   └──────┬───────┘   └──────────┬──────────┘  │
│         ▼                  ▼                      ▼             │
│    [MySQL DB 1]       [MySQL DB 2]           [MySQL DB 3]       │
│                                                                 │
│  ┌──────────────┐   ┌──────────────┐   ┌─────────────────────┐  │
│  │   Room-MS    │   │   Admin-MS   │   │   Gemini AI Engine  │  │
│  │ (Port 8084)  │   │  (Port 8085) │   │ (Clinical Triage)   │  │
│  └──────────────┘   └──────────────┘   └─────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘`,
    linkedinAddUrl: "https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=MediConnect%3A+Distributed+Healthcare+Microservices+Platform&organizationName=GitHub+Open+Source+Projects&issueYear=2025&issueMonth=11&certUrl=https%3A%2F%2Fgithub.com%2Fmesanda456%2Fhospital-frontend-main&certId=GH-MEDICONNECT-2025"
  },
  {
    id: "lingua-flip",
    name: "lingua-flip",
    title: "Spaced Repetition Mobile Flashcards",
    headline: "lingua-flip<br>Spaced Repetition Mobile App",
    boldLead: "Cognitive memory decay algorithm with sub-millisecond offline persistence.",
    tagline: "Cross-platform Flutter application using the SuperMemo SM-2 memory decay algorithm.",
    category: "mobile",
    categoryLabel: "Mobile Apps",
    badge: "Flutter & Algorithms",
    status: "In Development",
    year: "2025",
    featured: true,
    image: "assets/lingua-flip-3d-mockup.jpg",
    actionText: "See full project",
    githubUrl: "https://github.com/mesanda456",
    skills: ["Flutter", "Dart", "Riverpod", "Hive NoSQL", "SuperMemo SM-2", "Mobile UX"],
    shortDesc: "A cross-platform mobile flashcard app that calculates optimal review intervals using cognitive memory decay science with instant offline Hive storage.",
    fullDesc: "Engineered to overcome common retention pitfalls. Instead of naive random repetition, lingua-flip recalculates card ease factors and review dates based on user recall difficulty ratings using the SuperMemo SM-2 mathematical formula.",
    highlights: [
      "SM-2 Algorithm: Dynamic calculation of ease factors (EF) and interval scheduling.",
      "Offline-First: Sub-millisecond read/writes powered by local Hive NoSQL boxes.",
      "State Management: Clean reactive architecture built with Flutter Riverpod."
    ],
    architecture: `[ User Study Action ] ──► [ SM-2 Calculation Engine ] ──► [ Riverpod State ] ──► [ Hive DB ]`,
    linkedinAddUrl: "https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=lingua-flip%3A+SM-2+Spaced+Repetition+Mobile+App&organizationName=Mobile+Application+Development&issueYear=2025&issueMonth=8&certUrl=https%3A%2F%2Fgithub.com%2Fmesanda456&certId=GH-LINGUAFLIP-2025"
  },
  {
    id: "eventpulse",
    name: "EventPulse",
    title: "Interactive Floor-Plan & Event Management Platform",
    headline: "EventPulse<br>Interactive Floor-Plan Platform",
    boldLead: "Dynamic vector floor-plan booking and cashless campus transactions.",
    tagline: "Dynamic vector floor-plan booking and cashless campus event transactions.",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    badge: "Agile Team Project",
    status: "Active",
    year: "2025",
    featured: true,
    image: "assets/eventpulse-mockup.jpg",
    actionText: "See full project",
    githubUrl: "https://github.com/mesanda456",
    skills: ["React.js", "Node.js", "Express.js", "MongoDB Atlas", "HTML5 Canvas", "JWT Auth", "Agile/Scrum"],
    shortDesc: "A collaborative event coordination platform built with a 7-developer agile team featuring real-time interactive booth booking and digital wallet payments.",
    fullDesc: "Built during an intensive university project cycle following 2-week Jira sprints. EventPulse replaces manual booth allocation with an interactive 2D canvas engine that lets exhibitors inspect layout dimensions and book spots with instant confirmation.",
    highlights: [
      "Vector Floorplan Engine: Custom HTML5 Canvas renderer allowing pan, zoom, and live status inspection for event stalls.",
      "Internal Digital Wallet: Tokenized checkout flow for attendee and exhibitor purchases.",
      "Team Engineering: Collaborated with 7 developers using Git branching strategies, issue tracking, and peer reviews.",
      "Role-Based Access: Dedicated portals for event coordinators, exhibitors, and general attendees."
    ],
    architecture: `[ React.js Canvas UI ] ──(REST / WebSocket)──► [ Node.js Express API ]
                                                        ├── Stalls Service
                                                        ├── Wallet Engine
                                                        └── MongoDB Atlas`,
    linkedinAddUrl: "https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=EventPulse%3A+MERN+Interactive+Event+%26+Floor-Plan+Platform&organizationName=Agile+Software+Engineering+Squad&issueYear=2025&issueMonth=10&certUrl=https%3A%2F%2Fgithub.com%2Fmesanda456&certId=GH-EVENTPULSE-AGILE"
  },
  {
    id: "vesak-light",
    name: "Smart WiFi Lighting Controller",
    title: "ESP8266 IoT Web Controller",
    headline: "Smart WiFi Lighting<br>ESP8266 Embedded IoT System",
    boldLead: "Microcontroller-hosted asynchronous web server with isolated relay drivers.",
    tagline: "Microcontroller-hosted asynchronous web server driving multi-channel isolated relays.",
    category: "iot",
    categoryLabel: "Embedded IoT",
    badge: "Hardware & C++",
    status: "Hardware Build",
    year: "2025",
    featured: true,
    image: "assets/smart-iot-mockup.jpg",
    actionText: "See full project",
    githubUrl: "https://github.com/mesanda456/using-ESP8266-and-relay-module-5W-bulb-patterns",
    skills: ["ESP8266", "Embedded C++", "Arduino Core", "Relay Interfacing", "HTTP / WebSockets"],
    shortDesc: "An IoT hardware project that flashes an asynchronous C++ web server onto an ESP8266 to control multi-channel high-voltage light patterns via any browser on local WiFi.",
    fullDesc: "Designed to modernize festive Sri Lankan Vesak lanterns. Combines an optoisolated relay bank with an ESP8266 microcontroller serving a responsive web interface from flash memory with zero external cloud dependencies.",
    highlights: [
      "Embedded Web Server: Asynchronous HTTP server hosted directly in microcontroller flash memory.",
      "Galvanic Isolation: Optoisolated relay circuitry safely switching 230V incandescent light channels.",
      "Pattern State Machine: Configurable lighting sequences including smooth fades, chasing pulses, and strobes.",
      "Local Discovery: Zero-config access via local mDNS/IP for all devices connected to the home WiFi."
    ],
    architecture: `[ Mobile / Desktop Browser ] ──(Local WiFi HTTP)──► [ ESP8266 NodeMCU ]
                                                            ├── GPIO 12 -> Relay 1
                                                            ├── GPIO 13 -> Relay 2
                                                            └── GPIO 14 -> Relay 3`,
    linkedinAddUrl: "https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=Smart+WiFi+Lighting+Controller%3A+ESP8266+IoT+System&organizationName=IoT+Hardware+Engineering&issueYear=2025&issueMonth=5&certUrl=https%3A%2F%2Fgithub.com%2Fmesanda456%2Fusing-ESP8266-and-relay-module-5W-bulb-patterns&certId=GH-VESAK-IOT"
  },
  {
    id: "tea-leaf",
    name: "Tea Leaf Quality Gradifier",
    title: "Computer Vision Agricultural Quality System",
    headline: "Tea Leaf Quality<br>Computer Vision Grading System",
    boldLead: "Deep learning image classification for commercial Ceylon tea leaf grading.",
    tagline: "Deep learning image classification for commercial Ceylon tea leaf grading.",
    category: "ai",
    categoryLabel: "AI & Computer Vision",
    badge: "Machine Learning",
    status: "Completed",
    year: "2025",
    featured: false,
    image: "assets/hero-banner.jpg",
    actionText: "See full project",
    githubUrl: "https://github.com/mesanda456/Tea-Leaf-Quality-Gradifier",
    skills: ["Python", "OpenCV", "TensorFlow", "TypeScript", "Image Processing"],
    shortDesc: "An AI-powered computer vision model that automatically classifies harvested tea leaves into standard commercial grades based on color, texture, and contour.",
    fullDesc: "Developed to assist tea processing factories in Sri Lanka in maintaining export consistency. The system captures leaf samples, applies adaptive preprocessing, and predicts commercial grade rankings with defect indicators.",
    highlights: [
      "Image Preprocessing: Normalization, contour boundary isolation, and color balance correction using OpenCV.",
      "CNN Classification: Deep learning model trained on categorized Sri Lankan tea leaf samples.",
      "Quality Analytics: Generates percentage distributions and batch grade reports for quality assurance teams."
    ],
    architecture: `[ Sample Image Capture ] ──► [ OpenCV Preprocessing ] ──► [ CNN Classifier ] ──► [ Inspection Report ]`,
    linkedinAddUrl: "https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=Tea+Leaf+Quality+Gradifier%3A+AI+Vision+System&organizationName=Applied+AI+Research&issueYear=2025&issueMonth=9&certUrl=https%3A%2F%2Fgithub.com%2Fmesanda456%2FTea-Leaf-Quality-Gradifier&certId=GH-TEALEAF-AI"
  },
  {
    id: "medicine-robot",
    name: "Autonomous Hospital Medicine Robot",
    title: "Ward Delivery & Dispensing Rover",
    headline: "Autonomous Hospital Rover<br>Ward Delivery & Dispensing",
    boldLead: "Autonomous navigation rover with obstacle avoidance and passcode security.",
    tagline: "Autonomous navigation rover with obstacle avoidance, real-time clock, and keypad security.",
    category: "iot",
    categoryLabel: "Robotics",
    badge: "Embedded Systems",
    status: "Hardware Build",
    year: "2025",
    featured: false,
    image: "assets/smart-iot-mockup.jpg",
    actionText: "See full project",
    githubUrl: "https://github.com/mesanda456/Medicine-Delivery-Robot",
    skills: ["Arduino", "Embedded C++", "Ultrasonic Sensors", "RTC DS3231", "Motor Control"],
    shortDesc: "An autonomous mobile robot designed to deliver medications across hospital wards with ultrasonic collision avoidance and keypad-protected compartment access.",
    fullDesc: "Built to assist clinical staff in transferring scheduled doses safely between nursing stations and patient rooms. Incorporates real-time clock tracking, LCD status telemetry, and obstacle avoidance algorithms.",
    highlights: [
      "Obstacle Avoidance: Ultrasonic sensor array calculating dynamic corridor navigation and safe stop buffers.",
      "Time-Locked Dispensing: DS3231 real-time clock tracking medication schedules with acoustic reminders.",
      "Passcode Authentication: Matrix keypad and LCD screen requiring authorized PIN input to unlock the drawer."
    ],
    architecture: `[ Sensors (Ultrasonic + RTC) ] ──► [ Arduino Controller ] ──► [ Motor Driver + Locks ]`,
    linkedinAddUrl: "https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=Autonomous+Hospital+Medicine+Delivery+Robot&organizationName=Robotics+and+Embedded+Systems&issueYear=2025&issueMonth=4&certUrl=https%3A%2F%2Fgithub.com%2Fmesanda456%2FMedicine-Delivery-Robot&certId=GH-MEDROBOT-2025"
  },
  {
    id: "finance-tracker",
    name: "Multi-Engine Personal Finance Tracker",
    title: "Dual-Database Wealth Management System",
    headline: "Personal Finance Tracker<br>Dual-Database Persistence",
    boldLead: "Pluggable Spring Boot persistence layer toggling between SQLite and Oracle DB.",
    tagline: "Pluggable Spring Boot persistence layer toggling between SQLite and Oracle DB.",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    badge: "Spring Boot + React",
    status: "Completed",
    year: "2025",
    featured: false,
    image: "assets/mediconnect-3d-mockup.jpg",
    actionText: "See full project",
    githubUrl: "https://github.com/mesanda456/finance-tracker-frontend-master",
    additionalRepos: [
      { name: "SQLite Backend", url: "https://github.com/mesanda456/finance-tracker-backend-sqlite" },
      { name: "Oracle Backend", url: "https://github.com/mesanda456/finance-tracker-backend-oracle" }
    ],
    skills: ["Java", "Spring Boot", "React.js", "SQLite", "Oracle Database", "REST APIs"],
    shortDesc: "Personal wealth and expense management system featuring pluggable database persistence across local lightweight SQLite and enterprise Oracle Database.",
    fullDesc: "Demonstrates clean separation of concerns in modern backend engineering. The React frontend interacts with standard REST endpoints while the Spring Boot backend can switch between lightweight local SQLite and full Oracle DB without API breakage.",
    highlights: [
      "Dual Persistence: Spring Data JPA abstractions supporting multiple database targets.",
      "Financial Analytics: Visual ledger breakdowns, category expenditure tracking, and monthly metrics.",
      "Responsive Frontend: Clean React interface with data tables and responsive filtering."
    ],
    architecture: `[ React Ledger ] ──(REST)──► [ Spring Boot 3 ] ──► [ SQLite or Oracle Database ]`,
    linkedinAddUrl: "https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=Dual-Engine+Personal+Finance+Tracker&organizationName=Software+Engineering+Projects&issueYear=2025&issueMonth=7&certUrl=https%3A%2F%2Fgithub.com%2Fmesanda456%2Ffinance-tracker-frontend-master&certId=GH-FINANCE-2025"
  },
  {
    id: "pizzamania",
    name: "PizzaMania",
    title: "Native Android Food Ordering App",
    headline: "PizzaMania<br>Native Android Food App",
    boldLead: "Native Java Android application with custom cart management and SQLite.",
    tagline: "Native Java Android application with custom cart management and SQLite storage.",
    category: "mobile",
    categoryLabel: "Mobile Apps",
    badge: "Android Studio",
    status: "Completed",
    year: "2024",
    featured: false,
    image: "assets/lingua-flip-3d-mockup.jpg",
    actionText: "See full project",
    githubUrl: "https://github.com/mesanda456/PizzaMania",
    skills: ["Android SDK", "Java", "XML", "SQLite", "Android Studio"],
    shortDesc: "Native Android food ordering application featuring interactive item customization, cart persistence, and order tracking.",
    fullDesc: "Engineered using native Android SDK components. Features responsive XML layouts, custom RecyclerView adapters, real-time price computation, and persistent local cart state.",
    highlights: [
      "Native Android Architecture: Standard Activity/Fragment lifecycle with clean data flow.",
      "Local Cart Storage: SQLite database maintaining active cart state and previous orders.",
      "Material Design: Clean UI adhering to Google Android design guidelines."
    ],
    architecture: `[ Android XML Views ] ──► [ Activity Controllers ] ──► [ SQLite Database ]`,
    linkedinAddUrl: "https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=PizzaMania%3A+Native+Android+Food+Ordering+App&organizationName=Mobile+Application+Development&issueYear=2025&issueMonth=6&certUrl=https%3A%2F%2Fgithub.com%2Fmesanda456%2FPizzaMania&certId=GH-PIZZAMANIA-2025"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROJECTS_DATA };
}
