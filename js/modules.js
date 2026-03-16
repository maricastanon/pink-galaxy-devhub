/**
 * Pink Galaxy Bible v2 — Module System
 * Module content loading, rendering, and interaction
 */

class ModuleSystem {
  constructor(engine) {
    this.engine = engine;
    this.currentModule = null;
    this.currentSection = 0;
    this.currentExplanation = 'simple';
    this.moduleContent = new Map();
    
    this.initModuleContent();
  }
  
  initModuleContent() {
    // Load module content from the 19 bricks
    this.loadBashFundamentals();
    this.loadArchCommands();
    this.loadSecurityModules();
  }
  
  loadBashFundamentals() {
    // BASH-F01: Your First Script (Brick 1 sample)
    this.moduleContent.set('BASH-F01', {
      sections: [
        {
          id: 0,
          title: "What is a Script?",
          explanations: {
            simple: `Think of a script like a recipe 👩‍🍳
            
A recipe tells you step-by-step how to make something delicious. A script tells your computer step-by-step what commands to run.

Instead of typing the same commands over and over, you write them once in a file, then run that file anytime you want.`,
            
            technical: `A script is a text file containing a sequence of shell commands that can be executed as a program.
            
Key characteristics:
- Contains executable commands
- Has a shebang line (#!/bin/bash)
- Can accept parameters
- Returns exit codes
- Can be made executable with chmod +x`,
            
            deep: `At the kernel level, when you execute a script:

1. The shell reads the shebang line (#!/bin/bash)
2. Kernel's execve() system call launches the interpreter
3. The interpreter parses and executes each command
4. Each command becomes a child process via fork()/exec()
5. The script's exit code comes from the last command`
          },
          codeExample: {
            code: `#!/bin/bash
# My first script
echo "Hello, Pink Galaxy!"
echo "Today is $(date)"
echo "I am $(whoami)"`,
            output: `Hello, Pink Galaxy!
Today is Sun Mar 16 15:42:10 CET 2025
I am casta`
          },
          quiz: {
            question: "What makes a text file executable as a script?",
            options: [
              "Adding the .sh extension",
              "Setting execute permissions with chmod +x",
              "Writing it in a special folder",
              "Using CAPITAL letters"
            ],
            correct: 1,
            explanation: "The chmod +x command sets the execute permission bit, telling the system this file can be run as a program."
          }
        },
        {
          id: 2,
          title: "Writing Your First Script",
          explanations: {
            simple: `Let's cook our first script! 🍳

Just like following a recipe step by step, we'll create a script that runs several commands in order.

Think of it as your computer's morning routine - check the date, see who's logged in, and say hello!`,
            
            technical: `Script creation workflow:
1. Create file with .sh extension
2. Add shebang line #!/bin/bash
3. Write commands line by line
4. Make executable with chmod +x
5. Execute with ./filename.sh`,
            
            deep: `The shebang mechanism uses the execve() system call with binfmt handlers:

1. Kernel reads first 2 bytes: #!
2. Parses interpreter path after shebang
3. Executes: /bin/bash script_name args
4. The script becomes argv[0] to bash
5. Bash lexically analyzes and executes each line`
          },
          codeExample: {
            code: `#!/bin/bash
# morning_routine.sh - My computer's morning checklist

echo "🌅 Good morning! Starting daily routine..."
echo "📅 Today is: $(date '+%A, %B %d, %Y')"
echo "👤 Logged in as: $(whoami)"
echo "💻 System: $(uname -o)"
echo "📍 Current directory: $(pwd)"
echo "✅ Morning routine complete!"`,
            output: `🌅 Good morning! Starting daily routine...
📅 Today is: Sunday, March 16, 2025
👤 Logged in as: casta
💻 System: GNU/Linux
📍 Current directory: /home/casta
✅ Morning routine complete!`
          },
          quiz: {
            question: "What is the first line of every bash script?",
            options: [
              "#!/bin/bash",
              "#start bash",
              "begin script",
              "#!/usr/bin/sh"
            ],
            correct: 0,
            explanation: "#!/bin/bash is the shebang line that tells the system to use bash to interpret this script."
          }
        }
      ]
    });
    
    // Add more BASH modules with placeholder content
    this.moduleContent.set('BASH-F02', this.createPlaceholderModule('BASH-F02', 'Variables & Data Types', 7));
    this.moduleContent.set('BASH-F03', this.createPlaceholderModule('BASH-F03', 'Quoting & Expansion', 6));
    this.moduleContent.set('BASH-F04', this.createPlaceholderModule('BASH-F04', 'Conditionals', 6));
    this.moduleContent.set('BASH-F05', this.createPlaceholderModule('BASH-F05', 'Loops', 6));
    this.moduleContent.set('BASH-F06', this.createPlaceholderModule('BASH-F06', 'Functions', 6));
    this.moduleContent.set('BASH-F07', this.createPlaceholderModule('BASH-F07', 'Input/Output', 6));
    this.moduleContent.set('BASH-F08', this.createPlaceholderModule('BASH-F08', 'Error Handling', 6));
  }
  
