# Use an official Python runtime as a parent image
FROM python:3.9.11
 
# Set the working directory to /app
WORKDIR /app
 
# Copy the current directory contents into the container at /app
COPY . .
 
# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000
 
# Make port 8000 available to the world outside this container
# EXPOSE 8000
 
# Command to run your application
 CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]

# CMD ["python", "execute-query.py"]