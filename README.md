# Currency exchange project

## Run application with Docker

### Add .env file with following scheme to backend application root directory
```dotenv 
# API key from project doc
CURRENCY_API_KEY=
```

### Run Docker Compose

Build and serve production version
```bash
docker-compose up --build
```

Backend app should be available on
http://localhost:4000/api.

Frontend app should be available on
http://localhost:3000/.