/**
 * Pink Galaxy Bible v2 — Cheatsheets System
 * Quick reference cards for daily commands and patterns
 */

class CheatsheetSystem {
  constructor(engine) {
    this.engine = engine;
    this.currentFilter = 'all';
    this.searchTerm = '';
    
    this.cheatsheets = new Map();
    this.loadCheatsheets();
    this.bindEvents();
  }
  
  loadCheatsheets() {
    const sheets = [
      {
        id: 'bash',
        title: 'Bash Essentials',
        category: 'bash',
        subtitle: 'Core scripting patterns',
        sections: [
          {
            title: 'Variables',
            items: [
              { cmd: 'name="value"', desc: 'Assign variable (no spaces!)' },
              { cmd: 'echo $name', desc: 'Read variable' },
              { cmd: '${name}s', desc: 'Safe concatenation' },
              { cmd: '${name:-default}', desc: 'Default value if unset' },
              { cmd: '${#name}', desc: 'String length' },
              { cmd: 'export VAR=value', desc: 'Environment variable' },
              { cmd: 'readonly CONST=val', desc: 'Read-only constant' },
              { cmd: 'unset name', desc: 'Delete variable' }
            ]
          },
          {
            title: 'Conditionals',
            items: [
              { cmd: '[[ -f file ]]', desc: 'File exists' },
              { cmd: '[[ -d dir ]]', desc: 'Directory exists' },
              { cmd: '[[ $a -eq $b ]]', desc: 'Numbers equal' },
              { cmd: '[[ "$a" == "$b" ]]', desc: 'Strings equal' },
              { cmd: '[[ $n -gt 10 ]]', desc: 'Greater than' },
              { cmd: '[[ -z "$var" ]]', desc: 'String is empty' },
              { cmd: '[[ -n "$var" ]]', desc: 'String not empty' },
              { cmd: 'cmd1 && cmd2', desc: 'Run cmd2 if cmd1 succeeds' }
            ]
          },
          {
            title: 'Loops',
            items: [
              { cmd: 'for f in *.txt', desc: 'Loop over files' },
              { cmd: 'for ((i=1;i<=10;i++))', desc: 'C-style numeric loop' },
              { cmd: 'while read line', desc: 'Read file line by line' },
              { cmd: 'for item in "${array[@]}"', desc: 'Loop over array' },
              { cmd: 'break', desc: 'Exit loop' },
              { cmd: 'continue', desc: 'Skip to next iteration' }
            ]
          }
        ]
      },
      
      {
        id: 'git',
        title: 'Git Workflow',
        category: 'tools',
        subtitle: 'Version control essentials',
        sections: [
          {
            title: 'Basic Commands',
            items: [
              { cmd: 'git status', desc: 'Show working tree status' },
              { cmd: 'git add .', desc: 'Stage all changes' },
              { cmd: 'git commit -m "msg"', desc: 'Commit with message' },
              { cmd: 'git push', desc: 'Push to remote' },
              { cmd: 'git pull', desc: 'Fetch and merge' },
              { cmd: 'git log --oneline', desc: 'Compact commit history' },
              { cmd: 'git diff', desc: 'Show unstaged changes' },
              { cmd: 'git reset --hard HEAD', desc: 'Discard all changes' }
            ]
          },
          {
            title: 'Branching',
            items: [
              { cmd: 'git branch', desc: 'List branches' },
              { cmd: 'git checkout -b feature', desc: 'Create and switch branch' },
              { cmd: 'git merge feature', desc: 'Merge branch' },
              { cmd: 'git branch -d feature', desc: 'Delete branch' },
              { cmd: 'git stash', desc: 'Temporarily save changes' },
              { cmd: 'git stash pop', desc: 'Restore stashed changes' }
            ]
          }
        ]
      },
      
      {
        id: 'nmap',
        title: 'Nmap Scanning',
        category: 'security',
        subtitle: 'Network reconnaissance',
        sections: [
          {
            title: 'Basic Scans',
            items: [
              { cmd: 'nmap target', desc: 'Basic port scan' },
              { cmd: 'nmap -sS target', desc: 'SYN stealth scan' },
              { cmd: 'nmap -sU target', desc: 'UDP scan' },
              { cmd: 'nmap -sn 192.168.1.0/24', desc: 'Ping sweep' },
              { cmd: 'nmap -p- target', desc: 'All 65535 ports' },
              { cmd: 'nmap -p 80,443 target', desc: 'Specific ports' },
              { cmd: 'nmap -F target', desc: 'Fast scan (100 ports)' }
            ]
          },
          {
            title: 'Service Detection',
            items: [
              { cmd: 'nmap -sV target', desc: 'Version detection' },
              { cmd: 'nmap -O target', desc: 'OS fingerprinting' },
              { cmd: 'nmap -A target', desc: 'Aggressive scan' },
              { cmd: 'nmap -sC target', desc: 'Default scripts' },
              { cmd: 'nmap --script vuln target', desc: 'Vulnerability scripts' },
              { cmd: 'nmap -T4 target', desc: 'Faster timing' }
            ]
          }
        ]
      },
      
      {
        id: 'docker',
        title: 'Docker Commands',
        category: 'cloud',
        subtitle: 'Container management',
        sections: [
          {
            title: 'Images',
            items: [
              { cmd: 'docker images', desc: 'List local images' },
              { cmd: 'docker pull ubuntu', desc: 'Download image' },
              { cmd: 'docker build -t name .', desc: 'Build from Dockerfile' },
              { cmd: 'docker rmi image', desc: 'Remove image' },
              { cmd: 'docker tag img newtag', desc: 'Tag image' }
            ]
          },
          {
            title: 'Containers',
            items: [
              { cmd: 'docker ps', desc: 'Running containers' },
              { cmd: 'docker ps -a', desc: 'All containers' },
              { cmd: 'docker run -it ubuntu bash', desc: 'Interactive container' },
              { cmd: 'docker stop container', desc: 'Stop container' },
              { cmd: 'docker rm container', desc: 'Remove container' },
              { cmd: 'docker exec -it container bash', desc: 'Enter container' },
              { cmd: 'docker logs container', desc: 'View logs' }
            ]
          }
        ]
      },
      
      {
        id: 'arch',
        title: 'Arch Linux',
        category: 'arch',
        subtitle: 'System management',
        sections: [
          {
            title: 'Package Management',
            items: [
              { cmd: 'sudo pacman -Syu', desc: 'Update system' },
              { cmd: 'sudo pacman -S package', desc: 'Install package' },
              { cmd: 'sudo pacman -R package', desc: 'Remove package' },
              { cmd: 'sudo pacman -Rs package', desc: 'Remove with deps' },
              { cmd: 'pacman -Q', desc: 'List installed' },
              { cmd: 'pacman -Ss search', desc: 'Search packages' },
              { cmd: 'paru package', desc: 'Install from AUR' }
            ]
          },
          {
            title: 'System Info',
            items: [
              { cmd: 'systemctl status service', desc: 'Service status' },
              { cmd: 'journalctl -f', desc: 'Follow logs' },
              { cmd: 'df -h', desc: 'Disk usage' },
              { cmd: 'free -h', desc: 'Memory usage' },
              { cmd: 'lscpu', desc: 'CPU information' },
              { cmd: 'lsblk', desc: 'Block devices' }
            ]
          }
        ]
      },
      
      {
        id: 'regex',
        title: 'Regular Expressions',
        category: 'tools',
        subtitle: 'Pattern matching',
        sections: [
          {
            title: 'Basic Patterns',
            items: [
              { cmd: '.', desc: 'Any character' },
              { cmd: '^', desc: 'Start of line' },
              { cmd: '$', desc: 'End of line' },
              { cmd: '*', desc: 'Zero or more' },
              { cmd: '+', desc: 'One or more' },
              { cmd: '?', desc: 'Zero or one' },
              { cmd: '[abc]', desc: 'Character class' },
              { cmd: '[^abc]', desc: 'Negated class' }
            ]
          },
          {
            title: 'Common Uses',
            items: [
              { cmd: '\\d+', desc: 'One or more digits' },
              { cmd: '\\w+', desc: 'Word characters' },
              { cmd: '\\s+', desc: 'Whitespace' },
              { cmd: '(group)', desc: 'Capture group' },
              { cmd: 'foo|bar', desc: 'Alternation' },
              { cmd: '{3,5}', desc: 'Repeat 3-5 times' }
            ]
          }
        ]
      },
      
      {
        id: 'vim',
        title: 'Vim Commands',
        category: 'tools',
        subtitle: 'Text editor navigation',
        sections: [
          {
            title: 'Movement',
            items: [
              { cmd: 'h j k l', desc: 'Left down up right' },
              { cmd: 'w', desc: 'Next word' },
              { cmd: 'b', desc: 'Previous word' },
              { cmd: '0', desc: 'Start of line' },
              { cmd: '$', desc: 'End of line' },
              { cmd: 'gg', desc: 'First line' },
              { cmd: 'G', desc: 'Last line' },
              { cmd: 'Ctrl+d', desc: 'Page down' }
            ]
          },
          {
            title: 'Editing',
            items: [
              { cmd: 'i', desc: 'Insert mode' },
              { cmd: 'a', desc: 'Append' },
              { cmd: 'o', desc: 'New line below' },
              { cmd: 'x', desc: 'Delete character' },
              { cmd: 'dd', desc: 'Delete line' },
              { cmd: 'yy', desc: 'Yank (copy) line' },
              { cmd: 'p', desc: 'Paste' },
              { cmd: 'u', desc: 'Undo' }
            ]
          }
        ]
      },
      
      {
        id: 'network-ports',
        title: 'Network Ports',
        category: 'security',
        subtitle: 'Common service ports',
        sections: [
          {
            title: 'Web Services',
            items: [
              { cmd: '80', desc: 'HTTP' },
              { cmd: '443', desc: 'HTTPS' },
              { cmd: '8080', desc: 'HTTP alternate' },
              { cmd: '8443', desc: 'HTTPS alternate' }
            ]
          },
          {
            title: 'Remote Access',
            items: [
              { cmd: '22', desc: 'SSH' },
              { cmd: '23', desc: 'Telnet' },
              { cmd: '3389', desc: 'RDP' },
              { cmd: '5900', desc: 'VNC' }
            ]
          },
          {
            title: 'Databases',
            items: [
              { cmd: '3306', desc: 'MySQL' },
              { cmd: '5432', desc: 'PostgreSQL' },
              { cmd: '1433', desc: 'SQL Server' },
              { cmd: '27017', desc: 'MongoDB' }
            ]
          }
        ]
      },
      
      {
        id: 'aws-cli',
        title: 'AWS CLI',
        category: 'cloud',
        subtitle: 'Cloud management',
        sections: [
          {
            title: 'S3',
            items: [
              { cmd: 'aws s3 ls', desc: 'List buckets' },
              { cmd: 'aws s3 cp file s3://bucket/', desc: 'Upload file' },
              { cmd: 'aws s3 sync . s3://bucket/', desc: 'Sync directory' },
              { cmd: 'aws s3 rm s3://bucket/file', desc: 'Delete file' }
            ]
          },
          {
            title: 'EC2',
            items: [
              { cmd: 'aws ec2 describe-instances', desc: 'List instances' },
              { cmd: 'aws ec2 start-instances', desc: 'Start instance' },
              { cmd: 'aws ec2 stop-instances', desc: 'Stop instance' },
              { cmd: 'aws ec2 describe-images', desc: 'List AMIs' }
            ]
          }
        ]
      },
      
      {
        id: 'python-security',
        title: 'Python Security',
        category: 'security',
        subtitle: 'Secure coding patterns',
        sections: [
          {
            title: 'Input Validation',
            items: [
              { cmd: 'import re; re.match(pattern, input)', desc: 'Regex validation' },
              { cmd: 'str.isdigit()', desc: 'Check if numeric' },
              { cmd: 'len(password) >= 8', desc: 'Length validation' },
              { cmd: 'input().strip()', desc: 'Remove whitespace' }
            ]
          },
          {
            title: 'SQL Safety',
            items: [
              { cmd: 'cursor.execute(sql, params)', desc: 'Parameterized query' },
              { cmd: 'sqlalchemy.text()', desc: 'Safe SQL text' },
              { cmd: 'escape_string()', desc: 'Escape special chars' },
              { cmd: 'Never use: f"SELECT * FROM users WHERE id={user_id}"', desc: '❌ SQL injection risk' }
            ]
          }
        ]
      }
    ];
    
    sheets.forEach(sheet => this.cheatsheets.set(sheet.id, sheet));
  }
  
