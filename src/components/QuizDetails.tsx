import { Link } from "react-router-dom";

// const options: object = {
//   weekday: "long",
//   year: "numeric",
//   month: "long",
//   day: "numeric",
// };

// const convertDateToMonthAndYear = (
//   formatType: string,
//   date: string | undefined
// ) => {
//   if (typeof date === "string") {
//     const dateFormat = new Date(date);
//     return dateFormat.toLocaleDateString("en-US", options);
//   }
//   return "undefined date found";
// };

type quizParamType = {
  quizid: string | undefined;
};

const QuizDetails = ({ quizid }: quizParamType) => {
  const quiz = quizid;
  console.log(quiz);

  return (
    <div className="card card-side  bg-base-100 shadow-xl ">
      <figure className="">
        <img
          className=""
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
          alt="Movie"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">New movie is released!</h2>
        <p>Click the button to watch on Jetflix app.</p>
      </div>
      <div className="flex items-end ">
        <button className="btn mr-3 mb-2">
          <Link to={`/quiz/${quizid}/start`}>Start Quiz</Link>
        </button>
      </div>
    </div>
  );
};

export default QuizDetails;
