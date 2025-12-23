# AI Roadmap Tracking #

### Built With:

* Next.js
* TypeScript
* Tailwind
* TanStack Query
* Supabase
* Google AI Studio
* Recharts
* dnd-kit

---

### Quick Brief:

A panel that helps you focus on your e-learning journey by generating an AI Roadmap and allowing you to drag and drop goals to change their status.
The AI Assistant can help you with a specific roadmap, with Pomodoro focus on each goal.

---

### Features By Route:

#### Dashboard:

* Shows your current state of completing roadmaps and goals.
* Chart to visualize your roadmaps with completed and total goals.
* See the latest 5 goals you worked on.

#### Roadmaps:

* CRUD your roadmaps.
* View a progress bar for your goals statistics.

#### Roadmap:

* CRUD goals.
* Drag and drop goals to change their status.
* Saving data indicator using `useContext`.
* Live progress bar state.
* Take notes.

#### AI Generator:

* Generate roadmaps and goals using AI (Gemini).
* Save generated roadmaps directly.

#### Notes:

* CRUD notes.
* Download all notes.

#### Focus Mode:

* Select a roadmap and a goal to focus on.
* Pomodoro timer with saved daily rounds.
* Portal timer across the application using `useContext`.
* Play, Pause, Reset, and Over actions.
* Save timer state in `localStorage`.

#### AI Assistant:

* Chatbot that can focus on a specific roadmap.

---

### Auth:

For quick discovery, `proxy.ts` (Middleware) generates a session token and sends it to the `anonymous_users` table to create a user without login or signup.

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

For quick discovery, `proxy.ts` (Middleware) generates a session token and sends it to the `anonymous_users` table to create a user without login or signup.

---

Looking forward to any suggestions 🙂

**Preview:** roadmaptracking.omarragab.dev
**Source:** [https://github.com/Omar-Ragab-Projects/ai-roadmap-tracking/](https://github.com/Omar-Ragab-Projects/ai-roadmap-tracking/)
