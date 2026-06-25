import { useState } from "react";

const TRAINERS = [
  "Trainer 1","Trainer 2","Trainer 3","Trainer 4","Trainer 5","Trainer 6",
  "Trainer 7","Trainer 8","Trainer 9","Trainer 10","Trainer 11","Trainer 12",
];

export default function NameEntry({ onStart }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter your name.");
      return;
    }
    onStart(trimmed);
  };

  return (
    <div className="entry-wrapper">
      <div className="entry-card">
        <div className="entry-logo">JS</div>
        <h1 className="entry-title">JavaScript Quiz</h1>
        <p className="entry-sub">Lectures 1 – 5 &nbsp;·&nbsp; 10 MCQ + 2 Coding</p>

        <form onSubmit={handleSubmit} className="entry-form">
          <label className="entry-label" htmlFor="name">Your Name</label>
          <input
            id="name"
            className={`entry-input ${error ? "entry-input--error" : ""}`}
            type="text"
            placeholder="e.g. Ali Hassan"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(""); }}
            autoFocus
          />
          {error && <p className="entry-error">{error}</p>}

          <p className="entry-hint">
            Your questions are uniquely generated from your name — each student gets a different set.
          </p>

          <button type="submit" className="btn-primary btn-full">
            Start Quiz →
          </button>
        </form>
      </div>
    </div>
  );
}
