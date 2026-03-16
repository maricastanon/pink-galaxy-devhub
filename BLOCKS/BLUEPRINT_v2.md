# 🌸 THE PINK GALAXY PLATFORM — MASTER BLUEPRINT v2.0
## Your Lifelong Learning & Development Operating System
### Designed for AWS Amplify · Modular · Infinite Expansion

---

## VISION

This is not a guide. This is not a bible. This is your **personal operating system
for learning and building** — a single web platform that contains everything you need
to master Linux, security, Python, data engineering, cloud architecture, and every
future skill you pursue. It integrates your Arch Linux installation guides, your
BlackArch security arsenal, your developer toolchain documentation, your study notes,
your project management, and your career roadmap — all in one place, all interconnected,
all searchable, all tracked.

The platform grows with you. When you learn Rust next year, you add a Rust universe.
When you start a Kubernetes certification, you add a K8s track. The architecture
supports infinite expansion without restructuring.

---

## ARCHITECTURE — AWS AMPLIFY DEPLOYMENT

```
┌─────────────────────────────────────────────────────────────────┐
│                        AWS AMPLIFY                               │
│  Frontend: S3 + CloudFront CDN (global edge caching)            │
│  Auth: Cognito (email/social login)                              │
│  API: API Gateway + Lambda (Node.js / Python)                    │
│  Data: DynamoDB (user state, progress, notebooks)                │
│  Storage: S3 (module content, images, exports)                   │
│  Search: OpenSearch Serverless (full-text across all content)    │
│  CI/CD: Amplify auto-deploy from GitHub on push                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  /                                                               │
│  ├── index.html              ← Platform shell (SPA router)      │
│  ├── css/theme.css           ← Pink Galaxy theme variables       │
│  ├── js/                                                         │
│  │   ├── engine.js           ← Core: views, navigation, state   │
│  │   ├── modules.js          ← Module loader (fetches from S3)  │
│  │   ├── mindmap.js          ← All 10 visualization types       │
│  │   ├── search.js           ← Search engine + filters          │
│  │   ├── notebook.js         ← Learning notebook + highlights   │
│  │   ├── gamification.js     ← XP, badges, streaks, levels      │
│  │   ├── postits.js          ← Sticky notes system              │
│  │   ├── glossary.js         ← Term popup system                │
│  │   └── accessibility.js    ← ND-friendly features             │
│  │                                                               │
│  ├── content/                ← S3 bucket: module content         │
│  │   ├── universes.json      ← Registry of all universes        │
│  │   ├── glossary.json       ← Global term definitions          │
│  │   │                                                           │
│  │   ├── ARCH/               ← Universe: Arch Linux              │
│  │   │   ├── universe.json   ← Universe metadata + track list   │
│  │   │   ├── tracks/                                             │
│  │   │   │   ├── installation.json  ← Track: Parts 1-4 guides  │
│  │   │   │   ├── commands.json      ← Track: Linux commands     │
│  │   │   │   └── maintenance.json   ← Track: Sysadmin           │
│  │   │   └── modules/                                            │
│  │   │       ├── ARCH-M01.json  ← Individual module content     │
│  │   │       ├── ARCH-M02.json                                   │
│  │   │       └── ...                                             │
│  │   │                                                           │
│  │   ├── BLACKARCH/          ← Universe: Security & Hacking      │
│  │   │   ├── universe.json                                       │
│  │   │   ├── tracks/                                             │
│  │   │   │   ├── foundations.json                                │
│  │   │   │   ├── offensive.json                                  │
│  │   │   │   ├── defensive.json                                  │
│  │   │   │   └── ctf.json                                        │
│  │   │   └── modules/                                            │
│  │   │       ├── SEC-M01.json ... SEC-M20.json                   │
│  │   │                                                           │
│  │   ├── PYTHON/             ← Universe: Python & Data Eng       │
│  │   │   ├── universe.json                                       │
│  │   │   ├── tracks/                                             │
│  │   │   │   ├── fundamentals.json                               │
│  │   │   │   ├── data-engineering.json                           │
│  │   │   │   ├── web-development.json                            │
│  │   │   │   └── automation.json                                 │
│  │   │   └── modules/                                            │
│  │   │       ├── PY-M01.json ... PY-M25.json                    │
│  │   │                                                           │
│  │   ├── BASH/               ← Universe: Shell & Scripting       │
│  │   │   └── ...                                                 │
│  │   │                                                           │
│  │   ├── CLOUD/              ← Universe: AWS + Azure + GCP       │
│  │   │   └── ...                                                 │
│  │   │                                                           │
│  │   └── GUIDES/             ← Universe: Installation Guides     │
│  │       ├── universe.json                                       │
│  │       └── modules/                                            │
│  │           ├── GUIDE-PART1.json  (your existing Part 1)        │
│  │           ├── GUIDE-PART2.json  (Part 2)                      │
│  │           ├── GUIDE-PART3.json  (Part 3)                      │
│  │           ├── GUIDE-PART4.json  (Part 4)                      │
│  │           ├── GUIDE-TOOLS.json  (tools manifest)              │
│  │           └── GUIDE-BIOS.json   (BIOS checklist)              │
│  │                                                               │
│  └── api/                    ← Lambda functions                  │
│      ├── saveState.js                                            │
│      ├── loadState.js                                            │
│      ├── search.js                                               │
│      ├── exportNotebook.js                                       │
│      └── syncProgress.js                                         │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│  DynamoDB Tables:                                                │
│  ├── Users          (userId, email, displayName, createdAt)      │
│  ├── UserProgress   (userId, moduleId, sectionsDone, xp, stars) │
│  ├── UserNotebooks  (userId, notebookId, title, entries[])       │
│  ├── UserPostits    (userId, postitId, moduleId, position, text)│
│  ├── UserHighlights (userId, highlightId, moduleId, text, note) │
│  └── Glossary       (termId, term, definition, category)         │
└─────────────────────────────────────────────────────────────────┘
```

