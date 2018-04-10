import fontawesome from '@fortawesome/fontawesome';
import * as faClock from '@fortawesome/fontawesome-free-solid/faClock';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';

fontawesome.library.add(faClock);

import { Sidebar } from './components';
import Routes from './Routes';

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
      <Router>
        <Layout>
          <Sidebar />
          <Content>
            <Routes />
          </Content>
        </Layout>
      </Router>
    );
  }
}

export default App;
