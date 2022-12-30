export const coordinates = generateCoordinates()

function generateCoordinates() {
    let coordinates = []
    let legalPoints = 0
    while (legalPoints < 25) {
        let point = generatePoint(20, 380)
        if (collides(coordinates, point) === false){
            coordinates.push(point)
            legalPoints += 1
        }
    }
    return coordinates
};

function generatePoint(min, max) {
    return {x: Math.floor(Math.random() * (max - min)) + min, y: Math.floor(Math.random() * (max - min)) + min}
  }

function collides(coordinates, point){
    for (const coord of coordinates){
        if(Math.sqrt((coord.x - point.x)**2 + (coord.y - point.y)**2) < 30){
            return true
        }
    }
    return false
}