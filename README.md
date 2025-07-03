# Pathfinder - AI-Powered Learning Platform

**Version:** 1.2 (Analytics & Gamification Update)

Pathfinder is a modern, AI-augmented web application designed to transform how individuals approach learning. It allows users to generate dynamic learning roadmaps, track their progress, engage with an interactive AI tutor, build a personal knowledge base, and stay motivated through a personalized analytics dashboard and gamified streak tracking.

## 🚀 Features

- **🗺️ Dynamic Roadmaps**: Create and manage learning roadmaps with AI assistance
- **📊 Analytics Dashboard**: Track your learning progress with beautiful visualizations
- **🔥 Streak Tracking**: GitHub-style activity heatmap to maintain learning consistency
- **📝 Knowledge Base**: Rich markdown notes with tagging and linking
- **🤖 AI Tutor**: Interactive AI assistant for learning support
- **📋 Kanban Board**: Visual progress tracking for your learning topics
- **🎯 Goal Setting**: Milestones and topics with status tracking

## 🏗️ Architecture

Pathfinder follows a microservices architecture with the following components:

### Frontend
- **React 19** with Vite for fast development
- **TailwindCSS** for styling
- **Recharts** for data visualization
- **React Router** for navigation
- **Lucide React** for icons

### Backend Services
- **Auth Service** (Port 8001) - User authentication and authorization
- **Roadmap Service** (Port 8002) - Roadmap and milestone management
- **Topic Service** (Port 8003) - Topic management and status tracking
- **Notes Service** (Port 8004) - Knowledge base and note management
- **AI Generation Service** (Port 8005) - AI-powered content generation
- **AI Tutor Service** (Port 8006) - Interactive AI tutoring
- **Learning Tools Service** (Port 8007) - Practice questions and flashcards
- **Analytics Service** (Port 8008) - User activity analytics and metrics

### Infrastructure
- **Nginx** - API Gateway and reverse proxy
- **DynamoDB Local** - Local database for development
- **RabbitMQ** - Event bus for service communication
- **Docker & Docker Compose** - Containerization and orchestration

## 🛠️ Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for frontend development)
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pathfinder-app
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key if you want AI features
   ```

3. **Start the entire application**
   ```bash
   docker-compose up -d
   ```

4. **For frontend development** (optional)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Accessing the Application

- **Frontend**: http://localhost:3000
- **API Gateway**: http://localhost:80
- **RabbitMQ Management**: http://localhost:15672 (guest/guest)
- **DynamoDB Local**: http://localhost:8000

### Individual Service URLs

- Auth Service: http://localhost:8001
- Roadmap Service: http://localhost:8002
- Topic Service: http://localhost:8003
- Notes Service: http://localhost:8004
- AI Generation Service: http://localhost:8005
- AI Tutor Service: http://localhost:8006
- Learning Tools Service: http://localhost:8007
- Analytics Service: http://localhost:8008

## 🧪 Development

### Frontend Development

```bash
cd frontend
npm run dev    # Start development server
npm run build  # Build for production
npm run lint   # Run linting
```

### Backend Development

Each service can be developed independently:

```bash
cd services/<service-name>
pip install -r requirements.txt
uvicorn main:app --reload --port <service-port>
```

### Testing

```bash
# Run all services
docker-compose up

# Test individual service health
curl http://localhost:8001/api/auth/health
curl http://localhost:8002/api/roadmaps/health
# ... etc for other services
```

## 📁 Project Structure

```
pathfinder-app/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   └── ...
│   └── package.json
├── services/                # Backend microservices
│   ├── auth-service/
│   ├── roadmap-service/
│   ├── topic-service/
│   ├── notes-service/
│   ├── ai-generation-service/
│   ├── ai-tutor-service/
│   ├── learning-tools-service/
│   └── analytics-service/
├── infra/
│   └── nginx/              # API Gateway configuration
├── docker-compose.yml      # Container orchestration
└── README.md
```

## 🔧 Configuration

### Environment Variables

Key environment variables (see `.env.example`):

- `OPENAI_API_KEY`: Required for AI services
- `DYNAMODB_ENDPOINT_URL`: DynamoDB connection
- `RABBITMQ_HOST`: RabbitMQ connection

### Service Configuration

Each service is configured via environment variables and can be customized in the `docker-compose.yml` file.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Services not starting**: Check Docker daemon is running
2. **Port conflicts**: Ensure ports 3000, 8001-8008, 80, 5672, 15672, 8000 are available
3. **AI services failing**: Ensure OPENAI_API_KEY is set in .env file
4. **Database issues**: Try `docker-compose down -v` to reset volumes

### Logs

```bash
# View all service logs
docker-compose logs

# View specific service logs
docker-compose logs <service-name>
```

For more detailed information, see [project-info.md](project-info.md).