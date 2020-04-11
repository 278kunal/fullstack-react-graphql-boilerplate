// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
import books from './data';

const resolvers = {
  Query: {
    books: () => books,
  },
};

export default resolvers;
