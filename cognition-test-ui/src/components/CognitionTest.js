import './CognitionTest.css';
import { Stage, Layer, Circle, Group, Text } from 'react-konva';
import { useEffect, useState } from 'react';
import { generateCoordinates } from '../utils';
import ScoreBoard from './ScoreBoard';

const CIRCLE_RADIUS = 15
const NUMBER_OF_POINTS = 25
const PADDING = 20

function CognitionTest({ canvasWidth, canvasHeight }) {

  const [xs, setXs] = useState([])
  const [ys, setYs] = useState([])
  const [dragX, setDragX] = useState(xs[0])
  const [dragY, setDragY] = useState(ys[0])
  const [isDragging, setIsDragging] = useState(false)
  const [score, setScore] = useState(0)
  const [tries, setTries] = useState(0)

  const handleDragStart = (e) => {
    setIsDragging(true)
  };
  const handleDragEnd = (e) => {
    setIsDragging(false)
    setTries(tries + 1)
    // can't draw on previous point with kanva, increment with a very small number each time
    setDragX(dragX + 0.000001)
    setDragY(dragY + 0.000001)
  };

  // init: this code only runs once in component lifecycle
  useEffect(() => {
    const res = generateCoordinates(canvasWidth, canvasHeight, PADDING, NUMBER_OF_POINTS)
    setXs(res.xs)
    setYs(res.ys)
    setDragX(res.xs[0])
    setDragY(res.ys[0])
  }, [])

  return (
    <>
      <div className="canvas-container" style={{width: canvasWidth + "px", height: canvasHeight + "px"}}>
          <Stage width={canvasWidth} height={canvasHeight}>
            <Layer>
              {xs.map((_, index) => (
                  <Group 
                      key={"point" + index}
                      x={xs[index]}
                      y={ys[index]}
                      >
                      <Circle
                          x={0}
                          y={0}
                          radius={CIRCLE_RADIUS}
                          fill={"#89b717"}
                          shadowColor="black"
                          shadowBlur={5}
                      />
                      <Text text={index + 1} x={index > 8 ? -7 : -3} y={-5} />
                  </Group>
              ))}
              <Group 
                      key={"drag_point"}
                      id={"drag_point"}
                      x={dragX}
                      y={dragY}
                      draggable={true}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      dragBoundFunc={function (pos) {
                        // user can't drag outside of the canvas
                        const newPos = {...pos};
                        if (pos.x < PADDING) {
                          newPos.x = PADDING
                        }
                        if (pos.y < PADDING) {
                          newPos.y = PADDING
                        }
                        if (pos.x > canvasWidth - PADDING) {
                          newPos.x = canvasWidth - PADDING
                        }
                        if (pos.y > canvasHeight - PADDING) {
                          newPos.y = canvasHeight
                        }
                        return newPos;
                      }}
                  >
                      <Circle
                          x={0}
                          y={0}
                          radius={CIRCLE_RADIUS}
                          fill={isDragging ? "red" : "#89b717"}
                          shadowColor="black"
                          shadowBlur={10}
                          opacity={isDragging ? 0.4 : 1}  
                      />
                      <Text text={1} x={-3} y={-5}/>
                  </Group>
            </Layer>
        </Stage>
      </div>
      <ScoreBoard score={score} tries={tries} time={"00:25"} />
    </>
  );
}

export default CognitionTest;
