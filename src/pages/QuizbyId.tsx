import { useParams } from "react-router-dom";
import QuizDetails from "../components/QuizDetails";
import "../components/quizrule.css";
const QuizbyId = () => {
  const { id } = useParams();
  console.log(id, "this is search params");

  return (
    <>
      <div className="flex h-screen w-screen flex-col">
        <div className="flex justify-center items-center mt-9">
          <div className="w-4/5">
            <QuizDetails quizid={id} />
          </div>
        </div>
        <section className="flex flex-col gap-1  justify-center items-center mt-4">
          <div className="w-[80%] flex items-start flex-col ml-2">
            <div className="flex flex-col gap-1 mb-1">
              <span className="font-bold font-weight-800 text-2xl">
                Quiz Rules
              </span>
            </div>
            <div className="flex ml-3 p-3  ">
              <ol className="list-decimal">
                <li>This quiz consists of multiple-choice questions.</li>
                <li>
                  To be successful with the quizzes, it's important to be
                  conversant with the topics.
                </li>
                <li>
                  Each multiple choice question has only one correct answer.
                </li>
                <li> To win the quiz you need to score more than 70%.</li>
                <li>
                  To start, click the{" "}
                  <span className="label-text label-text-primary">Start </span>
                  button. When finished, click the{" "}
                  <span className="label-text label-text-danger">
                    Submit
                  </span>{" "}
                  button.
                </li>
              </ol>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default QuizbyId;
