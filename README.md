# QuizMaster 🎮

A sleek, neon-themed quiz application built with SvelteKit 5 and Tailwind CSS v4. Test your knowledge with customizable quizzes featuring a modern retro-futuristic design.

![QuizMaster](https://img.shields.io/badge/SvelteKit-5.0-FF3E00?style=flat-square&logo=svelte)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)

## Features

- 🎨 **Neon Retro-Futuristic Design** - Eye-catching UI with glowing effects and smooth animations
- 📚 **Multiple Quiz Categories** - Support for different topics (e.g., AWS Solutions Architect)
- ⚙️ **Configurable Quizzes** - Choose question type and count before starting
- 📊 **Real-time Progress Tracking** - Score and progress displayed during the quiz
- 📝 **Detailed Results** - Review all questions with correct/incorrect answers after completion
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: [SvelteKit 5](https://kit.svelte.dev/) with Svelte 5 runes
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: TypeScript
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd quizmaster
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Start the development server:

   ```bash
   bun run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
quizmaster/
├── src/
│   ├── lib/
│   │   ├── components/      # Reusable UI components
│   │   ├── services/        # Business logic (quiz service)
│   │   └── types/           # TypeScript type definitions
│   ├── routes/
│   │   ├── +page.svelte     # Home page (category selection)
│   │   ├── quiz/
│   │   │   └── [category]/  # Quiz configuration page
│   │   └── play/
│   │       └── [category]/  # Quiz player & results
│   └── app.css              # Global styles & design system
├── static/
│   └── data/                # Quiz data (JSON files)
└── package.json
```

## Adding Quiz Content

Quiz questions are stored as JSON files in `static/data/<category-id>/`. Each category folder should contain a JSON file with the following structure:

```json
{
  "id": "category-id",
  "name": "Category Name",
  "questions": [
    {
      "id": 1,
      "question": "What is the correct answer?",
      "type": "THEORY",
      "options": [
        { "text": "Option A", "isCorrect": false },
        { "text": "Option B", "isCorrect": true },
        { "text": "Option C", "isCorrect": false },
        { "text": "Option D", "isCorrect": false }
      ],
      "explanation": "Explanation of the correct answer..."
    }
  ]
}
```

**After adding a file in `./static/data/`, add its key to `./src/lib/services/quiz-service.ts`**

### Question Types

- `THEORY` - Concept-focused questions
- `ARCHITECT` - Scenario-based questions

## Docker Deployment

### Build and Run with Docker Compose

```bash
# Build and start the container
docker compose up -d --build

# View logs
docker compose logs -f

# Stop the container
docker compose down
```

### Build Docker Image Manually

```bash
# Build the image
docker build -t rotour/quizmaster:latest .

# Run the container
docker run -d -p 3000:3000 rotour/quizmaster:latest
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command                | Description                |
| ---------------------- | -------------------------- |
| `bun run dev`          | Start development server   |
| `bun run build`        | Build for production       |
| `bun run preview`      | Preview production build   |
| `bun run check`        | Run Svelte type checking   |
| `docker compose up -d` | Start production container |

## Design System

The app uses a custom neon/retro-futuristic design system with:

- **Colors**: Neon pink, cyan, green, and yellow accents on a dark background
- **Typography**: Outfit (display) and Inter (body) fonts
- **Effects**: Glowing borders, hover animations, and smooth transitions

## License

MIT
