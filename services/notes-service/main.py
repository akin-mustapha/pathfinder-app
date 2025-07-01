# Dependencies to add to requirements.txt:
# fastapi, uvicorn[standard], pydantic, boto3, pika

from fastapi import FastAPI, APIRouter, status
from pydantic import BaseModel

# --- API Router ---
router = APIRouter(
    prefix="/api/notes",
    tags=["Notes"]
)

# --- Endpoints ---
@router.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    return {"status": "Notes Service is healthy"}

# TODO: Add Pydantic models for Note, Tag, etc.
# TODO: Implement full CRUD endpoints for notes.
# TODO: Implement endpoints for managing tags and linking notes to topics.
# TODO: Publish "note.created" events to RabbitMQ.

# --- FastAPI App Initialization ---
app = FastAPI(title="Pathfinder Notes Service")
app.include_router(router)