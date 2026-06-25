import { useState, useEffect, useRef } from "react";
import MCQQuestion from "./MCQQuestion";
import CodingQuestion from "./CodingQuestion";
import { getRemainingMs, formatTime } from "../utils/timer";
import { captureScreen } from "../utils/screenshots";

export default function Quiz({
  studentName, questions, savedAnswers,
  startTime, onScreenshot, onTabSwitch,
  onSubmit, onReset,
}) {
  const { mcq, coding } = questions;
  const total = mcq.length + coding.length;

  const [mcqAnswers, setMcqAnswers] = useState(savedAnswers?.mcq ?? Array(mcq.length).fill(null));
  const [codingAnswers, setCodingAnswers] = useState(
    savedAnswers?.coding ?? coding.map((q) => ({ code: q.starterCode, passed: false }))
  );
  const [step, setStep] = useState(savedAnswers?.step ?? 0);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [remaining, setRemaining] = useState(() => getRemainingMs(startTime));
  const [tabWarning, setTabWarning] = useState(false);
  const tabSwitchCountRef = useRef(0);
  const lastCaptureRef = useRef(0);

  const isLastStep = step === total - 1;
  const isMCQStep = step < mcq.length;
  const codingIndex = step - mcq.length;
  const answeredMCQ = mcqAnswers.filter((a) => a !== null).length;

  // ── Countdown timer ────────────────────────────────────────────────────
  const autoSubmitRef = useRef(false);
  useEffect(() => {
    const tick = setInterval(() => {
      const left = getRemainingMs(startTime);
      setRemaining(left);
      if (left === 0 && !autoSubmitRef.current) {
        autoSubmitRef.current = true;
        clearInterval(tick);
        onSubmit({ mcq: mcqAnswers, coding: codingAnswers });
      }
    }, 1000);
    return () => clearInterval(tick);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime, mcqAnswers, codingAnswers]);

  // ── Tab / window switch: warn + screenshot ────────────────────────────
  useEffect(() => {
    const handleSwitch = async () => {
      // deduplicate: visibilitychange + blur can both fire; ignore within 2s
      const now = Date.now();
      if (now - lastCaptureRef.current < 2000) return;
      lastCaptureRef.current = now;

      tabSwitchCountRef.current += 1;
      onTabSwitch(tabSwitchCountRef.current);

      setTabWarning(true);
      setTimeout(() => setTabWarning(false), 5000);

      const url = await captureScreen();
      if (url) onScreenshot(url);
    };

    const onVisibility = () => { if (document.hidden) handleSwitch(); };
    const onBlur       = () => handleSwitch();

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", onBlur);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", onBlur);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Progress persistence ───────────────────────────────────────────────
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

  const handleSubmitConfirmed = () => {
    setShowSubmitConfirm(false);
    onSubmit({ mcq: mcqAnswers, coding: codingAnswers });
  };

  const progressPct = Math.round(((step + 1) / total) * 100);
  const isLow = remaining < 5 * 60 * 1000;   // < 5 min — go red
  const isCritical = remaining < 60 * 1000;   // < 1 min — pulse

  return (
    <div className="quiz-wrapper">
      {/* Header */}
      <header className="quiz-header">
        <div className="quiz-header-left">
          <span className="quiz-logo">JS</span>
          <span className="quiz-name">{studentName}</span>
        </div>
        <div className="quiz-header-right">
          <span className={`timer ${isLow ? "timer--low" : ""} ${isCritical ? "timer--critical" : ""}`}>
            {formatTime(remaining)}
          </span>
          <button className="btn-reset" onClick={() => setShowResetConfirm(true)}>Reset</button>
        </div>
      </header>

      {/* Progress bar */}
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
      </div>
      <p className="progress-label">
        {isMCQStep ? `MCQ ${step + 1} of ${mcq.length}` : `Coding ${codingIndex + 1} of ${coding.length}`}
        &nbsp;·&nbsp; {answeredMCQ}/{mcq.length} MCQ answered
      </p>

      {/* Tab-switch warning banner */}
      {tabWarning && (
        <div className="tab-warning">
          <span className="tab-warning-icon">⚠️</span>
          <span>
            You switched tabs or windows. This has been <strong>recorded</strong> and will be reported to the instructor.
          </span>
          <button className="tab-warning-close" onClick={() => setTabWarning(false)}>✕</button>
        </div>
      )}

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
          <button className="btn-primary" onClick={() => setShowSubmitConfirm(true)}>
            Submit Quiz
          </button>
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

      {/* Submit confirmation modal */}
      {showSubmitConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-icon">📝</div>
            <h2>Submit Quiz?</h2>
            <p>
              You have answered <strong>{answeredMCQ} of {mcq.length}</strong> MCQ questions.
              Once submitted you cannot change your answers.
            </p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowSubmitConfirm(false)}>
                Go Back
              </button>
              <button className="btn-primary" onClick={handleSubmitConfirmed}>
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset confirmation modal */}
      {showResetConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-icon">⚠️</div>
            <h2>Reset Quiz?</h2>
            <p>This will erase all your answers and restart from scratch. This cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowResetConfirm(false)}>Cancel</button>
              <button className="btn-danger" onClick={onReset}>Yes, Reset</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
