import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Question } from "../types";
import questions from "../../assets/questions";

type QuizContextType = {
  question: Question;
  questionIndex: number;
  onNext: () => void;
  isSelected?: boolean;
  selectedOption?: string;
  setSelectedOption: (option: string) => void;
  score: number;
  totalQuestions: number;
  restart: () => void;
};
const QuizContext = createContext<QuizContextType>({
  question: questions[0],
  questionIndex: 0,
  onNext: () => {},
  setSelectedOption: (option) => {},
  score: 0,
  totalQuestions: questions.length,
  restart: () => {},
});

function QuizProvider({ children }: PropsWithChildren) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questions[questionIndex];
  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const [score, setScore] = useState(0);
  const onNext = () => {
    if (selectedOption === question?.correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setQuestionIndex((prev) => prev + 1);
  };
  function Restart() {
    setQuestionIndex(0);
    setScore(0);
    setSelectedOption("");
  }
  return (
    <QuizContext.Provider
      value={{
        question,
        questionIndex,
        onNext,
        selectedOption,
        setSelectedOption,
        score,
        totalQuestions: questions.length,
        restart: Restart,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
export default QuizProvider;

export const useQuizContext = () => useContext(QuizContext);