### OFFLINE-FIRST STRATEGY (Current Phase)

Until Amplify is deployed, the platform runs as a single HTML file:
- All module content is embedded inline (inside `data-module-id` divs)
- State is stored in localStorage + Save Snapshot (embeds into HTML)
- No network dependency — works on airplane mode
- Migration: extract inline content → JSON files in S3, swap localStorage → DynamoDB

---

## THE CONTENT UNIVERSE MAP

The platform organizes knowledge into **Universes** (major domains), each containing
**Tracks** (learning paths), each containing **Modules** (topics), each containing
**Sections** (lessons). This hierarchy supports infinite expansion.

### UNIVERSE 1: ARCH LINUX (Prefix: ARCH-)
*From zero to a fully configured, personalized system*

```
Track 1.1 — Installation (Integrates existing Parts 1-4)
  ARCH-INST-01  BIOS Setup & Dell Anonymization     ← from Part 1, Ch 0
  ARCH-INST-02  Creating Bootable USB                ← from Part 1, Ch 1
  ARCH-INST-03  Secure Disk Wiping                   ← from Part 1, Ch 2
  ARCH-INST-04  Live Environment & Wi-Fi             ← from Part 1, Ch 3
  ARCH-INST-05  Partitioning & Filesystems           ← from Part 1, Ch 4
  ARCH-INST-06  Base System (pacstrap)               ← from Part 1, Ch 5
  ARCH-INST-07  System Configuration                 ← from Part 1, Ch 6
  ARCH-INST-08  Post-Install Essentials              ← from Part 1, Ch 7
  ARCH-INST-09  Hyprland & Desktop                   ← from Part 2, Ch 8
  ARCH-INST-10  Terminal & Shell Setup               ← from Part 2, Ch 9
  ARCH-INST-11  Audio, BT & Peripherals             ← from Part 2, Ch 10
  ARCH-INST-12  Developer Environment                ← from Part 3, Ch 11
  ARCH-INST-13  Cloud Tools Setup                    ← from Part 3, Ch 12
  ARCH-INST-14  BlackArch Repository                 ← from Part 3, Ch 13
  ARCH-INST-15  Pink Galaxy Rice                     ← from Part 4, Ch 14
  ARCH-INST-16  System Hardening                     ← from Part 4, Ch 15
  ARCH-INST-17  Backups                              ← from Part 4, Ch 16
  ARCH-INST-18  Maintenance                          ← from Part 4, Ch 17

Track 1.2 — Linux Commands (Integrates Command Bible)
  ARCH-CMD-01   Navigation & Files
  ARCH-CMD-02   Text Processing
  ARCH-CMD-03   Permissions & Ownership
  ARCH-CMD-04   Process Management
  ARCH-CMD-05   Networking Commands
  ARCH-CMD-06   Package Management
  ARCH-CMD-07   Disk & Storage
  ARCH-CMD-08   Archiving & Compression
  ARCH-CMD-09   System Information
  ARCH-CMD-10   Advanced Utilities

Track 1.3 — System Administration
  ARCH-ADM-01   User & Group Management
  ARCH-ADM-02   Service Management (systemd)
  ARCH-ADM-03   Log Management (journalctl)
  ARCH-ADM-04   Kernel Management
  ARCH-ADM-05   Performance Tuning
  ARCH-ADM-06   Troubleshooting Methodology
```

