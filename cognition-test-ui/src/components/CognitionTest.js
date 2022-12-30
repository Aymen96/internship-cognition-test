import './CognitionTest.css';
import { Stage, Layer, Circle } from 'react-konva';
import { useState } from 'react';
import { coordinates } from '../data/constants';

function generateShapes() {
    return coordinates.map((point, i) => ({
      id: i.toString(),
      x: point.x,
      y: point.y,
      isDragging: false,
    }));
  }
  
  const INITIAL_STATE = generateShapes();

function CognitionTest() {

  const [stars, setStars] = useState(INITIAL_STATE);

  const handleDragStart = (e) => {
    e.preventDefault()
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
        return {
          ...star,
          isDragging: false,
        };
      })
    );
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
                    draggable
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
