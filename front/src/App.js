import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((d) => setData(d));
  }, []);

  return (
    <div className='App'>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

export default App;
