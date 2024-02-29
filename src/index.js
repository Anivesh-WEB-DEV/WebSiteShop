import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="shopping-sitedev-wzg1m511inov5j7n.us.auth0.com"
    clientId="QlhrbCg7S08nHy1OhvsKdW9ugb139WMC"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>


);
reportWebVitals();;


