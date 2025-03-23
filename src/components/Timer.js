import { useEffect } from "react";

function Timer({ dispatch, countDown }) {
  useEffect(() => {
    const timerId = setInterval(function () {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearTimeout(timerId);
  }, [dispatch]);
  const minutes = Math.floor(countDown / 60);
  const seconds = countDown % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
  return <div className="timer">{formattedTime}</div>;
}

export default Timer;
