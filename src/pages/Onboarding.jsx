import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── DATA ─────────────────────────────────────────────────────────────────────
const LANGUAGES = [
  { code: 'en', label: 'English',    flag: '🇬🇧' },
  { code: 'ru', label: 'Русский',    flag: '🇷🇺' },
  { code: 'kz', label: 'Қазақша',   flag: '🇰🇿' },
  { code: 'de', label: 'Deutsch',    flag: '🇩🇪' },
  { code: 'fr', label: 'Français',   flag: '🇫🇷' },
  { code: 'es', label: 'Español',    flag: '🇪🇸' },
  { code: 'zh', label: '中文',        flag: '🇨🇳' },
  { code: 'ar', label: 'العربية',    flag: '🇸🇦' },
  { code: 'tr', label: 'Türkçe',     flag: '🇹🇷' },
  { code: 'ja', label: '日本語',      flag: '🇯🇵' },
  { code: 'hi', label: 'हिन्दी',      flag: '🇮🇳' },
];

const GOALS = [
  { id: 'anxiety',  icon: '😰', label: 'Manage anxiety',      desc: 'Reduce worry and fear' },
  { id: 'stress',   icon: '😤', label: 'Reduce stress',        desc: 'Find calm and balance' },
  { id: 'sleep',    icon: '😴', label: 'Sleep better',         desc: 'Improve sleep quality' },
  { id: 'growth',   icon: '🌱', label: 'Personal growth',      desc: 'Become a better version' },
  { id: 'relation', icon: '💞', label: 'Relationship help',    desc: 'Improve connections' },
  { id: 'talk',     icon: '💬', label: 'Just talk',            desc: 'Someone to listen' },
];

const THERAPISTS = [
  { id: 'aria',  name: 'Aria',  emoji: '🌸', style: 'Warm & Gentle',    desc: 'Compassionate, soft, supportive. Great for anxiety and grief.', color: '#EC4899' },
  { id: 'leo',   name: 'Leo',   emoji: '🦁', style: 'Direct & Motivating', desc: 'Energetic, goal-focused, no-nonsense. Perfect for growth.', color: '#F59E0B' },
  { id: 'sage',  name: 'Sage',  emoji: '🌿', style: 'Calm & Mindful',   desc: 'Peaceful, grounded, philosophical. Ideal for stress and sleep.', color: '#10B981' },
  { id: 'nova',  name: 'Nova',  emoji: '✨', style: 'Playful & Creative', desc: 'Fun, curious, outside-the-box. Good for exploration.', color: '#8B5CF6' },
];

const STEPS = [
  { id: 'welcome',   title: 'Welcome',    subtitle: "Let's get to know you" },
  { id: 'language',  title: 'Language',   subtitle: 'Choose your preferred language' },
  { id: 'goal',      title: 'Your Goal',  subtitle: 'What brings you here today?' },
  { id: 'therapist', title: 'Your AI',    subtitle: 'Pick your AI psychologist' },
];

