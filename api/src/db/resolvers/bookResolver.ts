// src/resolvers/BookResolver.ts

import { Resolver, Query } from 'type-graphql';
import { Book } from '../entity/bookEntity';

@Resolver()
export default class BookResolver {
  @Query(() => [Book])
  books(): Promise<Book[]> {
    return Book.find();
  }
}