### UNIVERSE 2: BASH & SCRIPTING (Prefix: BASH-)
*From first script to production automation*

```
Track 2.1 — Fundamentals
  BASH-F01   Your First Script
  BASH-F02   Variables & Data Types
  BASH-F03   Quoting & Expansion
  BASH-F04   Conditionals (if/case/test)
  BASH-F05   Loops (for/while/until)
  BASH-F06   Functions
  BASH-F07   I/O (read/echo/printf/heredoc)
  BASH-F08   Exit Codes & Error Handling
  BASH-F09   Arrays (indexed & associative)
  BASH-F10   String Operations

Track 2.2 — Advanced
  BASH-A01   Parameter Expansion Mastery
  BASH-A02   Regular Expressions
  BASH-A03   Process Substitution
  BASH-A04   Signal Handling & Traps
  BASH-A05   Debugging (set -x, bashdb)
  BASH-A06   Performance Optimization
  BASH-A07   Parallel Execution
  BASH-A08   IPC (pipes, FIFOs, sockets)

Track 2.3 — Real-World Projects
  BASH-P01   System Monitor Dashboard
  BASH-P02   Automated Backup System
  BASH-P03   Log Analyzer
  BASH-P04   Deployment Script
  BASH-P05   Network Scanner (bash-only)
  BASH-P06   File Organizer
  BASH-P07   API Integration Script
  BASH-P08   Database Migration Tool
```

### UNIVERSE 3: PYTHON (Prefix: PY-)
*From basics to data engineering to web development*

