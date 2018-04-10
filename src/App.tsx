import * as React from 'react';
import styled from 'styled-components';

import { Sidebar } from './components';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-auto-rows: minmax(100vh, auto);
`;

const Content = styled.div`
  background-color: red;
`;

class App extends React.Component {
  render() {
    return (
      <Layout>
        <Sidebar />
        <Content />
      </Layout>
    );
  }
}

export default App;
