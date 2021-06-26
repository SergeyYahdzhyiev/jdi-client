import './styles/main.css';
import React from 'react';
import { render } from 'react-dom';

import { App } from './App';
import { RootStore, StoreProvider } from './store';

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/service-worker.js')
//       .then((registration) => {
//         console.log('SW registered: ', registration);
//       })
//       .catch((registrationError) => {
//         console.log('SW registration failed: ', registrationError);
//       });
//   });
// }

render(
  <StoreProvider store={new RootStore()}>
    <App />
  </StoreProvider>,
  document.getElementById('root'),
);
