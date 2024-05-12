# Redis API with NestJS

## Introduction

- This project provides a RESTful API for interacting with a Redis database using HTTP methods in a NestJS application.
- It includes endpoints for basic Redis commands such as `set`, `get`, `delete`, and `ping`, as well as a command to flush all data with `flushall`. This serves as a practical demonstration of integrating Redis into a NestJS application.

## Technologies

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Docker**: A platform for developing, shipping, and running applications inside lightweight containers.
- **Redis**: An open-source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker.

## NPM Packages
- **@nestjs-modules/ioredis** Check it out [here](https://www.npmjs.com/package/@nestjs-modules/ioredis)
- **ioredis** Check more info about it [here](https://www.npmjs.com/package/ioredis)

## Getting Started

### Prerequisites

- Docker
- Node.js
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/agostinhodev/api-nestjs-redis
   ```

2. Navigate to the project directory:

   ```bash
   cd api-nestjs-redis
   ```

3. Rename the `.env.example` file to `.env` to set up the environment variables, byt running:
    ```bash
    mv .env.example .env
    ```

4. Start the Docker containers:

   ```bash
   docker-compose -f docker-compose.yml up -d --build
   ```

  - It may take some time, as it will install all the necessary node modules.

5. After the containers are up, the API will be available at `http://localhost`.

## API Usage

### Testing Connectivity

- **PING**:
  Test the connectivity between the client and the server.
  ```bash
  curl --request GET --url http://localhost/redis/ping
  ```
  Expected Response:
  ```json
  { "ping": "PONG" }
  ```

### Managing Data

- **SET**:
  Store a new value in the Redis database.

  ```bash
  curl --request POST \
    --url http://localhost/redis/set \
    --header 'Content-Type: application/json' \
    --data '{
      "key": "rioDeJaneiro",
      "value": {
        "name": "Rio de Janeiro",
        "country": "Brazil",
      }
    }'
  ```

  - **Key**: This refers to the identifier used to store and retrieve data from the Redis database. In our API, the key acts as a unique identifier for each entry. For example, the key `rioDeJaneiro` is used to access the data specific to Rio de Janeiro.

  - **Value**: This represents the data associated with a key in the Redis database. The value is typically a JSON object containing the information you want to save. In the case of `rioDeJaneiro`, the value includes the JSON about Rio de Janeiro.

- **GET**:
  Retrieve a value by key.

  ```bash
  curl --request GET --url http://localhost/redis/rioDeJaneiro
  ```

- **GET ALL KEYS**:
  Fetch all available keys in the Redis database.

  ```bash
  curl --request GET --url http://localhost/redis/keys
  ```

- **DELETE**:
  Remove a value based on a key.

  ```bash
  curl --request DELETE --url http://localhost/redis/rioDeJaneiro
  ```

- **FLUSH ALL**:
  Clear all data in the Redis database.
  ```bash
  curl --request DELETE --url http://localhost/redis/flushall
  ```

## Learning Outcomes

From this project, you'll understand how Redis handles data and how it can be utilized within a NestJS application. This code serves as a reference for implementing Redis as a module within NestJS, showcasing dependency injection and module management.

## Documentation

For more detailed usage, check out the `/docs/InsomniaAPINestJsRedisCollection.json` file, which includes an Insomnia Collection for testing API endpoints.
