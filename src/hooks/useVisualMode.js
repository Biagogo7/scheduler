export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  return { mode };
}


function useCustomHook(newmode) {
  const [mode, setMode] = useState(initial);

  setMode(newmode);

  return { newmode };
}

