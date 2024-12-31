**Backend Stack (Secondary Focus):**  
- **Node.js (TypeScript), Express.js**  
- **Prisma with SQLite** for persistence

---

### Data Model

Manage `Review` objects with the following structure:

```typescript
interface Review {
  id: number;
  title: string;  
  content: string;  
  rating: number;  // 1 to 5  
  author: string;  
  createdAt: string; // ISO date  
}
```

Seed the database with at least 20 varied reviews.

---

### Backend Requirements

1. **CRUD Endpoints:**  
   - `POST /reviews` to create
   - `GET /reviews` for a list (with pagination, `take` & `skip`)
   - `GET /reviews/:id` for a single review
   - `PUT /reviews/:id` to update a review
   - `DELETE /reviews/:id` to delete a review

2. **Validation & Error Handling:**  
   - `title` cannot be empty, `rating` must be between 1 and 5.  
   - Return proper HTTP status codes and error messages for invalid input.

3. **Filtering:**  
   - Allow filtering by `author` and `rating` using query parameters (exact matches).

4. **Basic Tests (Optional Bonus):**  
   - Add a couple of Jest-based unit tests for critical backend routes.
