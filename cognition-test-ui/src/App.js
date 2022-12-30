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
      {
      !isStarted && false ?
      (<button onClick={onTestStart}>Start the test</button>) : 
      <CognitionTest canvasWidth={window.innerWidth - 200} canvasHeight={window.innerHeight - 200}/>
      }
    </div>
  );
}

export default App;
