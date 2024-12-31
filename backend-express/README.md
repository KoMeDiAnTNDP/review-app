# Reviews API

A RESTful API for managing reviews built with Express.js, Prisma, and SQLite.

## Local Development

### Prerequisites
- Node.js v20+
- npm

### Setup & Run
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Seed database
npm run seed

# Start development server
npm run dev
```

Access Swagger documentation at http://localhost:3000/api-docs

### Development Commands
```bash
npm run build       # Build TypeScript
npm run test        # Run tests
npm run lint        # Lint code
npm run format      # Format code
```

## API Documentation

### Endpoints

- `POST /reviews` - Create review
- `GET /reviews` - List reviews (with pagination)
- `GET /reviews/:id` - Get single review
- `PUT /reviews/:id` - Update review
- `DELETE /reviews/:id` - Delete review

### Query Parameters

- `skip` - Pagination offset (default: 0)
- `take` - Items per page (max: 200, default: 10)
- `author` - Filter by author
- `rating` - Filter by rating (1-5)

## Environment Variables

```
DATABASE_URL="file:./dev.db"    # SQLite database path
PORT=3000                       # Server port
NODE_ENV=development           # Environment
```

## Project Structure

```
├── prisma/                # Database schema and migrations
│   ├── migrations/       # Database migrations
│   ├── schema.prisma    # Prisma schema
│   └── seed.ts         # Database seeder
├── src/
│   ├── dto/           # Data Transfer Objects
│   ├── middleware/    # Express middleware
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   └── types/         # TypeScript definitions
└── tests/             # Integration tests
```

## Error Handling

The API uses standardized error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

Common HTTP status codes:
- 400: Invalid input data
- 404: Resource not found
- 500: Internal server error

## Response Format

Successful responses follow this structure:

```json
{
  "success": true,
  "data": Object | Array,
  "total": number,      // For paginated responses
  "page": number,       // For paginated responses
  "limit": number      // For paginated responses
}
```