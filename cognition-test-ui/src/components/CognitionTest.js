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
    const points = coordinates.map((point, i) => ({
      id: i.toString(),
      number: i + 1,
      x: point.x,
      y: point.y,
    }));
    points.push(draggableElement)
    return points;
  }
  
  const INITIAL_STATE = generateShapes();

function CognitionTest() {

  const [stars, setStars] = useState(INITIAL_STATE);

  const handleDragStart = (e) => {
    const id = e.target.id();
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: star.id === id,
        };
      })
    );
  };
  const handleDragEnd = (e) => {
    setStars(
      stars.map((star) => {
        if (star.id === dragID) {
            return {
                ...star,
                x: coordinates[0].x,
                y: coordinates[0].y,
                isDragging: false
            }
        } else {
            return {...star};
        }
      })
    );
  };

  return (
    <div className="canvas-container">
        <Stage width={400} height={400}>
        <Layer>
            {stars.map((star) => (
                <Group 
                    key={star.id}
                    id={star.id}
                    x={star.x}
                    y={star.y}
                    draggable={star.isFirstPoint}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <Circle
                        key={star.id}
                        id={star.id} 
                        x={0}
                        y={0}
                        radius={15}
                        fill={star.isDragging ? "red" : "#89b717"}
                        opacity={0.8}
                        shadowColor="black"
                        shadowBlur={10}
                        shadowOpacity={0.6}  
                    />
                    <Text text={star.number} x={-3} y={-5}/>
                </Group>
            ))}
        </Layer>
    </Stage>
  </div>
  );
}

export default CognitionTest;
