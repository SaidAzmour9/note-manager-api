# Notes Management API

A robust backend API for managing personal notes efficiently, providing essential CRUD operations along with advanced features like searching, filtering, and sharing notes.

## Features

### Core Functionalities
- **Create, Read, Update, Delete (CRUD) Notes**: Perform standard operations on notes.
- **Tags for Categorization**: Attach optional tags to notes for easier organization.
- **Fetch Notes**:
  - Retrieve all notes.
  - Retrieve a specific note by its ID.
- **Search**:
  - Search notes by their title or content.
- **Pagination**: Efficiently handle large datasets by paginating the note listings.
- **Edit Notes**:
  - Modify the title, content, or tags of an existing note.
- **Soft Delete**:
  - Mark notes as deleted without permanently removing them, enabling data recovery.
- **Filter Notes**:
  - By tags.
  - By creation date.
  - By the last updated date.
- **Sharing**:
  - Share notes with other users via email or user ID.

## Technologies Used

- **Backend**:
  - Node.js with Express.js for server-side logic and routing.
- **Database**:
  - Prisma as the ORM and PostgreSQL as the relational database.
- **Email Notifications**:
  - NodeMailer for handling email functionalities.

## Middleware

- **Validation**:
  - Use `express-validator` to validate user inputs and ensure data integrity.
- **Error Handling**:
  - Centralized error-handling middleware for consistent and maintainable error management.

## How to Run

### Prerequisites
- Node.js and npm installed.
- PostgreSQL database configured.
- Environment variables set up in a `.env` file (e.g., database URL, email credentials).

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/SaidAzmour9/note-manager-api.git
   ```
2. Navigate to the project directory:
   ```bash
   cd notes-management-api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

### API Endpoints

#### Notes
- **POST** `/notes` - Create a new note.
- **GET** `/notes` - Fetch all notes (with optional pagination and filters).
- **GET** `/notes/:id` - Fetch a specific note by ID.
- **PUT** `/notes/:id` - Update a note's title, content, or tags.
- **DELETE** `/notes/:id` - Soft delete a note.

#### Search
- **GET** `/notes/search` - Search for notes by title or content.

#### Share
- **POST** `/notes/share` - Share a note with a specific user via email or user ID.

## Future Enhancements
- Role-based access control (RBAC) for sharing and editing permissions.
- Real-time notifications for shared notes.
- Enhanced search with fuzzy matching and full-text indexing.

## License
This project is licensed under the MIT License.

