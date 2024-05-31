import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateQuiz from "./pages/CreateQuiz";
import Quiz from "./pages/Quiz";
import Dashboard from "./pages/Dashboard";
import QuizbyId from "./pages/QuizbyId";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/createquiz" element={<CreateQuiz />} />
          <Route path="/quiz/:id/start" element={<Quiz />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
          <Route path="/quiz/:id" element={<QuizbyId />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
