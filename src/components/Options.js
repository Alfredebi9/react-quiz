function Options({ currentIndex, question, dispatch, answer }) {
  // Check for the user's answer for the current question
  const userAnswer = answer[currentIndex];
  // Check if an answer has been selected for the current question
  const hasAnswer = userAnswer !== undefined;

  return (
    <div className="options">
      {question.options.map((option, index) => {
        return (
          <button
            className={`btn btn-option ${
              userAnswer?.answer === index ? "answer" : ""
            } ${
              hasAnswer
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            disabled={hasAnswer}
            onClick={() => dispatch({ type: "newAnswer", payload: [index] })}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
