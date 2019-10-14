import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';

const GET_COMPANIES = gql`
  query GET_COMPANIES {
    companies {
      id
      name
    }
  }
`;

function CompanyList(props) {
  const { loading, error, data } = useQuery(GET_COMPANIES);
  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error</span>;
  return (
    data &&
    data.companies &&
    data.companies.map(company => <div key={company.id}>{company.name}</div>)
  );
}

export default CompanyList;
