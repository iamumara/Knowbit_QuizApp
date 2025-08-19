import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import QuizContext from "./QuizContext";
import QuizQuestions from "./questionData/Question";


function App() {
  const [score, setScore] = useState(0);
  return (
    <div>
      <QuizContext.Provider value={{ score, setScore, QuizQuestions }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </QuizContext.Provider>
    </div>
  );
}

export default App;