```
Track 3.1 — Python Fundamentals
  PY-F01    Setup (pyenv, Poetry, VS Code)
  PY-F02    Data Types & Variables
  PY-F03    Control Flow
  PY-F04    Functions & Decorators
  PY-F05    OOP (Classes, Inheritance, Protocols)
  PY-F06    Error Handling
  PY-F07    Modules & Packages
  PY-F08    File I/O & Context Managers
  PY-F09    Iterators & Generators
  PY-F10    Type Hints & Dataclasses
  PY-F11    Testing (pytest, TDD)
  PY-F12    Async/Await

Track 3.2 — Data Engineering (your specialty!)
  PY-DE01   Polars Fundamentals
  PY-DE02   Polars Advanced (lazy, streaming, plugins)
  PY-DE03   Pandas (for legacy compatibility)
  PY-DE04   PySpark Fundamentals
  PY-DE05   PySpark Advanced (UDFs, optimizations)
  PY-DE06   Delta Lake & Unity Catalog
  PY-DE07   ETL Pipeline Design Patterns
  PY-DE08   Data Quality (Great Expectations, dbt)
  PY-DE09   Databricks Workflows & Jobs
  PY-DE10   Spark↔Arrow↔Polars Bridges
  PY-DE11   Data Validation (Pydantic, pandera)
  PY-DE12   Orchestration (Airflow, Prefect, Dagster)

Track 3.3 — Web Development
  PY-WEB01  FastAPI Fundamentals
  PY-WEB02  FastAPI Advanced (middleware, deps, auth)
  PY-WEB03  SQLAlchemy & Alembic
  PY-WEB04  REST API Design
  PY-WEB05  Authentication & Authorization
  PY-WEB06  WebSockets & Real-time
  PY-WEB07  Background Tasks (Celery, ARQ)
  PY-WEB08  Deployment (Docker, Gunicorn, Nginx)

Track 3.4 — Automation & Tools
  PY-AUTO01  CLI Tools (Click, Typer)
  PY-AUTO02  Web Scraping (requests, BeautifulSoup, Playwright)
  PY-AUTO03  PDF Generation (reportlab, weasyprint)
  PY-AUTO04  Email Automation
  PY-AUTO05  AWS Automation (boto3)
  PY-AUTO06  Azure Automation
  PY-AUTO07  Databricks SDK Automation
```

### UNIVERSE 4: SECURITY & BLACKARCH (Prefix: SEC-)
*Ethical hacking from foundations to advanced*

```
Track 4.1 — Foundations
  SEC-F01   CIA Triad & Threat Modeling
  SEC-F02   MITRE ATT&CK Framework
  SEC-F03   Legal Framework (German law)
  SEC-F04   Lab Environment Setup
  SEC-F05   Methodology (PTES, OWASP)

Track 4.2 — Reconnaissance
  SEC-REC01  OSINT & Passive Recon
  SEC-REC02  nmap Mastery
  SEC-REC03  DNS & Subdomain Enumeration
  SEC-REC04  Web Enumeration
  SEC-REC05  Service Fingerprinting

Track 4.3 — Exploitation
  SEC-EXP01  Web App (OWASP Top 10)
  SEC-EXP02  Burp Suite Mastery
  SEC-EXP03  SQL Injection
  SEC-EXP04  XSS & Client-Side
  SEC-EXP05  Metasploit Framework
  SEC-EXP06  Buffer Overflows
  SEC-EXP07  Privilege Escalation
  SEC-EXP08  Active Directory Attacks
  SEC-EXP09  Wireless Attacks
  SEC-EXP10  Password Attacks

Track 4.4 — Defense & Forensics
  SEC-DEF01  System Hardening
  SEC-DEF02  Intrusion Detection
  SEC-DEF03  Digital Forensics
  SEC-DEF04  Memory Analysis (Volatility)
  SEC-DEF05  Incident Response
  SEC-DEF06  Malware Analysis

Track 4.5 — CTF & Practice
  SEC-CTF01  CTF Strategy
  SEC-CTF02  Web Challenges
  SEC-CTF03  Crypto Challenges
  SEC-CTF04  Binary/Reversing
  SEC-CTF05  Forensics Challenges
  SEC-CTF06  Platforms & Resources
```

### UNIVERSE 5: CLOUD & DEVOPS (Prefix: CLOUD-)
*AWS, Azure, Databricks, Terraform, CI/CD*

