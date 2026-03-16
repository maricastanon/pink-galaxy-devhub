/**
 * Pink Galaxy Bible v2 — 19 Building Blocks Data
 * Complete content from all delivered bricks
 */

const PINK_GALAXY_BRICKS = {
  // ========== BASH FUNDAMENTALS (8 BRICKS) ==========
  
  'BASH-F01': {
    id: 'BASH-F01',
    title: 'Your First Script',
    universe: 'bash',
    difficulty: 'beg',
    volume: 1,
    sections: 3,
    description: 'Learn the fundamentals of bash scripting with your very first executable script.',
    tags: ['basics', 'scripting', 'executable'],
    xpReward: 45,
    completedSections: ['What is a Script?', 'Script Structure', 'Writing Your First Script'],
    brickContent: {
      summary: 'The foundation platform with complete BASH-F01 implementation including Section 0 and Section 2 fully built as gold-standard templates.',
      features: [
        'Two sections with all three explanation tabs (Simple/Technical/Deep)',
        'Consequence maps and interactive quizzes with instant feedback',
        'Code examples with colored syntax and expected output',
        '+15 XP per section completion, +10 XP per correct quiz answer'
      ]
    }
  },

  'BASH-F02': {
    id: 'BASH-F02',
    title: 'Variables & Data Types',
    universe: 'bash',
    difficulty: 'beg',
    volume: 1,
    sections: 7,
    description: 'Master variable assignment, strings, integers, arrays, and scope in bash.',
    tags: ['variables', 'arrays', 'scope'],
    xpReward: 105,
    completedSections: [
      'Variable Assignment', 
      'Strings', 
      'Integers & Arithmetic', 
      'Arrays', 
      'Environment Variables', 
      'Scope', 
      'Practice'
    ],
    brickContent: {
      summary: 'Complete BASH-F02 module covering the critical no-spaces rule, command substitution, string operations, arithmetic, arrays, and scope.',
      features: [
        'Critical variable assignment rule: no spaces around = sign',
        'String operations: length, substrings, search/replace, case conversion',
        'Integer arithmetic with $(( )) and floating-point workarounds',
        'Indexed and associative arrays with complete syntax',
        'Environment variables and the export command',
        'Local variable scope and the leaked-variable bug prevention'
      ],
      practiceExercises: [
        'Easy: Store and print variables',
        'Medium: Associative array of BlackArch tools',
        'Hard: Parse file paths using only parameter expansion'
      ]
    }
  },

  'BASH-F03': {
    id: 'BASH-F03',
    title: 'Quoting & Expansion',
    universe: 'bash',
    difficulty: 'int',
    volume: 1,
    sections: 6,
    description: 'Understand quoting rules, parameter expansion, and brace expansion.',
    tags: ['quoting', 'expansion', 'parameters'],
    xpReward: 90,
    completedSections: [
      'Single vs Double Quotes',
      'Parameter Expansion',
      'Command Substitution', 
      'Brace Expansion',
      'Pathname Expansion',
      'Practice'
    ],
    brickContent: {
      summary: 'Master quoting and expansion mechanisms in bash.',
      keyLearnings: [
        'Single quotes preserve everything literally',
        'Double quotes allow variable and command expansion',
        'Parameter expansion patterns for string manipulation',
        'Brace expansion for generating sequences and combinations'
      ]
    }
  },

  'BASH-F04': {
    id: 'BASH-F04',
    title: 'Conditionals',
    universe: 'bash',
    difficulty: 'int',
    volume: 1,
    sections: 6,
    description: 'Learn if/elif/else, test operators, and case statements.',
    tags: ['conditionals', 'testing', 'logic'],
    xpReward: 90,
    completedSections: [
      'if/elif/else',
      'test and operators',
      '[[ ]] vs [ ]',
      'case statements',
      'Logical operators',
      'Practice'
    ],
    brickContent: {
      summary: 'Complete conditionals reference with the critical insight about exit codes.',
      keyInsight: 'Bash checks exit codes, not "true/false" - exit 0 means success (true), non-zero means failure (false)',
      features: [
        'File tests (-f, -d, -e, -r, -w, -x, -s, -L)',
        'String tests (=, !=, -z, -n) vs integer tests (-eq, -ne, -lt, -gt)',
        'Modern [[ ]] vs legacy [ ] comparison',
        'Case statements for pattern matching',
        'Defensive scripting with && and || operators'
      ]
    }
  },

  'BASH-F05': {
    id: 'BASH-F05',
    title: 'Loops',
    universe: 'bash',
    difficulty: 'int',
    volume: 1,
    sections: 6,
    description: 'Master for, while, until loops and loop control.',
    tags: ['loops', 'iteration', 'control'],
    xpReward: 90,
    completedSections: [
      'for Loops',
      'while Loops', 
      'until Loops',
      'select Menus',
      'break & continue',
      'Practice'
    ],
    brickContent: {
      summary: 'Complete loops reference with practical patterns and the subshell variable trap.',
      criticalLearning: 'The subshell variable trap: pipes create subprocesses, so variables changed inside piped while loops disappear',
      features: [
        'for-in loops over word lists, globs, arrays',
        'C-style loops with (( )) arithmetic',
        'while loops with file reading pattern',
        'Process substitution to avoid subshell trap',
        'select for interactive menus'
      ]
    }
  },

  'BASH-F06': {
    id: 'BASH-F06',
    title: 'Functions',
    universe: 'bash',
    difficulty: 'int',
    volume: 1,
    sections: 6,
    description: 'Create reusable functions with proper scope and return values.',
    tags: ['functions', 'scope', 'patterns'],
    xpReward: 90,
    completedSections: [
      'Defining Functions',
      'Arguments',
      'Return Values',
      'Local Variables', 
      'Practical Patterns',
      'Practice'
    ],
    brickContent: {
      summary: 'Functions as the building blocks of maintainable bash scripts.',
      keyInsight: 'Functions execute in current shell (no fork), making them fast but requiring careful scope management',
      patterns: [
        'Guard pattern for prerequisite checking',
        'Cleanup pattern with trap EXIT',
        'Retry pattern for unreliable operations',
        'main() pattern for script organization'
      ]
    }
  },

  'BASH-F07': {
    id: 'BASH-F07',
    title: 'Input/Output',
    universe: 'bash',
    difficulty: 'int',
    volume: 2,
    sections: 6,
    description: 'Handle input/output, files, pipes, and redirection.',
    tags: ['io', 'pipes', 'redirection'],
    xpReward: 90,
    completedSections: [
      'read',
      'echo vs printf',
      'Heredocs & Herestrings',
      'File Redirection',
      'Pipes', 
      'Practice'
    ],
    brickContent: {
      summary: 'Complete I/O handling with professional printf usage and redirection mastery.',
      professionalChoice: 'printf over echo for precise formatting and cross-shell compatibility',
      criticalConcept: 'Redirection order matters: > file 2>&1 (correct) vs 2>&1 > file (wrong)'
    }
  },

  'BASH-F08': {
    id: 'BASH-F08',
    title: 'Error Handling',
    universe: 'bash',
    difficulty: 'adv',
    volume: 2,
    sections: 6,
    description: 'Production-ready error handling, logging, and defensive patterns.',
    tags: ['errors', 'logging', 'production'],
    xpReward: 90,
    completedSections: [
      'Exit Codes',
      'set -euo pipefail',
      'trap',
      'Defensive Patterns',
      'Error Functions & Logging',
      'The Complete Template'
    ],
    brickContent: {
      summary: 'The capstone module making scripts production-ready with bulletproof error handling.',
      criticalSafety: 'set -euo pipefail - the three safety nets that prevent catastrophic failures',
      includes: 'Complete 100-line production script template integrating all 8 modules'
    }
  },

  // ========== ARCH COMMANDS (6 BRICKS) ==========
  
  'ARCH-CMD01': {
    id: 'ARCH-CMD01',
    title: 'Navigation & Files',
    universe: 'arch',
    difficulty: 'beg',
    volume: 1,
    sections: 7,
    description: 'Master navigation, file operations, and modern CLI tools.',
    tags: ['navigation', 'files', 'tools'],
    xpReward: 105,
    completedSections: [
      'pwd/cd/ls and modern replacements',
      'mkdir/rmdir',
      'cp/mv',
      'rm — The Danger Zone',
      'ln — Links',
      'find/fd',
      'Practice'
    ],
    brickContent: {
      summary: 'Commands you use hundreds of times every day, including modern Rust replacements.',
      modernTools: ['eza (replaces ls)', 'zoxide (smart cd)', 'fd (modern find)'],
      safetyFocus: 'rm safety habits and disaster prevention'
    }
  },

  'ARCH-CMD02': {
    id: 'ARCH-CMD02',
    title: 'Text Processing',
    universe: 'arch',
    difficulty: 'int',
    volume: 2,
    sections: 8,
    description: 'Pipeline mastery with grep, sed, awk, and text tools.',
    tags: ['text', 'pipes', 'processing'],
    xpReward: 120,
    completedSections: [
      'Pipes & Redirection Recap',
      'grep/ripgrep', 
      'sed',
      'awk',
      'sort/uniq/wc/cut/tr',
      'xargs',
      'Real-World Pipelines',
      'Practice'
    ],
    brickContent: {
      summary: 'The most practically powerful module - replacing 40-line Python scripts with single pipelines.',
      crownJewel: 'awk as columnar data processor with GROUP BY counting patterns'
    }
  },

  'ARCH-CMD03': {
    id: 'ARCH-CMD03',
    title: 'Permissions & Users',
    universe: 'arch',
    difficulty: 'int',
    volume: 2,
    sections: 6,
    description: 'File permissions, ownership, and user management.',
    tags: ['permissions', 'users', 'security'],
    xpReward: 90,
    completedSections: [
      'Reading Permission Strings',
      'chmod',
      'chown',
      'umask',
      'sudo & User Management',
      'Practice'
    ],
    brickContent: {
      summary: 'Permission system mastery with octal/symbolic conversion and the critical usermod -aG warning.'
    }
  },

  'ARCH-CMD04': {
    id: 'ARCH-CMD04',
    title: 'Process Management',
    universe: 'arch',
    difficulty: 'int',
    volume: 2,
    sections: 7,
    description: 'Process control, systemd, and job management.',
    tags: ['processes', 'systemd', 'jobs'],
    xpReward: 105,
    completedSections: [
      'ps/top/htop/btop',
      'kill & Signals',
      'Job Control',
      'systemctl',
      'journalctl',
      'cron & systemd Timers',
      'Practice'
    ],
    brickContent: {
      summary: 'Complete process and service management for your Arch system.'
    }
  },

  'ARCH-CMD05': {
    id: 'ARCH-CMD05',
    title: 'Networking',
    universe: 'arch',
    difficulty: 'adv',
    volume: 2,
    sections: 7,
    description: 'Network tools, diagnostics, and troubleshooting.',
    tags: ['networking', 'diagnostics', 'tools'],
    xpReward: 105,
    completedSections: [
      'ip',
      'ss',
      'ping/traceroute/mtr',
      'curl/wget',
      'ssh',
      'dig/DNS',
      'Practice'
    ],
    brickContent: {
      summary: 'Network diagnostics tailored to your Dell 7420 and FRITZ!Box 7360 setup.'
    }
  },

  'ARCH-CMD06': {
    id: 'ARCH-CMD06',
    title: 'Package Management',
    universe: 'arch',
    difficulty: 'adv',
    volume: 2,
    sections: 7,
    description: 'Master pacman, paru, AUR, and system maintenance.',
    tags: ['pacman', 'aur', 'maintenance'],
    xpReward: 105,
    completedSections: [
      'pacman -S: Installing & Updating',
      'pacman -R: Removing',
      'pacman -Q: Querying',
      'paru & AUR',
      'Cache & Mirror Management',
      'Troubleshooting & Recovery',
      'Practice'
    ],
    brickContent: {
      summary: 'The single most important module for daily life on Arch Linux.'
    }
  },

  // ========== SECURITY (5 BRICKS) ==========
  
  'SEC-F01': {
    id: 'SEC-F01',
    title: 'Security Foundations',
    universe: 'security',
    difficulty: 'beg',
    volume: 2,
    sections: 7,
    description: 'CIA triad, threat modeling, defense in depth, and legal framework.',
    tags: ['foundations', 'legal', 'framework'],
    xpReward: 105,
    completedSections: [
      'The CIA Triad',
      'The Attacker Mindset',
      'Defense in Depth',
      'Threat Modeling with STRIDE',
      'Legal & Ethical Framework',
      'Your Lab Environment',
      'Practice — Security Self-Audit'
    ],
    brickContent: {
      summary: 'Security foundations with warm amber/orange visual identity and German legal framework.',
      labEnvironment: 'Docker containers: DVWA, Juice Shop, WebGoat'
    }
  },

  'SEC-REC01': {
    id: 'SEC-REC01',
    title: 'Reconnaissance',
    universe: 'security',
    difficulty: 'int',
    volume: 2,
    sections: 7,
    description: 'Intelligence gathering, OSINT, and passive/active recon.',
    tags: ['recon', 'osint', 'intelligence'],
    xpReward: 105,
    completedSections: [
      'The Recon Methodology',
      'Passive Recon: DNS Intelligence', 
      'Passive Recon: OSINT Tools',
      'Active Recon: Host Discovery',
      'Active Recon: Port Scanning & Banner Grabbing',
      'The Complete Recon Report',
      'Practice'
    ],
    brickContent: {
      summary: 'The intelligence-gathering phase that feeds everything else in the Security track.'
    }
  },

  'SEC-REC02': {
    id: 'SEC-REC02',
    title: 'nmap Mastery',
    universe: 'security',
    difficulty: 'adv',
    volume: 3,
    sections: 7,
    description: 'Complete nmap reference: scans, NSE, timing, and evasion.',
    tags: ['nmap', 'scanning', 'nse'],
    xpReward: 105,
    completedSections: [
      'nmap Fundamentals',
      'Scan Types',
      'Service & OS Detection',
      'NSE Scripting Engine',
      'Output Formats',
      'Timing & Evasion',
      'Practice'
    ],
    brickContent: {
      summary: 'The culmination of reconnaissance - nmap as security assessment platform.'
    }
  },

  'SEC-WEB01': {
    id: 'SEC-WEB01',
    title: 'Web Application Security',
    universe: 'security',
    difficulty: 'adv',
    volume: 3,
    sections: 7,
    description: 'SQL injection, XSS, CSRF, and web vulnerability exploitation.',
    tags: ['web', 'sqli', 'xss'],
    xpReward: 105,
    completedSections: [
      'OWASP Top 10',
      'SQL Injection',
      'XSS',
      'Command Injection',
      'CSRF',
      'Security Misconfiguration',
      'Practice'
    ],
    brickContent: {
      summary: 'The first module where you actually break into systems - red-tinted cover for attack focus.'
    }
  },

  'SEC-NET01': {
    id: 'SEC-NET01',
    title: 'Network Analysis',
    universe: 'security',
    difficulty: 'adv',
    volume: 3,
    sections: 7,
    description: 'Wireshark, tcpdump, and packet analysis for security.',
    tags: ['wireshark', 'packets', 'forensics'],
    xpReward: 105,
    completedSections: [
      'Packet Capture Fundamentals',
      'tcpdump',
      'Wireshark',
      'Capturing Your Own Attacks',
      'Protocol Analysis',
      'Detection & Forensics',
      'Practice'
    ],
    brickContent: {
      summary: 'X-ray vision for every byte crossing your network - the complete packet analysis toolkit.'
    }
  }
};

