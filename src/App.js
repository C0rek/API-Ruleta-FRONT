import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

function Number({n}){
  const {number} = useSpring({
    from: {numer:0},
    number:n,
    delay:200,
    config:{ mass:1, tension:20, friction:10}
  });
  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
}

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [loading, setLoading] = useState(false);

  const getRandomNumber = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/randomroulette', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
  
      if (data && typeof data.value === 'number') {
        setRandomNumber(data.value);
      } else {
        console.error('Invalid data format', data);
      }
    } catch (error) {
      console.error('Error fetching random number:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Random Number Generator</h1>
      <button onClick={getRandomNumber} disabled={loading}>
        {loading ? 'Loading...' : 'Generate Random Number'}
      </button>
      {randomNumber !== null && (
        <div>
          <h2>Random Number: <Number n={randomNumber}/> </h2>
        </div>
      )}
    </div>
  );
}

export default App;
