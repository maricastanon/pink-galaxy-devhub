# 🌸 Pink Galaxy DevHub

**Your Universal Learning Operating System**

A comprehensive, cloud-powered learning platform for technical skills including Arch Linux, Security, Python, Cloud Architecture, and more.

## 🚀 Features

### 🔐 Authentication
- Secure login with username/password
- Session management
- User roles: admin, user

### 📚 Learning Modules
- **GUIDES**: Complete Arch Linux installation (Parts 1-4)
- **BASH**: Scripting fundamentals to advanced
- **ARCH**: Linux command mastery  
- **SECURITY**: Ethical hacking and BlackArch
- **PYTHON**: From basics to data engineering
- **CLOUD**: AWS, Azure, Databricks

### ☁️ Cloud Sync
- Real-time progress synchronization across devices
- Offline-first with automatic sync when online
- Conflict resolution for multi-device usage

### 🎮 Gamification
- XP rewards for completing sections
- Progress tracking and completion badges
- Learning streaks and achievements

### 🧠 Neurodivergent-Friendly Design
- Multiple explanation levels (Simple, Technical, Deep)
- Estimated time for each section
- Focus mode and reading aids
- Visual progress indicators

## 🏗️ Architecture

### Frontend
- Single-page application with modular design
- Pink Galaxy theme with responsive UI
- Real-time sync indicators

### Backend (AWS Amplify)
- **Authentication**: AWS Cognito
- **Database**: DynamoDB for user progress
- **API**: API Gateway + Lambda functions
- **Hosting**: AWS Amplify with CI/CD

### Tables
- `UserProgress`: Module completion and section progress
- `UserNotebooks`: Learning notes and highlights  
- `UserProfiles`: User preferences and settings

## 🛠️ Development

### Local Setup
1. Clone repository
2. Open `index.html` in browser
3. Login with credentials:
   - Username: `linda`, Password: `Mari62739!`
   - Username: `amor`, Password: `Amor62739!`

### AWS Deployment
```bash
# Initialize Amplify
amplify init

# Add authentication
amplify add auth

# Add storage (DynamoDB)
amplify add storage

# Add API functions
amplify add function

# Deploy all
amplify push
```

## 🎯 Usage

1. **Login**: Enter your credentials to access the platform
2. **Dashboard**: View progress and select modules to study
3. **Modules**: Complete sections, quizzes, and hands-on exercises
4. **Sync**: Your progress automatically syncs across all devices

## 🔧 Technical Details

### Authentication Flow
1. User enters credentials on login gate
2. SHA-256 hash verification (temporary, will migrate to Cognito)
3. Session storage with automatic expiry
4. Progress tied to authenticated user ID

### Data Flow
1. Local progress saved to localStorage immediately
2. Changes queued for cloud sync every 30 seconds
3. Conflict resolution using timestamp comparison
4. Real-time sync indicator updates

### Module Structure
```javascript
{
  id: 'BASH-F01',
  universe: 'BASH',
  title: 'Your First Script',
  difficulty: 'beginner',
  sections: ['What is a Script?', 'Shebang', 'Writing', ...],
  xp: 80
}
```

## 🌟 Roadmap

- [ ] Complete AWS Amplify deployment
- [ ] Implement real Cognito authentication
- [ ] Add interactive mindmap visualization
- [ ] Content generation for all modules
- [ ] Mobile app (React Native)
- [ ] Collaborative learning features

## 👥 Users

- **linda** (admin): Full access to all content and user management
- **amor** (user): Access to learning content and personal progress

---

**Built with ❤️ for lifelong learners**

🌸 *Pink Galaxy — Where knowledge becomes infinite*