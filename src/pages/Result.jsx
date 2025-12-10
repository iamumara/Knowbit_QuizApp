import { Link } from "react-router-dom";
import { useContext } from "react";
import QuizContext from "../QuizContext";
import { useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import celebration from "../assets/celebration_confetti.json";

function Result() {
  const { QuizQuestions } = useContext(QuizContext);
  const location = useLocation();
  const { finalScore } = location.state;
  return (
    <div className="bg-[#F1F0FF] h-screen w-full container m-auto relative">
      <div className="p-3 flex flex-col items-center gap-y-15">
        <div className="border-1 border-[#E2E0FF]  w-90 h-90 rounded-full flex items-center justify-center bg-[#E2E0FF]">
          <div className="border-1 border-[#E2E0FF]  w-70 h-70 rounded-full flex items-center justify-center bg-[#BEB9F9]">
            <div className="border-7 border-[#0D009F]  w-50 h-50 rounded-full flex items-center justify-center bg-[#F1F0FF]">
              <Lottie animationData={celebration} loop={true} />
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-lg font-medium">Your score</p>
          <span className="text-[#0D009F] font-semibold text-2xl">
            {finalScore} / {QuizQuestions.length}
          </span>
          <h2 className="font-bold text-2xl text-[#0D009F] mt-6">
            Congratulations!
          </h2>
          <p className="font-medium text-slate-700">
            Great job, Betty! you have done well
          </p>
        </div>
        <div className="w-96">
          <Link to="/">
            <button className=" w-full p-3 rounded-xl block text-lg font-semibold bg-[#0D009F] text-white hover:bg-blue-900 cursor-pointer active:ring-4 active:ring-blue-300 active:bg-[#0D009F]">
              ← Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Result;
