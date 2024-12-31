# Reviews API

A RESTful API for managing reviews built with NestJS, Prisma, and SQLite.

## Local Development

### Prerequisites
- Node.js v21+
- npm
- Docker Engine

### Setup & Run
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed database
npx prisma db seed

# Start development server
npm run dev
```

Access Swagger documentation at http://localhost:3000/api

### Development Commands
```bash
npm run test         # Run tests
npm run test:cov    # Run tests with coverage
npm run lint        # Lint code
npm run format      # Format code
```

## Production Deployment

### Using Docker (Recommended)

1. Build and run:
```bash
docker compose up -d --build
```

2. Verify deployment:
```bash
curl http://localhost:3000/api
```

### Manual Deployment

1. Build application:
```bash
npm ci
npm run build
```

2. Set up environment:
```bash
cp .env.example .env
# Edit .env with production values
```

3. Run migrations:
```bash
npx prisma migrate deploy
```

4. Start server:
```bash
npm run start:prod
```

## API Documentation

### Endpoints

- `POST /reviews` - Create review
- `GET /reviews` - List reviews (with pagination)
- `GET /reviews/:id` - Get single review
- `PUT /reviews/:id` - Update review
- `DELETE /reviews/:id` - Delete review

### Query Parameters

- `skip` - Pagination offset
- `take` - Items per page (max 200)
- `author` - Filter by author
- `rating` - Filter by rating (1-5)

## Environment Variables

```
DATABASE_URL="file:./dev.db"    # SQLite database path
PORT=3000                       # Server port
NODE_ENV=production            # Environment
```

## Project Structure

```
├── prisma/             # Database schema and migrations
├── src/
│   ├── common/        # Shared DTOs and utilities
│   ├── filters/       # Exception filters
│   ├── reviews/       # Reviews module
│   └── types/         # TypeScript type definitions
└── test/              # End-to-end tests
```