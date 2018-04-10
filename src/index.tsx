import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import './index.css';
import { store } from './models';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider {...store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement,
);

registerServiceWorker();
