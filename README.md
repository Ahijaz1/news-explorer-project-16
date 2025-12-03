# News Explorer Application

**Live Demo:** [https://ahijaz1.github.io/news-explorer-project-16/](https://ahijaz1.github.io/news-explorer-project-16/)

This repository contains my capstone project for the TripleTen Software Engineering Bootcamp.
The News Explorer Application is a React-based frontend designed to demonstrate mastery of modern web development techniques, project planning, API integration, UI/UX design, and professional deployment practices.

## Features

- 🔍 **Article Search**: Search for news articles using the NewsAPI
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 👤 **User Authentication**: Register and login functionality (Stage 1: simulated backend)
- 💾 **Save Articles**: Bookmark articles for later reading
- 🎨 **Modern UI**: Clean, professional interface with smooth interactions
- ⚡ **Fast Performance**: Built with Vite for optimal loading speeds

## Tech Stack

**Frontend:** React 19 (JSX)
**Styling:** CSS (BEM methodology, responsive design)
**Build Tool:** Vite
**Package Manager:** npm
**APIs:** NewsAPI, simulated Auth API
**Deployment:** GitHub Pages
**Router:** React Router DOM (HashRouter for GitHub Pages compatibility)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Ahijaz1/news-explorer-project-16.git
cd news-explorer-project-16
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run predeploy` - Build for deployment
- `npm run deploy` - Deploy to GitHub Pages

## Deployment

This project is automatically deployed to GitHub Pages using the `gh-pages` package.

**Live URL:** [https://ahijaz1.github.io/news-explorer-project-16/](https://ahijaz1.github.io/news-explorer-project-16/)

To deploy updates:

```bash
npm run deploy
```

## Backend Simulation (Stage 1)

Since this is Stage 1 of the project, the backend functionality is simulated using Promise-based functions:

- **Authentication**: Login/register with fake user validation
- **Article Management**: Save/remove articles with simulated database storage
- **Data Persistence**: Uses localStorage for demo purposes

See `src/utils/auth-simple.js` and `src/utils/api.js` for implementation details.

## Future Improvements (Stage 2/3)

- Real backend API integration with Express.js
- Database integration with MongoDB
- Enhanced user profile management
- Advanced search filters and sorting
- Social sharing features
- Article recommendations

## Contributing

This project was developed as part of the TripleTen Software Engineering Bootcamp. While it's primarily for educational purposes, suggestions and feedback are welcome!

## Project Structure

```
news-explorer-project-16/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── App/          # Main application component
│   │   ├── Header/       # Navigation and auth
│   │   ├── Main/         # Homepage hero section
│   │   ├── SearchForm/   # Article search functionality
│   │   ├── SearchResults/# Search results display
│   │   ├── NewsCard/     # Individual article cards
│   │   ├── SavedArticles/# Saved articles page
│   │   ├── LoginModal/   # Authentication modal
│   │   ├── RegisterModal/# Registration modal
│   │   ├── About/        # About section
│   │   └── Footer/       # Site footer
│   ├── utils/            # Helper functions and APIs
│   │   ├── newsAPI.js   # NewsAPI integration
│   │   ├── auth-simple.js # Authentication simulation
│   │   ├── api.js       # Article management simulation
│   │   └── index.js     # Utility functions
│   └── assets/          # Images and static files
├── dist/                 # Production build
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies and scripts
```

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- NewsAPI key (for article search functionality)

### Installation

## Contributing

This project was developed as part of the TripleTen Software Engineering Bootcamp. While it's primarily for educational purposes, suggestions and feedback are welcome!

---

**Built with ❤️ by Amin Hijaz**

```

```
