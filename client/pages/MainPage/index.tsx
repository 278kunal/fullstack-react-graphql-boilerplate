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
  const result = useQuery(BOOKS, {
    ssr: true
  });

  if (result) {
    const { loading, error, data } = result;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.books.map(({ title, author }: {title: string, author: string}) => (
      <div key={title}>
        <p>
          {author}: {title}
        </p>
      </div>
    ));
  }
  return null;
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
