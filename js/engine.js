/**
 * Pink Galaxy Bible v2 — Core Engine
 * Main application controller and state management
 */

class PinkGalaxyEngine {
  constructor() {
    this.currentView = 'dashboard';
    this.currentModule = null;
    this.user = {
      xp: parseInt(localStorage.getItem('pinkGalaxy_xp') || '0'),
      level: parseInt(localStorage.getItem('pinkGalaxy_level') || '1'),
      streak: parseInt(localStorage.getItem('pinkGalaxy_streak') || '0'),
      lastVisit: localStorage.getItem('pinkGalaxy_lastVisit') || '',
      progress: JSON.parse(localStorage.getItem('pinkGalaxy_progress') || '{}')
    };
    
    this.filters = {
      universe: 'all',
      difficulty: 'all',
      volume: 'all'
    };
    
    this.mindmapType = 'clusters';
    this.modules = new Map();
    this.universes = new Map();
    
    this.init();
  }
  
  init() {
    this.initializeUniverses();
    this.loadModules();
    this.updateStreak();
    this.bindEvents();
    this.updateUI();
    this.showView(this.currentView);
    
    console.log('🌸 Pink Galaxy Bible v2 Initialized');
    console.log(`User: Level ${this.user.level}, ${this.user.xp} XP, ${this.user.streak} day streak`);
  }
  
  initializeUniverses() {
    const universes = [
      { id: 'arch', name: 'Arch Linux', prefix: 'ARCH-', color: '#2e7d32', icon: '🐧' },
      { id: 'bash', name: 'Bash & Scripting', prefix: 'BASH-', color: '#ffd600', icon: '⚡' },
      { id: 'python', name: 'Python', prefix: 'PY-', color: '#5c6bc0', icon: '🐍' },
      { id: 'security', name: 'Security & BlackArch', prefix: 'SEC-', color: '#ff5252', icon: '🔒' },
      { id: 'cloud', name: 'Cloud & DevOps', prefix: 'CLOUD-', color: '#ab47bc', icon: '☁️' },
      { id: 'tools', name: 'Tools & Reference', prefix: 'REF-', color: '#6c6a7e', icon: '🛠️' }
    ];
    
    universes.forEach(u => this.universes.set(u.id, u));
  }
  
  loadModules() {
    // Load built-in modules from the 19 bricks
    this.loadBuiltInModules();
    
    // Load custom modules from localStorage
    const customModules = JSON.parse(localStorage.getItem('pinkGalaxy_customModules') || '[]');
    customModules.forEach(mod => this.modules.set(mod.id, mod));
  }
  
