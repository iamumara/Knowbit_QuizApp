import { React, useContext, useState } from "react";
import QuizContext from "../QuizContext";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();
  const { QuizQuestions } = useContext(QuizContext);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState(
    Array(QuizQuestions.length).fill(null)
  );

  // Handle selecting/deselecting an option
  const handleOptions = (option) => {
    const newAnswers = [...answers];

    if (selected === option) {
      // Deselect
      setSelected("");
      newAnswers[currentQ] = null;
    } else {
      // Select
      setSelected(option);
      newAnswers[currentQ] = option;
    }
    setAnswers(newAnswers);
  };

  // Next Question
  const handleNextQuestion = () => {
    if (currentQ < QuizQuestions.length - 1) {
      setCurrentQ((prev) => prev + 1);
      // restore already chosen answer if user revisits
      setSelected(answers[currentQ + 1] || "");
    } else {
      // Calculate score at the end
      const finalScore = answers.reduce((acc, ans, index) => {
        return ans === QuizQuestions[index].correctAnswer ? acc + 1 : acc;
      }, 0);

      navigate("/result", { state: { finalScore } });
    }
  };

  // Previous Question
  const handlePreviousQuestion = () => {
    if (currentQ > 0) {
      setCurrentQ((prev) => prev - 1);
      setSelected(answers[currentQ - 1] || "");
    }
  };

  return (
    <div className="bg-[#FCFCFC] w-full container m-auto ">
      <div className="py-1 px-3">
        <div className="bg-[#FCFCFC]">
          <div>
            <div className="font-semibold text-2xl pb-3">
              Question
              <span className="block text-2xl font-bold ">
                <span className="text-[#0D009F]">{currentQ + 1}</span>
                <span className="text-[#BEB9F9]">/{QuizQuestions.length}</span>
              </span>
            </div>
            <div className="bg-[#0D009F] flex items-center min-h-36 px-4 py-2 rounded-2xl">
              <h2 className="text-xl font-medium text-white">
                {QuizQuestions[currentQ].question}
              </h2>
            </div>
            <div>
              {QuizQuestions[currentQ].options.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleOptions(option)}
                  className={`p-2 block w-full my-5 rounded-lg text-left font-xl font-medium cursor-pointer ${
                    selected === option
                      ? "bg-[#0D009F] text-white ring-2 ring-blue-300"
                      : "bg-[#F1F0FF] text-[#0D009F]"
                  }`}
                >
                  <span className="ml-3 mr-5 font-semibold text-xl inline-flex w-9 h-9 items-center justify-center bg-[#D3D0FF] rounded-full text-slate-900">
                    {idx === 0 ? "a" : idx === 1 ? "b" : idx === 2 ? "c" : "d"}
                  </span>
                  {option}
                </button>
              ))}
            </div>
            <div className="flex gap-7 items-center justify-between">
              <button
                className={`p-2 block w-40 my-2 text-center rounded-lg font-xl font-semibold hover:bg-blue-900 text-white cursor-pointer active:ring-2 active:ring-blue-300 active:bg-[#0D009F] ${
                  currentQ > 0
                    ? "bg-[#0D009F] text-white cursor-pointer"
                    : "cursor-not-allowed bg-[#F1F0FF] text-[#0D009F]"
                }`}
                onClick={handlePreviousQuestion}
                disabled={currentQ === 0}
              >
                {`<`} Previous
              </button>
              <button
                className="p-2 block w-40 my-2 rounded-lg bg-[#0D009F] font-xl font-semibold cursor-pointer hover:bg-blue-900 text-white active:ring-2 active:ring-blue-300 active:bg-[#0D009F]"
                onClick={handleNextQuestion}
              >
                {currentQ >= QuizQuestions.length - 1
                  ? "Completed →"
                  : "Next >"}
              </button>
            </div>
          </div>
        </div>
        <div className=" py-3">
          <button
            className=" p-3 rounded-xl block w-full text-xl font-semibold bg-[#0D009F] hover:bg-blue-900 text-white cursor-pointer active:ring-4 active:ring-blue-300 active:bg-[#0D009F]"
            onClick={handleNextQuestion}
          >
            {currentQ >= QuizQuestions.length - 1 ? "Completed →" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