```
Track 5.1 — AWS
  CLOUD-AWS01  IAM & Security
  CLOUD-AWS02  S3 & Storage
  CLOUD-AWS03  Lambda & Serverless
  CLOUD-AWS04  DynamoDB
  CLOUD-AWS05  API Gateway
  CLOUD-AWS06  Amplify & Frontend
  CLOUD-AWS07  CDK & CloudFormation
  CLOUD-AWS08  ECS/EKS & Containers
  CLOUD-AWS09  Step Functions
  CLOUD-AWS10  Cost Optimization

Track 5.2 — Azure
  CLOUD-AZ01   Azure Fundamentals
  CLOUD-AZ02   Azure Databricks
  CLOUD-AZ03   Azure Data Factory
  CLOUD-AZ04   Azure Functions
  CLOUD-AZ05   Azure DevOps
  CLOUD-AZ06   AKS (Kubernetes)

Track 5.3 — Databricks
  CLOUD-DB01   Workspace & Notebooks
  CLOUD-DB02   Clusters & Compute
  CLOUD-DB03   Unity Catalog
  CLOUD-DB04   Delta Live Tables
  CLOUD-DB05   Workflows & Jobs
  CLOUD-DB06   MLflow & ML
  CLOUD-DB07   SQL Warehouse
  CLOUD-DB08   dbfs:/ & External Storage

Track 5.4 — DevOps & IaC
  CLOUD-DO01   Git Advanced
  CLOUD-DO02   GitHub Actions
  CLOUD-DO03   Terraform
  CLOUD-DO04   Docker Deep Dive
  CLOUD-DO05   Kubernetes
  CLOUD-DO06   Helm
  CLOUD-DO07   Monitoring (Prometheus/Grafana)
  CLOUD-DO08   CI/CD Pipeline Design
```

### UNIVERSE 6: TOOLS & REFERENCE (Prefix: REF-)
*Quick-access cheatsheets, dotfiles, resources*

```
Track 6.1 — Cheatsheets
  REF-CS01  Bash One-Liners (100+)
  REF-CS02  Regex Reference
  REF-CS03  Vim/Neovim
  REF-CS04  Git
  REF-CS05  nmap
  REF-CS06  Metasploit
  REF-CS07  Docker
  REF-CS08  Kubernetes/kubectl
  REF-CS09  Python Snippets
  REF-CS10  SQL Reference
  REF-CS11  Network Ports
  REF-CS12  HTTP Status Codes
  REF-CS13  Cron Syntax
  REF-CS14  Permissions (chmod table)
  REF-CS15  AWS CLI
  REF-CS16  Azure CLI
  REF-CS17  Databricks CLI

Track 6.2 — Resources & Links
  REF-RES01  Learning Platforms
  REF-RES02  Documentation Sites
  REF-RES03  Security News & Blogs
  REF-RES04  YouTube & Podcasts
  REF-RES05  Communities & Forums
  REF-RES06  Certification Paths
  REF-RES07  GitHub Awesome Lists
  REF-RES08  Free Books & Courses

Track 6.3 — My Setup
  REF-SET01  Dotfiles Repository
  REF-SET02  VS Code Extensions & Settings
  REF-SET03  Hyprland Config
  REF-SET04  Stream Deck Layouts
  REF-SET05  Logitech Configuration
  REF-SET06  Kitty/Zsh/Starship Config
```

### FUTURE UNIVERSES (add when ready)
```
RUST/      — Rust programming language
JS/        — JavaScript/TypeScript + React
SQL/       — SQL mastery + database design
ML/        — Machine Learning + AI
CERT/      — Certification study tracks (OSCP, AWS SA, AZ-900, etc.)
```

---

## MODULE JSON SPECIFICATION v2

Every module across all universes follows this exact schema. Any AI generating
content must produce output matching this structure.

