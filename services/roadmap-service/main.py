# In services/roadmap-service/requirements.txt:
# fastapi, uvicorn[standard], pydantic, boto3, pika

from fastapi import FastAPI, APIRouter, status
from pydantic import BaseModel
from typing import List

# --- Pydantic Models ---
class Milestone(BaseModel): id: str; title: str; order: int
class Roadmap(BaseModel): id: str; user_id: str; title: str; milestones: List[Milestone] = []

# --- API Router ---
router = APIRouter(prefix="/api/roadmaps", tags=["Roadmaps"])

# --- Endpoints ---
@router.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    return {"status": "Roadmap Service is healthy"}

@router.get("/by_user/{user_id}", response_model=List[Roadmap])
async def get_user_roadmaps(user_id: str):
    # TODO: Fetch roadmaps and their milestones from DynamoDB for the user.
    print(f"Fetching roadmaps for user {user_id}")
    return [{"id": "r1", "user_id": user_id, "title": "My First Roadmap", "milestones": [{"id": "m1", "title": "The Basics", "order": 1}]}]

# TODO: Add other CRUD endpoints for roadmaps and milestones.

# --- FastAPI App Initialization ---
app = FastAPI(title="Pathfinder Roadmap Service")
app.include_router(router)