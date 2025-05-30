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


