import './CognitionTest.css';
import { Stage, Layer, Circle, Group, Text, Line } from 'react-konva';
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
  const [errors, setErrors] = useState(0)
  const [currentErrorIndex, setCurrentErrorIndex] = useState(-1)
  const [tries, setTries] = useState(0)
  const [visited, setVisited] = useState(Array(25))
  const [coordsVisited, setCoordsVisited] = useState([])

  const handleDragStart = () => {
    setIsDragging(true)
  };

  const handleDragEnd = (pos) => {
    setIsDragging(false)
    setTries(tries + 1)
    // can't draw on previous point with kanva, increment with a very small number each time
    if(xDrag !== xs[score] + 0.000001) {
      setDragX(xs[score] + 0.000001)
      setDragY(ys[score] + 0.000001)
    } else {
      setDragX(xDrag + 0.000001)
      setDragY(yDrag + 0.000001)
    }
  }

  const retry = () => {
    setScore(0)
    setErrors(0)
    setTries(0)
    setVisited(Array(25))
    setCoordsVisited([])
  }

  const shuffle = () => {
    retry()
    const res = generateCoordinates(canvasWidth, canvasHeight, PADDING, NUMBER_OF_POINTS)
    setXs(res.xs)
    setYs(res.ys)
    setDragX(res.xs[0])
    setDragY(res.ys[0])
  }

  // init: this code only runs once in component lifecycle
  useEffect(() => {
    const res = generateCoordinates(canvasWidth, canvasHeight, PADDING, NUMBER_OF_POINTS)
    setXs(res.xs)
    setYs(res.ys)
    setDragX(res.xs[0])
    setDragY(res.ys[0])
  }, [canvasWidth, canvasHeight])

  return (
    <>
      <div className="canvas-container" style={{width: canvasWidth + "px", height: canvasHeight + "px"}}>
          <Stage width={canvasWidth} height={canvasHeight}>
            <Layer>
            <Line stroke="#black" draggable="false" points={coordsVisited} strokeWidth={3}/>
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
                          fill={visited[index] ? "orange" : "#89b717"}
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
                      dragBoundFunc={function (pos, e) {
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
                        // check if user passed over another element when dragging
                        let overNode = false
                        for (let i = 1; i < xs.length; i++) {
                          if ( Math.abs(newPos.x - xs[i]) < CIRCLE_RADIUS && Math.abs(newPos.y - ys[i]) < CIRCLE_RADIUS ) {
                            overNode = true
                            if(i === score + 1) {
                              const newVisited = visited
                              visited[i] = true
                              setVisited(newVisited)

                              if(score === 0){
                                coordsVisited.push(xs[0])
                                coordsVisited.push(ys[0])
                              }
                              coordsVisited.push(xs[i])
                              coordsVisited.push(ys[i])

                              setScore(score + 1)
                              setCurrentErrorIndex(i)
                              break;
                            } else if (i != currentErrorIndex) {
                              setCurrentErrorIndex(i)
                              setErrors(errors + 1)
                            }
                          }
                        }
                        if(!overNode && currentErrorIndex != -1) {
                          setCurrentErrorIndex(-1)
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
      <ScoreBoard score={score} tries={tries} errors={errors} time={"00:25"} retry={retry} shuffle={shuffle}/>
    </>
  );
}

export default CognitionTest;
