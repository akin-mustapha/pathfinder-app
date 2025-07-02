# Dependencies to add to requirements.txt:
# fastapi, uvicorn[standard]

from fastapi import FastAPI, APIRouter, WebSocket, WebSocketDisconnect, status
import asyncio # Useful for simulating streaming

# --- API Router ---
# Using a router helps keep all API endpoints (even health checks) organized.
router = APIRouter(
    prefix="/api/tutor",
    tags=["AI Tutor"]
)

# --- Endpoints ---

@router.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    """
    Health check endpoint for Docker Compose. This is the path that curl will hit.
    """
    return {"status": "AI Tutor Service is healthy"}

# --- Main FastAPI App ---
app = FastAPI(title="Pathfinder AI Tutor Service")

# Include the API router. Now the app knows about the /api/tutor/health route.
app.include_router(router)


# --- WebSocket Endpoint ---
# WebSockets are attached directly to the main `app` object.
# Their path `/ws/...` does not use the `/api/tutor` prefix.
@app.websocket("/ws/tutor/{topic_id}/{user_id}")
async def websocket_endpoint(websocket: WebSocket, topic_id: str, user_id: str):
    await websocket.accept()
    print(f"WebSocket connection established for topic {topic_id} by user {user_id}")
    try:
        while True:
            user_message = await websocket.receive_text()
            print(f"Received message: {user_message}")

            # --- TODO: Implement core tutor logic ---
            # 1. Fetch chat history.
            # 2. Call LLM.
            # 3. Stream response back.
            # 4. Save new messages to DB.

            # Placeholder streaming response
            ai_response_chunk = f"AI response about '{user_message}'. "
            await websocket.send_text(ai_response_chunk)
            await asyncio.sleep(0.5) # Simulate thinking
            await websocket.send_text("This is another part of the response.")

    except WebSocketDisconnect:
        print(f"WebSocket connection closed for topic {topic_id}")
        
    except Exception as e:
        print(f"WebSocket error for topic {topic_id}: {e}")
