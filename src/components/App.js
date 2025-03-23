import { useEffect, useReducer } from "react";

import Main from "./Main";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./startScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FininshScreen from "./FininshScreen";
import Timer from "./Timer";
import Footer from "./Footer";
import PrevButton from "./PrevButton";

const initialState = {
  allQuestions: [],
  questions: [],
  status: "loading", // "loading", "error","ready", "active", "finish"
  currentIndex: 0,
  answer: [],
  points: 0,
  highscore: null,
  countDown: null,
  chosenQuestions: 1,
};
const SEC_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        allQuestions: action.payload.questions,
        questions: action.payload.questions,
        highscore: action.payload.highscore,
        status: "ready",
      };

    case "dataFailed":
      return { ...state, status: "error" };
    case "questionChosen":
      return {
        ...state,
        chosenQuestions: action.payload,
      };
    case "start":
      const filteredQuestions = state.questions.slice(0, state.chosenQuestions);
      return {
        ...state,
        status: "active",
        countDown: filteredQuestions.length * SEC_PER_QUESTION,
        questions: filteredQuestions,
      };
    case "newAnswer": {
      const currentQuestionIndex = state.currentIndex;
      const currentQuestion = state.questions[currentQuestionIndex];
      const isCorrect = currentQuestion.correctOption === action.payload[0];

      // Create a copy of the current answer array
      const updatedAnswers = [...state.answer];

      // Store the selected answer at the current index
      updatedAnswers[currentQuestionIndex] = {
        answer: action.payload[0],
        correct: isCorrect,
      };

      return {
        ...state,
        answer: updatedAnswers,
        points: isCorrect
          ? state.points + currentQuestion.points
          : state.points,
      };
    }

    case "nextQuestion": {
      const currentQuestionIndex = state.currentIndex;

      // Check if there is a current answer to avoid adding null values
      const newAnswers = [...state.answer];

      // Ensures that the next question is prepared without using the previous answer
      return {
        ...state,
        status: "active",
        currentIndex: currentQuestionIndex + 1,
        answer: newAnswers,
      };
    }
    case "previousQuestion":
      return {
        ...state,
        currentIndex: state.currentIndex - 1,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        allQuestions: state.allQuestions,
        questions: state.allQuestions,
        status: "ready",
        highscore: state.highscore,
      };

    case "tick":
      return {
        ...state,
        countDown: state.countDown - 1,
        status: state.countDown === 1 ? "finished" : state.status,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    questions,
    status,
    currentIndex,
    answer,
    points,
    highscore,
    countDown,
    chosenQuestions,
  } = state;
  const numQuestion = questions.length;

  const totalPoints = questions.reduce(
    (total, question) => total + question.points,
    0
  );

  useEffect(function () {
    Promise.all([
      fetch("http://localhost:8000/questions"),
      fetch("http://localhost:8000/highscore"),
    ])
      .then(([questionsResponse, highscoreResponse]) => {
        // Check if both responses are okay
        if (!questionsResponse.ok || !highscoreResponse.ok) {
          throw new Error("Network response was not ok");
        }
        return Promise.all([
          questionsResponse.json(),
          highscoreResponse.json(),
        ]);
      })
      .then(([questionsData, highscoreData]) => {
        dispatch({
          type: "dataRecieved",
          payload: { questions: questionsData, highscore: highscoreData },
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: "dataFailed" });
      });
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <>
            <StartScreen
              numQuestion={numQuestion}
              dispatch={dispatch}
              chosenQuestions={chosenQuestions}
            />
          </>
        )}
        {status === "active" && (
          <>
            <Progress
              currentIndex={currentIndex}
              questions={questions}
              numQuestion={numQuestion}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              currentIndex={currentIndex}
              questions={questions}
              question={questions[currentIndex]}
              dispatch={dispatch}
              answer={answer}
              points={points}
            />
            <Footer>
              <Timer dispatch={dispatch} countDown={countDown} />
              <NextButton
                answer={answer}
                currentIndex={currentIndex}
                numQuestion={numQuestion}
                dispatch={dispatch}
              />
              <PrevButton
                answer={answer}
                currentIndex={currentIndex}
                numQuestion={numQuestion}
                dispatch={dispatch}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FininshScreen
            points={points}
            totalPoints={totalPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
