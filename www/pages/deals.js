import React from 'react';
import DealList from '../components/DealList';
import {withAuthSync} from '../utils/auth';

const Deals = () => (
  <div>
    <h1>Hi</h1>
    <DealList />
  </div>
);

export default withAuthSync(Deals);
