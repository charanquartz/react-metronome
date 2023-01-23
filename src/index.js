import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Metronome from "./components/Metronome";
import registerServiceWorker from "./registerServiceWorker";

function App() {
  return (
    <div className="App">
      <Metronome />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
