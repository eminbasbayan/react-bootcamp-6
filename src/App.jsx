import { useState } from "react";
import Products from "./Products";

function App() {
  const [state, setState] = useState("Emin");

  console.log("component render edildi!");

  // state = "Emre" // yanlış kullanım
  // setState("Emre") // doğru kullanım

  function handleTitleChange() {
    setState("Emre");
  }

  return (
    <div>
      <h2>{state}</h2>
      <button onClick={handleTitleChange}>Değiştir!</button>
    </div>
  );
}

export default App;