  loadBuiltInModules() {
    // This will be populated with all 19 bricks content
    const builtInModules = [
      // BASH Fundamentals (F01-F08)
      {
        id: 'BASH-F01',
        title: 'Your First Script',
        universe: 'bash',
        difficulty: 'beg',
        volume: 1,
        sections: 3,
        description: 'Learn the fundamentals of bash scripting with your very first executable script.',
        tags: ['basics', 'scripting', 'executable'],
        xpReward: 45,
        progress: this.getModuleProgress('BASH-F01')
      },
      {
        id: 'BASH-F02',
        title: 'Variables & Data Types',
        universe: 'bash',
        difficulty: 'beg',
        volume: 1,
        sections: 7,
        description: 'Master variable assignment, strings, integers, arrays, and scope in bash.',
        tags: ['variables', 'arrays', 'scope'],
        xpReward: 105,
        progress: this.getModuleProgress('BASH-F02')
      },
      {
        id: 'BASH-F03',
        title: 'Quoting & Expansion',
        universe: 'bash',
        difficulty: 'int',
        volume: 1,
        sections: 6,
        description: 'Understand quoting rules, parameter expansion, and brace expansion.',
        tags: ['quoting', 'expansion', 'parameters'],
        xpReward: 90,
        progress: this.getModuleProgress('BASH-F03')
      },
      {
        id: 'BASH-F04',
        title: 'Conditionals',
        universe: 'bash',
        difficulty: 'int',
        volume: 1,
        sections: 6,
        description: 'Learn if/elif/else, test operators, and case statements.',
        tags: ['conditionals', 'testing', 'logic'],
        xpReward: 90,
        progress: this.getModuleProgress('BASH-F04')
      },
      {
        id: 'BASH-F05',
        title: 'Loops',
        universe: 'bash',
        difficulty: 'int',
        volume: 1,
        sections: 6,
        description: 'Master for, while, until loops and loop control.',
        tags: ['loops', 'iteration', 'control'],
        xpReward: 90,
        progress: this.getModuleProgress('BASH-F05')
      },
      {
        id: 'BASH-F06',
        title: 'Functions',
        universe: 'bash',
        difficulty: 'int',
        volume: 1,
        sections: 6,
        description: 'Create reusable functions with proper scope and return values.',
        tags: ['functions', 'scope', 'patterns'],
        xpReward: 90,
        progress: this.getModuleProgress('BASH-F06')
      },
      {
        id: 'BASH-F07',
        title: 'Input/Output',
        universe: 'bash',
        difficulty: 'int',
        volume: 2,
        sections: 6,
        description: 'Handle input/output, files, pipes, and redirection.',
        tags: ['io', 'pipes', 'redirection'],
        xpReward: 90,
        progress: this.getModuleProgress('BASH-F07')
      },
      {
        id: 'BASH-F08',
        title: 'Error Handling',
        universe: 'bash',
        difficulty: 'adv',
        volume: 2,
        sections: 6,
        description: 'Production-ready error handling, logging, and defensive patterns.',
        tags: ['errors', 'logging', 'production'],
        xpReward: 90,
        progress: this.getModuleProgress('BASH-F08')
      },
      
      // ARCH Commands (CMD01-CMD06)
      {
        id: 'ARCH-CMD01',
        title: 'Navigation & Files',
        universe: 'arch',
        difficulty: 'beg',
        volume: 1,
        sections: 7,
        description: 'Master navigation, file operations, and modern CLI tools.',
        tags: ['navigation', 'files', 'tools'],
        xpReward: 105,
        progress: this.getModuleProgress('ARCH-CMD01')
      },
      {
        id: 'ARCH-CMD02',
        title: 'Text Processing',
        universe: 'arch',
        difficulty: 'int',
        volume: 2,
        sections: 8,
        description: 'Pipeline mastery with grep, sed, awk, and text tools.',
        tags: ['text', 'pipes', 'processing'],
        xpReward: 120,
        progress: this.getModuleProgress('ARCH-CMD02')
      },
      {
        id: 'ARCH-CMD03',
        title: 'Permissions & Users',
        universe: 'arch',
        difficulty: 'int',
        volume: 2,
        sections: 6,
        description: 'File permissions, ownership, and user management.',
        tags: ['permissions', 'users', 'security'],
        xpReward: 90,
        progress: this.getModuleProgress('ARCH-CMD03')
      },
      {
        id: 'ARCH-CMD04',
        title: 'Process Management',
        universe: 'arch',
        difficulty: 'int',
        volume: 2,
        sections: 7,
        description: 'Process control, systemd, and job management.',
        tags: ['processes', 'systemd', 'jobs'],
        xpReward: 105,
        progress: this.getModuleProgress('ARCH-CMD04')
      },
      {
        id: 'ARCH-CMD05',
        title: 'Networking',
        universe: 'arch',
        difficulty: 'adv',
        volume: 2,
        sections: 7,
        description: 'Network tools, diagnostics, and troubleshooting.',
        tags: ['networking', 'diagnostics', 'tools'],
        xpReward: 105,
        progress: this.getModuleProgress('ARCH-CMD05')
      },
      {
        id: 'ARCH-CMD06',
        title: 'Package Management',
        universe: 'arch',
        difficulty: 'adv',
        volume: 2,
        sections: 7,
        description: 'Master pacman, paru, AUR, and system maintenance.',
        tags: ['pacman', 'aur', 'maintenance'],
        xpReward: 105,
        progress: this.getModuleProgress('ARCH-CMD06')
      },
      
      // Security Modules (SEC-F01, SEC-REC01-02, SEC-WEB01, SEC-NET01)
      {
        id: 'SEC-F01',
        title: 'Security Foundations',
        universe: 'security',
        difficulty: 'beg',
        volume: 2,
        sections: 7,
        description: 'CIA triad, threat modeling, defense in depth, and legal framework.',
        tags: ['foundations', 'legal', 'framework'],
        xpReward: 105,
        progress: this.getModuleProgress('SEC-F01')
      },
      {
        id: 'SEC-REC01',
        title: 'Reconnaissance',
        universe: 'security',
        difficulty: 'int',
        volume: 2,
        sections: 7,
        description: 'Intelligence gathering, OSINT, and passive/active recon.',
        tags: ['recon', 'osint', 'intelligence'],
        xpReward: 105,
        progress: this.getModuleProgress('SEC-REC01')
      },
      {
        id: 'SEC-REC02',
        title: 'nmap Mastery',
        universe: 'security',
        difficulty: 'adv',
        volume: 3,
        sections: 7,
        description: 'Complete nmap reference: scans, NSE, timing, and evasion.',
        tags: ['nmap', 'scanning', 'nse'],
        xpReward: 105,
        progress: this.getModuleProgress('SEC-REC02')
      },
      {
        id: 'SEC-WEB01',
        title: 'Web Application Security',
        universe: 'security',
        difficulty: 'adv',
        volume: 3,
        sections: 7,
        description: 'SQL injection, XSS, CSRF, and web vulnerability exploitation.',
        tags: ['web', 'sqli', 'xss'],
        xpReward: 105,
        progress: this.getModuleProgress('SEC-WEB01')
      },
      {
        id: 'SEC-NET01',
        title: 'Network Analysis',
        universe: 'security',
        difficulty: 'adv',
        volume: 3,
        sections: 7,
        description: 'Wireshark, tcpdump, and packet analysis for security.',
        tags: ['wireshark', 'packets', 'forensics'],
        xpReward: 105,
        progress: this.getModuleProgress('SEC-NET01')
      }
    ];
    
    builtInModules.forEach(mod => this.modules.set(mod.id, mod));
  }
  