// Universe metadata with track completion status
const PINK_GALAXY_UNIVERSES = {
  bash: {
    id: 'bash',
    name: 'Bash & Scripting',
    prefix: 'BASH-',
    color: '#ffd600',
    icon: '⚡',
    description: 'Scripting mastery from first script to production patterns',
    trackStatus: 'COMPLETE',
    totalBricks: 8,
    completedBricks: 8,
    modules: ['BASH-F01', 'BASH-F02', 'BASH-F03', 'BASH-F04', 'BASH-F05', 'BASH-F06', 'BASH-F07', 'BASH-F08']
  },
  
  arch: {
    id: 'arch',
    name: 'Arch Linux',
    prefix: 'ARCH-',
    color: '#2e7d32', 
    icon: '🐧',
    description: 'Command mastery for Arch Linux system administration',
    trackStatus: 'COMPLETE',
    totalBricks: 6,
    completedBricks: 6,
    modules: ['ARCH-CMD01', 'ARCH-CMD02', 'ARCH-CMD03', 'ARCH-CMD04', 'ARCH-CMD05', 'ARCH-CMD06']
  },
  
  security: {
    id: 'security',
    name: 'Security & BlackArch',
    prefix: 'SEC-',
    color: '#ff5252',
    icon: '🔒',
    description: 'Penetration testing and defensive security',
    trackStatus: 'PARTIAL',
    totalBricks: 5,
    completedBricks: 5,
    modules: ['SEC-F01', 'SEC-REC01', 'SEC-REC02', 'SEC-WEB01', 'SEC-NET01'],
    nextModules: ['SEC-EXP01 (Privilege Escalation)', 'SEC-WIFI01 (Wireless)', 'SEC-CRACK01 (Password Cracking)']
  },
  
  python: {
    id: 'python',
    name: 'Python',
    prefix: 'PY-',
    color: '#5c6bc0',
    icon: '🐍',
    description: 'Python programming and data engineering',
    trackStatus: 'PENDING',
    totalBricks: 0,
    completedBricks: 0,
    modules: [],
    plannedModules: ['PY-F01 (Setup)', 'PY-F02 (Basics)', 'PY-DE01 (Polars)', 'PY-SEC01 (Security)']
  },
  
  cloud: {
    id: 'cloud',
    name: 'Cloud & DevOps',
    prefix: 'CLOUD-',
    color: '#ab47bc',
    icon: '☁️',
    description: 'AWS, Docker, and DevOps practices',
    trackStatus: 'PENDING', 
    totalBricks: 0,
    completedBricks: 0,
    modules: [],
    plannedModules: ['CLOUD-AWS01 (IAM)', 'CLOUD-DOCKER01 (Containers)', 'CLOUD-TF01 (Terraform)']
  },
  
  tools: {
    id: 'tools',
    name: 'Tools & Reference',
    prefix: 'REF-',
    color: '#6c6a7e',
    icon: '🛠️',
    description: 'Quick reference and tool cheatsheets',
    trackStatus: 'INTEGRATED',
    totalBricks: 0,
    completedBricks: 0,
    modules: [],
    note: 'Integrated into cheatsheets system'
  }
};

