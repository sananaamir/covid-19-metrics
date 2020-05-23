import React from 'react';
import Dashboard from './Dashboard'
import Container from '@material-ui/core/Container'

function App() {
  return (
    <div className="App">
      <Container maxWidth="md">
        <Dashboard />
      </Container>
    </div>
  );
}

export default App;
