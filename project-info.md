# Project Pathfinder: Project Information & Plan

**Version:** 1.2 (Analytics & Gamification Update)
**Date:** October 26, 2023

This document serves as the single source of truth for the Pathfinder project, outlining its vision, technical architecture, operational plan, and a detailed Agile roadmap.

---

## 1. Project Vision & Requirements

### 1.1. Vision

Pathfinder is a modern, AI-augmented web application designed to transform how individuals approach learning. It allows users to generate dynamic learning roadmaps, track their progress, engage with an interactive AI tutor, build a personal knowledge base, and stay motivated through a personalized analytics dashboard and gamified streak tracking.

### 1.2. Functional Requirements

- **User Management:** Users must be able to register, log in, and manage their accounts.
- **Roadmap Management:** Users must be able to create, view, and manage learning roadmaps, milestones, and topics.
- **AI-Powered Content:** The system must generate roadmaps, persistent practice questions, and flashcards using an LLM.
- **Knowledge Base:** Users must be able to create, edit, format, tag, and link notes.
- **AI Tutor:** The system must provide a real-time, conversational AI tutor.
- **Progress Tracking:** Users must be able to visually track progress via a Kanban board.
- **Analytics Dashboard:** The dashboard must display key metrics and visualizations of the user's learning activity.
- **Gamification:** The system must track and display a user's daily learning streak to encourage consistent engagement.

### 1.3. Non-Functional Requirements

- **Architecture:** The backend will be a set of independent, containerized microservices communicating via APIs and an event bus.
- **Cloud-Ready Design:** The system is designed for a future cloud migration by using environment variables for all configuration.
- **Reliability:** The system will have automated testing (CI) and a clear development workflow.
- **Security:** User authentication must be secure (JWTs), and all services will operate within a private, containerized network.

---

## 2. System & Operational Architecture

### 2.1. Microservices Architecture Diagram (with Event Bus)

*This diagram shows the logical separation of services and their communication via direct API calls and an event bus (RabbitMQ).*

```plaintext
      ┌────────────────────┐
      │   User's Browser   │
      └─────────┬──────────┘
                │
                ▼
      ┌────────────────────┐
      │    API Gateway     │
      │    (e.g., Nginx)   │
      └─────────┬──────────┘
┌───────────────┼─────────────────┼────────────────────┐
│(API Calls)    │                 │                    │
▼               ▼                 ▼                    ▼
┌───────────┐ ┌──────────┐  ┌───────────┐ ┌────────────┐ ...etc
│  Auth     │ │ Roadmap  │  │   Topic   │ │   Notes    │
│  Service  │ │ Service  │  │  Service  │ │  Service   │
└───────────┘ └──────────┘  └─────┬─────┘ └────────────┘
                                  │ (Publishes event: 'topic_completed')
                                  ▼
                            ┌───────────┐
                            │ RabbitMQ  │
                            │(Event Bus)│
                            └─────┬─────┘
                                  │ (Subscribes to all events)
                                  ▼
                            ┌───────────┐
                            │  Analytics│
                            │  Service  │
                            └───────────┘
```

### 2.2. Local Operational Architecture

*The local architecture remains the same, with the new **Analytics Service** added as another container in the `docker-compose.yml` file, connected to the `pathfinder-net` network and subscribing to **RabbitMQ**.*

---

## 3. Project & Code Structure (Monorepo)

*The `services` directory will now include a `analytics-service` folder.*

```bash
pathfinder-app/
├── .github/
│   └── workflows/
│
├── docker-compose.yml
│
├── frontend/
│
├── services/
│   ├── auth-service/
│   ├── ... (other services)
│   └── analytics-service/  # New service
│
└── infra/
    └── nginx/
```

---

## 4. Agile Plan: Epics, User Stories & Tasks

### Epic 0: DevOps & Project Foundation (Local-First Edition)

*A foundational epic to establish the core local development environment, containerization, and testing strategy to enable reliable development and prepare for a future cloud migration.*

