# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# 1. Copy ONLY the requirements file first.
# This is a Docker caching optimization. If this file doesn't change,
# Docker won't re-run the time-consuming pip install step on subsequent builds.
COPY requirements.txt .

# 2. Install the packages listed in the requirements file.
# This is where `uvicorn` gets installed inside the container.
RUN pip install --no-cache-dir -r requirements.txt

# 3. Copy the rest of the application's code.
COPY . .

# 4. Run the uvicorn command (which now exists in the container's PATH).
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]