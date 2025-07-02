# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY ./requirements.txt .

# Install any needed packages specified in requirements.txt
# Using --no-cache-dir reduces the image size
# Using --trusted-host to avoid SSL issues in some environments
RUN pip install --no-cache-dir --trusted-host pypi.python.org -r requirements.txt

# Copy the rest of the application's code into the container at /app
COPY . .

# Expose the port the app runs on
EXPOSE 8006

# Define the command to run your app using uvicorn
# This will be the entry point for your container
# 0.0.0.0 is important to allow connections from outside the container
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8006"]