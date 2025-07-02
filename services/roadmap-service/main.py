# Dependencies to add to requirements.txt:
# fastapi, uvicorn[standard], pydantic, boto3, pika

from fastapi import FastAPI, APIRouter, status
from pydantic import BaseModel
from typing import List

# --- Pydantic Models ---
class Roadmap(BaseModel):
    id: str
    user_id: str
    title: str
    description: str
    created_at: str

class Milestone(BaseModel):
    id: str
    roadmap_id: str
    title: str
    description: str
    order: int

# --- API Router ---
router = APIRouter(
    prefix="/api/roadmaps",
    tags=["Roadmaps"]
)

# --- Endpoints ---
@router.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    return {"status": "Roadmap Service is healthy"}

@router.get("/", response_model=List[Roadmap])
async def get_user_roadmaps(user_id: str = "default"):
    """Lists all roadmaps for a user."""
    # TODO: Fetch roadmaps from DynamoDB where user_id matches.
    print(f"Fetching roadmaps for user {user_id}")
    return [
        {"id": "rm-1", "user_id": user_id, "title": "React Mastery", "description": "Learn React from basics to advanced", "created_at": "2023-10-01"}
    ]

@router.get("/{roadmap_id}/milestones", response_model=List[Milestone])
async def get_roadmap_milestones(roadmap_id: str):
    """Lists all milestones for a specific roadmap."""
    # TODO: Fetch milestones from DynamoDB where roadmap_id matches.
    print(f"Fetching milestones for roadmap {roadmap_id}")
    return [
        {"id": "m-1", "roadmap_id": roadmap_id, "title": "React Fundamentals", "description": "Basic React concepts", "order": 1}
    ]

@router.post("/generate")
async def generate_roadmap_with_ai(request: dict):
    """Generates a roadmap structure using AI and saves it."""
    # TODO: 1. Call the AI Generation Service with the request data.
    # TODO: 2. Save the generated roadmap structure to DynamoDB.
    # TODO: 3. Publish a "roadmap.created" event to RabbitMQ.
    print(f"Generating roadmap for: {request.get('subject', 'Unknown')}")
    return {"message": "Roadmap generation started"}

# --- FastAPI App Initialization ---
app = FastAPI(title="Pathfinder Roadmap Service")
app.include_router(router)