# Dependencies to add to requirements.txt:
# fastapi, uvicorn[standard], pydantic, boto3, pika

from fastapi import FastAPI, APIRouter, status
from pydantic import BaseModel
from typing import List, Optional

# --- Pydantic Models ---
class NoteBase(BaseModel):
    title: str
    content: str  # This will store Markdown text
    tags: Optional[List[str]] = []

class Note(NoteBase):
    id: str
    user_id: str
    topic_id: Optional[str] = None # A note can be linked to a topic

class NoteCreate(NoteBase):
    user_id: str
    topic_id: Optional[str] = None


# --- API Router ---
router = APIRouter(
    prefix="/api/notes",
    tags=["Notes & Knowledge Base"]
)


# --- Endpoints ---

@router.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    """
    Health check endpoint for Docker Compose to verify the service is running.
    """
    return {"status": "Notes Service is healthy"}

@router.post("/", response_model=Note, status_code=status.HTTP_201_CREATED)
async def create_note(note_data: NoteCreate):
    """Creates a new note."""
    # TODO: 1. Generate a unique ID for the new note (e.g., using uuid).
    # TODO: 2. Save the note data to the 'notes' table in DynamoDB.
    # TODO: 3. If tags are provided, update the 'tags' and 'note_tags' tables.
    # TODO: 4. If topic_id is provided, create a link in the 'topic_note_links' table.
    # TODO: 5. Publish a "note.created" event to RabbitMQ for analytics.
    
    print(f"Creating note titled '{note_data.title}' for user {note_data.user_id}")
    
    # Placeholder response
    new_note_id = "note-uuid-1234"
    return {**note_data.dict(), "id": new_note_id}

@router.get("/by_user/{user_id}", response_model=List[Note])
async def get_notes_by_user(user_id: str):
    """Fetches all notes for a specific user."""
    # TODO: Fetch all notes from DynamoDB for the given user_id.
    print(f"Fetching all notes for user {user_id}")
    # Placeholder response
    return [
        {"id": "note-uuid-1234", "user_id": user_id, "title": "My First Note", "content": "## Hello World\n\n- This is a list item.", "tags": ["example", "markdown"]}
    ]

# TODO: Add other necessary endpoints:
# - GET /{note_id} (to fetch a single note)
# - PUT /{note_id} (to update a note)
# - DELETE /{note_id} (to delete a note)
# - POST /{note_id}/tags (to add a tag to a note)


# --- FastAPI App Initialization ---
# This creates the main application instance that Uvicorn will run.
app = FastAPI(title="Pathfinder Notes Service")

# This registers all the endpoints defined in the router with the main app.
app.include_router(router)