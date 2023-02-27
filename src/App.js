import { createContext, useState } from "react";
import "./App.css";
import { Landing } from "./components/Landing";
import { Modal } from "./components/Modal";
export const documentContext = createContext("");
function App() {
  const [documentArr, setDocumentArr] = useState([]);
  return (
    <div className="App">
      <documentContext.Provider value={{ documentArr, setDocumentArr }}>
        <Landing />
        <Modal />
      </documentContext.Provider>
    </div>
  );
}

export default App;
