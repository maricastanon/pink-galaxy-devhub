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
    // Load universe data from the comprehensive data file
    if (typeof PINK_GALAXY_UNIVERSES !== 'undefined') {
      Object.values(PINK_GALAXY_UNIVERSES).forEach(universe => {
        this.universes.set(universe.id, universe);
      });
    } else {
      // Fallback to basic universe data if bricks-data.js not loaded
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
  }
  
  loadModules() {
    // Load built-in modules from the 19 bricks
    this.loadBuiltInModules();
    
    // Load custom modules from localStorage
    const customModules = JSON.parse(localStorage.getItem('pinkGalaxy_customModules') || '[]');
    customModules.forEach(mod => this.modules.set(mod.id, mod));
  }
  
  loadBuiltInModules() {
    // Load all 19 bricks from the comprehensive data file
    if (typeof PINK_GALAXY_BRICKS !== 'undefined') {
      Object.values(PINK_GALAXY_BRICKS).forEach(brick => {
        const module = {
          ...brick,
          progress: this.getModuleProgress(brick.id)
        };
        this.modules.set(brick.id, module);
      });
    } else {
      console.warn('PINK_GALAXY_BRICKS data not loaded. Please include bricks-data.js');
    }
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