  bindEvents() {
    // Search functionality
    document.addEventListener('input', (e) => {
      if (e.target.matches('.cheat-search input')) {
        this.searchTerm = e.target.value.toLowerCase();
        this.renderCheatsheets();
      }
    });
    
    // Category filters
    document.addEventListener('click', (e) => {
      if (e.target.matches('.cheat-filter')) {
        const category = e.target.dataset.category;
        this.setFilter(category);
      }
    });
    
    // Expand buttons
    document.addEventListener('click', (e) => {
      if (e.target.matches('.cheat-expand')) {
        this.expandCheatsheet(e.target);
      }
    });
  }
  
  setFilter(category) {
    this.currentFilter = category;
    
    // Update button states
    document.querySelectorAll('.cheat-filter').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === category);
    });
    
    this.renderCheatsheets();
  }
  
  renderCheatsheets() {
    const container = document.querySelector('.cheat-grid');
    if (!container) return;
    
    // Filter cheatsheets
    const filteredSheets = Array.from(this.cheatsheets.values()).filter(sheet => {
      // Category filter
      if (this.currentFilter !== 'all' && sheet.category !== this.currentFilter) {
        return false;
      }
      
      // Search filter
      if (this.searchTerm) {
        const searchableText = `
          ${sheet.title} 
          ${sheet.subtitle} 
          ${sheet.sections.map(s => s.title + ' ' + s.items.map(i => i.cmd + ' ' + i.desc).join(' ')).join(' ')}
        `.toLowerCase();
        
        return searchableText.includes(this.searchTerm);
      }
      
      return true;
    });
    
    // Render cards
    container.innerHTML = filteredSheets.map(sheet => this.renderCheatsheetCard(sheet)).join('');
  }
  
  renderCheatsheetCard(sheet) {
    const displaySections = sheet.sections.slice(0, 2); // Show first 2 sections
    const hasMore = sheet.sections.length > 2;
    
    return `
      <div class="cheat-card" data-sheet="${sheet.id}">
        <div class="cheat-header">
          <div class="cheat-title">${sheet.title}</div>
          <div class="cheat-subtitle">${sheet.subtitle}</div>
        </div>
        <div class="cheat-body">
          ${displaySections.map(section => `
            <div class="cheat-section">
              <div class="cheat-section-title">${section.title}</div>
              <div class="cheat-items">
                ${section.items.map(item => `
                  <div class="cheat-item">
                    <code class="cheat-cmd">${item.cmd}</code>
                    <span class="cheat-desc">${item.desc}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
          
          ${hasMore ? `
            <button class="cheat-expand" data-sheet="${sheet.id}">
              Show ${sheet.sections.length - 2} more sections
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }
  
  expandCheatsheet(button) {
    const sheetId = button.dataset.sheet;
    const sheet = this.cheatsheets.get(sheetId);
    if (!sheet) return;
    
    const card = button.closest('.cheat-card');
    const body = card.querySelector('.cheat-body');
    
    // Render all sections
    const allSections = sheet.sections.map(section => `
      <div class="cheat-section">
        <div class="cheat-section-title">${section.title}</div>
        <div class="cheat-items">
          ${section.items.map(item => `
            <div class="cheat-item">
              <code class="cheat-cmd">${item.cmd}</code>
              <span class="cheat-desc">${item.desc}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
    
    body.innerHTML = allSections + `
      <button class="cheat-expand collapsed" data-sheet="${sheetId}">
        Show less
      </button>
    `;
    
    // Update button behavior
    const newButton = body.querySelector('.cheat-expand');
    newButton.addEventListener('click', () => {
      this.renderCheatsheets(); // Re-render to collapse
    });
  }
  
  renderCheatsheetFilters() {
    const filterContainer = document.querySelector('.cheat-filters');
    if (!filterContainer) return;
    
    const categories = ['all', 'bash', 'tools', 'security', 'cloud', 'arch'];
    const categoryIcons = {
      all: '🌐',
      bash: '⚡',
      tools: '🛠️',
      security: '🔒',
      cloud: '☁️',
      arch: '🐧'
    };
    
    filterContainer.innerHTML = categories.map(cat => `
      <button class="cheat-filter ${cat} ${this.currentFilter === cat ? 'active' : ''}" 
              data-category="${cat}">
        ${categoryIcons[cat]} ${cat.charAt(0).toUpperCase() + cat.slice(1)}
      </button>
    `).join('');
  }
}

// Integrate with main engine
document.addEventListener('DOMContentLoaded', () => {
  if (window.pinkGalaxy) {
    window.pinkGalaxy.cheatsheetSystem = new CheatsheetSystem(window.pinkGalaxy);
    
    // Override renderCheatsheets method
    window.pinkGalaxy.renderCheatsheets = function() {
      this.cheatsheetSystem.renderCheatsheetFilters();
      this.cheatsheetSystem.renderCheatsheets();
    };
  }
});