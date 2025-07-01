# Dependencies: fastapi, uvicorn[standard]

from fastapi import FastAPI, WebSocket, WebSocketDisconnect

app = FastAPI(title="Pathfinder AI Tutor Service")

@app.get("/api/tutor/health")
def health_check():
    return {"status": "AI Tutor Service is healthy"}

@app.websocket("/ws/tutor/{topic_id}/{user_id}")
async def websocket_endpoint(websocket: WebSocket, topic_id: str, user_id: str):
    await websocket.accept()
    print(f"WebSocket connection established for topic {topic_id} by user {user_id}")
    try:
        while True:
            # Receive message from the user
            user_message = await websocket.receive_text()
            print(f"Received message: {user_message}")

            # --- TODO: Implement core tutor logic ---
            # 1. Fetch recent chat history for this topic/user from the database.
            # 2. Craft a prompt for the LLM including history and system persona.
            # 3. Call the LLM.
            # 4. Stream the LLM's response back to the client word by word.
            #    e.g., for chunk in llm_response: await websocket.send_text(chunk)
            # 5. Save the user's message and the full AI response to the database.

            # Placeholder streaming response
            ai_response = f"This is a streamed AI response about {user_message} for topic {topic_id}. "
            for char in ai_response:
                await websocket.send_text(char)
                # await asyncio.sleep(0.05) # Simulate streaming delay
    except WebSocketDisconnect:
        print(f"WebSocket connection closed for topic {topic_id}")