# Dependencies: fastapi, uvicorn[standard], pika, threading
import os
from fastapi import FastAPI, APIRouter, status
import pika
import threading
import time


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

# --- RabbitMQ Event Consumer (NEW and IMPROVED) ---
def consume_events():
    """
    Connects to RabbitMQ and consumes events in a resilient, retrying loop.
    """
    RABBITMQ_HOST = os.getenv("RABBITMQ_HOST", "rabbitmq")
    RETRY_DELAY = 5  # seconds
    MAX_RETRIES = 10
    retries = 0

    while retries < MAX_RETRIES:
        try:
            print(f"[Analytics] Attempting to connect to RabbitMQ (attempt {retries + 1}/{MAX_RETRIES})...")
            connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST))
            channel = connection.channel()
            
            # Use a durable queue to ensure messages are not lost if this service restarts
            channel.queue_declare(queue='analytics_queue', durable=True)
            
            print("[Analytics] Successfully connected to RabbitMQ.")

            def callback(ch, method, properties, body):
                print(f" [Analytics] Received event: {body.decode()}")
                # TODO: Implement event processing logic here
                # Acknowledge that the message has been processed
                ch.basic_ack(delivery_tag=method.delivery_tag)

            channel.basic_consume(queue='analytics_queue', on_message_callback=callback)
            print(' [Analytics] Waiting for events. To exit press CTRL+C')
            channel.start_consuming()

        except pika.exceptions.AMQPConnectionError as e:
            print(f"[Analytics] Connection to RabbitMQ failed: {e}")
            retries += 1
            print(f"[Analytics] Retrying in {RETRY_DELAY} seconds...")
            time.sleep(RETRY_DELAY)
        except Exception as e:
            print(f"[Analytics] An unexpected error occurred: {e}")
            # For other unexpected errors, you might want to break the loop or handle differently
            break

    if retries >= MAX_RETRIES:
        print("[Analytics] Could not connect to RabbitMQ after multiple retries. Thread is stopping.")

# --- App Initialization ---
app = FastAPI(title="Pathfinder Analytics Service")
# ... (your app and router definitions) ...

# Start the consumer in a background thread (this part remains the same)
consumer_thread = threading.Thread(target=consume_events, daemon=True)
consumer_thread.start()