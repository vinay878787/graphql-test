FRONTEND

# Book Listing Frontend

This project is a React-based frontend for a book listing application, built using Vite, Apollo Client, and Tailwind CSS. It allows users to view, filter, and sort a list of books fetched from a GraphQL API. Authentication is handled using cookies.

🚀 Features

🔐 Authentication – Secure login with cookies (HTTP-only JWT).

📖 Book Listing – View a list of books with title, author, year, and rating.

🔍 Filtering & Sorting – Filter by author or rating, sort by title or year.

💡 Clean UI – Built with reusable components using Tailwind CSS.

⚡ Fast & Lightweight – Powered by Vite and Apollo Client.

📦 Tech Stack

React + TypeScript
Vite – Next-generation frontend tooling
Apollo Client – GraphQL state management
Tailwind CSS – Utility-first styling
GraphQL – For efficient data queries

🔐 Authentication Flow
On login, the backend sets a secure HTTP-only cookie containing the JWT.

Apollo Client sends this cookie with each GraphQL request.

The backend validates the cookie to authenticate requests.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/vinay878787/graphql-test.git
   cd client

2. npm install # or yarn install

3. Create a .env file in the root directory (if it doesn't exist).

Add the following environment variable:
VITE_GRAPHQL_URL=http://localhost:4000/graphql

4.npm run dev # or yarn dev
5.npm run build # or yarn build


BACKEND

# Book Listing GraphQL Server

This is the backend server for the Book Listing application. It is built with Node.js, TypeScript, Express, Apollo Server, and uses JWT authentication with HTTP-only cookies.

---

## 🚀 Features

- GraphQL API for books and authentication
- Secure login/logout with JWT in HTTP-only cookies
- Filtering and sorting for books
- Ready for integration with a React frontend

---

## 🛠️ Prerequisites

- Node.js (v18 or higher)
- npm

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/graphql-test.git
cd graphql-test/server

###2. npm install

3. Create .env file and paste these below values
JWT_SECRET=your_jwt_secret_here
PORT=4000
CORS_ORIGIN=http://localhost:3000

4. npm start

example queries

# mutation {
#   login(email: "alice@example.com", password: "alice123")
# }

# query{
#   books{
#     author
#   }

query Query {
  
}
# }

# filter by author

# # filter by rating
# query {
#   books(rating: good) {
#     title
#     author
#     rating
#   }
# }

# sort by year ascending/descending
# query {
#   books(sortBy: "year", sortOrder: "desc") {
#     title
#     author
#     year
#     rating
#   }
# }

# sort by author (desc)
# query {
#   books(rating: bad, sortBy: "author", sortOrder: "desc") {
#     title
#     author
#     year
#     rating
#   }
# }
7:40 AM

Add an Emoji, Sticker, or GIF



