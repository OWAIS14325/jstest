import { useState } from "react";
import MCQQuestion from "./MCQQuestion";
import CodingQuestion from "./CodingQuestion";

export default function Quiz({ studentName, questions, savedAnswers, onSubmit, onReset }) {
  const { mcq, coding } = questions;
  const total = mcq.length + coding.length;

  const [mcqAnswers, setMcqAnswers] = useState(savedAnswers?.mcq ?? Array(mcq.length).fill(null));
  const [codingAnswers, setCodingAnswers] = useState(
    savedAnswers?.coding ?? coding.map((q) => ({ code: q.starterCode, passed: false }))
  );
  const [step, setStep] = useState(savedAnswers?.step ?? 0); // 0..9 = MCQ, 10..11 = coding
  const [showConfirm, setShowConfirm] = useState(false);

  const isLastStep = step === total - 1;
  const isMCQStep = step < mcq.length;
  const codingIndex = step - mcq.length;

  const answeredMCQ = mcqAnswers.filter((a) => a !== null).length;
  const answeredCoding = codingAnswers.filter((a) => a.code !== coding[0]?.starterCode || a.passed).length;

  const onSave = (state) => {
    if (typeof onSubmit.saveProgress === "function") onSubmit.saveProgress(state);
  };

  const handleMCQAnswer = (choice) => {
    const next = [...mcqAnswers];
    next[step] = choice;
    setMcqAnswers(next);
    onSave({ mcq: next, coding: codingAnswers, step });
  };

  const handleCodingAnswer = (code, passed) => {
    const next = [...codingAnswers];
    next[codingIndex] = { code, passed };
    setCodingAnswers(next);
    onSave({ mcq: mcqAnswers, coding: next, step });
  };

  const goNext = () => {
    const nextStep = step + 1;
    setStep(nextStep);
    onSave({ mcq: mcqAnswers, coding: codingAnswers, step: nextStep });
  };

  const goPrev = () => {
    const nextStep = step - 1;
    setStep(nextStep);
    onSave({ mcq: mcqAnswers, coding: codingAnswers, step: nextStep });
  };

  const handleSubmit = () => {
    onSubmit({ mcq: mcqAnswers, coding: codingAnswers });
  };

  const progressPct = Math.round(((step + 1) / total) * 100);

  return (
    <div className="quiz-wrapper">
      {/* Header */}
      <header className="quiz-header">
        <div className="quiz-header-left">
          <span className="quiz-logo">JS</span>
          <span className="quiz-name">{studentName}</span>
        </div>
        <button className="btn-reset" onClick={() => setShowConfirm(true)}>Reset</button>
      </header>

      {/* Progress */}
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
      </div>
      <p className="progress-label">
        {isMCQStep ? `MCQ ${step + 1} of ${mcq.length}` : `Coding ${codingIndex + 1} of ${coding.length}`}
        &nbsp;·&nbsp; {answeredMCQ}/{mcq.length} MCQ answered
      </p>

      {/* Question */}
      <div className="quiz-body">
        {isMCQStep ? (
          <MCQQuestion
            question={mcq[step]}
            index={step}
            total={mcq.length}
            answer={mcqAnswers[step]}
            onAnswer={handleMCQAnswer}
          />
        ) : (
          <CodingQuestion
            key={coding[codingIndex].id}
            question={coding[codingIndex]}
            index={codingIndex}
            answer={codingAnswers[codingIndex]?.code}
            onAnswer={handleCodingAnswer}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="quiz-nav">
        <button className="btn-secondary" onClick={goPrev} disabled={step === 0}>← Back</button>
        {isLastStep ? (
          <button className="btn-primary" onClick={handleSubmit}>Submit Quiz</button>
        ) : (
          <button
            className="btn-primary"
            onClick={goNext}
            disabled={isMCQStep && mcqAnswers[step] === null}
          >
            Next →
          </button>
        )}
      </div>

      {/* Reset confirmation modal */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Reset Quiz?</h2>
            <p>This will clear all your answers and start fresh. This cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="btn-danger" onClick={onReset}>Yes, Reset</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
