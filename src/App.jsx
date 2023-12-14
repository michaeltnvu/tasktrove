import { Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import TaskTrove from "./pages/TaskTrove";
import TaskTroveStore from "./pages/TaskTroveStore";
import WelcomePage from "./pages/WelcomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/tasktrove" element={<TaskTrove />} />
        <Route path="/tasktrove/about" element={<AboutPage />} />
        <Route path="/tasktrove/store" element={<TaskTroveStore />} />
      </Routes>
    </div>
  );
}

export default App;
