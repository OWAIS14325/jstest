import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

const INSTRUCTOR_EMAIL = "owaissiddiquitwo@gmail.com";
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const emailjsConfigured = EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY;

export default function Results({ studentName, questions, answers, screenshots = [], tabSwitches = 0 }) {
  const { mcq, coding } = questions;
  const { mcq: mcqAnswers, coding: codingAnswers } = answers;

  const [emailStatus, setEmailStatus] = useState("idle");

  const CODING_WEIGHT = 5;
  const mcqScore    = mcqAnswers.reduce((acc, ans, i) => acc + (ans === mcq[i].answer ? 1 : 0), 0);
  const codingScore = codingAnswers.reduce((acc, a) => acc + (a?.passed ? CODING_WEIGHT : 0), 0);
  const totalScore  = mcqScore + codingScore;
  const maxScore    = mcq.length + coding.length * CODING_WEIGHT;
  const pct        = Math.round((totalScore / maxScore) * 100);
  const grade      = pct >= 90 ? "A" : pct >= 75 ? "B" : pct >= 60 ? "C" : pct >= 45 ? "D" : "F";
  const gradeColor = { A: "#22c55e", B: "#84cc16", C: "#eab308", D: "#f97316", F: "#ef4444" }[grade];

  const buildBreakdown = () => {
    let t = `--- MCQ (${mcqScore}/${mcq.length}) ---\n`;
    mcq.forEach((q, i) => {
      const ok = mcqAnswers[i] === q.answer;
      t += `Q${i + 1} [${q.topic}]: ${ok ? "CORRECT" : "WRONG"}\n`;
      t += `  Answered : ${q.options[mcqAnswers[i]] ?? "Not answered"}\n`;
      if (!ok) t += `  Correct  : ${q.options[q.answer]}\n`;
    });
    t += `\n--- Coding (${codingScore}/${coding.length}) ---\n`;
    coding.forEach((q, i) => {
      t += `P${i + 1} [${q.title}]: ${codingAnswers[i]?.passed ? "PASSED" : "FAILED"}\n`;
      t += `Code:\n${codingAnswers[i]?.code ?? "(none)"}\n\n`;
    });
    return t;
  };

  const sendEmail = async () => {
    setEmailStatus("sending");
    const screenshotLinks = screenshots.length
      ? "\n\n--- Screenshots ---\n" + screenshots.map((u, i) => `#${i + 1}: ${u}`).join("\n")
      : "\n\n--- Screenshots ---\nNot captured (ImgBB key not configured)";

    const messageBody =
      `Score: ${totalScore}/${maxScore} (${pct}%) — Grade ${grade}\n` +
      `MCQ: ${mcqScore}/${mcq.length}   Coding: ${codingScore}/${coding.length * CODING_WEIGHT} (${CODING_WEIGHT}pts each)\n` +
      `Tab/window switches: ${tabSwitches} time${tabSwitches !== 1 ? "s" : ""}\n\n` +
      buildBreakdown() +
      screenshotLinks;

    if (emailjsConfigured) {
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            to_email: INSTRUCTOR_EMAIL,
            name:     studentName,
            time:     new Date().toLocaleString(),
            message:  messageBody,
          },
          EMAILJS_PUBLIC_KEY
        );
        setEmailStatus("sent");
      } catch (err) {
        console.error("EmailJS error:", err);
        setEmailStatus("error");
      }
    } else {
      const subject = encodeURIComponent(`JS Quiz Result — ${studentName} — ${pct}%`);
      const body    = encodeURIComponent(`Student: ${studentName}\nDate: ${new Date().toLocaleString()}\n\n${messageBody}`);
      window.open(`mailto:${INSTRUCTOR_EMAIL}?subject=${subject}&body=${body}`, "_blank");
      setEmailStatus("sent_mailto");
    }
  };

  useEffect(() => {
    const t = setTimeout(sendEmail, 600);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="results-wrapper">
      <div className="results-card">
        <div className="results-score-circle" style={{ borderColor: gradeColor }}>
          <span className="results-grade" style={{ color: gradeColor }}>{grade}</span>
          <span className="results-pct">{pct}%</span>
        </div>

        <h1 className="results-title">{studentName}</h1>
        <p className="results-sub">Quiz Submitted</p>

        <div className="results-breakdown">
          <div className="results-stat">
            <span className="results-stat-value">{mcqScore}<small>/{mcq.length}</small></span>
            <span className="results-stat-label">MCQ</span>
          </div>
          <div className="results-stat">
            <span className="results-stat-value">{codingScore}<small>/{coding.length * CODING_WEIGHT}</small></span>
            <span className="results-stat-label">Coding</span>
          </div>
          <div className="results-stat">
            <span className="results-stat-value">{totalScore}<small>/{maxScore}</small></span>
            <span className="results-stat-label">Total</span>
          </div>
        </div>

        <div className="results-email-status">
          {emailStatus === "sending"     && <p className="email-sending">Sending result to instructor…</p>}
          {emailStatus === "sent"        && <p className="email-sent">Result sent to instructor.</p>}
          {emailStatus === "sent_mailto" && <p className="email-sent">Email draft opened — please press Send.</p>}
          {emailStatus === "error"       && (
            <p className="email-error">
              Auto-send failed.{" "}
              <button className="btn-link" onClick={sendEmail}>Try again</button>
            </p>
          )}
        </div>

        {/* Screenshots captured */}
        {screenshots.length > 0 && (
          <p className="screenshots-note">
            {screenshots.length} screenshot{screenshots.length > 1 ? "s" : ""} captured and included in the report.
          </p>
        )}

        <details className="results-review">
          <summary>Review Answers</summary>
          <div className="review-list">
            {mcq.map((q, i) => {
              const correct = mcqAnswers[i] === q.answer;
              return (
                <div key={q.id} className={`review-item ${correct ? "review-item--correct" : "review-item--wrong"}`}>
                  <p className="review-q">{i + 1}. {q.q}</p>
                  <p className="review-ans">
                    Your answer: <strong>{q.options[mcqAnswers[i]] ?? "—"}</strong>
                    {!correct && (
                      <> &nbsp;·&nbsp; Correct: <strong className="review-correct">{q.options[q.answer]}</strong></>
                    )}
                  </p>
                  {!correct && <p className="review-explain">{q.explanation}</p>}
                </div>
              );
            })}
            {coding.map((q, i) => (
              <div key={q.id} className={`review-item ${codingAnswers[i]?.passed ? "review-item--correct" : "review-item--wrong"}`}>
                <p className="review-q">{mcq.length + i + 1}. [Coding] {q.title}</p>
                <p className="review-ans">{codingAnswers[i]?.passed ? "All tests passed" : "Tests failed"}</p>
              </div>
            ))}
          </div>
        </details>

        <p className="results-final-note">Your result has been submitted. You may close this window.</p>
      </div>
    </div>
  );
}
