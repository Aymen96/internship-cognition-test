import './ScoreBoard.css';

function ScoreBoard({ score, tries, time, errors, retry, shuffle }) {
  return (
    <div className="ScoreBoard">
      <div className="row score">
        <div>Score:</div>
        <div>{score}</div>
      </div>
      <div className="row errors">
        <div>Errors:</div>
        <div>{errors}</div>
      </div>
      <div className="row tries">
        <div>Tries:</div>
        <div>{tries}</div>
      </div>
      <div className="row tries">
        <div>Time:</div>
        <div>{time}</div>
      </div>
      <div className="row">
        <div>
            <button onClick={retry}>Retry</button>
            <button onClick={shuffle}>Shuffle</button>
        </div>
      </div>
    </div>
  );
}

export default ScoreBoard;
