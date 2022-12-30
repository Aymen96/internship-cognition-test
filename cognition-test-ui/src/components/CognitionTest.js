import './CognitionTest.css';
import { Stage, Layer, Circle, Group, Text } from 'react-konva';
import { startTransition, useState } from 'react';
import { coordinates } from '../data/constants';

const dragID = "drag"
const draggableElement = {
    id: dragID,
    number: 1,
    x: coordinates[0].x,
    y: coordinates[0].y,
    isDragging: false,
    isFirstPoint: true,
};

function generateShapes() {
  const xs = []
  const ys = []
  coordinates.forEach(p => {
    xs.push(p.x)
    ys.push(p.y)
  })
  xs.push(coordinates[0].x)
  ys.push(coordinates[0].y)
  return {xs: xs, ys: ys}
  }
  
  const INITIAL_STATE = generateShapes();

function CognitionTest() {

  
  const [xs, setXs] = useState(INITIAL_STATE.xs)
  const [ys, setYs] = useState(INITIAL_STATE.ys)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = (e) => {
    setIsDragging(true)
  };
  const handleDragEnd = (e) => {
    setIsDragging(false)
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
                    draggable={index == xs.length - 1}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <Circle
                        x={0}
                        y={0}
                        radius={15}
                        fill={index == xs.length - 1 && isDragging ? "red" : "#89b717"}
                        opacity={0.8}
                        shadowColor="black"
                        shadowBlur={10}
                        shadowOpacity={0.6}  
                    />
                    <Text text={index == xs.length - 1 ? 1 : index + 1} x={-3} y={-5}/>
                </Group>
            ))}
        </Layer>
    </Stage>
  </div>
  );
}

export default CognitionTest;
