function Progress({ currentIndex, totalPoints, numQuestion, points, answer }) {
  return (
    <header className="progress">
      <progress max={numQuestion} value={currentIndex + Number(answer !== null)} />
      <p>
        Question <strong>{currentIndex + 1}</strong>/{numQuestion}
      </p>
      <p>
        <strong>{points}</strong>/{totalPoints} points
      </p>
    </header>
  );
}

export default Progress;
