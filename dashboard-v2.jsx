const { useState, useEffect, useRef } = React;

const DashboardV2 = () => {
  const [activeView, setActiveView] = useState('overview');
  const [survivalScore, setSurvivalScore] = useState(67);
  const canvasRef = useRef(null);
  
  useEffect(() => {
    // Animated score visualization
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 800 * dpr;
    canvas.height = 400 * dpr;
    canvas.style.width = '800px';
    canvas.style.height = '400px';
    ctx.scale(dpr, dpr);
    
    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, 800, 400);
      
      // Grid lines
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 1;
      for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * 40);
        ctx.lineTo(800, i * 40);
        ctx.stroke();
      }
      
      // Data line (survival score over time)
      ctx.strokeStyle = '#00ff88';
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      const points = [
        { x: 0, y: 350 },
        { x: 100, y: 320 },
        { x: 200, y: 290 },
        { x: 300, y: 250 },
        { x: 400, y: 220 },
        { x: 500, y: 180 },
        { x: 600, y: 150 },
        { x: 700, y: 120 },
        { x: 800, y: 100 }
      ];
      
      points.forEach((point, i) => {
        const offsetY = Math.sin(frame * 0.02 + i * 0.5) * 5;
        if (i === 0) {
          ctx.moveTo(point.x, point.y + offsetY);
        } else {
          ctx.lineTo(point.x, point.y + offsetY);
        }
      });
      
      ctx.stroke();
      
      // Glow effect
      ctx.shadowColor = '#00ff88';
      ctx.shadowBlur = 20;
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      frame++;
      requestAnimationFrame(animate);
    };
    
    animate();
  }, []);
  
  const tasks = [
    { id: 1, text: 'Complete AI disruption assessment', status: 'done', points: 15 },
    { id: 2, text: 'Update skill matrix with market data', status: 'done', points: 10 },
    { id: 3, text: 'Deploy first income experiment', status: 'active', points: 25 },
    { id: 4, text: 'Build portfolio case study #1', status: 'pending', points: 20 },
    { id: 5, text: 'Execute daily outreach protocol', status: 'pending', points: 10 },
  ];
  
  const skills = [
    { name: 'AI Prompt Engineering', progress: 75, velocity: '+12%' },
    { name: 'Python Automation', progress: 45, velocity: '+8%' },
    { name: 'Technical Writing', progress: 60, velocity: '+5%' },
    { name: 'Freelance Marketing', progress: 30, velocity: '+15%' },
  ];

  return (
    <div style={{
      background: '#000',
      border: '1px solid #2a2a2a',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Terminal-style header */}
      <div style={{
        background: '#0a0a0a',
        padding: '24px 40px',
        borderBottom: '1px solid #2a2a2a',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '12px',
        color: '#666',
        letterSpacing: '0.1em',
      }}>
        <div style={{ marginBottom: '8px' }}>SYSTEM_STATUS: ACTIVE</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>USER: ALEX_CHEN</span>
          <span>SURVIVAL_SCORE: {survivalScore}/100</span>
          <span>UPTIME: 12_DAYS</span>
        </div>
      </div>
      
      {/* Navigation */}
      <div style={{
        display: 'flex',
        gap: '0',
        borderBottom: '1px solid #1a1a1a',
        background: '#000',
      }}>
        {['OVERVIEW', 'TASKS', 'SKILLS', 'INCOME'].map(view => (
          <button
            key={view}
            onClick={() => setActiveView(view.toLowerCase())}
            style={{
              flex: 1,
              padding: '20px',
              background: activeView === view.toLowerCase() ? '#0a0a0a' : 'transparent',
              border: 'none',
              borderBottom: activeView === view.toLowerCase() ? '2px solid #00ff88' : '2px solid transparent',
              color: activeView === view.toLowerCase() ? '#00ff88' : '#666',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.2em',
              cursor: 'none',
              transition: 'all 0.2s ease',
              fontWeight: '600',
            }}
          >
            [{view}]
          </button>
        ))}
      </div>
      
      {/* Content */}
      <div style={{ padding: '60px' }}>
        {activeView === 'overview' && (
          <div>
            {/* Score visualization */}
            <div style={{
              background: '#0a0a0a',
              border: '1px solid #1a1a1a',
              padding: '40px',
              marginBottom: '40px',
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: '#666',
                letterSpacing: '0.2em',
                marginBottom: '20px',
              }}>
                SURVIVAL_TRAJECTORY
              </div>
              <canvas ref={canvasRef} style={{ width: '100%', height: 'auto' }} />
              <div style={{
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: '#666',
              }}>
                <span>WEEK_01</span>
                <span>CURRENT: {survivalScore}/100</span>
                <span>WEEK_08</span>
              </div>
            </div>
            
            {/* Metrics Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '2px',
              background: '#1a1a1a',
            }}>
              {[
                { label: 'TASKS_COMPLETE', value: '24/35', color: '#00ff88' },
                { label: 'INCOME_MTD', value: '$1,150', color: '#00ff88' },
                { label: 'STREAK_DAYS', value: '12', color: '#ffaa00' },
                { label: 'RISK_LEVEL', value: 'MEDIUM', color: '#ff3366' },
              ].map((metric, i) => (
                <div key={i} style={{
                  background: '#000',
                  padding: '30px',
                  borderLeft: `2px solid ${metric.color}`,
                }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    color: '#666',
                    letterSpacing: '0.2em',
                    marginBottom: '12px',
                  }}>
                    {metric.label}
                  </div>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    color: metric.color,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}>
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeView === 'tasks' && (
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: '#666',
              letterSpacing: '0.2em',
              marginBottom: '40px',
            }}>
              DAILY_ACTION_QUEUE
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {tasks.map(task => (
                <div
                  key={task.id}
                  style={{
                    background: task.status === 'done' ? '#0a0a0a' : '#000',
                    border: `1px solid ${
                      task.status === 'done' ? '#00ff88' : 
                      task.status === 'active' ? '#ffaa00' : '#1a1a1a'
                    }`,
                    padding: '24px 30px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    opacity: task.status === 'done' ? 0.5 : 1,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: task.status === 'done' ? 'none' : '2px solid #2a2a2a',
                      background: task.status === 'done' ? '#00ff88' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '12px',
                      color: '#000',
                    }}>
                      {task.status === 'done' && '✓'}
                    </div>
                    <div>
                      <div style={{
                        fontSize: '15px',
                        fontWeight: '500',
                        textDecoration: task.status === 'done' ? 'line-through' : 'none',
                        marginBottom: '4px',
                      }}>
                        {task.text}
                      </div>
                      <div style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '10px',
                        color: '#666',
                        letterSpacing: '0.1em',
                      }}>
                        STATUS: {task.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '14px',
                    color: '#00ff88',
                    fontWeight: '700',
                  }}>
                    +{task.points}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeView === 'skills' && (
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: '#666',
              letterSpacing: '0.2em',
              marginBottom: '40px',
            }}>
              SKILL_DEVELOPMENT_MATRIX
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {skills.map((skill, i) => (
                <div key={i}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                        {skill.name}
                      </div>
                      <div style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '10px',
                        color: '#666',
                        letterSpacing: '0.1em',
                      }}>
                        VELOCITY: {skill.velocity}
                      </div>
                    </div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#00ff88',
                    }}>
                      {skill.progress}%
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div style={{
                    height: '4px',
                    background: '#1a1a1a',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      height: '100%',
                      width: `${skill.progress}%`,
                      background: '#00ff88',
                      transition: 'width 0.5s ease',
                    }} />
                    {/* Animated glow */}
                    <div style={{
                      position: 'absolute',
                      left: `${skill.progress}%`,
                      top: 0,
                      height: '100%',
                      width: '20px',
                      background: 'linear-gradient(90deg, transparent, #00ff88, transparent)',
                      transform: 'translateX(-10px)',
                      animation: 'glow 2s ease-in-out infinite',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeView === 'income' && (
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: '#666',
              letterSpacing: '0.2em',
              marginBottom: '40px',
            }}>
              REVENUE_STREAMS
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: '#1a1a1a' }}>
              {[
                { source: 'Freelance Projects', amount: 850, status: 'ACTIVE' },
                { source: 'Consulting', amount: 300, status: 'PENDING' },
                { source: 'Course Revenue', amount: 0, status: 'PLANNED' },
              ].map((stream, i) => (
                <div
                  key={i}
                  style={{
                    background: '#000',
                    padding: '40px',
                    borderTop: `2px solid ${stream.amount > 0 ? '#00ff88' : '#2a2a2a'}`,
                  }}
                >
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    color: stream.amount > 0 ? '#00ff88' : '#666',
                    letterSpacing: '0.2em',
                    marginBottom: '20px',
                  }}>
                    [{stream.status}]
                  </div>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    color: stream.amount > 0 ? '#00ff88' : '#2a2a2a',
                    fontFamily: "'Space Grotesk', sans-serif",
                    marginBottom: '12px',
                  }}>
                    ${stream.amount}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#999',
                  }}>
                    {stream.source}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Add new stream */}
            <div style={{
              marginTop: '40px',
              padding: '40px',
              border: '2px dashed #2a2a2a',
              textAlign: 'center',
              cursor: 'none',
              transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00ff88'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#2a2a2a'}
            >
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: '#666',
                letterSpacing: '0.2em',
              }}>
                [+] DEPLOY_NEW_STREAM
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom status bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px 40px',
        background: '#0a0a0a',
        borderTop: '1px solid #1a1a1a',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '10px',
        color: '#666',
        letterSpacing: '0.1em',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <span>PROTOCOL_VERSION: 2.1.0</span>
        <span>LAST_SYNC: 2m ago</span>
        <span>CONNECTION: SECURE</span>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('dashboard-root'));
root.render(<DashboardV2 />);

window.DashboardV2 = DashboardV2;