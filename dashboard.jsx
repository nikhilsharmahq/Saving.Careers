const { useState, useEffect } = React;

const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [survivalScore, setSurvivalScore] = useState(67);
  
  const skills = [
    { name: 'AI Prompt Engineering', level: 75, trend: 'up' },
    { name: 'Python Basics', level: 45, trend: 'up' },
    { name: 'Portfolio Building', level: 60, trend: 'up' },
    { name: 'Freelance Marketing', level: 30, trend: 'up' },
  ];
  
  const tasks = [
    { id: 1, text: 'Complete AI Fundamentals Module', completed: true, points: 10 },
    { id: 2, text: 'Update LinkedIn with new skills', completed: true, points: 5 },
    { id: 3, text: 'Apply to 3 freelance projects', completed: false, points: 15 },
    { id: 4, text: 'Build portfolio case study #1', completed: false, points: 20 },
    { id: 5, text: 'Network: Reach out to 5 contacts', completed: false, points: 10 },
  ];
  
  const incomeStreams = [
    { source: 'Freelance Projects', amount: 850, status: 'active' },
    { source: 'Consulting Calls', amount: 300, status: 'pending' },
    { source: 'Course Creation', amount: 0, status: 'planned' },
  ];

  return (
    <div style={{
      background: 'var(--bg-primary)',
      border: '1px solid var(--border-medium)',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
    }}>
      {/* Dashboard Header */}
      <div style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '24px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: '14px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
            Welcome back, Alex
          </div>
          <div style={{ fontSize: '24px', fontWeight: '700' }}>
            Your Career Command Center
          </div>
        </div>
        <div style={{
          padding: '10px 20px',
          background: 'var(--accent-primary)',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
        }}>
          View Full Dashboard →
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--bg-secondary)',
        padding: '0 32px',
      }}>
        {['overview', 'tasks', 'skills', 'income'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '16px 24px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid var(--accent-primary)' : '2px solid transparent',
              color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              textTransform: 'capitalize',
              transition: 'all 0.2s ease',
              fontFamily: 'var(--font-primary)',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '32px' }}>
        {activeTab === 'overview' && (
          <div>
            {/* Survival Score */}
            <div style={{
              background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '24px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              }}></div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>
                  Career Survival Score
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '72px', fontWeight: '700', lineHeight: '1' }}>
                    {survivalScore}
                  </div>
                  <div style={{ fontSize: '24px', color: 'rgba(255,255,255,0.6)', marginBottom: '12px' }}>
                    / 100
                  </div>
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '100px',
                  height: '8px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    background: 'white',
                    height: '100%',
                    width: `${survivalScore}%`,
                    borderRadius: '100px',
                    transition: 'width 0.5s ease',
                  }}></div>
                </div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginTop: '12px' }}>
                  ↑ Up 12 points this week — Keep going!
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
            }}>
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '24px',
              }}>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
                  TASKS COMPLETED
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--accent-primary)' }}>
                  24/35
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  This week
                </div>
              </div>
              
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '24px',
              }}>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
                  INCOME GENERATED
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#10b981' }}>
                  $1,150
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  This month
                </div>
              </div>
              
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '24px',
              }}>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
                  STREAK
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#f59e0b' }}>
                  12 days
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Daily actions
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>
                Today's Action Items
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                Complete these tasks to increase your survival score
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {tasks.map(task => (
                <div
                  key={task.id}
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    opacity: task.completed ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-medium)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    border: task.completed ? 'none' : '2px solid var(--border-medium)',
                    background: task.completed ? 'var(--accent-primary)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {task.completed && <span style={{ color: 'white', fontSize: '14px' }}>✓</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '15px',
                      fontWeight: '500',
                      textDecoration: task.completed ? 'line-through' : 'none',
                    }}>
                      {task.text}
                    </div>
                  </div>
                  <div style={{
                    padding: '4px 12px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: 'var(--accent-primary)',
                  }}>
                    +{task.points} pts
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>
                Skill Development
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                Track your progress in income-generating capabilities
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {skills.map((skill, idx) => (
                <div key={idx}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                  }}>
                    <div style={{ fontSize: '15px', fontWeight: '600' }}>
                      {skill.name}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                        {skill.level}%
                      </span>
                      <span style={{ fontSize: '12px', color: '#10b981' }}>↑</span>
                    </div>
                  </div>
                  <div style={{
                    background: 'var(--bg-secondary)',
                    borderRadius: '100px',
                    height: '10px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      background: 'linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                      height: '100%',
                      width: `${skill.level}%`,
                      borderRadius: '100px',
                      transition: 'width 0.5s ease',
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'income' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>
                Income Streams
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                Build multiple sources of income while rebuilding your career
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {incomeStreams.map((stream, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                      {stream.source}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      fontWeight: '600',
                      color: stream.status === 'active' ? '#10b981' : stream.status === 'pending' ? '#f59e0b' : 'var(--text-tertiary)',
                    }}>
                      {stream.status}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: stream.amount > 0 ? '#10b981' : 'var(--text-tertiary)',
                  }}>
                    ${stream.amount}
                  </div>
                </div>
              ))}
              
              <div style={{
                marginTop: '16px',
                padding: '20px',
                background: 'var(--bg-tertiary)',
                border: '1px dashed var(--border-medium)',
                borderRadius: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-elevated)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
              >
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>+</div>
                <div style={{ fontSize: '14px', fontWeight: '600' }}>Add New Income Stream</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('dashboard-root'));
root.render(<DashboardPreview />);

window.DashboardPreview = DashboardPreview;