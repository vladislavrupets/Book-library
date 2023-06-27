# Book-library 
Library loan service

## Features

- Separation of users by roles (reader, librarian administrator) at the UI and database level
- Reader rating system (trust rating)
- Authorization and authentication using express session, password hashing
- Viewing a list of books with pagination
- Books borrowing
- Dashboard for librarians and administrators
- Adding and editing books with checking for uniqueness(administrator)
- Managing the process of receiving and returning books (administrator, librarian)

## Technologies

- Backend: Node.js, express, pg, express-session
- Frontend: Vite React, Redux toolkit
- Database: PostgreSQL

## Interface demo (main features)

### Registration page
![Registration page](frontend/src/images/readme-registration.png)

### Login page
![Login page](frontend/src/images/readme-login.png)

### Home page
![Reader main page](frontend/src/images/readme-main-page.png)

### Book borrowing page
![Book borrowing page](frontend/src/images/readme-borrowing-page.png)

### Reader borrowing history
![Reader borrowing history](frontend/src/images/readme-borrowing-list.png)

### Administrator/ librarian dashboard
![Book list](frontend/src/images/readme-book-list.png)

![Add book](frontend/src/images/readme-add-book.png)

![Edit book](frontend/src/images/readme-edit-book.png)

![Borrowing requests](frontend/src/images/readme-borrowing-requests.png)