- **0.1:** As a developer, I want to containerize each microservice with a `Dockerfile` so its dependencies are isolated and portable.
- **0.2:** As a developer, I want to orchestrate all local services (app, database, queue) with a single command using a master `docker-compose.yml` file.
- **0.3:** As a developer, I want a local API Gateway (`Nginx`) to route requests to the correct service container based on the URL.
- **0.4:** As a developer, I want every pull request to be automatically tested in a clean, containerized environment using GitHub Actions.
- **0.5:** As a developer, I want all application code to be cloud-agnostic by using environment variables for all service endpoints and credentials.

### Epic 1: The Foundation - Core Services & Manual Planning

*Establish the essential services needed for a user to manually create a fully structured roadmap.*

- **1.1:** As a user, I want to sign up for an account and log in.
  - **Task:** Build and containerize the **Auth Service**.
  - **Task:** Define its database schema (`users` table) and set up the DynamoDB Local instance.
  - **Task:** Implement `/register` and `/login` API endpoints. The login endpoint must generate a JWT.
  - **Task:** Configure the Nginx gateway to route `/api/auth/...` traffic to the Auth Service.
  - **Task:** Instrument the service to publish a `user.registered` event to RabbitMQ.
  - **Task:** Build the frontend Signup and Login pages.
- **1.2:** As a user, I want to create, view, edit, and delete roadmaps and their milestones.
  - **Task:** Build and containerize the **Roadmap Service**.
  - **Task:** Define its database schema (`roadmaps`, `milestones` tables).
  - **Task:** Implement full CRUD API endpoints for roadmaps and milestones (e.g., `POST /api/roadmaps`, `GET /api/roadmaps/{id}/milestones`).
  - **Task:** Secure all endpoints by requiring and validating a JWT.
  - **Task:** Instrument the service to publish `roadmap.created` and `milestone.created` events.
- **1.3:** As a user, I want to add, edit, and delete topics within a milestone.
  - **Task:** Build and containerize the **Topic Service**.
  - **Task:** Define its database schema (`topics` table with a `status` field).
  - **Task:** Implement full CRUD API endpoints for topics (e.g., `POST /api/milestones/{id}/topics`).
  - **Task:** Secure all endpoints.
  - **Task:** Instrument the service to publish `topic.created` and `topic.status_changed` events.

### Epic 2: The Knowledge Engine - The Notes Service

*Enable users to create a rich, interconnected knowledge base.*

- **2.1:** As a user, I want to create, edit, and delete private notes with rich formatting.
  - **Task:** Build and containerize the **Notes Service**.
  - **Task:** Define its database schema (`notes` table, with a `content` field for Markdown).
  - **Task:** Implement full CRUD API endpoints for notes.
  - **Task:** On the frontend, integrate a rich Markdown editor component (`react-md-editor`).
  - **Task:** Instrument the service to publish a `note.created` event.
- **2.2:** As a user, I want to organize notes with tags.
  - **Task (Backend):** Add `tags` and `note_tags` (join) tables to the Notes Service database.
  - **Task (Backend):** Implement API endpoints to add/remove tags from a specific note.
  - **Task (Frontend):** Build a tag input UI component on the note editor page.
- **2.3:** As a user, I want to link a note to a specific topic on my roadmap.
  - **Task (Backend):** Add a `topic_note_links` table to the Notes Service database.
  - **Task (Backend):** Implement API endpoints to create/delete these links.
  - **Task (Frontend):** On the topic detail view, display a list of linked notes and provide a way to add new links.

### Epic 3: The AI Assistant - Generation & Tutoring

*Infuse the application with AI to automate content creation and provide interactive learning support.*

- **3.1:** As a user, I want the AI to generate a complete roadmap structure for me from a prompt.
  - **Task:** Build and containerize the stateless **AI Generation Service**.
  - **Task:** Craft a detailed system prompt for the LLM to ensure it returns a structured JSON response.
  - **Task:** Implement an endpoint in the **Roadmap Service** (`POST /api/roadmaps/generate`) that calls the AI service and then populates its own database with the result.
