import './CognitionTest.css';
import { Stage, Layer, Circle, Group, Text } from 'react-konva';
import { startTransition, useState } from 'react';
import { coordinates } from '../data/constants';

function generateShapes() {
  const xs = []
  const ys = []
  coordinates.forEach(p => {
    xs.push(p.x)
    ys.push(p.y)
  })
  return {xs: xs, ys: ys}
  }
  
  const INITIAL_STATE = generateShapes();

function CognitionTest() {

  
  const [xs, setXs] = useState(INITIAL_STATE.xs)
  const [ys, setYs] = useState(INITIAL_STATE.ys)
  const [dragX, setDragX] = useState(INITIAL_STATE.xs[0])
  const [dragY, setDragY] = useState(INITIAL_STATE.ys[0])
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = (e) => {
    setIsDragging(true)
  };
  const handleDragEnd = (e) => {
    setIsDragging(false)
    setDragX(dragX + 0.000001)
    setDragY(dragY + 0.000001)
  };

  return (
    <div className="canvas-container">
        <Stage width={400} height={400}>
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
                        radius={15}
                        fill={"#89b717"}
                        opacity={0.8}
                        shadowColor="black"
                        shadowBlur={10}
                        shadowOpacity={0.6}  
                    />
                    <Text text={index + 1} x={-3} y={-5}/>
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
                >
                    <Circle
                        x={0}
                        y={0}
                        radius={15}
                        fill={isDragging ? "red" : "#89b717"}
                        opacity={0.8}
                        shadowColor="black"
                        shadowBlur={10}
                        shadowOpacity={0.6}  
                    />
                    <Text text={1} x={-3} y={-5}/>
                </Group>
        </Layer>
    </Stage>
  </div>
  );
}

export default CognitionTest;
