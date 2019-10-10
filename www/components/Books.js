import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';

const BOOKS = gql`
  query BOOKS {
    books {
      author
      title
    }
  }
`;

function Books() {
  const {loading, error, data} = useQuery(BOOKS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.books.map((book, idx) => (
    <div key={idx}>
      <p>{book.title}</p>
      <p>{book.author}</p>
    </div>
  ));
}

export default Books;
