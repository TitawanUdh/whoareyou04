import { useParams, useNavigate } from "react-router-dom";
import questions from "../components/question";
import { Button } from "react-bootstrap";
import { IoIosArrowBack } from "react-icons/io";

function QuestionPage({ answers, setAnswers }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const questionIndex = Number(id) - 1;
  const question = questions[questionIndex];

  if (!question) return <div>ไม่พบคำถาม</div>;

  const handleSelect = (option) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = option.trait;
    setAnswers(newAnswers);

    if (questionIndex + 1 < questions.length) {
      navigate(`/question/${questionIndex + 2}`);
    } else {
      localStorage.setItem("quizScore", JSON.stringify(newAnswers));
      navigate("/loading");
    }
  };

  return (
    <div className="question-page position-relative">
  
  {questionIndex > 0 && (
    <Button
      className="button-back"
      onClick={() => navigate(`/question/${questionIndex}`)}
    >
      <IoIosArrowBack />
    </Button>
  )}

  <div className="container">
    <h2>{question.question}</h2>

    {question.options.map((opt) => (
      <div
        key={`${question.id}-${opt.key}`}
        className="option mt-4"
        onClick={() => handleSelect(opt)}
      >
        {opt.key}. {opt.text}
      </div>
    ))}
  </div>
</div>

  );
}

export default QuestionPage;
