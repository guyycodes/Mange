# Mange Project

## Startup Commands

### Authentication
The Spring Boot application has a basic authentication system set up. Users can register through the `/api/auth/register` endpoint.

### Useful Maven Commands, run from the same directory as pom.xml
```
mvn clean
mvn dependency:purge-local-repository
mvn dependency:resolve
mvn clean install
```

### Running the Spring Server
1. Navigate to the `/server/mange` directory where the `pom.xml` file is located.
2. Run the following command:
   ```
   mvn spring-boot:run
   ```
3. Once the server is running, visit `http://localhost:8080` in your web browser.

## API Endpoints

The application provides the following API endpoints for user management:

- Create a user: `POST /api/users`
- Retrieve all users: `GET /api/users`
- Retrieve a user by ID: `GET /api/users/{id}`
- Delete a user: `DELETE /api/users/{id}`
- Chat with Gemini: `GET /api/chat`

You can test these endpoints using tools like Postman or by creating a client application.

- if you haven already, create the bridge network:

```bash
docker network create mange-network
```
* Run this docker command form the same file as your google-credentials
docker run --name spring-boot-app \
  --network app-network \
  -p 8080:8080 \
  -v $(pwd)/google-credentials.json:/app/google-credentials.json \
  -d spring-boot-app

* verify setup"
docker logs spring-boot-app

## Project Structure

```
Mange
├── client/
└── server
    ├── .vscode/
    │   └── settings.json/
    └── mange/
        ├── src/
        │   ├── main/
        │   │   ├── java/
        │   │   │   └── com/
        │   │   │       └── mange/
        │   │   │           └── mange/
        │   │   │               ├── config/
        │   │   │               ├── controller/
        │   │   │               ├── models/
        │   │   │               ├── repository/
        │   │   │               ├── service/
        │   │   │               └── MangeApplication.java
        │   │   ├── resources/
        │   │   │   ├── application.properties
        │   │   │   └── static/
        │   │   └── webapp/
        │   │       └── WEB-INF/
        │   └── test/
        │       └── java/
        │           └── com/
        │               └── mange/
        │                   └── mange/
        │                       └── MangeApplicationTests.java
        ├── target/
        ├── pom.xml
        ├── .mvn
        └── README.md
```