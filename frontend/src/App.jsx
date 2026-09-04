import { useState } from 'react';

function App() {
  const [message] = useState('Social Challenge Platform');

  return <main>{message}</main>;
}

export default App;
