function NextButton({ dispatch, answer, currentIndex, numQuestion }) {
  const hasAnsweredQuestion = answer[currentIndex] !== undefined; // Check if there's an answer for the current index
  return (
    <>
      {currentIndex < numQuestion - 1 && (
        <button
          className="btn btn-ul"
          onClick={() => {
            if (hasAnsweredQuestion) {
              dispatch({ type: "nextQuestion" });
            } else {
              // Optionally, show an alert or message indicating they need to answer first
              alert("Please select an answer for the current question.");
            }
          }}
          disabled={!hasAnsweredQuestion} // Disable button if no answer
        >
          Next
        </button>
      )}
      <button
        className="btn btn-ul"
        onClick={() => dispatch({ type: "finish" })}
      >
        Submit
      </button>
    </>
  );
}

export default NextButton;
