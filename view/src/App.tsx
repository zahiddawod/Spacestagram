import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";

function App() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="App">
      <Header setSelected={setSelected} />
      <Content selected={selected} />
    </div>
  );
}

export default App;