- **3.2:** As a user, I want to chat with an AI tutor about any topic.
  - **Task:** Build and containerize the **AI Tutor Service**.
  - **Task:** Define its database schema (`chat_messages` table).
  - **Task:** Implement a WebSocket endpoint to handle real-time, streaming conversations.
  - **Task:** The service must fetch conversation history to provide context to the LLM.
  - **Task (Frontend):** Build a chat modal UI component.
- **3.3:** As a user, I want to generate and interact with persistent practice questions.
  - **Task:** Build and containerize the **Learning Tools Service**.
  - **Task:** Define its database schema (`practice_questions` table).
  - **Task:** Implement CRUD API endpoints for managing questions.
  - **Task:** Create an orchestrating endpoint in the **Topic Service** that calls the AI service, then saves the results to the Learning Tools Service.
- **3.4:** As a user, I want to generate and study with persistent flashcards.
  - **Task (Backend):** Add a `flashcards` table and CRUD endpoints to the **Learning Tools Service**.
  - **Task (Backend):** Implement the orchestration endpoint in the **Topic Service**.
  - **Task (Frontend):** Build an interactive flashcard viewer component.
- **3.5:** As a user in the AI Tutor chat, I want to save highlighted text directly to a note.
  - **Task (Frontend):** Add logic to the chat UI to detect text selection and show a "Save to Note" button.
  - **Task (Frontend):** Build a modal to allow the user to create a new note or select an existing one (by fetching a list from the **Notes Service**).
  - **Task (Frontend):** Implement the logic to call the appropriate `POST` or `PUT` endpoint on the Notes Service.

### Epic 4: The Control Panel - Visualization & Progress Tracking

*Provide users with clear, visual tools to manage their learning workflow.*

- **4.1:** As a user, I want to track progress with a Kanban board.
  - **Task (Backend):** Create a new endpoint in the **Topic Service** (`GET /api/roadmaps/{id}/board`) that returns all topics for a roadmap, pre-grouped by status.
  - **Task (Frontend):** Build a dedicated Kanban board page using a drag-and-drop library (`dnd-kit`).
  - **Task (Frontend):** On drop, call the existing `PATCH /api/topics/{id}` endpoint to update the topic's status.
- **4.2:** As a user, I want to see visual progress bars for milestones and roadmaps.
  - **Task (Backend):** Enhance the API endpoints that fetch roadmaps and milestones to include completion statistics (e.g., `{ "total_topics": 20, "completed_topics": 5 }`).
  - **Task (Frontend):** Create a reusable progress bar component to display this data.

### Epic 5: The Analytics Dashboard & Gamification

*Create a dedicated dashboard to provide users with motivational metrics and visualizations of their learning journey.*

- **5.1:** As a developer, I need a dedicated service to process and store analytics data.
  - **Task:** Build, test, and containerize the **Analytics Service**.
  - **Task:** Define its database schema (`user_stats`, `daily_activity_log` tables).
  - **Task:** Implement logic for the service to subscribe to events from RabbitMQ and update its database.
  - **Task:** Create API endpoints to expose the aggregated data to the frontend dashboard.
- **5.2:** As a user, I want to see a dashboard with visualizations of my learning activity.
  - **Task:** Design and create a new "Dashboard" page in the frontend React application.
  - **Task:** Implement **KPI Cards** for high-level counts ("Total Roadmaps," "Topics Completed").
  - **Task:** Implement a **Pie Chart** showing the breakdown of topic statuses.
  - **Task:** Implement a **Bar Chart** showing "Activity in the Last 7 Days."
- **5.3:** As a user, I want to track my daily learning streak.
  - **Task:** Implement a **GitHub-style Activity Heatmap** visualization.
  - **Task:** The frontend will fetch data from the Analytics Service and render a grid of the past year, coloring each day based on activity level.