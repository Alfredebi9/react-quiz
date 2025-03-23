function startScreen({ numQuestion, dispatch, chosenQuestions }) {
  const flexStyle = {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2rem",
    marginBottom: "5rem",
  };
  const noMargin = {
    margin: "0px",
  };
  return (
    <div className="start">
      <h2>Welcome To React Quiz!</h2>
      <h3>{numQuestion} question to test your React mastery</h3>
      <div style={flexStyle}>
        <h4 style={noMargin}>Select amount of question to do</h4>
        <select
          className="btn"
          value={chosenQuestions}
          onChange={(e) =>
            dispatch({
              type: "questionChosen",
              payload: Number(e.target.value),
            })
          }
        >
          {Array.from({ length: numQuestion }, (_, i) => (
            <option value={i + 1} key={i}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default startScreen;