  loadArchCommands() {
    // Add ARCH command modules with placeholder content
    this.moduleContent.set('ARCH-CMD01', this.createPlaceholderModule('ARCH-CMD01', 'Navigation & Files', 7));
    this.moduleContent.set('ARCH-CMD02', this.createPlaceholderModule('ARCH-CMD02', 'Text Processing', 8));
    this.moduleContent.set('ARCH-CMD03', this.createPlaceholderModule('ARCH-CMD03', 'Permissions & Users', 6));
    this.moduleContent.set('ARCH-CMD04', this.createPlaceholderModule('ARCH-CMD04', 'Process Management', 7));
    this.moduleContent.set('ARCH-CMD05', this.createPlaceholderModule('ARCH-CMD05', 'Networking', 7));
    this.moduleContent.set('ARCH-CMD06', this.createPlaceholderModule('ARCH-CMD06', 'Package Management', 7));
  }
  
  loadSecurityModules() {
    // Add Security modules with placeholder content
    this.moduleContent.set('SEC-F01', this.createPlaceholderModule('SEC-F01', 'Security Foundations', 7));
    this.moduleContent.set('SEC-REC01', this.createPlaceholderModule('SEC-REC01', 'Reconnaissance', 7));
    this.moduleContent.set('SEC-REC02', this.createPlaceholderModule('SEC-REC02', 'nmap Mastery', 7));
    this.moduleContent.set('SEC-WEB01', this.createPlaceholderModule('SEC-WEB01', 'Web Application Security', 7));
    this.moduleContent.set('SEC-NET01', this.createPlaceholderModule('SEC-NET01', 'Network Analysis', 7));
  }
  
  createPlaceholderModule(moduleId, title, sectionCount) {
    const sections = [];
    for (let i = 0; i < sectionCount; i++) {
      sections.push({
        id: i,
        title: `Section ${i + 1}`,
        explanations: {
          simple: `This is the simple explanation for ${title} - Section ${i + 1}.
          
🚧 This section is ready to be built using the content from the 19 bricks.
          
The complete content includes three explanation levels, code examples, consequence maps, interactive quizzes, and graduated practice exercises.`,
          
          technical: `Technical explanation for ${moduleId} Section ${i + 1}.
          
This section covers the technical aspects with precise terminology and implementation details.`,
          
          deep: `Deep dive explanation for ${moduleId} Section ${i + 1}.
          
This includes the underlying system implementation, kernel details, and advanced concepts.`
        },
        codeExample: {
          code: `# ${title} - Section ${i + 1} example
echo "This is a placeholder for the actual code example"
# The real content will be integrated from the 19 bricks`,
          output: `This is a placeholder for the actual code example`
        },
        quiz: {
          question: `Sample quiz question for ${title} - Section ${i + 1}?`,
          options: [
            "Option A",
            "Option B", 
            "Option C",
            "Option D"
          ],
          correct: 0,
          explanation: "This quiz will be replaced with the actual content from the bricks."
        }
      });
    }
    return { sections };
  }
  
  showModule(moduleId) {
    const module = this.engine.modules.get(moduleId);
    if (!module) return;
    
    this.currentModule = moduleId;
    this.currentSection = 0;
    this.currentExplanation = 'simple';
    
    this.renderModuleView(module);
    this.engine.showView('module');
  }
  
  renderModuleView(module) {
    const universe = this.engine.universes.get(module.universe);
    const content = this.moduleContent.get(module.id);
    
    if (!content) {
      console.warn(`No content found for module ${module.id}`);
      return;
    }
    
    const moduleHtml = `
      <div class="mod-back">← Back to Dashboard</div>
      
      <div class="mod-header">
        <div class="mod-id">${module.id}</div>
        <h1 class="mod-title">${universe?.icon || ''} ${module.title}</h1>
        <p class="mod-desc">${module.description}</p>
        <div class="mod-meta">
          <span>📊 ${module.sections} Sections</span>
          <span>🎯 ${module.difficulty.toUpperCase()}</span>
          <span>⚡ +${module.xpReward} XP</span>
          <span>📈 ${module.progress.percentage || 0}% Complete</span>
        </div>
      </div>
      
      <div class="mod-sections">
        ${content.sections.map((section, index) => this.renderSection(section, index)).join('')}
      </div>
    `;
    
    const moduleView = document.getElementById('module-view');
    if (moduleView) {
      moduleView.innerHTML = moduleHtml;
      this.bindModuleEvents();
    }
  }
  
  renderSection(section, index) {
    const isExpanded = index === this.currentSection;
    
    return `
      <div class="section ${isExpanded ? 'expanded' : ''}" data-section="${index}">
        <div class="section-header">
          <h3 class="section-title">${section.title}</h3>
          <span class="section-toggle">▶</span>
        </div>
        <div class="section-body">
          ${this.renderSectionContent(section)}
        </div>
      </div>
    `;
  }
  
