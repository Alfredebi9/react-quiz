function PrevButton({ dispatch, currentIndex }) {
  if (currentIndex === 0) return null; // Only hide the button on the first question

  return (
    <button
      className="btn btn-ul"
      onClick={() => dispatch({ type: "previousQuestion" })}
    >
      Back
    </button>
  );
}
export default PrevButton;
