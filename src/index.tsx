import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers } from './mocks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const Settings = {
  RENTAL_COUNT: 352,
};

root.render(
  <React.StrictMode>
    <App rentalCount={Settings.RENTAL_COUNT} offers={offers} />
  </React.StrictMode>
);
