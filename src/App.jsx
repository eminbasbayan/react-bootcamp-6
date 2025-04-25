import { useState } from "react";

function App() {
  const [state, setState] = useState("Bu bir JavaScript Eğitimidir!");

  function handleClick() {
    setState("Bu bir React Eğitimidir!");
  }

  return (
    <div>
      <h1>{state}</h1>
      <button onClick={handleClick}>Değiştir!</button>
    </div>
  );
}

export default App;
