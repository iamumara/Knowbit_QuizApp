import { Link } from "react-router-dom";
import { useContext } from "react";
import QuizContext from "../QuizContext";

function Home() {
  const { setScore } = useContext(QuizContext);

  return (
    <div className="bg-[#E2E0FF] w-full container m-auto">
      <div className=" p-3  h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">Knowbit</h1>
        <p className="text-2xl my-1.5 text-slate-700">
          Flare up your facts, play and learn
        </p>

        <Link onChange={setScore(0)} to="/quiz">
          <button className="p-3 my-2 rounded-xl block w-3xs text-xl font-semibold bg-[#0D009F] hover:bg-blue-900 text-white outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer">
            Start Quiz →
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
