# 📚 Book Library - Loan Service

A comprehensive library loan service designed to manage book borrowing, user roles, and administrative tasks efficiently.

## 🌟 Features

- 👥 **User Roles & Permissions**: Separation of users into **Reader**, **Librarian**, and **Administrator** roles at both UI and database levels
- ⭐ **Reader Trust Rating**: System for tracking and evaluating reader reliability
- 🔐 **Secure Authentication**: Authorization and authentication using Express sessions with password hashing
- 📖 **Book Catalog**: View a paginated list of books
- 📚 **Book Borrowing**: Readers can request and borrow books
- 📊 **Admin & Librarian Dashboard**: Manage book inventory and borrowing requests
- ✏️ **Book Management**: Add and edit books with uniqueness validation (Admin)
- 🔄 **Borrowing & Returning Books**: Administrators and librarians can handle the lending process

## 🛠 Technologies

- ⚙️ **Backend**: Node.js, Express, PostgreSQL, Express-session
- 🎨 **Frontend**: Vite React, Redux Toolkit
- 🗄 **Database**: PostgreSQL

## 🖥 Interface Demo (Main Features)

### 📝 Registration Page
![Registration page](frontend/src/images/readme-registration.png)

### 🔑 Login Page
![Login page](frontend/src/images/readme-login.png)

### 🏠 Home Page
![Reader main page](frontend/src/images/readme-main-page.png)

### 📚 Book Borrowing Page
![Book borrowing page](frontend/src/images/readme-borrowing-page.png)

### 🕘 Reader Borrowing History
![Reader borrowing history](frontend/src/images/readme-borrowing-list.png)

### 📊 Administrator & Librarian Dashboard
#### 📖 Book List
![Book list](frontend/src/images/readme-book-list.png)

#### ➕ Add Book
![Add book](frontend/src/images/readme-add-book.png)

#### ✏️ Edit Book
![Edit book](frontend/src/images/readme-edit-book.png)

#### 📩 Borrowing Requests
![Borrowing requests](frontend/src/images/readme-borrowing-requests.png)

🚀 **Efficiently manage your library with Book Library!**
