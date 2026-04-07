import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MOOD_DATA = [
  { day: 'Mon', score: 6, emoji: '😐' },
  { day: 'Tue', score: 7, emoji: '🙂' },
  { day: 'Wed', score: 4, emoji: '😔' },
  { day: 'Thu', score: 8, emoji: '😊' },
  { day: 'Fri', score: 9, emoji: '😄' },
  { day: 'Sat', score: 7, emoji: '🙂' },
  { day: 'Sun', score: 8, emoji: '😊' },
];

const ACHIEVEMENTS = [
  { icon: '🔥', label: '7-day streak',     color: '#F59E0B', unlocked: true },
  { icon: '💬', label: 'First session',    color: '#4A6CF7', unlocked: true },
  { icon: '🧩', label: 'Logic master',     color: '#8B5CF6', unlocked: true },
  { icon: '🃏', label: 'Memory champ',     color: '#EC4899', unlocked: false },
  { icon: '🌱', label: '30-day journey',   color: '#10B981', unlocked: false },
  { icon: '⭐', label: 'Top mood week',    color: '#F59E0B', unlocked: false },
];

const QUICK_TIPS = [
  { icon: '🌬️', text: 'Try box breathing: inhale 4s, hold 4s, exhale 4s, hold 4s.' },
  { icon: '🚶', text: 'A 10-minute walk can reduce anxiety by up to 40%.' },
  { icon: '📝', text: 'Journaling for 5 minutes a day improves emotional clarity.' },
  { icon: '💤', text: 'Consistent sleep time is more important than sleep duration.' },
];

const T = {
  light: { bg: '#F8FAFC', card: '#FFFFFF', text: '#1E293B', textSec: '#64748B', textMuted: '#94A3B8', border: '#E2E8F0', inputBg: '#F1F5F9' },
  dark:  { bg: '#0F172A', card: '#1E293B', text: '#F1F5F9', textSec: '#94A3B8', textMuted: '#64748B', border: '#334155', inputBg: '#0F172A' },
};

function MoodChart({ s }) {
  const max = 10;
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '100px', paddingTop: '8px' }}>
      {MOOD_DATA.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <div style={{
            width: '100%', borderRadius: '6px 6px 0 0',
            height: `${(d.score / max) * 80}px`,
            background: d.score >= 7
              ? 'linear-gradient(180deg,#4A6CF7,#8B5CF6)'
              : d.score >= 5
              ? 'linear-gradient(180deg,#F59E0B,#FBBF24)'
              : 'linear-gradient(180deg,#EF4444,#F87171)',
            transition: 'height 0.8s cubic-bezier(0.34,1.56,0.64,1)',
            animationDelay: `${i * 0.1}s`,
            opacity: 0.85,
          }}/>
          <span style={{ fontSize: '0.68rem', color: s.textMuted, fontWeight: '500' }}>{d.day}</span>
        </div>
      ))}
    </div>
  );
}

