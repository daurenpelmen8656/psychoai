import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── THEME ────────────────────────────────────────────────────────────────────
const T = {
  light: {
    bg: '#F8FAFC', card: '#FFFFFF', sidebar: '#FFFFFF',
    text: '#1E293B', textSec: '#64748B', textMuted: '#94A3B8',
    border: '#E2E8F0', inputBg: '#F1F5F9',
    cardHover: '#F8FAFF',
  },
  dark: {
    bg: '#0F172A', card: '#1E293B', sidebar: '#1E293B',
    text: '#F1F5F9', textSec: '#94A3B8', textMuted: '#64748B',
    border: '#334155', inputBg: '#0F172A',
    cardHover: '#263548',
  },
};

// ─── MEMORY GAME ──────────────────────────────────────────────────────────────
const EMOJIS = ['🌸','🦋','🌙','⭐','🌊','🍃','🔮','💎','🌺','🦚','🌻','🎯'];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function MemoryGame({ s, onBack }) {
  const [level, setLevel] = useState(null); // null = choose level
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState(false);

  const LEVELS = {
    easy:   { pairs: 4,  cols: 4, label: 'Easy',   emoji: '😊', color: '#10B981' },
    medium: { pairs: 6,  cols: 4, label: 'Medium',  emoji: '🤔', color: '#F59E0B' },
    hard:   { pairs: 12, cols: 6, label: 'Hard',    emoji: '🔥', color: '#EF4444' },
  };

  useEffect(() => {
    let timer;
    if (startTime && !done) {
      timer = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 500);
    }
    return () => clearInterval(timer);
  }, [startTime, done]);

  const startGame = (lvl) => {
    const cfg = LEVELS[lvl];
    const selected = shuffle(EMOJIS).slice(0, cfg.pairs);
    const deck = shuffle([...selected, ...selected].map((e, i) => ({ id: i, emoji: e, lvl })));
    setLevel(lvl);
    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setDone(false);
    setStartTime(Date.now());
    setElapsed(0);
  };

  const flip = (id) => {
    if (lock || flipped.includes(id) || matched.includes(id)) return;
    const next = [...flipped, id];
    setFlipped(next);
    if (next.length === 2) {
      setMoves(m => m + 1);
      setLock(true);
      const [a, b] = next.map(i => cards.find(c => c.id === i));
      if (a.emoji === b.emoji) {
        const newMatched = [...matched, ...next];
        setMatched(newMatched);
        setFlipped([]);
        setLock(false);
        if (newMatched.length === cards.length) {
          setDone(true);
        }
      } else {
        setTimeout(() => { setFlipped([]); setLock(false); }, 900);
      }
    }
  };

  const cfg = level ? LEVELS[level] : null;
  const cols = cfg?.cols || 4;

  // Level select screen
  if (!level) return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <button onClick={onBack} style={backBtnStyle(s)}>← Back to Games</button>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🃏</div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: '700', color: s.text, marginBottom: '8px' }}>Memory Game</h2>
        <p style={{ color: s.textSec }}>Flip cards to find matching pairs. Train your memory!</p>
      </div>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {Object.entries(LEVELS).map(([key, cfg]) => (
          <button key={key} onClick={() => startGame(key)} style={{
            padding: '24px 32px', borderRadius: '16px', border: `2px solid ${cfg.color}22`,
            background: `${cfg.color}11`, cursor: 'pointer', textAlign: 'center',
            transition: 'all 0.2s', minWidth: '140px',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          >
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{cfg.emoji}</div>
            <div style={{ fontWeight: '700', color: cfg.color, fontSize: '1rem' }}>{cfg.label}</div>
            <div style={{ fontSize: '0.8rem', color: s.textSec, marginTop: '4px' }}>{cfg.pairs} pairs</div>
          </button>
        ))}
      </div>
    </div>
  );

  // Done screen
  if (done) return (
    <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
      <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
      <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: s.text, marginBottom: '8px' }}>Well done!</h2>
      <p style={{ color: s.textSec, marginBottom: '24px' }}>
        Completed in <strong style={{ color: '#4A6CF7' }}>{moves} moves</strong> and <strong style={{ color: '#4A6CF7' }}>{elapsed}s</strong>
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => startGame(level)} style={primaryBtnStyle}>Play Again</button>
        <button onClick={() => setLevel(null)} style={outlineBtnStyle(s)}>Change Level</button>
        <button onClick={onBack} style={outlineBtnStyle(s)}>Back to Games</button>
      </div>
    </div>
  );

  // Game board
  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <button onClick={() => setLevel(null)} style={backBtnStyle(s)}>← Back</button>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Stat label="Moves" value={moves} color="#4A6CF7" />
          <Stat label="Time" value={`${elapsed}s`} color="#8B5CF6" />
          <Stat label="Pairs" value={`${matched.length / 2}/${cfg.pairs}`} color="#10B981" />
        </div>
        <button onClick={() => startGame(level)} style={outlineBtnStyle(s)}>↺ Restart</button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: '10px', maxWidth: cols === 6 ? '520px' : '380px', margin: '0 auto',
      }}>
        {cards.map(card => {
          const isFlipped = flipped.includes(card.id) || matched.includes(card.id);
          const isMatched = matched.includes(card.id);
          return (
            <div
              key={card.id}
              onClick={() => flip(card.id)}
              style={{
                aspectRatio: '1', borderRadius: '12px', cursor: isMatched ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: cols === 6 ? '1.4rem' : '1.8rem',
                background: isMatched
                  ? 'linear-gradient(135deg,rgba(16,185,129,0.15),rgba(16,185,129,0.25))'
                  : isFlipped ? s.card : 'linear-gradient(135deg,#4A6CF7,#8B5CF6)',
                border: isMatched ? '2px solid rgba(16,185,129,0.4)' : isFlipped ? `2px solid ${s.border}` : '2px solid transparent',
                transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                transform: isFlipped ? 'scale(1.04)' : 'scale(1)',
                boxShadow: isFlipped ? '0 4px 14px rgba(74,108,247,0.2)' : '0 2px 8px rgba(0,0,0,0.1)',
                userSelect: 'none',
              }}
            >
              {isFlipped ? card.emoji : ''}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── LOGIC GAME ───────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    q: 'Which number comes next?\n2 → 4 → 8 → 16 → ?',
    options: ['24', '32', '20', '18'], answer: 1,
    hint: 'Each number is doubled.',
  },
  {
    q: 'If all Bloops are Razzles, and all Razzles are Lazzles,\nare all Bloops definitely Lazzles?',
    options: ['Yes', 'No', 'Maybe', 'Cannot say'], answer: 0,
    hint: 'Think in terms of sets: Bloops ⊂ Razzles ⊂ Lazzles.',
  },
  {
    q: 'Which shape completes the pattern?\n🔴 🔵 🔴 🔵 🔴 ?',
    options: ['🔴', '🔵', '🟡', '🟢'], answer: 1,
    hint: 'Look at the alternating pattern.',
  },
  {
    q: 'A clock shows 3:15. What is the angle between the hands?',
    options: ['0°', '7.5°', '15°', '22.5°'], answer: 1,
    hint: 'The hour hand moves 0.5° per minute.',
  },
  {
    q: 'Find the odd one out:\nApple 🍎 — Banana 🍌 — Carrot 🥕 — Grape 🍇',
    options: ['Apple', 'Banana', 'Carrot', 'Grape'], answer: 2,
    hint: 'One of these is a vegetable.',
  },
  {
    q: 'If you have 3 apples and take away 2, how many apples do YOU have?',
    options: ['1', '2', '3', '5'], answer: 1,
    hint: 'Read carefully — YOU took them.',
  },
  {
    q: 'Which number is missing?\n1, 4, 9, 16, ?, 36',
    options: ['20', '25', '30', '24'], answer: 1,
    hint: 'These are perfect squares: 1², 2², 3²…',
  },
  {
    q: 'A bat and ball cost $1.10. The bat costs $1 more than the ball.\nHow much does the ball cost?',
    options: ['$0.10', '$0.05', '$0.15', '$0.20'], answer: 1,
    hint: 'Set up an equation: bat + ball = 1.10, bat = ball + 1.',
  },
];

function LogicGame({ s, onBack }) {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [done, setDone] = useState(false);
  const [showExplain, setShowExplain] = useState(false);

  const q = QUESTIONS[current];
  const total = QUESTIONS.length;

  const choose = (i) => {
    if (selected !== null) return;
    setSelected(i);
    const correct = i === q.answer;
    if (correct) setScore(s2 => s2 + 1);
    setAnswers(a => [...a, { correct, selected: i, answer: q.answer }]);
    setShowExplain(true);
  };

  const next = () => {
    if (current + 1 >= total) {
      setDone(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowHint(false);
      setShowExplain(false);
    }
  };

  const restart = () => {
    setStarted(false);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setAnswers([]);
    setShowHint(false);
    setDone(false);
    setShowExplain(false);
  };

  const getRank = () => {
    const pct = score / total;
    if (pct >= 0.9) return { label: 'Genius 🧠', color: '#8B5CF6' };
    if (pct >= 0.7) return { label: 'Sharp Thinker 🌟', color: '#4A6CF7' };
    if (pct >= 0.5) return { label: 'Good Logic 👍', color: '#10B981' };
    return { label: 'Keep Practicing 💪', color: '#F59E0B' };
  };

  if (!started) return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <button onClick={onBack} style={backBtnStyle(s)}>← Back to Games</button>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🧩</div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: '700', color: s.text, marginBottom: '8px' }}>Logic Test</h2>
        <p style={{ color: s.textSec, maxWidth: '400px', margin: '0 auto' }}>
          {total} questions to test your reasoning, pattern recognition and critical thinking.
        </p>
      </div>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
        {[['🕐', '~5 min', 'Duration'], ['❓', `${total} questions`, 'Questions'], ['💡', 'Hints available', 'Help']].map(([icon, val, lbl]) => (
          <div key={lbl} style={{
            padding: '16px 20px', borderRadius: '14px', background: s.card,
            border: `1px solid ${s.border}`, textAlign: 'center', minWidth: '110px',
          }}>
            <div style={{ fontSize: '1.5rem' }}>{icon}</div>
            <div style={{ fontWeight: '600', color: s.text, fontSize: '0.9rem', marginTop: '4px' }}>{val}</div>
            <div style={{ color: s.textSec, fontSize: '0.75rem' }}>{lbl}</div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center' }}>
        <button onClick={() => setStarted(true)} style={primaryBtnStyle}>Start Test →</button>
      </div>
    </div>
  );

  if (done) {
    const rank = getRank();
    return (
      <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🏆</div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: s.text, marginBottom: '8px' }}>Test Complete!</h2>
        <div style={{
          fontSize: '3rem', fontWeight: '800', marginBottom: '8px',
          background: 'linear-gradient(135deg,#4A6CF7,#8B5CF6)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          {score}/{total}
        </div>
        <div style={{
          display: 'inline-block', padding: '8px 20px', borderRadius: '20px',
          background: `${rank.color}22`, color: rank.color,
          fontWeight: '700', fontSize: '1rem', marginBottom: '24px',
        }}>
          {rank.label}
        </div>

        {/* Answer review */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
          {answers.map((a, i) => (
            <div key={i} style={{
              width: '36px', height: '36px', borderRadius: '50%', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.85rem',
              background: a.correct ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
              color: a.correct ? '#10B981' : '#EF4444',
              border: `2px solid ${a.correct ? '#10B981' : '#EF4444'}`,
            }}>
              {a.correct ? '✓' : '✗'}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={restart} style={primaryBtnStyle}>Try Again</button>
          <button onClick={onBack} style={outlineBtnStyle(s)}>Back to Games</button>
        </div>
      </div>
    );
  }

  // Question screen
  const progress = ((current) / total) * 100;
  return (
    <div style={{ animation: 'fadeIn 0.3s ease', maxWidth: '560px', margin: '0 auto' }}>
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={backBtnStyle(s)}>←</button>
        <div style={{ flex: 1, height: '6px', background: s.border, borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: '3px',
            background: 'linear-gradient(90deg,#4A6CF7,#8B5CF6)',
            width: `${((current + 1) / total) * 100}%`,
            transition: 'width 0.4s ease',
          }} />
        </div>
        <span style={{ color: s.textSec, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
          {current + 1} / {total}
        </span>
      </div>

      {/* Score badge */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
        <span style={{
          padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600',
          background: 'rgba(74,108,247,0.1)', color: '#4A6CF7',
        }}>Score: {score}</span>
      </div>

      {/* Question */}
      <div style={{
        background: s.card, borderRadius: '18px', padding: '24px',
        border: `1px solid ${s.border}`, marginBottom: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      }}>
        <div style={{ fontSize: '0.75rem', color: s.textSec, fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Question {current + 1}
        </div>
        <p style={{ color: s.text, fontSize: '1rem', lineHeight: '1.7', whiteSpace: 'pre-line', fontWeight: '500' }}>
          {q.q}
        </p>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
        {q.options.map((opt, i) => {
          let bg = s.card, border = s.border, color = s.text, icon = null;
          if (selected !== null) {
            if (i === q.answer) { bg = 'rgba(16,185,129,0.1)'; border = '#10B981'; color = '#10B981'; icon = '✓'; }
            else if (i === selected && i !== q.answer) { bg = 'rgba(239,68,68,0.1)'; border = '#EF4444'; color = '#EF4444'; icon = '✗'; }
          }
          return (
            <button key={i} onClick={() => choose(i)} style={{
              padding: '14px 18px', borderRadius: '12px', border: `2px solid ${border}`,
              background: bg, color, cursor: selected !== null ? 'default' : 'pointer',
              textAlign: 'left', fontFamily: 'inherit', fontSize: '0.95rem',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              transition: 'all 0.2s', fontWeight: selected !== null && i === q.answer ? '600' : '400',
            }}
            onMouseEnter={e => { if (selected === null) e.currentTarget.style.borderColor = '#4A6CF7'; }}
            onMouseLeave={e => { if (selected === null) e.currentTarget.style.borderColor = s.border; }}
            >
              <span><span style={{ color: s.textSec, marginRight: '10px', fontWeight: '600' }}>
                {String.fromCharCode(65 + i)}.
              </span>{opt}</span>
              {icon && <span style={{ fontWeight: '700' }}>{icon}</span>}
            </button>
          );
        })}
      </div>

      {/* Hint & explain */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {!showHint && selected === null && (
          <button onClick={() => setShowHint(true)} style={{
            padding: '8px 16px', borderRadius: '8px', border: `1px solid ${s.border}`,
            background: 'transparent', color: s.textSec, cursor: 'pointer',
            fontSize: '0.85rem', fontFamily: 'inherit',
          }}>
            💡 Hint
          </button>
        )}
        {showHint && (
          <div style={{
            padding: '10px 14px', borderRadius: '10px',
            background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)',
            color: '#92400E', fontSize: '0.85rem', flex: 1,
          }}>
            💡 {q.hint}
          </div>
        )}
        {selected !== null && (
          <button onClick={next} style={{ ...primaryBtnStyle, marginLeft: 'auto' }}>
            {current + 1 >= total ? 'See Results →' : 'Next →'}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const primaryBtnStyle = {
  padding: '12px 28px', borderRadius: '12px', border: 'none',
  background: 'linear-gradient(135deg,#4A6CF7,#8B5CF6)',
  color: 'white', cursor: 'pointer', fontWeight: '600',
  fontSize: '0.95rem', fontFamily: 'inherit',
  boxShadow: '0 4px 14px rgba(74,108,247,0.35)',
  transition: 'transform 0.15s, box-shadow 0.15s',
};
const outlineBtnStyle = (s) => ({
  padding: '12px 28px', borderRadius: '12px',
  border: `2px solid ${s.border}`,
  background: 'transparent', color: s.text, cursor: 'pointer',
  fontWeight: '600', fontSize: '0.95rem', fontFamily: 'inherit',
  transition: 'all 0.2s',
});
const backBtnStyle = (s) => ({
  padding: '8px 14px', borderRadius: '10px', border: `1px solid ${s.border}`,
  background: 'transparent', color: s.textSec, cursor: 'pointer',
  fontSize: '0.85rem', fontFamily: 'inherit', transition: 'all 0.2s',
  display: 'inline-flex', alignItems: 'center', gap: '4px',
});

function Stat({ label, value, color }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontWeight: '700', fontSize: '1.1rem', color }}>{value}</div>
      <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{label}</div>
    </div>
  );
}

// ─── MAIN GAMES PAGE ──────────────────────────────────────────────────────────
export default function Games() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');
  const [activeGame, setActiveGame] = useState(null); // null | 'memory' | 'logic'
  const s = T[theme];

  const GAME_CARDS = [
    {
      id: 'memory',
      icon: '🃏',
      title: 'Memory Game',
      desc: 'Flip cards and find matching pairs. 3 difficulty levels.',
      color: '#4A6CF7',
      tags: ['Memory', 'Concentration'],
      time: '2–5 min',
    },
    {
      id: 'logic',
      icon: '🧩',
      title: 'Logic Test',
      desc: '8 questions on reasoning, patterns and critical thinking.',
      color: '#8B5CF6',
      tags: ['IQ', 'Reasoning'],
      time: '~5 min',
    },
    {
      id: 'soon1',
      icon: '⚡',
      title: 'Reaction Speed',
      desc: 'Test how fast your brain reacts to visual stimuli.',
      color: '#F59E0B',
      tags: ['Reaction', 'Speed'],
      time: '1–2 min',
      soon: true,
    },
    {
      id: 'soon2',
      icon: '🔢',
      title: 'Number Sequence',
      desc: 'Find the rule in number sequences.',
      color: '#10B981',
      tags: ['Numbers', 'Patterns'],
      time: '3–4 min',
      soon: true,
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: rgba(100,116,139,0.3); border-radius: 4px; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
        @keyframes shimmer { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
        .game-card:hover { transform: translateY(-5px) !important; }
        .primary-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(74,108,247,0.5) !important; }
      `}</style>

      <div style={{
        minHeight: '100vh', background: s.bg, color: s.text,
        fontFamily: "'Inter', sans-serif", transition: 'all 0.3s ease',
      }}>
        {/* TOP BAR */}
        <div style={{
          height: '60px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '0 24px',
          borderBottom: `1px solid ${s.border}`, background: s.card,
          position: 'sticky', top: 0, zIndex: 100,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => activeGame ? setActiveGame(null) : navigate('/chat')} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: s.textSec, fontSize: '1.2rem', display: 'flex', alignItems: 'center',
            }}>←</button>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'linear-gradient(135deg,#4A6CF7,#8B5CF6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px',
            }}>🎮</div>
            <span style={{ fontWeight: '700', fontSize: '1rem' }}>
              {activeGame ? (activeGame === 'memory' ? '🃏 Memory Game' : '🧩 Logic Test') : 'Mind Games'}
            </span>
          </div>
          {/* Theme toggle */}
          <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} style={{
            background: s.inputBg, border: `1px solid ${s.border}`,
            borderRadius: '8px', padding: '6px 12px', cursor: 'pointer',
            color: s.textSec, fontSize: '0.85rem', fontFamily: 'inherit',
          }}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>

        {/* CONTENT */}
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '32px 20px' }}>

          {/* GAME LOBBY */}
          {!activeGame && (
            <div style={{ animation: 'fadeIn 0.4s ease' }}>
              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '800', color: s.text, marginBottom: '10px' }}>
                  🧠 Train Your Mind
                </h1>
                <p style={{ color: s.textSec, fontSize: '1rem', maxWidth: '400px', margin: '0 auto' }}>
                  Fun games to sharpen memory, logic and reasoning. All designed by psychologists.
                </p>
              </div>

              {/* Game cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '16px' }}>
                {GAME_CARDS.map(game => (
                  <div
                    key={game.id}
                    className="game-card"
                    onClick={() => !game.soon && setActiveGame(game.id)}
                    style={{
                      background: s.card, borderRadius: '18px',
                      border: `1.5px solid ${game.soon ? s.border : `${game.color}33`}`,
                      padding: '24px', cursor: game.soon ? 'default' : 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                      opacity: game.soon ? 0.65 : 1,
                      position: 'relative', overflow: 'hidden',
                    }}
                  >
                    {/* Glow */}
                    {!game.soon && (
                      <div style={{
                        position: 'absolute', top: '-20px', right: '-20px',
                        width: '80px', height: '80px', borderRadius: '50%',
                        background: `${game.color}18`, filter: 'blur(20px)',
                      }} />
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                      <div style={{
                        width: '52px', height: '52px', borderRadius: '14px',
                        background: game.soon ? s.inputBg : `${game.color}18`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.6rem',
                      }}>
                        {game.icon}
                      </div>
                      {game.soon
                        ? <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: '600', background: s.inputBg, color: s.textSec }}>Coming Soon</span>
                        : <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: '600', background: `${game.color}18`, color: game.color }}>▶ Play</span>
                      }
                    </div>

                    <h3 style={{ fontWeight: '700', fontSize: '1.05rem', color: s.text, marginBottom: '6px' }}>
                      {game.title}
                    </h3>
                    <p style={{ color: s.textSec, fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '14px' }}>
                      {game.desc}
                    </p>

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.75rem', color: s.textMuted }}>🕐 {game.time}</span>
                      {game.tags.map(tag => (
                        <span key={tag} style={{
                          padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem',
                          background: s.inputBg, color: s.textSec, fontWeight: '500',
                        }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tip */}
              <div style={{
                marginTop: '28px', padding: '16px 20px', borderRadius: '14px',
                background: 'linear-gradient(135deg,rgba(74,108,247,0.08),rgba(139,92,246,0.08))',
                border: '1px solid rgba(74,108,247,0.15)',
                display: 'flex', gap: '12px', alignItems: 'flex-start',
              }}>
                <span style={{ fontSize: '1.2rem' }}>💡</span>
                <p style={{ color: s.textSec, fontSize: '0.85rem', lineHeight: '1.6' }}>
                  Regular brain training improves focus, memory and emotional regulation —
                  all key factors in mental well-being.
                </p>
              </div>
            </div>
          )}

          {/* ACTIVE GAME */}
          {activeGame === 'memory' && <MemoryGame s={s} onBack={() => setActiveGame(null)} />}
          {activeGame === 'logic'  && <LogicGame  s={s} onBack={() => setActiveGame(null)} />}
        </div>
      </div>
    </>
  );
}