// Progress tracking for the complete learning path
const LEARNING_PATH_STATUS = {
  totalBricks: 19,
  completedBricks: 19,
  totalModules: 19,
  estimatedXP: 1995, // Sum of all XP rewards
  completedTracks: ['Bash Fundamentals', 'Arch Commands'],
  partialTracks: ['Security'],
  pendingTracks: ['Python', 'Cloud & DevOps'],
  
  // Skill tree dependencies
  prerequisites: {
    'BASH-F02': ['BASH-F01'],
    'BASH-F03': ['BASH-F02'],
    'BASH-F04': ['BASH-F03'],
    'BASH-F05': ['BASH-F04'],
    'BASH-F06': ['BASH-F05'],
    'BASH-F07': ['BASH-F06'], 
    'BASH-F08': ['BASH-F07'],
    
    'ARCH-CMD01': ['BASH-F01'],
    'ARCH-CMD02': ['ARCH-CMD01'],
    'ARCH-CMD03': ['ARCH-CMD02'],
    'ARCH-CMD04': ['ARCH-CMD03'],
    'ARCH-CMD05': ['ARCH-CMD04'],
    'ARCH-CMD06': ['ARCH-CMD05'],
    
    'SEC-F01': ['BASH-F08'],
    'SEC-REC01': ['SEC-F01'],
    'SEC-REC02': ['SEC-REC01'],
    'SEC-WEB01': ['SEC-REC02'],
    'SEC-NET01': ['SEC-WEB01']
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PINK_GALAXY_BRICKS, PINK_GALAXY_UNIVERSES, LEARNING_PATH_STATUS };
}