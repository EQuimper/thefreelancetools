import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';
import './index.css';
import { store } from './models';
import registerServiceWorker from './registerServiceWorker';

const Main = () => (
  <Provider {...store}>
    <App />
  </Provider>
);

const render = (Component: React.ReactNode) => {
  ReactDOM.render(
    <AppContainer>
      <Main />
    </AppContainer>,
    document.getElementById('root') as HTMLElement,
  );
};

registerServiceWorker();

render(Main);

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept('./App', () => {
    render(App);
  });
}
