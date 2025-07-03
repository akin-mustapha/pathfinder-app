# Dependencies to add to requirements.txt:
# fastapi, uvicorn[standard], pydantic, boto3

from fastapi import FastAPI, APIRouter, status
from pydantic import BaseModel
from typing import List

# --- Pydantic Models ---
class PracticeQuestion(BaseModel):
    id: str
    topic_id: str
    question_text: str
    answer_text: str

class Flashcard(BaseModel):
    id: str

    topic_id: str
    front_text: str
    back_text: str

# --- API Router ---
router = APIRouter(
    prefix="/api/learning-tools",
    tags=["Learning Tools"]
)

# --- Endpoints ---
@router.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    """Health check endpoint for Docker Compose."""
    return {"status": "Learning Tools Service is healthy"}

@router.get("/questions/{topic_id}", response_model=List[PracticeQuestion])
async def get_questions_for_topic(topic_id: str):
    """Fetches persistent practice questions for a topic."""
    # TODO: Fetch questions from this service's DynamoDB table.
    print(f"Fetching questions for topic {topic_id}")
    # Placeholder response
    return [
        {"id": "q1", "topic_id": topic_id, "question_text": "What is state?", "answer_text": "State is data that a component maintains over time."}
    ]

@router.get("/flashcards/{topic_id}", response_model=List[Flashcard])
async def get_flashcards_for_topic(topic_id: str):
    """Fetches persistent flashcards for a topic."""
    # TODO: Fetch flashcards from this service's DynamoDB table.
    print(f"Fetching flashcards for topic {topic_id}")
    # Placeholder response
    return [
        {"id": "fc1", "topic_id": topic_id, "front_text": "useState", "back_text": "A React Hook to manage state in functional components."}
    ]

# --- FastAPI App Initialization ---
app = FastAPI(title="Pathfinder Learning Tools Service")
app.include_router(router)