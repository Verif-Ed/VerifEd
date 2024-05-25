import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateQuiz from "./pages/CreateQuiz";
import Quiz from "./pages/Quiz";
import Dashboard from "./pages/Dashboard";
import QuizbyId from "./pages/QuizbyId";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/createquiz" element={<CreateQuiz />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/quiz/:id" element={<QuizbyId />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
