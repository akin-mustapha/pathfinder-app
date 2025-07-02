# Dependencies: fastapi, uvicorn[standard], pydantic

from fastapi import FastAPI, APIRouter, status
from pydantic import BaseModel

# --- Pydantic Models ---
class GenerationRequest(BaseModel):
    subject: str
    context: dict = {}

# --- API Router ---
router = APIRouter(
    prefix="/api/ai",
    tags=["AI Generation"]
)

@router.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    return {"status": "AI Generation Service is healthy"}

@router.post("/roadmap")
async def generate_roadmap_structure(request: GenerationRequest):
    """Receives a prompt and returns a structured roadmap JSON."""
    # TODO: 1. Craft a detailed system prompt for the LLM.
    # TODO: 2. Make an API call to the actual LLM (e.g., Gemini, OpenAI).
    # TODO: 3. Parse and validate the LLM's JSON response.
    # TODO: 4. Return the clean JSON to the calling service (Roadmap Service).
    print(f"Generating roadmap structure for: {request.subject}")
    # Placeholder response
    return {"roadmap": {"title": request.subject, "milestones": []}}

# TODO: Add endpoints for /questions and /flashcards

# --- FastAPI App Initialization ---
app = FastAPI(title="Pathfinder AI Generation Service")
app.include_router(router)