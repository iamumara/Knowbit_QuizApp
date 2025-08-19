import { React, useContext, useState } from "react";
import QuizContext from "../QuizContext";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();

  const { QuizQuestions } = useContext(QuizContext);

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState("");
  const [answer, setAnswer] = useState(Array(QuizQuestions.length).fill(null));

  const handleSelect = (option) => {
    const newAnswer = [...answer];
    newAnswer[currentQ] = option; //iam assing a index to option in a newanswer arr
    setAnswer(newAnswer); //console later //i will set otpion and null
  };

  const handleOptions = (option) => {
    if (selected === option) {
      setSelected("");
    } else {
      setSelected(option);
    }
  };

  const handleNextQuestion = () => {
    if (selected === QuizQuestions[currentQ].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQ < QuizQuestions.length - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      //calculate score at end
      const finalScore = answer.reduce((acc, ans, index) => {
        return ans === QuizQuestions[index].correctAnswer ? acc + 1 : acc;
      }, 0);
      navigate("/result", { state: { finalScore } });
    }
  };

  const handlePreviousQuestion = () => {
    setCurrentQ((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="bg-[#FCFCFC] w-full container m-auto ">
      <div className="p-3">
        <div className="bg-[#FCFCFC]">
          <div>
            <div className="font-semibold text-2xl py-3">
              Question
              <span className="block text-2xl font-bold ">
                <span className="text-[#0D009F]">{currentQ + 1}</span>
                <span className="text-[#BEB9F9]">/{QuizQuestions.length}</span>
              </span>
            </div>
            <div className="bg-[#0D009F] flex items-center min-h-40 px-4 py-2 rounded-2xl mb-">
              <h2 className="text-xl font-medium  text-white  ">
                {QuizQuestions[currentQ].question}
              </h2>
            </div>

            <div>
              {QuizQuestions[currentQ].options.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleOptions(option)}
                  className={`p-2 block w-full my-5 rounded-lg text-left font-xl font-semibold cursor-pointer ${
                    // console.log(option),
                    // console.log(selected),
                    selected === option
                      ? "bg-[#0D009F] text-white ring-2 ring-blue-300"
                      : "bg-[#F1F0FF] text-[#0D009F] "
                  }`}
                >
                  <span className="ml-3 mr-7 font-semibold text-xl inline-flex w-9 h-9 items-center justify-center bg-[#D3D0FF] rounded-full text-slate-900">
                    {idx === 0 ? "a" : idx === 1 ? "b" : idx === 2 ? "c" : "d"}
                  </span>
                  {option}
                </button>
              ))}
            </div>

            <div className="flex gap-7 items-center justify-between">
              <button
                className={`p-2 block w-40 my-2  text-center   rounded-lg  text-[#0D009F] font-xl font-semibold  outline-none focus:ring-2 focus:ring-blue-300  ${
                  currentQ >= 1
                    ? "bg-[#0D009F] text-white cursor-pointer"
                    : "cursor-not-allowed bg-[#F1F0FF]"
                } `}
                onClick={() => handlePreviousQuestion()}
              >
                {`<`} previous
              </button>
              <button
                className={`p-2 block w-40  my-2 text[#F1F0FF]  rounded-lg  bg-[#0D009F] font-xl font-semibold  outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer ${
                  currentQ <= QuizQuestions.length
                    ? "bg-[#0D009F] text-white"
                    : "cursor-not-allowed bg-[#F1F0FF] text-[#0D009F]"
                }`}
                onClick={() => handleNextQuestion()}
              >
                {currentQ >= QuizQuestions.length - 1
                  ? "Completed →"
                  : "Next >"}
              </button>
            </div>
          </div>
        </div>
                  
      </div>
    </div>
  );
}

export default Quiz;