// ─── STEP COMPONENTS ──────────────────────────────────────────────────────────
function StepWelcome({ data, setData }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '80px', height: '80px', borderRadius: '24px',
        background: 'linear-gradient(135deg,#4A6CF7,#8B5CF6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '2.2rem', margin: '0 auto 24px',
        boxShadow: '0 12px 32px rgba(74,108,247,0.4)',
        animation: 'float 3s ease-in-out infinite',
      }}>🧠</div>

      <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '10px', color: '#1E293B' }}>
        Welcome to MindBridge
      </h2>
      <p style={{ color: '#64748B', marginBottom: '36px', lineHeight: '1.6', maxWidth: '360px', margin: '0 auto 36px' }}>
        Your personal AI psychologist. Confidential, always available, and genuinely caring.
      </p>

      <div style={{ textAlign: 'left', maxWidth: '360px', margin: '0 auto' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#64748B', marginBottom: '8px' }}>
          What should we call you?
        </label>
        <input
          autoFocus
          type="text"
          placeholder="Your name…"
          value={data.name}
          onChange={e => setData(d => ({ ...d, name: e.target.value }))}
          style={{
            width: '100%', padding: '14px 18px', borderRadius: '14px',
            border: '2px solid #E2E8F0', outline: 'none', fontSize: '1rem',
            fontFamily: 'inherit', color: '#1E293B', background: '#F8FAFC',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = '#4A6CF7'}
          onBlur={e => e.target.style.borderColor = '#E2E8F0'}
        />
        {data.name && (
          <p style={{ marginTop: '10px', color: '#4A6CF7', fontSize: '0.9rem', animation: 'fadeIn 0.3s ease' }}>
            Nice to meet you, <strong>{data.name}</strong>! 👋
          </p>
        )}
      </div>
    </div>
  );
}

function StepLanguage({ data, setData }) {
  return (
    <div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '10px',
      }}>
        {LANGUAGES.map(lang => {
          const active = data.lang === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => setData(d => ({ ...d, lang: lang.code }))}
              style={{
                padding: '14px 12px', borderRadius: '14px', border: 'none',
                cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                background: active ? 'linear-gradient(135deg,rgba(74,108,247,0.12),rgba(139,92,246,0.12))' : '#F8FAFC',
                border: active ? '2px solid rgba(74,108,247,0.4)' : '2px solid #E2E8F0',
                transition: 'all 0.2s',
                transform: active ? 'scale(1.03)' : 'scale(1)',
              }}
            >
              <div style={{ fontSize: '1.6rem', marginBottom: '6px' }}>{lang.flag}</div>
              <div style={{ fontWeight: '600', fontSize: '0.9rem', color: active ? '#4A6CF7' : '#1E293B' }}>
                {lang.label}
              </div>
              {active && (
                <div style={{
                  width: '18px', height: '18px', borderRadius: '50%',
                  background: 'linear-gradient(135deg,#4A6CF7,#8B5CF6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.65rem', color: 'white', marginTop: '6px',
                }}>✓</div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepGoal({ data, setData }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {GOALS.map(goal => {
        const active = data.goal === goal.id;
        return (
          <button
            key={goal.id}
            onClick={() => setData(d => ({ ...d, goal: goal.id }))}
            style={{
              padding: '16px 18px', borderRadius: '14px', border: 'none',
              cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              display: 'flex', alignItems: 'center', gap: '16px',
              background: active ? 'linear-gradient(135deg,rgba(74,108,247,0.08),rgba(139,92,246,0.08))' : '#F8FAFC',
              border: active ? '2px solid rgba(74,108,247,0.35)' : '2px solid #E2E8F0',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.borderColor = '#CBD5E1'; }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.borderColor = '#E2E8F0'; }}
          >
            <div style={{
              width: '46px', height: '46px', borderRadius: '12px', flexShrink: 0,
              background: active ? 'linear-gradient(135deg,rgba(74,108,247,0.15),rgba(139,92,246,0.15))' : '#EEF2FF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.4rem',
            }}>
              {goal.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600', color: active ? '#4A6CF7' : '#1E293B', fontSize: '0.95rem' }}>
                {goal.label}
              </div>
              <div style={{ color: '#94A3B8', fontSize: '0.8rem', marginTop: '2px' }}>
                {goal.desc}
              </div>
            </div>
            {active && (
              <div style={{
                width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg,#4A6CF7,#8B5CF6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.7rem', color: 'white',
              }}>✓</div>
            )}
          </button>
        );
      })}
    </div>
  );
}

function StepTherapist({ data, setData }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {THERAPISTS.map(t => {
        const active = data.therapist === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setData(d => ({ ...d, therapist: t.id }))}
            style={{
              padding: '18px 20px', borderRadius: '16px', border: 'none',
              cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              display: 'flex', alignItems: 'center', gap: '16px',
              background: active ? `${t.color}12` : '#F8FAFC',
              border: active ? `2px solid ${t.color}55` : '2px solid #E2E8F0',
              transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
              transform: active ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            <div style={{
              width: '52px', height: '52px', borderRadius: '16px', flexShrink: 0,
              background: active ? `${t.color}22` : '#EEF2FF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.8rem', border: active ? `2px solid ${t.color}44` : '2px solid transparent',
            }}>
              {t.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                <span style={{ fontWeight: '700', color: active ? t.color : '#1E293B', fontSize: '1rem' }}>
                  {t.name}
                </span>
                <span style={{
                  padding: '2px 8px', borderRadius: '10px', fontSize: '0.72rem', fontWeight: '600',
                  background: active ? `${t.color}22` : '#EEF2FF',
                  color: active ? t.color : '#64748B',
                }}>
                  {t.style}
                </span>
              </div>
              <div style={{ color: '#94A3B8', fontSize: '0.82rem', lineHeight: '1.4' }}>
                {t.desc}
              </div>
            </div>
            {active && (
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                background: t.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.7rem', color: 'white',
              }}>✓</div>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [animKey, setAnimKey] = useState(0);
  const [data, setData] = useState({ name: '', lang: 'en', goal: '', therapist: '' });
  const [finishing, setFinishing] = useState(false);

  const canNext = () => {
    if (step === 0) return data.name.trim().length >= 2;
    if (step === 1) return !!data.lang;
    if (step === 2) return !!data.goal;
    if (step === 3) return !!data.therapist;
    return false;
  };

  const goNext = () => {
    if (!canNext()) return;
    if (step === STEPS.length - 1) {
      finish();
      return;
    }
    setDirection(1);
    setAnimKey(k => k + 1);
    setStep(s => s + 1);
  };

  const goBack = () => {
    if (step === 0) return;
    setDirection(-1);
    setAnimKey(k => k + 1);
    setStep(s => s - 1);
  };

  const finish = () => {
    setFinishing(true);
    // Save to localStorage
    localStorage.setItem('mb_user', JSON.stringify(data));
    setTimeout(() => navigate('/chat'), 1800);
  };

  if (finishing) return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg,#4A6CF7,#8B5CF6)',
      fontFamily: "'Inter', sans-serif",
      animation: 'fadeIn 0.5s ease',
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '20px', animation: 'bounce 0.6s ease infinite alternate' }}>🎉</div>
      <h2 style={{ color: 'white', fontSize: '1.8rem', fontWeight: '800', marginBottom: '10px' }}>
        You're all set, {data.name}!
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>
        Taking you to your AI psychologist…
      </p>
      <div style={{ marginTop: '24px', display: 'flex', gap: '8px' }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.6)',
            animation: `blink 1.2s ${i * 0.2}s ease infinite`,
          }}/>
        ))}
      </div>
    </div>
  );

  const progress = ((step) / (STEPS.length - 1)) * 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: rgba(100,116,139,0.25); border-radius: 4px; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
        @keyframes slideInRight { from { opacity:0; transform:translateX(40px); } to { opacity:1; transform:none; } }
        @keyframes slideInLeft  { from { opacity:0; transform:translateX(-40px); } to { opacity:1; transform:none; } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
        @keyframes bounce { from { transform:scale(1); } to { transform:scale(1.12); } }
        @keyframes blink { 0%,100% { opacity:0.3; } 50% { opacity:1; } }
        @keyframes pulse { 0%,100% { box-shadow:0 0 0 0 rgba(74,108,247,0.4); } 70% { box-shadow:0 0 0 10px rgba(74,108,247,0); } }
        .step-content { animation: slideInRight 0.35s ease; }
        .step-content.back { animation: slideInLeft 0.35s ease; }
        .next-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(74,108,247,0.5) !important; }
        .next-btn:disabled { opacity:0.4; cursor:not-allowed; transform:none !important; }
        .skip-btn:hover { color: #4A6CF7 !important; }
      `}</style>

      <div style={{
        minHeight: '100vh', background: '#F8FAFC',
        fontFamily: "'Inter', sans-serif",
        display: 'flex', flexDirection: 'column',
      }}>
        {/* BG decoration */}
        <div style={{
          position: 'fixed', top: '-100px', right: '-100px', width: '400px', height: '400px',
          borderRadius: '50%', background: 'radial-gradient(circle,rgba(74,108,247,0.08),transparent 70%)',
          pointerEvents: 'none',
        }}/>
        <div style={{
          position: 'fixed', bottom: '-80px', left: '-80px', width: '300px', height: '300px',
          borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.08),transparent 70%)',
          pointerEvents: 'none',
        }}/>

        {/* TOP BAR */}
        <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '9px',
              background: 'linear-gradient(135deg,#4A6CF7,#8B5CF6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px',
            }}>🧠</div>
            <span style={{ fontWeight: '700', fontSize: '1rem', color: '#1E293B' }}>MindBridge</span>
          </div>

          {/* Step dots */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {STEPS.map((_, i) => (
              <div key={i} style={{
                height: '6px', borderRadius: '3px',
                width: i === step ? '20px' : '6px',
                background: i <= step ? 'linear-gradient(90deg,#4A6CF7,#8B5CF6)' : '#E2E8F0',
                transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
              }}/>
            ))}
          </div>

          {/* Skip */}
          <button className="skip-btn" onClick={() => navigate('/chat')} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#94A3B8', fontSize: '0.85rem', fontFamily: 'inherit',
            transition: 'color 0.2s',
          }}>
            Skip →
          </button>
        </div>

        {/* PROGRESS BAR */}
        <div style={{ height: '3px', background: '#E2E8F0', margin: '0 24px' }}>
          <div style={{
            height: '100%', background: 'linear-gradient(90deg,#4A6CF7,#8B5CF6)',
            borderRadius: '2px', transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
            width: `${((step + 1) / STEPS.length) * 100}%`,
          }}/>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 20px 20px' }}>
          <div style={{ width: '100%', maxWidth: '480px' }}>

            {/* Step header */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{
                fontSize: '0.75rem', fontWeight: '700', color: '#4A6CF7',
                textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px',
              }}>
                Step {step + 1} of {STEPS.length}
              </div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#1E293B', marginBottom: '4px' }}>
                {STEPS[step].title}
              </h1>
              <p style={{ color: '#64748B', fontSize: '0.95rem' }}>{STEPS[step].subtitle}</p>
            </div>

            {/* Step content */}
            <div key={animKey} className={`step-content${direction === -1 ? ' back' : ''}`}
              style={{ marginBottom: '28px' }}>
              {step === 0 && <StepWelcome data={data} setData={setData} />}
              {step === 1 && <StepLanguage data={data} setData={setData} />}
              {step === 2 && <StepGoal data={data} setData={setData} />}
              {step === 3 && <StepTherapist data={data} setData={setData} />}
            </div>

            {/* NAV BUTTONS */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {step > 0 && (
                <button onClick={goBack} style={{
                  padding: '14px 20px', borderRadius: '14px',
                  border: '2px solid #E2E8F0', background: 'transparent',
                  color: '#64748B', cursor: 'pointer', fontFamily: 'inherit',
                  fontWeight: '600', fontSize: '0.95rem', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#4A6CF7'; e.currentTarget.style.color = '#4A6CF7'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#64748B'; }}
                >
                  ← Back
                </button>
              )}
              <button
                className="next-btn"
                disabled={!canNext()}
                onClick={goNext}
                style={{
                  flex: 1, padding: '14px 28px', borderRadius: '14px', border: 'none',
                  background: canNext() ? 'linear-gradient(135deg,#4A6CF7,#8B5CF6)' : '#E2E8F0',
                  color: canNext() ? 'white' : '#94A3B8',
                  cursor: canNext() ? 'pointer' : 'not-allowed',
                  fontFamily: 'inherit', fontWeight: '700', fontSize: '1rem',
                  boxShadow: canNext() ? '0 4px 16px rgba(74,108,247,0.35)' : 'none',
                  transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}
              >
                {step === STEPS.length - 1 ? "🚀  Let's Start!" : 'Continue →'}
              </button>
            </div>

            {/* Mini tip */}
            <p style={{ textAlign: 'center', color: '#CBD5E1', fontSize: '0.78rem', marginTop: '16px' }}>
              🔒 Your data is private and never shared
            </p>
          </div>
        </div>
      </div>
    </>
  );
}