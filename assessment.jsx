const { useState, useEffect } = React;

const Assessment = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 'industry',
      question: "Which sector best describes your current career?",
      options: [
        { label: "Tech / Creative / Writing", weight: 85 },
        { label: "Finance / Analysis / Admin", weight: 70 },
        { label: "Operations / Logistics / Trade", weight: 40 },
        { label: "Healthcare / Manual Labor", weight: 20 }
      ]
    },
    {
      id: 'ai_usage',
      question: "How much of your daily work could be handled by AI today?",
      options: [
        { label: "Most of it (>70%)", weight: 90 },
        { label: "Significant parts (30-70%)", weight: 60 },
        { label: "Small tasks (<30%)", weight: 30 },
        { label: "None / Physically tethered", weight: 10 }
      ]
    },
    {
      id: 'savings',
      question: "What is your financial 'Runway' if income stops tomorrow?",
      options: [
        { label: "Less than 1 month", weight: 95 },
        { label: "1-3 months", weight: 60 },
        { label: "3-6 months", weight: 30 },
        { label: "6+ months", weight: 10 }
      ]
    }
  ];

  const handleOptionSelect = (option) => {
    const newAnswers = { ...answers, [questions[step].id]: option.weight };
    setAnswers(newAnswers);
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers) => {
    setIsCalculating(true);
    // Simulate AI thinking
    setTimeout(() => {
      const avg = Object.values(finalAnswers).reduce((a, b) => a + b, 0) / questions.length;
      const finalScore = Math.max(10, Math.floor(100 - avg));
      
      setScore(finalScore);
      setIsCalculating(false);
      setShowResult(true);

      // Save to Supabase (if configured)
      if (typeof window.saveSurvivalScore === 'function') {
        window.saveSurvivalScore({
          score: finalScore,
          level: finalScore < 40 ? "CRITICAL" : finalScore < 70 ? "VULNERABLE" : "STABLE",
          industry: finalAnswers.industry // Just an example, ideally save the industry name
        });
      }
    }, 2000);
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setShowResult(false);
    setScore(0);
  };

  if (showResult) {
    return (
      <div className="assessment-result fade-in visible">
        <div className="terminal-header">RESULT_ACQUIRED</div>
        <div className="score-display">
          <div className="score-label">YOUR_SURVIVAL_SCORE</div>
          <div className="score-value" style={{ color: score < 50 ? 'var(--danger)' : 'var(--accent)' }}>
            {score}/100
          </div>
          <div className="score-status">
            {score < 40 ? "CRITICAL_RISK_DETECTED" : score < 70 ? "VULNERABILITY_CONFIRMED" : "STABILITY_DETECTED"}
          </div>
        </div>
        <p className="result-desc">
          Based on your inputs, your career trajectory is currently 
          <strong> {score < 50 ? 'highly volatile' : 'at risk'} </strong> 
          in the emerging AI economy. You need a structured recovery protocol.
        </p>
        <div className="result-actions">
          <a href="#system" className="btn-primary" onClick={() => window.closeAssessment()}>
            <span>EXECUTE_RECOVERY_PROTOCOL</span>
          </a>
          <button className="btn-link" onClick={reset}>RE-RUN_ASSESSMENT</button>
        </div>
      </div>
    );
  }

  if (isCalculating) {
    return (
      <div className="assessment-loading">
        <div className="loading-spinner"></div>
        <div className="loading-text">ANALYZING_CAREER_TRAJECTORY...</div>
        <div className="loading-subtext">Calculating disruption vectors and market velocity</div>
      </div>
    );
  }

  return (
    <div className="assessment-container">
      <div className="step-indicator">
        STEP_{step + 1}_OF_{questions.length}
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${((step + 1) / questions.length) * 100}%` }}></div>
        </div>
      </div>
      <h3 className="question-text">{questions[step].question}</h3>
      <div className="options-grid">
        {questions[step].options.map((option, i) => (
          <button 
            key={i} 
            className="option-btn"
            onClick={() => handleOptionSelect(option)}
          >
            <span className="option-index">[{i + 1}]</span>
            <span className="option-label">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Mount the component
const assessmentRoot = document.getElementById('assessment-root');
if (assessmentRoot) {
  const root = ReactDOM.createRoot(assessmentRoot);
  root.render(<Assessment />);
}
