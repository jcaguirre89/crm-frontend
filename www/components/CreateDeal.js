import React from 'react'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const CREATE_DEAL_MUTATION = gql`
  mutation CREATE_DEAL_MUTATION($name: String!, ) {
    createDeal(name: $name) {
      id
      name
    }
  }
`

export default function CreateDeal() {
  return (
    <div>

    </div>
  )
}
