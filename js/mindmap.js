/**
 * Pink Galaxy Bible v2 — Mindmap Visualizations
 * 10 different mindmap types for module visualization
 */

class MindmapSystem {
  constructor(engine) {
    this.engine = engine;
    this.canvas = null;
    this.currentType = 'clusters';
    this.nodes = [];
    this.connections = [];
    
    this.mindmapTypes = {
      clusters: { name: 'Clusters', icon: '🌸' },
      network: { name: 'Network', icon: '🌐' },
      radial: { name: 'Radial', icon: '⭐' },
      heatmap: { name: 'Heatmap', icon: '🔥' },
      timeline: { name: 'Timeline', icon: '📅' },
      bubbles: { name: 'Bubbles', icon: '🫧' },
      tree: { name: 'Tree', icon: '🌳' },
      spiral: { name: 'Spiral', icon: '🌀' },
      constellation: { name: 'Constellation', icon: '✨' },
      galaxy: { name: 'Galaxy', icon: '🌌' }
    };
    
    this.bindEvents();
  }
  
  bindEvents() {
    // Mindmap type buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('.map-type')) {
        const type = e.target.closest('.map-type').dataset.type;
        if (type) this.setMindmapType(type);
      }
    });
  }
  
  setMindmapType(type) {
    if (!this.mindmapTypes[type]) return;
    
    this.currentType = type;
    
    // Update button states
    document.querySelectorAll('.map-type').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.type === type);
    });
    
    // Re-render if on mindmap view
    if (this.engine.currentView === 'mindmap') {
      this.renderMindmap();
    }
  }
  
  renderMindmap() {
    const canvas = document.querySelector('.map-canvas');
    if (!canvas) return;
    
    this.canvas = canvas;
    this.prepareNodes();
    
    // Clear previous content
    canvas.innerHTML = '';
    canvas.className = `map-canvas mindmap-${this.currentType}`;
    
    // Render based on selected type
    switch (this.currentType) {
      case 'clusters':
        this.renderClusters();
        break;
      case 'network':
        this.renderNetwork();
        break;
      case 'radial':
        this.renderRadial();
        break;
      case 'heatmap':
        this.renderHeatmap();
        break;
      case 'timeline':
        this.renderTimeline();
        break;
      case 'bubbles':
        this.renderBubbles();
        break;
      case 'tree':
        this.renderTree();
        break;
      case 'spiral':
        this.renderSpiral();
        break;
      case 'constellation':
        this.renderConstellation();
        break;
      case 'galaxy':
        this.renderGalaxy();
        break;
    }
    
    this.addLegend();
    this.bindNodeEvents();
  }
  
  prepareNodes() {
    this.nodes = [];
    
    Array.from(this.engine.modules.values()).forEach(module => {
      const universe = this.engine.universes.get(module.universe);
      if (!universe) return;
      
      this.nodes.push({
        id: module.id,
        title: module.title,
        universe: module.universe,
        universeColor: universe.color,
        universeIcon: universe.icon,
        difficulty: module.difficulty,
        volume: module.volume,
        progress: module.progress.percentage || 0,
        size: this.calculateNodeSize(module),
        module: module
      });
    });
  }
  
  calculateNodeSize(module) {
    const baseSize = 40;
    const progressBonus = (module.progress.percentage || 0) * 0.3;
    const difficultyMultiplier = { beg: 1, int: 1.2, adv: 1.4 }[module.difficulty] || 1;
    
    return baseSize + progressBonus + (difficultyMultiplier * 10);
  }
  
  renderClusters() {
    const rect = this.canvas.getBoundingClientRect();
    const universePositions = this.getUniversePositions(rect);
    
    this.nodes.forEach(node => {
      const universePos = universePositions[node.universe];
      if (!universePos) return;
      
      // Add some randomness within each universe cluster
      const clusterRadius = 120;
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * clusterRadius;
      
      const x = universePos.x + Math.cos(angle) * distance;
      const y = universePos.y + Math.sin(angle) * distance;
      
      this.createNode(node, x, y);
    });
  }
  
  renderNetwork() {
    const rect = this.canvas.getBoundingClientRect();
    
    this.nodes.forEach(node => {
      const x = Math.random() * (rect.width - 100) + 50;
      const y = Math.random() * (rect.height - 100) + 50;
      
      this.createNode(node, x, y);
    });
    
    // Add connection lines between related modules
    this.addNetworkConnections();
  }
  
  renderRadial() {
    const rect = this.canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    this.nodes.forEach((node, index) => {
      const angle = (index / this.nodes.length) * 2 * Math.PI;
      const radius = 150 + (node.volume - 1) * 80;
      
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      this.createNode(node, x, y);
    });
    
    // Add radial lines
    this.addRadialLines(centerX, centerY);
  }
  
  renderHeatmap() {
    const rect = this.canvas.getBoundingClientRect();
    const cols = Math.ceil(Math.sqrt(this.nodes.length));
    const rows = Math.ceil(this.nodes.length / cols);
    
    const cellWidth = (rect.width - 100) / cols;
    const cellHeight = (rect.height - 100) / rows;
    
    this.nodes.forEach((node, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      
      const x = 50 + col * cellWidth + cellWidth / 2;
      const y = 50 + row * cellHeight + cellHeight / 2;
      
      // Color based on progress
      node.heatmapIntensity = node.progress / 100;
      
      this.createNode(node, x, y);
    });
  }
  
  renderTimeline() {
    const rect = this.canvas.getBoundingClientRect();
    const timelineY = rect.height / 2;
    
    // Group by difficulty level (timeline progression)
    const difficultyOrder = ['beg', 'int', 'adv'];
    const difficultyGroups = {};
    
    this.nodes.forEach(node => {
      if (!difficultyGroups[node.difficulty]) {
        difficultyGroups[node.difficulty] = [];
      }
      difficultyGroups[node.difficulty].push(node);
    });
    
    let currentX = 50;
    
    difficultyOrder.forEach(difficulty => {
      const group = difficultyGroups[difficulty] || [];
      const groupWidth = (rect.width - 100) / 3;
      const nodeSpacing = groupWidth / (group.length + 1);
      
      group.forEach((node, index) => {
        const x = currentX + nodeSpacing * (index + 1);
        const y = timelineY + (Math.random() - 0.5) * 60;
        
        this.createNode(node, x, y);
      });
      
      currentX += groupWidth;
    });
    
    // Add timeline line
    this.addTimelineLine(timelineY);
  }
  
  renderBubbles() {
    const rect = this.canvas.getBoundingClientRect();
    
    // Physics-like bubble placement
    this.nodes.forEach(node => {
      let x, y;
      let attempts = 0;
      
      do {
        x = Math.random() * (rect.width - node.size) + node.size / 2;
        y = Math.random() * (rect.height - node.size) + node.size / 2;
        attempts++;
      } while (this.checkCollision(x, y, node.size) && attempts < 50);
      
      node.x = x;
      node.y = y;
      
      this.createNode(node, x, y);
    });
  }
  
  renderTree() {
    // Hierarchical tree structure based on universe → difficulty
    const rect = this.canvas.getBoundingClientRect();
    const universes = Array.from(this.engine.universes.values());
    
    let currentY = 80;
    const universeHeight = (rect.height - 160) / universes.length;
    
    universes.forEach(universe => {
      const universeNodes = this.nodes.filter(n => n.universe === universe.id);
      const difficulties = ['beg', 'int', 'adv'];
      
      let currentX = 100;
      
      difficulties.forEach(diff => {
        const diffNodes = universeNodes.filter(n => n.difficulty === diff);
        const nodeSpacing = diffNodes.length > 0 ? (rect.width - 200) / (difficulties.length * diffNodes.length) : 0;
        
        diffNodes.forEach((node, index) => {
          this.createNode(node, currentX, currentY);
          currentX += nodeSpacing;
        });
      });
      
      currentY += universeHeight;
    });
  }
  
  renderSpiral() {
    const rect = this.canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    this.nodes.forEach((node, index) => {
      const angle = index * 0.5;
      const radius = 20 + index * 8;
      
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      this.createNode(node, x, y);
    });
  }
  
  renderConstellation() {
    // Star constellation pattern based on universe groups
    const rect = this.canvas.getBoundingClientRect();
    const constellationPatterns = this.getConstellationPatterns();
    
    Object.entries(constellationPatterns).forEach(([universe, pattern]) => {
      const universeNodes = this.nodes.filter(n => n.universe === universe);
      
      universeNodes.forEach((node, index) => {
        if (index < pattern.length) {
          const point = pattern[index];
          const x = point.x * rect.width;
          const y = point.y * rect.height;
          
          this.createNode(node, x, y);
        }
      });
    });
    
    this.addConstellationLines();
  }
  
  renderGalaxy() {
    // Spiral galaxy with universe arms
    const rect = this.canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const universes = Array.from(this.engine.universes.keys());
    
    universes.forEach((universe, universeIndex) => {
      const universeNodes = this.nodes.filter(n => n.universe === universe);
      const armAngle = (universeIndex / universes.length) * 2 * Math.PI;
      
      universeNodes.forEach((node, nodeIndex) => {
        const t = nodeIndex * 0.3 + universeIndex;
        const radius = 50 + t * 15;
        const angle = armAngle + t * 0.5;
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        this.createNode(node, x, y);
      });
    });
  }
  
  createNode(node, x, y) {
    const nodeElement = document.createElement('div');
    nodeElement.className = `map-node universe-${node.universe}`;
    nodeElement.dataset.module = node.id;
    nodeElement.dataset.vol = node.volume;
    
    nodeElement.style.left = `${x - node.size / 2}px`;
    nodeElement.style.top = `${y - node.size / 2}px`;
    nodeElement.style.width = `${node.size}px`;
    nodeElement.style.height = `${node.size}px`;
    
    // Content based on mindmap type
    if (this.currentType === 'heatmap') {
      nodeElement.style.opacity = 0.3 + node.heatmapIntensity * 0.7;
    }
    
    nodeElement.innerHTML = `
      <div style="font-size: ${node.size * 0.15}px;">
        ${node.universeIcon}
      </div>
    `;
    
    nodeElement.title = `${node.id}: ${node.title} (${node.progress}% complete)`;
    
    this.canvas.appendChild(nodeElement);
  }
  
  getUniversePositions(rect) {
    return {
      arch: { x: rect.width * 0.2, y: rect.height * 0.3 },
      bash: { x: rect.width * 0.8, y: rect.height * 0.3 },
      python: { x: rect.width * 0.2, y: rect.height * 0.7 },
      security: { x: rect.width * 0.8, y: rect.height * 0.7 },
      cloud: { x: rect.width * 0.5, y: rect.height * 0.2 },
      tools: { x: rect.width * 0.5, y: rect.height * 0.8 }
    };
  }
  
  checkCollision(x, y, size) {
    return this.nodes.some(node => {
      if (!node.x || !node.y) return false;
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      return distance < (size + node.size) / 2 + 10;
    });
  }
  
  addNetworkConnections() {
    // Add connection lines between related modules
    const connections = [
      // BASH fundamentals chain
      ['BASH-F01', 'BASH-F02'],
      ['BASH-F02', 'BASH-F03'],
      ['BASH-F03', 'BASH-F04'],
      ['BASH-F04', 'BASH-F05'],
      ['BASH-F05', 'BASH-F06'],
      ['BASH-F06', 'BASH-F07'],
      ['BASH-F07', 'BASH-F08'],
      
      // ARCH commands prerequisites
      ['BASH-F01', 'ARCH-CMD01'],
      ['ARCH-CMD01', 'ARCH-CMD02'],
      
      // Security prerequisites
      ['BASH-F08', 'SEC-F01'],
      ['SEC-F01', 'SEC-REC01'],
      ['SEC-REC01', 'SEC-REC02']
    ];
    
    connections.forEach(([from, to]) => {
      this.createConnection(from, to);
    });
  }
  
  createConnection(fromId, toId) {
    const fromNode = this.canvas.querySelector(`[data-module="${fromId}"]`);
    const toNode = this.canvas.querySelector(`[data-module="${toId}"]`);
    
    if (!fromNode || !toNode) return;
    
    const fromRect = fromNode.getBoundingClientRect();
    const toRect = toNode.getBoundingClientRect();
    const canvasRect = this.canvas.getBoundingClientRect();
    
    const x1 = fromRect.left + fromRect.width / 2 - canvasRect.left;
    const y1 = fromRect.top + fromRect.height / 2 - canvasRect.top;
    const x2 = toRect.left + toRect.width / 2 - canvasRect.left;
    const y2 = toRect.top + toRect.height / 2 - canvasRect.top;
    
    const line = document.createElement('div');
    line.className = 'map-line';
    
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
    
    this.canvas.appendChild(line);
  }
  
  addLegend() {
    const legend = document.createElement('div');
    legend.className = 'map-legend';
    
    const universes = Array.from(this.engine.universes.values());
    legend.innerHTML = universes.map(universe => `
      <span>
        <span class="legend-dot" style="background: ${universe.color};"></span>
        ${universe.icon} ${universe.name}
      </span>
    `).join('');
    
    this.canvas.parentNode.appendChild(legend);
  }
  
  bindNodeEvents() {
    this.canvas.querySelectorAll('.map-node').forEach(node => {
      node.addEventListener('click', (e) => {
        const moduleId = e.target.closest('.map-node').dataset.module;
        if (moduleId) {
          this.engine.showModule(moduleId);
        }
      });
    });
  }
  
  getConstellationPatterns() {
    // Simplified constellation patterns for each universe
    return {
      arch: [
        { x: 0.1, y: 0.2 }, { x: 0.3, y: 0.1 }, { x: 0.4, y: 0.3 }
      ],
      bash: [
        { x: 0.7, y: 0.1 }, { x: 0.8, y: 0.3 }, { x: 0.9, y: 0.2 }
      ],
      python: [
        { x: 0.1, y: 0.6 }, { x: 0.2, y: 0.8 }, { x: 0.3, y: 0.7 }
      ],
      security: [
        { x: 0.7, y: 0.6 }, { x: 0.8, y: 0.8 }, { x: 0.9, y: 0.7 }
      ],
      cloud: [
        { x: 0.4, y: 0.4 }, { x: 0.5, y: 0.5 }, { x: 0.6, y: 0.4 }
      ],
      tools: [
        { x: 0.4, y: 0.9 }, { x: 0.5, y: 0.8 }, { x: 0.6, y: 0.9 }
      ]
    };
  }
  
  addConstellationLines() {
    // Add lines between constellation points
    Object.entries(this.getConstellationPatterns()).forEach(([universe, pattern]) => {
      for (let i = 0; i < pattern.length - 1; i++) {
        // Implementation would create lines between constellation points
      }
    });
  }
  
  addRadialLines(centerX, centerY) {
    // Add lines from center to nodes
    this.canvas.querySelectorAll('.map-node').forEach(node => {
      const nodeRect = node.getBoundingClientRect();
      const canvasRect = this.canvas.getBoundingClientRect();
      
      const nodeX = nodeRect.left + nodeRect.width / 2 - canvasRect.left;
      const nodeY = nodeRect.top + nodeRect.height / 2 - canvasRect.top;
      
      this.createLine(centerX, centerY, nodeX, nodeY, 'radial-line');
    });
  }
  
  addTimelineLine(y) {
    const rect = this.canvas.getBoundingClientRect();
    const line = document.createElement('div');
    line.className = 'timeline-line';
    line.style.cssText = `
      position: absolute;
      left: 30px;
      right: 30px;
      top: ${y}px;
      height: 2px;
      background: var(--bd);
    `;
    this.canvas.appendChild(line);
  }
  
  createLine(x1, y1, x2, y2, className = 'map-line') {
    const line = document.createElement('div');
    line.className = className;
    
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
    
    this.canvas.appendChild(line);
  }
}

// Integrate with main engine
document.addEventListener('DOMContentLoaded', () => {
  if (window.pinkGalaxy) {
    window.pinkGalaxy.mindmapSystem = new MindmapSystem(window.pinkGalaxy);
    
    // Override renderMindmap method
    window.pinkGalaxy.renderMindmap = function() {
      this.mindmapSystem.renderMindmap();
    };
  }
});