import { useState } from "react";
import "./App.css"
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import Alert from "./components/Alert";
import About from "./components/About"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#0d1d34";
      showAlert("Dark mode has been enabled", "success");
    }
    else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enabled", "success");
    }
  }
  return (
    <BrowserRouter>
      <Navbar title="TextUtils" aboutText="About" mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert} />
      <div className="container my-3">'
        <Routes>
          <Route exact path="/" element={<TextForm showAlert={showAlert} heading="Try TextUtils - Word Counter | Character Counter | Remove Extra Spaces" mode={mode} />} />
          <Route exact path="/about" element={<About mode={mode}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
