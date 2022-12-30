import './App.css';
import CognitionTest from './components/CognitionTest';
import { useState } from 'react';

function App() {
  let [isStarted, setIsStarted] = useState(false)

  const onTestStart = () => {
    setIsStarted(!isStarted)
  }
  
  return (
    <div className="App">
      {!isStarted && false ? (<button onClick={onTestStart}>Start the test</button>) : <CognitionTest />}
    </div>
  );
}

export default App;
