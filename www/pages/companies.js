import React from 'react';
import CompanyList from '../components/CompanyList';
import {withAuthSync} from '../utils/auth';

const Companies = () => (
  <div>
    <h1>Hi</h1>
    <CompanyList />
  </div>
);

export default withAuthSync(Companies);