```json
{
  "moduleId": "PY-DE01",
  "universe": "PYTHON",
  "track": "data-engineering",
  "title": "Polars Fundamentals",
  "difficulty": "intermediate",
  "estimatedMinutes": 180,
  "prerequisites": ["PY-F01", "PY-F02", "PY-F05"],
  "xpReward": 150,
  "tags": ["polars", "dataframe", "data-engineering", "rust"],
  "icon": "🐻‍❄️",
  
  "summary": "One sentence that appears on the card in the dashboard.",
  
  "mindmapConnections": ["PY-DE02", "PY-DE03", "PY-DE10"],
  
  "sections": [
    {
      "id": "PY-DE01.1",
      "title": "Why Polars? (Speed, Memory, API)",
      "estimatedMinutes": 15,
      "xpReward": 15,
      
      "simple": {
        "content": "HTML string — layman explanation with analogies",
        "keyTakeaway": "One sentence summary"
      },
      "technical": {
        "content": "HTML string — precise terminology",
        "keyTakeaway": "One sentence summary"
      },
      "deep": {
        "content": "HTML string — algorithmic/CPU/memory level detail",
        "keyTakeaway": "One sentence summary"
      },
      
      "consequenceMap": {
        "do": "What happens when you learn/apply this correctly",
        "dont": "What goes wrong if you skip or misunderstand this"
      },
      
      "codeExamples": [
        {
          "title": "Create a Polars DataFrame",
          "language": "python",
          "code": "import polars as pl\ndf = pl.DataFrame({...})",
          "output": "shape: (3, 2)\n┌─────┬─────┐\n...",
          "explanation": "What this code does and why"
        }
      ],
      
      "quiz": {
        "question": "What makes Polars faster than Pandas?",
        "options": [
          {"text": "It uses Rust under the hood and processes columns in parallel", "correct": true},
          {"text": "It uses more RAM", "correct": false},
          {"text": "It only works with small datasets", "correct": false}
        ],
        "explanation": "Polars leverages Rust's zero-cost abstractions and Apache Arrow's columnar memory format..."
      },
      
      "glossaryTerms": ["dataframe", "columnar-format", "apache-arrow", "lazy-evaluation"],
      "relatedModules": ["PY-DE02", "PY-F10"]
    }
  ]
}
```

---

## MINDMAP VISUALIZATION TYPES (10 total)

The platform supports 10 different visualization modes for the mindmap view,
matching and exceeding the Marex Dynamic capabilities shown in the reference screenshots.

1. **Mind Map** — Classic tree with root → branches → leaves
2. **Network** — Force-directed graph with physics simulation (nodes repel, connections attract)
3. **Flow** — Left-to-right flowchart showing prerequisite chains
4. **Timeline** — Horizontal timeline grouped by difficulty/track
5. **Clusters** — Circular clusters grouped by universe (like Marex screenshot 1)
6. **Tree** — Vertical hierarchy tree
7. **Heatmap** — Grid colored by progress (red=not started → green=complete)
8. **Radial** — Circular layout with center node and spokes
9. **Bubble Pack** — Nested circles (universe → track → module) sized by XP
10. **Sunburst** — Circular segments radiating outward by hierarchy level

Each visualization:
- Shows all modules across all universes
- Color-coded by universe
- Node size proportional to XP reward (bigger = more content)
- Opacity reflects completion (transparent = not started, solid = done)
- Clickable nodes open module detail
- Connections show prerequisite relationships
- Filterable by universe, track, difficulty, completion status

---

## GAMIFICATION SYSTEM

### XP (Experience Points)
- Reading a section: +10 XP
- Completing a quiz: +10 XP (correct answer)
- Completing all sections in a module: +50 XP bonus
- Completing a full track: +200 XP bonus
- Daily visit: +5 XP
- 7-day streak: +50 XP bonus

### Levels
- Level 1: 0 XP (Seedling 🌱)
- Level 5: 500 XP (Sprout 🌿)
- Level 10: 1500 XP (Bloom 🌸)
- Level 20: 5000 XP (Galaxy 🌌)
- Level 30: 10000 XP (Supernova ✨)
- Level 50: 25000 XP (Universe 🪐)

### Badges
- "First Steps" — Complete your first module
- "Polyglot" — Complete modules in 3+ universes
- "Streak Master" — 30-day streak
- "Security Specialist" — Complete all SEC- tracks
- "Data Dragon" — Complete all PY-DE modules
- "Full Stack" — Complete modules in ARCH + PYTHON + CLOUD
- "Arch Wizard" — Complete the entire installation guide track

### Streaks
- Consecutive daily visits tracked
- Streak counter with fire emoji 🔥
- Streak freeze available (1 per week) for rest days

---

## NEURODIVERGENT (ND) DESIGN PRINCIPLES

Every design decision optimizes for ADHD and autism:

