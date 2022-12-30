import './CognitionTest.css';
import { Stage, Layer, Circle, Group, Text } from 'react-konva';
import { useState } from 'react';
import { generateCoordinates } from '../utils'

const CIRCLE_RADIUS = 15
const CANVAS_SIZE = 400

const {xs, ys} = generateCoordinates()

function CognitionTest() {

  const [dragX, setDragX] = useState(xs[0])
  const [dragY, setDragY] = useState(ys[0])
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = (e) => {
    setIsDragging(true)
  };
  const handleDragEnd = (e) => {
    setIsDragging(false)
    // can't draw on previous point with kanva, increment with a very small number each time
    setDragX(dragX + 0.000001)
    setDragY(dragY + 0.000001)
  };

  return (
    <div className="canvas-container">
        <Stage width={CANVAS_SIZE} height={CANVAS_SIZE}>
          <Layer>
            {xs.map((_, index) => (
                <Group 
                    key={"point" + index}
                    id={index}
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
                      const newPos = {...pos};
                      if (pos.x < 20) {
                        newPos.x = 20
                      }
                      if (pos.y < 20) {
                        newPos.y = 20
                      }
                      if (pos.x > 380) {
                        newPos.x = 380
                      }
                      if (pos.y > 380) {
                        newPos.y = 380
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
                        opacity={isDragging ? 1 : 0.2}  
                    />
                    <Text text={1} x={-3} y={-5}/>
                </Group>
          </Layer>
      </Stage>
    </div>
  );
}

export default CognitionTest;
