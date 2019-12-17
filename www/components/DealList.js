import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';

const GET_DEALS = gql`
  query GET_DEALS {
    deals {
      id
      name
    }
  }
`;

function DealList(props) {
  const { loading, error, data } = useQuery(GET_DEALS);
  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error</span>;
  return (
    data &&
    data.deals &&
    data.deals.map(deal => <div key={deal.id}>{deal.name}</div>)
  );
}

export default DealList;
