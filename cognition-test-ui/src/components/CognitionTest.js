import './CognitionTest.css';
import { Stage, Layer, Circle } from 'react-konva';
import { useState } from 'react';
import { coordinates } from '../data/constants';

const dragID = "drag"
const draggableElement = {
    id: dragID,
    x: coordinates[0].x,
    y: coordinates[0].y,
    isDragging: false,
    isFirstPoint: true,
};

function generateShapes() {
    const points = coordinates.map((point, i) => ({
      id: i.toString(),
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
    const newEls = stars.filter(s => s.id !== dragID)
    newEls.push(draggableElement)
    console.log(newEls)
    setStars([...newEls]);
  };

  return (
    <div className="canvas-container">
        <Stage width={400} height={400}>
        <Layer>
            {stars.map((star) => (
                <Circle
                    key={star.id}
                    id={star.id}
                    x={star.x}
                    y={star.y}
                    radius={15}
                    fill={star.isDragging ? "red" : "#89b717"}
                    opacity={0.8}
                    draggable={star.isFirstPoint}
                    rotation={star.rotation}
                    shadowColor="black"
                    shadowBlur={10}
                    shadowOpacity={0.6}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                />
            ))}
        </Layer>
    </Stage>
  </div>
  );
}

export default CognitionTest;
