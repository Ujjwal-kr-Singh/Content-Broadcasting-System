# Content Broadcasting System

A backend system for managing and broadcasting educational content. Teachers upload content (images with metadata), principals review and approve/reject submissions, and approved content is scheduled and rotated for live display.

## Tech Stack
- Node.js + Express
- PostgreSQL + Sequelize ORM
- JWT Authentication
- Multer for file uploads

## Getting Started

```bash
git clone <repo-url>
cd Content-Broadcasting-System/backend
npm install
```

Create a `.env` file:

```
PORT=5000
DB_NAME=content_db
DB_USER=postgres
DB_PASS=your_password
DB_HOST=localhost
JWT_SECRET=your_secret_key
```

Run the server:

```bash
npm run dev
```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |

### Content (Teacher)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/content/upload` | Upload new content |
| GET | `/api/content/my` | View own uploaded content |

### Approval (Principal)
| Method | Endpoint | Description |
|--------|----------|-------------|
| PATCH | `/api/approval/approve/:id` | Approve content |
| PATCH | `/api/approval/reject/:id` | Reject content with reason |
| GET | `/api/approval/all` | View all content |
| GET | `/api/approval/pending` | View pending content |

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/content/live/:teacherId` | Get currently active content |

All list endpoints support pagination via `?page=1&limit=20` query params.

## Project Structure

```
backend/
├── src/
│   ├── app.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── approvalController.js
│   │   ├── authController.js
│   │   ├── contentController.js
│   │   └── publicController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/
│   │   ├── index.js
│   │   ├── Content.js
│   │   └── User.js
│   ├── migrations/
│   ├── routes/
│   │   ├── approvalRoutes.js
│   │   ├── authRoutes.js
│   │   ├── contentRoutes.js
│   │   └── publicRoutes.js
│   ├── services/
│   │   └── schedulingService.js
│   └── utils/
│       └── upload.js
└── uploads/
```

## Scheduling Logic

The system uses a time-window based rotation mechanism:
1. Filters approved content within its scheduled time window
2. Sorts by ID for deterministic ordering
3. Computes total cycle duration from all active content
4. Uses modulo on current timestamp to pick the active item
5. Supports optional subject-based filtering via query param