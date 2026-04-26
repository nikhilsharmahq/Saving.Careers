const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "colorScheme": "dark",
  "heroHeadline": "headline1",
  "typography": "inter"
}/*EDITMODE-END*/;

const TweaksPanel = () => {
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Listen for edit mode activation
    const handleMessage = (event) => {
      if (event.data.type === '__activate_edit_mode') {
        setIsActive(true);
      } else if (event.data.type === '__deactivate_edit_mode') {
        setIsActive(false);
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    // Announce availability
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    // Apply tweaks
    applyTweaks(tweaks);
  }, [tweaks]);

  const updateTweak = (key, value) => {
    const newTweaks = { ...tweaks, [key]: value };
    setTweaks(newTweaks);
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits: { [key]: value }
    }, '*');
  };

  const applyTweaks = (currentTweaks) => {
    const root = document.documentElement;
    
    // Color Scheme
    if (currentTweaks.colorScheme === 'light') {
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f8f8f8');
      root.style.setProperty('--bg-tertiary', '#f0f0f0');
      root.style.setProperty('--bg-elevated', '#fafafa');
      root.style.setProperty('--text-primary', '#0a0a0a');
      root.style.setProperty('--text-secondary', '#505050');
      root.style.setProperty('--text-tertiary', '#888888');
      root.style.setProperty('--border-subtle', '#e5e5e5');
      root.style.setProperty('--border-medium', '#d0d0d0');
    } else if (currentTweaks.colorScheme === 'blue') {
      root.style.setProperty('--bg-primary', '#0f172a');
      root.style.setProperty('--bg-secondary', '#1e293b');
      root.style.setProperty('--bg-tertiary', '#334155');
      root.style.setProperty('--bg-elevated', '#475569');
      root.style.setProperty('--accent-primary', '#06b6d4');
      root.style.setProperty('--accent-secondary', '#3b82f6');
    } else {
      // Reset to dark
      root.style.setProperty('--bg-primary', '#0a0a0a');
      root.style.setProperty('--bg-secondary', '#111111');
      root.style.setProperty('--bg-tertiary', '#1a1a1a');
      root.style.setProperty('--bg-elevated', '#1f1f1f');
      root.style.setProperty('--text-primary', '#f5f5f5');
      root.style.setProperty('--text-secondary', '#a0a0a0');
      root.style.setProperty('--text-tertiary', '#707070');
      root.style.setProperty('--border-subtle', '#2a2a2a');
      root.style.setProperty('--border-medium', '#404040');
      root.style.setProperty('--accent-primary', '#3b82f6');
      root.style.setProperty('--accent-secondary', '#06b6d4');
    }
    
    // Hero Headlines
    const headline = document.getElementById('hero-headline');
    if (headline) {
      const headlines = {
        headline1: "AI is Changing Jobs. Here's How You Stay Employed.",
        headline2: "Don't Guess Your Career. Follow a System.",
        headline3: "From Job Uncertainty to Structured Growth"
      };
      headline.textContent = headlines[currentTweaks.heroHeadline] || headlines.headline1;
    }
    
    // Typography
    if (currentTweaks.typography === 'system') {
      root.style.setProperty('--font-primary', '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif');
    } else if (currentTweaks.typography === 'helvetica') {
      root.style.setProperty('--font-primary', 'Helvetica, Arial, sans-serif');
    } else {
      root.style.setProperty('--font-primary', '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif');
    }
  };

  return (
    <div className={`tweaks-panel ${isActive ? 'active' : ''}`}>
      <div className="tweaks-header">Tweaks</div>
      
      <div className="tweak-group">
        <span className="tweak-label">Color Scheme</span>
        <div className="tweak-options">
          <button
            className={`tweak-btn ${tweaks.colorScheme === 'dark' ? 'active' : ''}`}
            onClick={() => updateTweak('colorScheme', 'dark')}
          >
            <span className="color-swatch" style={{ background: '#0a0a0a' }}></span>
            Dark Premium
          </button>
          <button
            className={`tweak-btn ${tweaks.colorScheme === 'blue' ? 'active' : ''}`}
            onClick={() => updateTweak('colorScheme', 'blue')}
          >
            <span className="color-swatch" style={{ background: '#0f172a' }}></span>
            Blue Slate
          </button>
          <button
            className={`tweak-btn ${tweaks.colorScheme === 'light' ? 'active' : ''}`}
            onClick={() => updateTweak('colorScheme', 'light')}
          >
            <span className="color-swatch" style={{ background: '#ffffff', border: '1px solid #ddd' }}></span>
            Light Clean
          </button>
        </div>
      </div>
      
      <div className="tweak-group">
        <span className="tweak-label">Hero Headline</span>
        <div className="tweak-options">
          <button
            className={`tweak-btn ${tweaks.heroHeadline === 'headline1' ? 'active' : ''}`}
            onClick={() => updateTweak('heroHeadline', 'headline1')}
          >
            AI is Changing Jobs...
          </button>
          <button
            className={`tweak-btn ${tweaks.heroHeadline === 'headline2' ? 'active' : ''}`}
            onClick={() => updateTweak('heroHeadline', 'headline2')}
          >
            Don't Guess Your Career...
          </button>
          <button
            className={`tweak-btn ${tweaks.heroHeadline === 'headline3' ? 'active' : ''}`}
            onClick={() => updateTweak('heroHeadline', 'headline3')}
          >
            From Uncertainty to Growth
          </button>
        </div>
      </div>
      
      <div className="tweak-group">
        <span className="tweak-label">Typography</span>
        <div className="tweak-options">
          <button
            className={`tweak-btn ${tweaks.typography === 'inter' ? 'active' : ''}`}
            onClick={() => updateTweak('typography', 'inter')}
          >
            Inter (Modern SaaS)
          </button>
          <button
            className={`tweak-btn ${tweaks.typography === 'helvetica' ? 'active' : ''}`}
            onClick={() => updateTweak('typography', 'helvetica')}
          >
            Helvetica (Classic)
          </button>
          <button
            className={`tweak-btn ${tweaks.typography === 'system' ? 'active' : ''}`}
            onClick={() => updateTweak('typography', 'system')}
          >
            System (Native)
          </button>
        </div>
      </div>
    </div>
  );
};

const tweaksRoot = ReactDOM.createRoot(document.getElementById('tweaks-root'));
tweaksRoot.render(<TweaksPanel />);

window.TweaksPanel = TweaksPanel;