1. **NO WALLS OF TEXT** — Content is behind expandable cards. The default view shows
   only titles, summaries, and progress. You choose when to dive deeper.

2. **THREE EXPLANATION LEVELS** — Simple (analogies), Technical (precise), Deep (algorithmic).
   Switch between tabs. Never forced to read content you don't need.

3. **ESTIMATED TIME ON EVERYTHING** — Every section shows "⏱ ~15 min" so you can
   decide if you have the bandwidth right now.

4. **VISUAL PROGRESS EVERYWHERE** — Progress bars, XP counters, completion badges,
   streak counters. Dopamine hits for every small accomplishment.

5. **MULTIPLE ENTRY POINTS** — Dashboard (cards), Mindmap (visual), Search (text),
   Cheatsheets (quick reference). Different brain modes, different interfaces.

6. **FOCUS MODE** — Dims everything except the current section. Reduces visual noise.

7. **READING RULER** — Horizontal highlight bar follows your cursor. Helps track position.

8. **BREAK REMINDERS** — Configurable "take a break" nudge (default: 45 minutes).

9. **DYSLEXIA FONT** — OpenDyslexic toggle.

10. **REDUCED MOTION** — Disables all animations for sensory sensitivity.

11. **KEYBOARD NAVIGATION** — Every action has a keyboard shortcut.

12. **COLOR CODING** — Consistent: pink=primary, green=success, purple=advanced,
    orange=intermediate, yellow=warning, red=danger. Never arbitrary colors.

13. **QUIZZES NOT TESTS** — Interactive multiple-choice with instant feedback and
    explanation. Wrong answers teach, they don't punish.

14. **STICKY POST-ITS** — Externalize thoughts immediately. Minimize to emoji.
    Never lose a fleeting idea.

15. **LEARNING NOTEBOOK** — Capture insights, highlight text, build your own reference.
    Your second brain within the platform.

---

## AI CONTRIBUTOR INSTRUCTIONS v2

When filling in module content, follow this process:

1. **Read this blueprint** — understand the universe, track, and module context
2. **Check the module's prerequisites** — reference them in explanations
3. **Write the three explanation levels for each section:**
   - Simple: Use analogies (cooking, building, transportation). No jargon unless defined.
   - Technical: Correct terminology, precise definitions, practical implications.
   - Deep: CPU operations, memory layout, syscalls, network packets, binary formats.
4. **Write code examples** with EXPECTED OUTPUT for every one
5. **Write a consequence map** — "if you learn this..." / "if you skip this..."
6. **Write a quiz** with 3 options, one correct, with post-answer explanation
7. **Tag all glossary terms** — any word a beginner might not know
8. **Link related modules** — create the knowledge graph connections
9. **Keep sections SHORT** — 15-20 minutes max reading time per section
10. **Use the Pink Galaxy theme colors** in any HTML: pink=#e91e63, green=#2e7d32

### Prompt template for any AI to fill a module:

```
I am building an interactive learning platform called the Pink Galaxy Bible.
Please fill in module [MODULE_ID] following the specification in the attached blueprint.

The module should contain [N] sections as listed in the blueprint.
For EACH section, provide:
1. Three explanation levels (simple/technical/deep) as HTML
2. At least one code example with expected output
3. A consequence map (do vs don't)
4. A 3-option quiz with explanation
5. Glossary terms that should be highlighted

Format the output as a JSON object matching the Module JSON Specification v2.
Use Pink Galaxy theme: pink=#e91e63, green=#2e7d32, dark background=#0a0a12.
Target audience: neurodivergent developer (ADHD/autism) — keep sections short,
use visual aids, provide multiple explanation paths.
```

---

## TOTAL SCOPE

```
Universes:     6 (+ future expansion)
Tracks:        24
Modules:       ~180
Sections:      ~1000
Estimated XP:  ~30,000 total
Cheatsheets:   17
Quizzes:       ~1000
Glossary terms: ~500
```

This is your Pink Galaxy — infinite, growing, always yours. 🌸✨
