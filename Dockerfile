# Build Step
# 1. Build React App
FROM node:16 as build-step
WORKDIR /app
COPY haas-avocados/package.json haas-avocados/package-lock.json ./
RUN npm install --legacy-peer-deps
COPY haas-avocados/ ./
RUN npm run build

# 2. Run Flask App
FROM python:3.9-slim
WORKDIR /app

# Install dependencies first to leverage Docker cache
COPY requirements.txt ./
RUN pip install -r requirements.txt

# Copy backend code
COPY . .

# Copy built React assets from the previous stage
COPY --from=build-step /app/build ./haas-avocados/build

EXPOSE 5000
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

CMD ["flask", "run", "--host=0.0.0.0"]
