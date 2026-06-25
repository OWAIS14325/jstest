import { useState, useEffect } from "react";
import NameEntry from "./components/NameEntry";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import { MCQ_POOL, CODING_POOL } from "./data/questions";
import { pickQuestionsForStudent } from "./utils/randomize";
import { loadState, saveState, clearState } from "./utils/storage";

function makeSubmitHandler(submitFn, saveFn) {
  submitFn.saveProgress = saveFn;
  return submitFn;
}

export default function App() {
  const [appState, setAppState] = useState(() => {
    const saved = loadState();
    return saved ?? { screen: "entry", name: null, questions: null, answers: null, submitted: false };
  });

  useEffect(() => {
    saveState(appState);
  }, [appState]);

  const handleStart = (name) => {
    const saved = loadState();
    if (saved && saved.name === name && !saved.submitted && saved.screen === "quiz") {
      setAppState(saved);
      return;
    }
    const questions = pickQuestionsForStudent(name, MCQ_POOL, CODING_POOL);
    const initialAnswers = {
      mcq: Array(questions.mcq.length).fill(null),
      coding: questions.coding.map((q) => ({ code: q.starterCode, passed: false })),
      step: 0,
    };
    setAppState({
      screen: "quiz",
      name,
      questions,
      answers: initialAnswers,
      startTime: Date.now(),
      screenshots: [],
      tabSwitches: 0,
      submitted: false,
    });
  };

  const handleProgress = (progressAnswers) => {
    setAppState((prev) => ({ ...prev, answers: { ...prev.answers, ...progressAnswers } }));
  };

  const handleScreenshot = (url) => {
    setAppState((prev) => ({ ...prev, screenshots: [...(prev.screenshots ?? []), url] }));
  };

  const handleTabSwitch = (count) => {
    setAppState((prev) => ({ ...prev, tabSwitches: count }));
  };

  const handleSubmit = (finalAnswers) => {
    setAppState((prev) => ({ ...prev, screen: "results", answers: finalAnswers, submitted: true }));
  };

  const handleReset = () => {
    clearState();
    setAppState({ screen: "entry", name: null, questions: null, answers: null, submitted: false });
  };

  const submitHandler = makeSubmitHandler(handleSubmit, handleProgress);

  if (appState.screen === "entry") {
    return <NameEntry onStart={handleStart} />;
  }

  if (appState.screen === "quiz") {
    return (
      <Quiz
        studentName={appState.name}
        questions={appState.questions}
        savedAnswers={appState.answers}
        startTime={appState.startTime}
        onScreenshot={handleScreenshot}
        onTabSwitch={handleTabSwitch}
        onSubmit={submitHandler}
        onReset={handleReset}
      />
    );
  }

  if (appState.screen === "results") {
    return (
      <Results
        studentName={appState.name}
        questions={appState.questions}
        answers={appState.answers}
        screenshots={appState.screenshots ?? []}
        tabSwitches={appState.tabSwitches ?? 0}
      />
    );
  }

  return null;
}
