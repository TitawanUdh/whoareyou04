import QuestionPage from "./components/questionPage";
import Result from "./components/results";
import LoadingResult from "./components/loading";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Index from "./components";
import "./App.css";

function App() {
  const [answers, setAnswers] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/question/:id"
          element={<QuestionPage answers={answers} setAnswers={setAnswers} />}
        />

        <Route path="/loading" element={<LoadingResult />} />
        <Route
          path="/result"
          element={<Result answers={answers} setAnswers={setAnswers} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
