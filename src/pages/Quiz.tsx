import { useState, useEffect, useRef } from "react";

import toast from "react-hot-toast";
import data from "../../move_que.json";
import sui_que from "../../sui_que.json";
import { useParams } from "react-router-dom";
import VideoCapture from "../components/Proctoring/VideoCapture";

import { SocketProvider } from "../Context/SocketContext";

function formatDateTime(date: any) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return (
    date.getMonth() +
    1 +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear() +
    "  " +
    strTime
  );
}

function formatDate(date: any) {
  return (
    date.getMonth() + 1 + "." + date.getDate() + "." + date.getFullYear() + " "
  );
}

export { formatDate, formatDateTime };

// Define a type for your quiz question
type QuizQuestion = {
  questionNumber: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

function Quiz() {
  const { id } = useParams();

  //   const quizId : any = SearchParams.get('id')
  //   const quizName : any = SearchParams.get('name')
  //   const course : any = SearchParams.get('course')
  //   const courseCode : any = SearchParams.get('coursecode')
  const quizTime = 1200; // 5 minutes in seconds
  // const [user, setUser] = useState(null); // User authentication state
  const [questions, setQuestions] = useState<QuizQuestion[]>([]); // Provide type annotation for questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<(string | null)[]>([]);
  const [score, setScore] = useState(0);
  const [isFinalQuestion, setIsFinalQuestion] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quizTime / 1000); // Time limit in seconds

  const quizTimeRef = useRef(quizTime);
  const timeLeftRef = useRef(timeLeft); // This can be updated to allow for custom quiz times
  useEffect(() => {
    if (id === "sui") {
      setQuestions(sui_que);
    } else {
      setQuestions(data);
    }
    // setQuestions(data);
  }, []);
  //   console.log(questions, "this is data");

  useEffect(() => {
    timeLeftRef.current = quizTime;
    setTimeLeft(quizTime);

    const timer = setTimeout(() => {
      setIsTimeUp(true);
      console.log("Timer cleared");
    }, quizTimeRef.current * 1000);

    const interval = setInterval(() => {
      if (timeLeftRef.current <= 0) {
        clearInterval(interval);
        return;
      }
      timeLeftRef.current -= 1;

      setTimeLeft(timeLeftRef.current);
    }, 1000);

    // Clear the timer and the interval when the component unmounts or when the time is up
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    console.log("Time left:", timeLeft);
    if (isTimeUp) {
      console.log("Time is up!");
      alert("Time is up! Auto Submitting Quiz");
      toast.error("Time is up! Auto Submitting Quiz");
      handleQuizSubmit();
    }
  }, [isTimeUp]);

  useEffect(() => {
    setIsFinalQuestion(currentQuestionIndex === questions.length - 1);
  }, [currentQuestionIndex, questions]);

  const handleOptionSelect = (option: string) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestionIndex] = option;
    setSelectedOptions(updatedOptions);
  };

  const handleNextQuestion = () => {
    if (
      selectedOptions[currentQuestionIndex] ===
      questions[currentQuestionIndex].correctAnswer
    ) {
      // Increase the score if the selected option is correct
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuizSubmit = async () => {
    // const user = auth.currentUser;
    // if (!user) {
    //   console.error("User not authenticated");
    //   toast.error("User not authenticated");
    //   return;
    // }

    let myScore = 0;
    const correctAnswers = questions.map(
      (question: any) => question.correctAnswer
    );

    //check if all questions are attempted

    if (selectedOptions.length !== correctAnswers.length && !isTimeUp) {
      toast.error("Please attempt all of the questions");
      return;
    }

    for (let i = 0; i < selectedOptions.length; i++) {
      if (selectedOptions[i] == correctAnswers[i]) {
        myScore = myScore + 1;
      }
    }

    var d = new Date();
    var n = formatDateTime(d);
    const quizResults = {
      score: myScore,
      totalQuestions: questions.length,
      selectedOptions,
      correctAnswers: questions.map((question) => question.correctAnswer),
      fetchedQuestions: questions,
      //   quizId: quizId,
      //   quizName: quizName,
      //   course: course,
      //   courseCode: courseCode,
      time: n,
    };

    try {
      console.log(quizResults, "quiz submitted");

      // Create a reference to the user's document
      // const userDocRef = doc(db, 'users', user.uid);

      //   await updateDoc(userDocRef as any, {
      //     quizData: arrayUnion(quizResults),
      //   });
      console.log(`Quiz Completed! Your Score: ${score}/${questions.length}`);
      toast.success("Quiz Submitted Succesfully!");
      // // Redirect to the results page
      // router.push(`/results`);
    } catch (error) {
      console.error("Error storing quiz results:", error);
      toast.error("Error storing quiz results, Check Console");
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <SocketProvider>
        <div className="absolute right-6 top-44 ">
          <VideoCapture />
        </div>
        <div className="min-h-screen flex items-center justify-center">
          {currentQuestion ? (
            <>
              <div className="bg-slate-800 text-white p-8 rounded-lg shadow-lg w-4/6 h-4/6">
                <h2 className="text-xl mb-4">
                  Question {currentQuestionIndex + 1}:
                </h2>
                <p className="text-lg mb-4">{currentQuestion.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-4 text-lg cursor-pointer rounded-lg transition duration-300 ${
                        selectedOptions[currentQuestionIndex] === option
                          ? "bg-blue-500 text-white"
                          : "bg-gray-700 hover:bg-gray-500"
                      }`}
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between">
                  {currentQuestionIndex > 0 && (
                    <button
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
                      onClick={handlePreviousQuestion}
                    >
                      Previous
                    </button>
                  )}
                  <div className=" bg-slate-600 text-white p-2 rounded-lg shadow-lg">
                    {!isTimeUp ? (
                      <span>
                        {" "}
                        Time Left: {Math.floor(timeLeft / 60)} minutes{" "}
                        {timeLeft % 60} seconds{" "}
                      </span>
                    ) : (
                      <span> Time's Up</span>
                    )}
                  </div>
                  {isFinalQuestion ? (
                    <button
                      className="px-4 py-2 bg-blue-500 hover-bg-blue-700 text-white rounded-md"
                      onClick={handleQuizSubmit}
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      className="px-4 py-2 bg-blue-500 hover-bg-blue-700 text-white rounded-md"
                      onClick={handleNextQuestion}
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <p>Loading questions...</p>
          )}
        </div>
      </SocketProvider>
    </>
  );
}

export default Quiz;