function StatCard({ icon, label, value, sub, color, s }) {
  return (
    <div style={{
      background: s.card, borderRadius: '16px', padding: '20px',
      border: `1px solid ${s.border}`,
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      display: 'flex', flexDirection: 'column', gap: '6px',
    }}>
      <div style={{
        width: '40px', height: '40px', borderRadius: '12px',
        background: `${color}18`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.2rem', marginBottom: '4px',
      }}>{icon}</div>
      <div style={{ fontSize: '1.6rem', fontWeight: '800', color: s.text }}>{value}</div>
      <div style={{ fontSize: '0.82rem', fontWeight: '600', color: s.textSec }}>{label}</div>
      {sub && <div style={{ fontSize: '0.75rem', color: s.textMuted }}>{sub}</div>}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({ name: 'Friend', goal: 'growth', therapist: 'aria' });
  const [tipIdx, setTipIdx] = useState(0);
  const [moodSelected, setMoodSelected] = useState(null);
  const [showMoodDone, setShowMoodDone] = useState(false);
  const s = T[theme];

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mb_user'));
      if (saved?.name) setUser(saved);
    } catch {}
    const t = setInterval(() => setTipIdx(i => (i + 1) % QUICK_TIPS.length), 6000);
    return () => clearInterval(t);
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const tip = QUICK_TIPS[tipIdx];

  const logMood = (score) => {
    setMoodSelected(score);
    setTimeout(() => setShowMoodDone(true), 400);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-thumb { background:rgba(100,116,139,0.25); border-radius:4px; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
        @keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
        @keyframes pulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.05); } }
        @keyframes tipFade { 0%,100% { opacity:1; } 45%,55% { opacity:0; } }
        .quick-action:hover { transform:translateY(-3px) !important; box-shadow:0 8px 24px rgba(74,108,247,0.2) !important; }
        .mood-btn:hover { transform:scale(1.2) !important; }
        .nav-item:hover { background:rgba(74,108,247,0.08) !important; color:#4A6CF7 !important; }
        @media (max-width: 768px) {
          .greeting { font-size: 1.3rem !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .quick-actions { grid-template-columns: 1fr 1fr !important; }
          .achievements-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .stat-card { padding: 14px !important; }
          .bottom-nav { padding-bottom: max(12px, env(safe-area-inset-bottom)) !important; }
        }
      `}</style>

      <div style={{ minHeight:'100vh', background:s.bg, fontFamily:"'Inter',sans-serif", transition:'all 0.3s ease' }}>

        {/* TOP BAR */}
        <div style={{
          height:'60px', display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'0 24px', borderBottom:`1px solid ${s.border}`, background:s.card,
          position:'sticky', top:0, zIndex:100,
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <div style={{
              width:'32px', height:'32px', borderRadius:'8px',
              background:'linear-gradient(135deg,#4A6CF7,#8B5CF6)',
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px',
            }}>🧠</div>
            <span style={{ fontWeight:'700', fontSize:'1rem', color:s.text }}>MindBridge</span>
          </div>
          <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
            <button onClick={() => setTheme(t => t==='light'?'dark':'light')} style={{
              background:s.inputBg, border:`1px solid ${s.border}`, borderRadius:'8px',
              padding:'6px 12px', cursor:'pointer', color:s.textSec, fontSize:'0.82rem',
              fontFamily:'inherit', transition:'all 0.2s',
            }}>
              {theme==='light'?'🌙':'☀️'}
            </button>
            <div onClick={() => navigate('/profile')} style={{
              width:'34px', height:'34px', borderRadius:'50%', cursor:'pointer',
              background:'linear-gradient(135deg,#4A6CF7,#8B5CF6)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1rem', color:'white', fontWeight:'700',
            }}>
              {user.name?.[0]?.toUpperCase() || '?'}
            </div>
          </div>
        </div>

        <div style={{ maxWidth:'720px', margin:'0 auto', padding:'28px 20px 100px' }}>

          {/* GREETING */}
          <div style={{ marginBottom:'28px', animation:'fadeIn 0.5s ease' }}>
            <h1 className="greeting" style={{ fontSize:'1.7rem', fontWeight:'800', color:s.text, marginBottom:'6px' }}>
              {greeting}, {user.name}! 👋
            </h1>
            <p style={{ color:s.textSec, fontSize:'0.95rem' }}>
              Here's your mental wellness overview for today.
            </p>
          </div>

          {/* MOOD CHECK-IN */}
          <div style={{
            background: showMoodDone
              ? 'linear-gradient(135deg,rgba(16,185,129,0.1),rgba(16,185,129,0.05))'
              : 'linear-gradient(135deg,rgba(74,108,247,0.08),rgba(139,92,246,0.08))',
            border: showMoodDone ? '1.5px solid rgba(16,185,129,0.3)' : '1.5px solid rgba(74,108,247,0.2)',
            borderRadius:'20px', padding:'22px 24px', marginBottom:'20px',
            animation:'slideUp 0.4s ease',
          }}>
            {showMoodDone ? (
              <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                <span style={{ fontSize:'1.8rem' }}>✅</span>
                <div>
                  <div style={{ fontWeight:'700', color:'#10B981', fontSize:'1rem' }}>Mood logged!</div>
                  <div style={{ color:s.textSec, fontSize:'0.85rem' }}>Thanks for checking in today.</div>
                </div>
              </div>
            ) : (
              <>
                <div style={{ fontWeight:'700', color:s.text, marginBottom:'4px' }}>How are you feeling right now?</div>
                <div style={{ color:s.textSec, fontSize:'0.85rem', marginBottom:'16px' }}>Tap to log your mood</div>
                <div style={{ display:'flex', gap:'10px', justifyContent:'space-between' }}>
                  {[['😢','1'],['😔','3'],['😐','5'],['🙂','7'],['😄','9'],['🤩','10']].map(([emoji, score]) => (
                    <button key={score} className="mood-btn" onClick={() => logMood(score)} style={{
                      background:'none', border:'none', fontSize:'1.8rem', cursor:'pointer',
                      transition:'transform 0.2s', padding:'4px',
                      filter: moodSelected === score ? 'none' : 'grayscale(0.3)',
                      transform: moodSelected === score ? 'scale(1.3)' : 'scale(1)',
                    }}>{emoji}</button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* STATS */}
          <div className="stats-grid" style={{
            display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',
            gap:'12px', marginBottom:'20px',
          }}>
            <StatCard icon="💬" label="Sessions"   value="12"   sub="This month"    color="#4A6CF7" s={s} />
            <StatCard icon="🔥" label="Day streak" value="7"    sub="Keep it up!"   color="#F59E0B" s={s} />
            <StatCard icon="🎮" label="Games"      value="23"   sub="Played total"  color="#8B5CF6" s={s} />
            <StatCard icon="😊" label="Avg mood"   value="7.4"  sub="This week"     color="#10B981" s={s} />
          </div>

          {/* MOOD CHART */}
          <div style={{
            background:s.card, borderRadius:'20px', padding:'22px 24px',
            border:`1px solid ${s.border}`, marginBottom:'20px',
            boxShadow:'0 2px 12px rgba(0,0,0,0.04)',
          }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
              <div>
                <div style={{ fontWeight:'700', color:s.text, fontSize:'1rem' }}>Mood This Week</div>
                <div style={{ color:s.textSec, fontSize:'0.8rem' }}>Daily emotional tracking</div>
              </div>
              <div style={{ display:'flex', gap:'10px', fontSize:'0.75rem', color:s.textMuted }}>
                {[['#4A6CF7','Good'],['#F59E0B','Okay'],['#EF4444','Low']].map(([c,l]) => (
                  <div key={l} style={{ display:'flex', alignItems:'center', gap:'4px' }}>
                    <div style={{ width:'8px', height:'8px', borderRadius:'2px', background:c }}/>
                    {l}
                  </div>
                ))}
              </div>
            </div>
            <MoodChart s={s} />
          </div>

          {/* QUICK ACTIONS */}
          <div style={{ marginBottom:'20px' }}>
            <div style={{ fontWeight:'700', color:s.text, fontSize:'1rem', marginBottom:'14px' }}>Quick Actions</div>
            <div className="quick-actions" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
              {[
                { icon:'💬', label:'Talk to AI',     sub:'Start a session',      color:'#4A6CF7', path:'/chat' },
                { icon:'🎮', label:'Play a game',    sub:'Train your brain',     color:'#8B5CF6', path:'/games' },
                { icon:'👤', label:'My profile',     sub:'View progress',        color:'#10B981', path:'/profile' },
                { icon:'📊', label:'Mood history',   sub:'See all logs',         color:'#F59E0B', path:'/dashboard' },
              ].map(item => (
                <div key={item.label} className="quick-action" onClick={() => navigate(item.path)} style={{
                  background:s.card, borderRadius:'16px', padding:'18px',
                  border:`1.5px solid ${item.color}22`,
                  cursor:'pointer', transition:'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                }}>
                  <div style={{
                    width:'42px', height:'42px', borderRadius:'12px',
                    background:`${item.color}18`, display:'flex',
                    alignItems:'center', justifyContent:'center',
                    fontSize:'1.3rem', marginBottom:'12px',
                  }}>{item.icon}</div>
                  <div style={{ fontWeight:'700', color:s.text, fontSize:'0.95rem' }}>{item.label}</div>
                  <div style={{ color:s.textSec, fontSize:'0.78rem', marginTop:'2px' }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* DAILY TIP */}
          <div style={{
            background:s.card, borderRadius:'18px', padding:'20px 22px',
            border:`1px solid ${s.border}`, marginBottom:'20px',
            boxShadow:'0 2px 12px rgba(0,0,0,0.04)',
          }}>
            <div style={{ fontWeight:'700', color:s.text, fontSize:'0.95rem', marginBottom:'12px' }}>
              💡 Daily Tip
            </div>
            <div style={{ display:'flex', gap:'12px', alignItems:'flex-start' }}>
              <span style={{ fontSize:'1.4rem' }}>{tip.icon}</span>
              <p style={{ color:s.textSec, fontSize:'0.88rem', lineHeight:'1.6' }}>{tip.text}</p>
            </div>
            <div style={{ display:'flex', gap:'6px', marginTop:'14px' }}>
              {QUICK_TIPS.map((_,i) => (
                <div key={i} style={{
                  height:'3px', flex:1, borderRadius:'2px',
                  background: i===tipIdx ? '#4A6CF7' : s.border,
                  transition:'background 0.3s',
                }}/>
              ))}
            </div>
          </div>

          {/* ACHIEVEMENTS */}
          <div style={{
            background:s.card, borderRadius:'18px', padding:'20px 22px',
            border:`1px solid ${s.border}`,
            boxShadow:'0 2px 12px rgba(0,0,0,0.04)',
          }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
              <div style={{ fontWeight:'700', color:s.text, fontSize:'0.95rem' }}>🏆 Achievements</div>
              <div style={{ fontSize:'0.8rem', color:'#4A6CF7', cursor:'pointer' }} onClick={() => navigate('/profile')}>
                View all →
              </div>
            </div>
            <div className="achievements-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'10px' }}>
              {ACHIEVEMENTS.map(a => (
                <div key={a.label} style={{
                  padding:'12px 8px', borderRadius:'14px', textAlign:'center',
                  background: a.unlocked ? `${a.color}12` : s.inputBg,
                  border: a.unlocked ? `1.5px solid ${a.color}33` : `1.5px solid ${s.border}`,
                  opacity: a.unlocked ? 1 : 0.5,
                  transition:'all 0.2s',
                }}>
                  <div style={{ fontSize:'1.5rem', marginBottom:'5px', filter: a.unlocked ? 'none' : 'grayscale(1)' }}>
                    {a.icon}
                  </div>
                  <div style={{ fontSize:'0.72rem', color: a.unlocked ? s.text : s.textMuted, fontWeight:'600', lineHeight:'1.3' }}>
                    {a.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM NAV */}
        <div className="bottom-nav" style={{
          position:'fixed', bottom:0, left:0, right:0,
          background:s.card, borderTop:`1px solid ${s.border}`,
          display:'flex', padding:'8px 0 12px',
          boxShadow:'0 -4px 20px rgba(0,0,0,0.06)',
        }}>
          {[
            { icon:'🏠', label:'Home',    path:'/dashboard', active:true },
            { icon:'💬', label:'Chat',    path:'/chat' },
            { icon:'🎮', label:'Games',   path:'/games' },
            { icon:'👤', label:'Profile', path:'/profile' },
          ].map(item => (
            <div key={item.label} className="nav-item" onClick={() => navigate(item.path)} style={{
              flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'3px',
              cursor:'pointer', padding:'6px 4px', borderRadius:'10px',
              color: item.active ? '#4A6CF7' : s.textSec,
              transition:'all 0.2s', margin:'0 4px',
            }}>
              <span style={{ fontSize:'1.25rem' }}>{item.icon}</span>
              <span style={{ fontSize:'0.68rem', fontWeight: item.active ? '700' : '500' }}>{item.label}</span>
              {item.active && (
                <div style={{ width:'4px', height:'4px', borderRadius:'50%', background:'#4A6CF7' }}/>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}