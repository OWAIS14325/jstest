import { useState } from "react";

export default function CodingQuestion({ question, index, answer, onAnswer }) {
  const [code, setCode] = useState(answer ?? question.starterCode);
  const [result, setResult] = useState(null);

  const runTests = () => {
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function(`${code}; return ${question.id.replace("p", "")};`);
      // We can't call fn() directly without the actual function name, so we use a different approach
      // Extract function name from code
      const match = code.match(/function\s+(\w+)/);
      if (!match) {
        setResult({ ok: false, msg: "No function found. Make sure you define a function." });
        return;
      }
      // eslint-disable-next-line no-new-func
      const userFn = new Function(`${code}; return ${match[1]};`)();
      const passed = question.validate(userFn);
      setResult({ ok: passed, msg: passed ? "All test cases passed!" : "Some test cases failed. Check your logic." });
      onAnswer(code, passed);
    } catch (err) {
      setResult({ ok: false, msg: `Error: ${err.message}` });
      onAnswer(code, false);
    }
  };

  const handleChange = (e) => {
    setCode(e.target.value);
    setResult(null);
    onAnswer(e.target.value, false);
  };

  return (
    <div className="q-card">
      <div className="q-meta">
        <span className="q-badge q-badge--coding">Coding</span>
        <span className="q-badge">{question.topic}</span>
      </div>
      <h3 className="code-title">{question.title}</h3>
      <pre className="code-prompt">{question.prompt}</pre>

      <div className="code-test-cases">
        <p className="code-test-label">Test Cases:</p>
        {question.testCases.map((tc, i) => (
          <div key={i} className="code-test-row">
            <code>Input: {JSON.stringify(tc.input)}</code>
            <code>→ Expected: {JSON.stringify(tc.expected)}</code>
          </div>
        ))}
      </div>

      <textarea
        className="code-editor"
        value={code}
        onChange={handleChange}
        spellCheck={false}
        rows={10}
      />

      <div className="code-actions">
        <button className="btn-run" onClick={runTests}>▶ Run Tests</button>
        {result && (
          <span className={`code-result ${result.ok ? "code-result--pass" : "code-result--fail"}`}>
            {result.ok ? "✓" : "✗"} {result.msg}
          </span>
        )}
      </div>
    </div>
  );
}
