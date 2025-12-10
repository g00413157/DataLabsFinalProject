import React, { useEffect, useState } from "react";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/quiz")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading quiz…</p>;
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="quiz-page">
        <div className="quiz-card">
          <h2>No quiz questions found</h2>
          <p>Add questions to your MongoDB to start the quiz.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];
  const options = Array.isArray(currentQuestion?.options)
  ? currentQuestion.options
  : [];

  const totalQuestions = questions.length;
  const progress = Math.round(((currentIdx + 1) / totalQuestions) * 100);

  const handleOptionClick = (option) => {
    if (selectedOption) return;
    setSelectedOption(option);
    const correct = option === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore((prev) => prev + 1);
  };

  const handleNext = () => {
    if (currentIdx + 1 < totalQuestions) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="quiz-page">
        <div className="quiz-card quiz-results">
          <h2>Quiz Complete</h2>
          <p className="quiz-score">
            You scored <strong>{score}</strong> out of{" "}
            <strong>{totalQuestions}</strong>
          </p>
          <p className="quiz-score-sub">
            Accuracy: {Math.round((score / totalQuestions) * 100)}%
          </p>
          <button className="quiz-btn primary" onClick={handleRestart}>
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="quiz-card">
        <div className="quiz-header">
          <span className="quiz-pill">
            Question {currentIdx + 1} / {totalQuestions}
          </span>
          <div className="quiz-progress">
            <div className="quiz-progress-bar">
              <div
                className="quiz-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="quiz-progress-text">{progress}%</span>
          </div>
        </div>

        <h2 className="quiz-question">{currentQuestion.question}</h2>

        <div className="quiz-options">
          {options.map((option) => {
            let className = "quiz-option";
            if (selectedOption) {
              if (option === currentQuestion.correctAnswer) {
                className += " correct";
              } else if (option === selectedOption) {
                className += " incorrect";
              } else {
                className += " disabled";
              }
            }
            return (
              <button
                key={option}
                className={className}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            );
          })}
        </div>

        {selectedOption && (
          <p className={`quiz-feedback ${isCorrect ? "ok" : "bad"}`}>
            {isCorrect ? "Correct! ⚽" : "Incorrect. Keep going!"}
          </p>
        )}

        <div className="quiz-footer">
          <button
            className="quiz-btn secondary"
            onClick={handleNext}
            disabled={!selectedOption}
          >
            {currentIdx + 1 === totalQuestions ? "Finish Quiz" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
