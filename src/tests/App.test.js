import React from "react";
import ReactDOM from "react-dom";
import App from "../index.js";
import Metronome from "../components/Metronome";

it("renders app without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

it("renders metronome component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Metronome />, div);
});
