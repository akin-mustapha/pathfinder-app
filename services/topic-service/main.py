# Dependencies to add to requirements.txt:
# fastapi, uvicorn[standard], pydantic, boto3, pika

from fastapi import FastAPI, APIRouter, status
from pydantic import BaseModel
from typing import List

# --- Pydantic Models ---
class Topic(BaseModel):
    id: str
    milestone_id: str
    title: str
    status: str # e.g., 'not_started', 'in_progress', 'completed'

# --- API Router ---
router = APIRouter(
    prefix="/api/topics",
    tags=["Topics"]
)

# --- Endpoints ---
@router.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    return {"status": "Topic Service is healthy"}

@router.get("/by_milestone/{milestone_id}", response_model=List[Topic])
async def get_topics_for_milestone(milestone_id: str):
    """Lists all topics for a specific milestone."""
    # TODO: Fetch topics from DynamoDB where milestone_id matches.
    print(f"Fetching topics for milestone {milestone_id}")
    return [
        {"id": "topic-1", "milestone_id": milestone_id, "title": "Learn about state", "status": "completed"}
    ]

@router.patch("/{topic_id}/status")
async def update_topic_status(topic_id: str, new_status: dict):
    """Updates a topic's status (for the Kanban board)."""
    # TODO: 1. Update the topic's status in DynamoDB.
    # TODO: 2. Publish a "topic.status_changed" event to RabbitMQ for analytics.
    print(f"Updating topic {topic_id} to status {new_status.get('status')}")
    return {"message": "Status updated"}

# --- FastAPI App Initialization ---
app = FastAPI(title="Pathfinder Topic Service")
app.include_router(router)