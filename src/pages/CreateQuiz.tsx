import { useState, useEffect } from "react";
import FileInput from "../components/Fileinput";

import toast from "react-hot-toast";

function CreateQuiz() {
  const [fileName, setFileName] = useState("");
  const [excelData, setExcelData] = useState(null);
  console.log("excelData", excelData);

  // User authentication state
  useEffect(() => {
    // Check the user's authentication state
  }, []);

  const handleFileUpload = async (data: any) => {
    setExcelData(data);
    setFileName(data.fileName);
    const filteredQuizData = data.quizData.filter((entry: any) => {
      return (
        entry.questionNumber && // Ensure questionNumber is not null
        entry.question && // Ensure question is not null
        entry.options && // Ensure options is not null
        entry.correctAnswer // Ensure correctAnswer is not null
      );
    });

    // Update the original quizData object with the filtered data
    data.quizData = filteredQuizData;
    // console.log("data"  +  data);
    // console.log("excel  "  + excelData);
    if (data) {
      try {
      } catch (error) {
        console.error("Error adding quiz data: ", error);
        toast.error("Quiz addition failed");
      }
    }
  };

  return (
    <div className="quiz-generator h-full">
      <FileInput onFileUpload={handleFileUpload} />
      {fileName && <p>Uploaded File: {fileName}</p>}
      {/* Display and configure the generated quiz here */}
    </div>
  );
}

export default CreateQuiz;
