import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  function transition(newMode, replace = false) {

    const historyArray = [...history]


    if (replace === true) {
      historyArray.pop();
    }

    setMode(newMode);
    setHistory([...historyArray, newMode])

    // const historyArray = [...history]
    // historyArray.push(newMode)
    // setHistory(historyArray);

  }

  function back() {
    if (history.length >= 2) {
      setMode(history[history.length - 2])
    }

    const historyArray = [...history]
    historyArray.pop();
    setHistory(historyArray)
  }


  return { mode, transition, back };
};

