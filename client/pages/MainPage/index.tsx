import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Home from '../../components/Home';

const BOOKS = gql`
  {
    books {
      title
      author
    }
  }
`;

const Books = () => {

  const { loading, error, data } = useQuery(BOOKS, {
    ssr: true
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.books.map(({ title, author }: { title: string, author: string }) => (
    <div key={title}>
      <p>
        {author}: {title}
      </p>
    </div>
  ));
}

export default () => {
  return (
    <div>
      <span>Main Page</span>
      <Home />
      <Books />
    </div>
  )
}
