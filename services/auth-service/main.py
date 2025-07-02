import os
from fastapi import FastAPI, APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr

# --- Pydantic Models for Data Validation ---
# This ensures that incoming data has the correct format.

class UserCreate(BaseModel):
    email: EmailStr  # Pydantic validates this is a proper email format
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# --- API Router ---
# Using an APIRouter helps organize endpoints, especially as the service grows.
router = APIRouter(
    prefix="/api/auth",  # All routes in this file will start with /api/auth
    tags=["Authentication"] # This shows up in the auto-generated API docs
)


# --- Endpoints ---

@router.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    """
    Health check endpoint for Docker Compose to verify the service is running.
    """
    return {"status": "Auth Service is healthy"}

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(user: UserCreate):
    """
    Registers a new user.
    """
    # --- TODO: Implement core registration logic ---
    # 1. Check if a user with this email already exists in DynamoDB.
    #    If yes, raise HTTPException(status_code=400, detail="Email already registered").
    #
    # 2. Hash the user's password. NEVER store plain text passwords.
    #    Use a library like `passlib`. e.g., hashed_password = pwd_context.hash(user.password)
    #
    # 3. Save the new user (email and hashed_password) to your 'users' table in DynamoDB.
    #
    # 4. Publish a "user.registered" event to RabbitMQ for the Analytics Service.

    print(f"Attempting to register user: {user.email}")
    
    # Placeholder success response
    return {"message": f"User '{user.email}' registered successfully. Please log in."}

@router.post("/login", response_model=Token)
async def login_for_access_token(user_data: UserLogin):
    """
    Authenticates a user and returns a JWT access token.
    """
    # --- TODO: Implement core login logic ---
    # 1. Fetch the user from DynamoDB by their email (user_data.email).
    #    If user not found, raise HTTPException(status_code=404, detail="User not found").
    #
    # 2. Verify the provided password against the stored hashed password.
    #    Use `passlib`. e.g., is_correct_password = pwd_context.verify(user_data.password, stored_hashed_password)
    #    If incorrect, raise HTTPException(status_code=401, detail="Incorrect password").
    #
    # 3. If credentials are correct, create a JWT access token.
    #    Use a library like `python-jose`. The token should contain user info like user_id and email.
    
    print(f"Attempting to log in user: {user_data.email}")
    
    # Placeholder token for development. In a real app, this would be a real JWT.
    fake_jwt_token = f"fake-jwt-for-user-{user_data.email}"
    
    return {"access_token": fake_jwt_token, "token_type": "bearer"}


# --- FastAPI App Initialization ---
# This is the main application object.
app = FastAPI(title="Pathfinder Auth Service")

# Include the router in the main app.
app.include_router(router)