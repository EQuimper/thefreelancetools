import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faClock,
  faFileAlt,
  faFolder,
  faPauseCircle,
  faPlayCircle,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import { Sidebar } from './components';
import { theme } from './constants';
import { ModalsManager } from './containers';
import Routes from './Routes';

library.add(faClock, faUsers, faFolder, faFileAlt, faPlayCircle, faPauseCircle);

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-auto-rows: minmax(100vh, auto);
`;

const Content = styled.div`
  background-color: #fff;
`;

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Sidebar />
            <Content>
              <Routes />
            </Content>
            <ModalsManager />
          </Layout>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
