import Options from "./Options";

function Question({ currentIndex, question, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options  currentIndex={currentIndex} question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
