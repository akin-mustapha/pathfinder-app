# Dependencies: fastapi, uvicorn[standard], pika, threading

from fastapi import FastAPI, APIRouter, status
import pika
import threading
import time

# --- RabbitMQ Event Consumer ---
def consume_events():
    # TODO: Use environment variables for connection details
    connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
    channel = connection.channel()
    channel.queue_declare(queue='analytics_queue')

    def callback(ch, method, properties, body):
        print(f" [Analytics] Received event: {body.decode()}")
        # TODO: 1. Parse the event message (e.g., JSON).
        # TODO: 2. Update the appropriate tables in the Analytics DynamoDB.
        #       - Increment a counter in the 'user_stats' table.
        #       - Add an entry to the 'daily_activity_log' table for streak tracking.
        ch.basic_ack(delivery_tag=method.delivery_tag)

    channel.basic_consume(queue='analytics_queue', on_message_callback=callback)
    print(' [Analytics] Waiting for events. To exit press CTRL+C')
    channel.start_consuming()

# --- FastAPI API for serving dashboard data ---
router = APIRouter(
    prefix="/api/analytics",
    tags=["Analytics"]
)

@router.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    return {"status": "Analytics Service is healthy"}

@router.get("/{user_id}/kpis")
async def get_user_kpis(user_id: str):
    # TODO: Fetch aggregated KPI data for the user from the Analytics DynamoDB.
    return {"total_roadmaps": 10, "topics_completed": 150, "notes_created": 80}

# --- App Initialization ---
app = FastAPI(title="Pathfinder Analytics Service")
app.include_router(router)

# Run the RabbitMQ consumer in a separate thread
# This allows the API to be responsive while the consumer listens for events.
consumer_thread = threading.Thread(target=consume_events, daemon=True)
consumer_thread.start()