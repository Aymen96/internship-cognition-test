import './App.css';
import CognitionTest from './components/CognitionTest';
import { useState } from 'react';
import TestRecordsTable from './components/TestRecordsTable';

function App() {
  let [isStarted, setIsStarted] = useState(false)
  let [onRecordsTable, setOnRecordsTable] = useState(false)
  let [numberOfNodes, setNumberOfNodes] = useState(25)


  const onTestStart = () => {
    setIsStarted(!isStarted)
  }

  const DEVICE_WIDTH = 994;
  const game = {}
  game.canvasWidth = window.innerWidth < DEVICE_WIDTH ? window.innerWidth - 10 : window.innerWidth - 200
  game.canvasHeight = window.innerHeight - 200
  game.circleRadius =  window.innerWidth < DEVICE_WIDTH  ? 10 : 15
  
  let appContent
  if (onRecordsTable) {
    appContent = <TestRecordsTable setOnRecordsTable={setOnRecordsTable} />
  } else if(!isStarted) {
    appContent = <div>
      <div>
        <span>Number of nodes:</span>
        <input value={numberOfNodes} onChange={(e) => {
          setNumberOfNodes(e.target.value)
        }}/>
      </div>
      <button onClick={() => {setIsStarted(true)}} style={{ display: 'block', margin: '10px auto' }}>Start a new test</button>
    </div>
  } else {
    appContent = <CognitionTest {...game} setOnRecordsTable={setOnRecordsTable} numberOfNodes={numberOfNodes} />
  }
  return (
    <div className="App">
      {appContent}
    </div>
  );
}

export default App;