  renderSectionContent(section) {
    return `
      <div class="explanation-tabs">
        <button class="exp-tab ${this.currentExplanation === 'simple' ? 'active' : ''}" data-explanation="simple">
          🌱 Simple
        </button>
        <button class="exp-tab ${this.currentExplanation === 'technical' ? 'active' : ''}" data-explanation="technical">
          ⚙️ Technical
        </button>
        <button class="exp-tab ${this.currentExplanation === 'deep' ? 'active' : ''}" data-explanation="deep">
          🔬 Deep Dive
        </button>
      </div>
      
      ${Object.entries(section.explanations).map(([type, content]) => `
        <div class="explanation ${this.currentExplanation === type ? 'active' : ''}" data-explanation="${type}">
          <p>${content.replace(/\n/g, '<br>')}</p>
        </div>
      `).join('')}
      
      ${section.codeExample ? `
        <div class="code-block">
          <pre><code>${section.codeExample.code}</code></pre>
        </div>
        <div class="output-block">
          <strong>Output:</strong><br>
          ${section.codeExample.output}
        </div>
      ` : ''}
      
      ${section.quiz ? this.renderQuiz(section.quiz) : ''}
    `;
  }
  
  renderQuiz(quiz) {
    return `
      <div class="quiz-section">
        <div class="quiz-question">${quiz.question}</div>
        <div class="quiz-options">
          ${quiz.options.map((option, index) => `
            <div class="quiz-option" data-option="${index}">${option}</div>
          `).join('')}
        </div>
        <div class="quiz-feedback"></div>
      </div>
    `;
  }
  
  bindModuleEvents() {
    // Section toggles
    document.querySelectorAll('.section-header').forEach(header => {
      header.addEventListener('click', (e) => {
        const section = e.target.closest('.section');
        const sectionIndex = parseInt(section.dataset.section);
        this.toggleSection(sectionIndex);
      });
    });
    
    // Explanation tabs
    document.querySelectorAll('.exp-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const explanation = e.target.dataset.explanation;
        this.showExplanation(explanation);
      });
    });
    
    // Quiz options
    document.querySelectorAll('.quiz-option').forEach(option => {
      option.addEventListener('click', (e) => {
        const optionIndex = parseInt(e.target.dataset.option);
        this.answerQuiz(optionIndex, e.target.closest('.quiz-section'));
      });
    });
  }
  
  toggleSection(sectionIndex) {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
      if (index === sectionIndex) {
        section.classList.toggle('expanded');
        if (section.classList.contains('expanded')) {
          this.currentSection = sectionIndex;
        }
      } else {
        section.classList.remove('expanded');
      }
    });
  }
  
  showExplanation(explanation) {
    this.currentExplanation = explanation;
    
    // Update tab states
    document.querySelectorAll('.exp-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.explanation === explanation);
    });
    
    // Update explanation content
    document.querySelectorAll('.explanation').forEach(exp => {
      exp.classList.toggle('active', exp.dataset.explanation === explanation);
    });
  }
  
  answerQuiz(selectedOption, quizElement) {
    const moduleContent = this.moduleContent.get(this.currentModule);
    const section = moduleContent.sections[this.currentSection];
    const quiz = section.quiz;
    
    const options = quizElement.querySelectorAll('.quiz-option');
    const feedback = quizElement.querySelector('.quiz-feedback');
    
    // Mark selected option
    options.forEach((option, index) => {
      option.classList.remove('selected', 'correct', 'incorrect');
      if (index === selectedOption) {
        option.classList.add('selected');
        if (index === quiz.correct) {
          option.classList.add('correct');
          this.awardXP(10); // Quiz XP
        } else {
          option.classList.add('incorrect');
        }
      } else if (index === quiz.correct) {
        option.classList.add('correct');
      }
    });
    
    // Show feedback
    feedback.className = `quiz-feedback ${selectedOption === quiz.correct ? 'correct' : 'incorrect'}`;
    feedback.textContent = quiz.explanation;
    
    // Disable further clicking
    options.forEach(option => {
      option.style.pointerEvents = 'none';
    });
  }
  
  awardXP(amount) {
    this.engine.user.xp += amount;
    this.engine.saveUserData();
    this.engine.updateUI();
    
    // Show notification
    this.showNotification(`+${amount} XP earned!`, 'success');
  }
  
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// Extend the main engine with module functionality
document.addEventListener('DOMContentLoaded', () => {
  if (window.pinkGalaxy) {
    window.pinkGalaxy.moduleSystem = new ModuleSystem(window.pinkGalaxy);
    
    // Add showModule method to main engine
    window.pinkGalaxy.showModule = function(moduleId) {
      this.moduleSystem.showModule(moduleId);
    };
  }
});