  getModuleProgress(moduleId) {
    return this.user.progress[moduleId] || { completed: 0, total: 0, percentage: 0 };
  }
  
  updateStreak() {
    const today = new Date().toDateString();
    const lastVisit = new Date(this.user.lastVisit || 0).toDateString();
    
    if (lastVisit === today) {
      // Same day, no change
      return;
    } else if (this.isYesterday(lastVisit)) {
      // Consecutive day, increment streak
      this.user.streak++;
    } else {
      // Streak broken, reset to 1
      this.user.streak = 1;
    }
    
    this.user.lastVisit = new Date().toISOString();
    this.saveUserData();
  }
  
  isYesterday(dateString) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return new Date(dateString).toDateString() === yesterday.toDateString();
  }
  
  saveUserData() {
    localStorage.setItem('pinkGalaxy_xp', this.user.xp.toString());
    localStorage.setItem('pinkGalaxy_level', this.user.level.toString());
    localStorage.setItem('pinkGalaxy_streak', this.user.streak.toString());
    localStorage.setItem('pinkGalaxy_lastVisit', this.user.lastVisit);
    localStorage.setItem('pinkGalaxy_progress', JSON.stringify(this.user.progress));
  }
  
  bindEvents() {
    // Navigation
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const view = e.target.dataset.view;
        if (view) this.showView(view);
      });
    });
    
    // Module cards
    document.addEventListener('click', (e) => {
      if (e.target.closest('.card')) {
        const moduleId = e.target.closest('.card').dataset.module;
        if (moduleId) this.showModule(moduleId);
      }
    });
    
    // Filters
    document.querySelectorAll('.fbtn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filterType = e.target.dataset.filter;
        const filterValue = e.target.dataset.value;
        if (filterType && filterValue) {
          this.setFilter(filterType, filterValue);
        }
      });
    });
    
    // Back button
    document.addEventListener('click', (e) => {
      if (e.target.closest('.mod-back')) {
        this.showView('dashboard');
      }
    });
  }
  
  showView(viewName) {
    this.currentView = viewName;
    
    // Update nav tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.view === viewName);
    });
    
    // Update views
    document.querySelectorAll('.view').forEach(view => {
      view.classList.toggle('active', view.id === `${viewName}-view`);
    });
    
    // Refresh content
    switch (viewName) {
      case 'dashboard':
        this.renderModuleCards();
        break;
      case 'mindmap':
        this.renderMindmap();
        break;
      case 'cheatsheets':
        this.renderCheatsheets();
        break;
    }
  }
  
  setFilter(type, value) {
    this.filters[type] = value;
    
    // Update button states
    document.querySelectorAll(`[data-filter="${type}"]`).forEach(btn => {
      btn.classList.toggle('on', btn.dataset.value === value);
    });
    
    // Re-render if on dashboard
    if (this.currentView === 'dashboard') {
      this.renderModuleCards();
    }
  }
  
  updateUI() {
    // Update XP and level
    document.querySelector('.xp-badge .xp-amount').textContent = this.user.xp;
    document.querySelector('.streak-badge').textContent = `🔥 ${this.user.streak}`;
    
    // Update stats
    const totalModules = this.modules.size;
    const completedModules = Array.from(this.modules.values())
      .filter(mod => mod.progress.percentage === 100).length;
    const totalXP = this.user.xp;
    const currentLevel = this.calculateLevel(totalXP);
    
    document.querySelector('[data-stat="modules"] .stat-num').textContent = completedModules;
    document.querySelector('[data-stat="total"] .stat-num').textContent = totalModules;
    document.querySelector('[data-stat="xp"] .stat-num').textContent = totalXP;
    document.querySelector('[data-stat="level"] .stat-num').textContent = currentLevel;
  }
  
  calculateLevel(xp) {
    const levels = [
      { level: 1, xp: 0, title: '🌱 Seedling' },
      { level: 2, xp: 100, title: '🌿 Sprout' },
      { level: 3, xp: 300, title: '🌳 Tree' },
      { level: 4, xp: 600, title: '🌲 Forest' },
      { level: 5, xp: 1000, title: '🌍 Planet' },
      { level: 6, xp: 1500, title: '⭐ Star' },
      { level: 7, xp: 2500, title: '🌌 Galaxy' },
      { level: 8, xp: 5000, title: '🚀 Universe' }
    ];
    
    for (let i = levels.length - 1; i >= 0; i--) {
      if (xp >= levels[i].xp) {
        this.user.level = levels[i].level;
        return levels[i].level;
      }
    }
    return 1;
  }
  
  renderModuleCards() {
    const container = document.querySelector('.cards');
    if (!container) return;
    
    // Filter modules
    const filteredModules = Array.from(this.modules.values()).filter(mod => {
      if (this.filters.universe !== 'all' && mod.universe !== this.filters.universe) return false;
      if (this.filters.difficulty !== 'all' && mod.difficulty !== this.filters.difficulty) return false;
      if (this.filters.volume !== 'all' && mod.volume !== parseInt(this.filters.volume)) return false;
      return true;
    });
    
    // Render cards
    container.innerHTML = filteredModules.map(mod => this.renderModuleCard(mod)).join('');
  }
  
  renderModuleCard(mod) {
    const universe = this.universes.get(mod.universe);
    const progressPercent = mod.progress.percentage || 0;
    
    return `
      <div class="card" data-module="${mod.id}" data-vol="${mod.volume}">
        <div class="card-top">
          <span class="card-id">${mod.id}</span>
          <span class="card-diff ${mod.difficulty}">${mod.difficulty.toUpperCase()}</span>
        </div>
        <h3>${universe?.icon || ''} ${mod.title}</h3>
        <div class="card-desc">${mod.description}</div>
        <div class="card-sections">${mod.progress.completed || 0}/${mod.sections} sections</div>
        <div class="card-tags">
          ${mod.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="card-progress">
          <div class="cpbar">
            <div class="cpfill" style="width: ${progressPercent}%"></div>
          </div>
          <span class="card-pct">${progressPercent}%</span>
        </div>
        <span class="card-xp">+${mod.xpReward} XP</span>
      </div>
    `;
  }
  
  // Additional methods for mindmap, cheatsheets, module view, etc.
  // will be implemented in separate files...
}

// Initialize the engine when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.pinkGalaxy = new PinkGalaxyEngine();
});