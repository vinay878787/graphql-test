export const typeDefs = `#graphql
  enum Rating {
    good
    bad
    ugly
  }

  type Book {
    title: String
    author: String
    rating: Rating
    year: Int
  }

  type Query {
    books(
      author: String
      rating: Rating
      sortBy: String
      sortOrder: String
    ): [Book]
  }

  type Mutation {
    login(email: String!, password: String!): String!
    logout:String!
  }
`;