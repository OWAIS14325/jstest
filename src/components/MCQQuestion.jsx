export default function MCQQuestion({ question, index, total, answer, onAnswer }) {
  return (
    <div className="q-card">
      <div className="q-meta">
        <span className="q-badge">{question.topic}</span>
        <span className="q-counter">Q{index + 1} / {total}</span>
      </div>
      <p className="q-text">{question.q}</p>
      <div className="q-options">
        {question.options.map((opt, i) => (
          <button
            key={i}
            className={`q-option ${answer === i ? "q-option--selected" : ""}`}
            onClick={() => onAnswer(i)}
          >
            <span className="q-option-letter">{String.fromCharCode(65 + i)}</span>
            <span>{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
