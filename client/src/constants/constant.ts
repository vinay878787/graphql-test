import { gql } from "@apollo/client";

export  const BOOKS_QUERY = gql`
  query Books(
    $author: String
    $rating: Rating
    $sortBy: String
    $sortOrder: String
  ) {
    books(
      author: $author
      rating: $rating
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      title
      author
      year
      rating
    }
  }
`;

export const ALL_AUTHORS_QUERY = gql`
  query AllAuthors {
    books {
      author
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

export const RATINGS = ["good", "bad", "ugly"] as const;
export const SORT_FIELDS = [
  { label: "Year", value: "year" },
  { label: "Author", value: "author" },
];

/////////////Login Mutation/////////////
export const LOGIN_DATA = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

//////AUTH_CHECK_QUERY /////////////
export const AUTH_CHECK_QUERY = gql`
  query {
    books {
      title
    }
  }
`;