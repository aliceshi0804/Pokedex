import React, { useState } from 'react';
import Login from './components/Login';
import Homepage from './components/Homepage';

function App() {

  const [token, setToken] = useState('');

  const userLogin = (tok) => {
    setToken(tok);
  }

  return (
      token === '' ? <Login userLogin={userLogin} /> : <Homepage />
  );
}

export default App;