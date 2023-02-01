import './App.css';
import CognitionTest from './components/CognitionTest';
import { useState } from 'react';
import TestRecordsTable from './components/TestRecordsTable';
import { Button, TextField } from '@mui/material';

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
      <h1>Connecting Numbers</h1>
      <div style={{ maxWidth: "600px", width: "80%", margin: "10px auto", fontSize: "20px"}}>
        On this page you see the numbers from 1 - {numberOfNodes}. They have been all scattered about. Your task is to order the numbers by dragging the current number over the next one, starting with the smallest one. You start with the number 1 and go over the node number 2, then to 3, etc. Do this as fast as you can.
        </div>
      <div className="nodes-number-inputbox">
        <span className="label">Number of nodes:</span>
        <TextField className="input" type="number" value={numberOfNodes} onChange={(e) => {
          setNumberOfNodes(Number(e.target.value))
        }}/>
      </div>
      
      <Button onClick={() => {setIsStarted(true)}} style={{ display: 'block', margin: '10px auto' }}>Start a new test</Button>
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
