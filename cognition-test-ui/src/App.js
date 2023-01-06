import './App.css';
import CognitionTest from './components/CognitionTest';
import { useState } from 'react';

function App() {
  let [isStarted, setIsStarted] = useState(false)


  const onTestStart = () => {
    setIsStarted(!isStarted)
  }

  const DEVICE_WIDTH = 994;
  const game = {}
  game.canvasWidth = window.innerWidth < DEVICE_WIDTH ? window.innerWidth - 10 : window.innerWidth - 200
  game.canvasHeight = window.innerHeight - 200
  game.circleRadius =  window.innerWidth < DEVICE_WIDTH  ? 10 : 15
  
  return (
    <div className="App">
      {
      !isStarted && false ?
      (<button onClick={onTestStart}>Start the test</button>) : 
      <CognitionTest {...game} />
      }
    </div>
  );
}

export default App;
