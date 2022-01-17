import { useState, useCallback } from "react";
import "./App.css";
import { Toast, Frame } from "@shopify/polaris";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";

function App() {
  const [selected, setSelected] = useState(0);

  const [toastActive, setToastActive] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const toggleActive = useCallback(() => setToastActive((toastActive) => !toastActive), []);

  const showToast = (message: string) => {
    setToastMessage(message);
    toggleActive();
  };

  return (
    <div className="App">
      <Header selected={selected} setSelected={setSelected} />
      <Content selected={selected} showToast={showToast} />
      {toastActive && (
        <div style={{ height: "250px" }}>
          <Frame>
            <Toast content={toastMessage} onDismiss={toggleActive} />
          </Frame>
        </div>
      )}
    </div>
  );
}

export default App;
