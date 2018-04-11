import { Dialog, Paragraph } from 'evergreen-ui';
import * as React from 'react';
// import styled from 'styled-components';

// const Root = styled.div`
//   display: grid;
// `;

class NewProject extends React.PureComponent {
  state = {};
  render() {
    return (
      <Dialog
        isShown
        title="Dialog Title"
        onCloseComplete={() => null}
        confirmLabel="Custom Label"
      >
        <Paragraph>Dialog content</Paragraph>
      </Dialog>
    );
  }
}

export default NewProject;
