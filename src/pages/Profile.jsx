import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const T = {
  light: { bg:'#F8FAFC', card:'#FFFFFF', text:'#1E293B', textSec:'#64748B', textMuted:'#94A3B8', border:'#E2E8F0', inputBg:'#F1F5F9' },
  dark:  { bg:'#0F172A', card:'#1E293B', text:'#F1F5F9', textSec:'#94A3B8', textMuted:'#64748B', border:'#334155', inputBg:'#0F172A' },
};

const ACHIEVEMENTS = [
  { icon:'🔥', label:'7-day streak',      color:'#F59E0B', unlocked:true,  desc:'Used the app 7 days in a row' },
  { icon:'💬', label:'First session',     color:'#4A6CF7', unlocked:true,  desc:'Completed your first chat session' },
  { icon:'🧩', label:'Logic master',      color:'#8B5CF6', unlocked:true,  desc:'Scored 8/8 on the logic test' },
  { icon:'🃏', label:'Memory champ',      color:'#EC4899', unlocked:false, desc:'Finish hard mode memory game' },
  { icon:'🌱', label:'30-day journey',    color:'#10B981', unlocked:false, desc:'Use the app for 30 days' },
  { icon:'⭐', label:'Top mood week',     color:'#F59E0B', unlocked:false, desc:'Average mood 8+ for a week' },
  { icon:'🎯', label:'Goal crusher',      color:'#EF4444', unlocked:false, desc:'Complete all onboarding goals' },
  { icon:'🧠', label:'Brain trainer',     color:'#4A6CF7', unlocked:false, desc:'Play 10 brain games' },
  { icon:'🤝', label:'Consistent',        color:'#10B981', unlocked:false, desc:'Log mood 14 days in a row' },
];

const HISTORY = [
  { date:'Today',      title:'Work stress',          emoji:'😤', duration:'18 min', mood:6 },
  { date:'Yesterday',  title:'Anxiety management',   emoji:'😰', duration:'24 min', mood:7 },
  { date:'2 days ago', title:'Sleep routine',        emoji:'😴', duration:'15 min', mood:8 },
  { date:'3 days ago', title:'Self-confidence',      emoji:'💪', duration:'31 min', mood:7 },
  { date:'5 days ago', title:'Relationship talk',    emoji:'💞', duration:'22 min', mood:5 },
];

const GOALS_MAP = {
  anxiety:'Manage anxiety 😰', stress:'Reduce stress 😤',
  sleep:'Sleep better 😴', growth:'Personal growth 🌱',
  relation:'Relationship help 💞', talk:'Just talk 💬',
};

const THERAPIST_MAP = {
  aria:  { emoji:'🌸', label:'Aria — Warm & Gentle' },
  leo:   { emoji:'🦁', label:'Leo — Direct & Motivating' },
  sage:  { emoji:'🌿', label:'Sage — Calm & Mindful' },
  nova:  { emoji:'✨', label:'Nova — Playful & Creative' },
};

export default function Profile() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({ name:'Friend', goal:'growth', therapist:'aria', lang:'en' });
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [tab, setTab] = useState('overview'); // overview | history | achievements
  const s = T[theme];

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mb_user'));
      if (saved?.name) { setUser(saved); setEditName(saved.name); }
    } catch {}
  }, []);

  const saveEdit = () => {
    const updated = { ...user, name: editName.trim() || user.name };
    setUser(updated);
    localStorage.setItem('mb_user', JSON.stringify(updated));
    setEditing(false);
  };

  const therapist = THERAPIST_MAP[user.therapist] || THERAPIST_MAP.aria;
  const unlockedCount = ACHIEVEMENTS.filter(a => a.unlocked).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-thumb { background:rgba(100,116,139,0.25); border-radius:4px; }
        @keyframes fadeIn  { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
        @keyframes popIn   { from { opacity:0; transform:scale(0.85); } to { opacity:1; transform:scale(1); } }
        .tab-btn:hover { color:#4A6CF7 !important; }
        .edit-btn:hover { background:rgba(74,108,247,0.1) !important; }
        .nav-item:hover { background:rgba(74,108,247,0.08) !important; color:#4A6CF7 !important; }
        .history-row:hover { background:rgba(74,108,247,0.04) !important; }
        .achievement-card:hover { transform:scale(1.04); }
      `}</style>

      <div style={{ minHeight:'100vh', background:s.bg, fontFamily:"'Inter',sans-serif", transition:'all 0.3s' }}>

        {/* TOP BAR */}
        <div style={{
          height:'60px', display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'0 24px', borderBottom:`1px solid ${s.border}`, background:s.card,
          position:'sticky', top:0, zIndex:100,
        }}>
          <button onClick={() => navigate('/dashboard')} style={{
            background:'none', border:'none', cursor:'pointer', color:s.textSec,
            fontSize:'1.1rem', display:'flex', alignItems:'center', gap:'6px', fontFamily:'inherit',
          }}>← <span style={{ fontSize:'0.9rem' }}>Back</span></button>
          <span style={{ fontWeight:'700', color:s.text }}>Profile</span>
          <button onClick={() => setTheme(t => t==='light'?'dark':'light')} style={{
            background:s.inputBg, border:`1px solid ${s.border}`, borderRadius:'8px',
            padding:'6px 10px', cursor:'pointer', color:s.textSec, fontSize:'0.82rem', fontFamily:'inherit',
          }}>{theme==='light'?'🌙':'☀️'}</button>
        </div>

        <div style={{ maxWidth:'600px', margin:'0 auto', padding:'24px 20px 100px' }}>

          {/* AVATAR & NAME */}
          <div style={{
            background: 'linear-gradient(135deg,rgba(74,108,247,0.08),rgba(139,92,246,0.08))',
            borderRadius:'24px', padding:'28px 24px', marginBottom:'20px',
            border:'1px solid rgba(74,108,247,0.12)',
            textAlign:'center', animation:'fadeIn 0.4s ease',
          }}>
            {/* Avatar */}
            <div style={{ position:'relative', display:'inline-block', marginBottom:'16px' }}>
              <div style={{
                width:'84px', height:'84px', borderRadius:'50%',
                background:'linear-gradient(135deg,#4A6CF7,#8B5CF6)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'2.2rem', color:'white', fontWeight:'800',
                boxShadow:'0 8px 24px rgba(74,108,247,0.35)',
                margin:'0 auto',
              }}>
                {user.name?.[0]?.toUpperCase() || '?'}
              </div>
              <div style={{
                position:'absolute', bottom:2, right:2,
                width:'24px', height:'24px', borderRadius:'50%',
                background:'#10B981', border:`3px solid ${s.card}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'0.6rem',
              }}>✓</div>
            </div>

            {/* Name */}
            {editing ? (
              <div style={{ display:'flex', gap:'8px', justifyContent:'center', marginBottom:'8px' }}>
                <input
                  autoFocus value={editName}
                  onChange={e => setEditName(e.target.value)}
                  onKeyDown={e => e.key==='Enter' && saveEdit()}
                  style={{
                    padding:'8px 14px', borderRadius:'10px', border:'2px solid #4A6CF7',
                    outline:'none', fontSize:'1rem', fontFamily:'inherit',
                    background:s.inputBg, color:s.text, textAlign:'center',
                  }}
                />
                <button onClick={saveEdit} style={{
                  padding:'8px 14px', borderRadius:'10px', border:'none',
                  background:'linear-gradient(135deg,#4A6CF7,#8B5CF6)',
                  color:'white', cursor:'pointer', fontFamily:'inherit', fontWeight:'600',
                }}>Save</button>
                <button onClick={() => setEditing(false)} style={{
                  padding:'8px 12px', borderRadius:'10px',
                  border:`1px solid ${s.border}`, background:'transparent',
                  color:s.textSec, cursor:'pointer', fontFamily:'inherit',
                }}>✕</button>
              </div>
            ) : (
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', marginBottom:'8px' }}>
                <h2 style={{ fontSize:'1.4rem', fontWeight:'800', color:s.text }}>{user.name}</h2>
                <button className="edit-btn" onClick={() => setEditing(true)} style={{
                  background:'none', border:'none', cursor:'pointer', padding:'4px 8px',
                  borderRadius:'6px', color:s.textSec, fontSize:'0.85rem',
                  transition:'background 0.2s',
                }}>✏️</button>
              </div>
            )}

            <div style={{ color:s.textSec, fontSize:'0.85rem', marginBottom:'16px' }}>
              Member since April 2025
            </div>

            {/* Info pills */}
            <div style={{ display:'flex', gap:'8px', justifyContent:'center', flexWrap:'wrap' }}>
              {[
                { icon:therapist.emoji, label:therapist.label },
                { icon:'🎯', label:GOALS_MAP[user.goal] || 'Personal growth 🌱' },
              ].map(pill => (
                <div key={pill.label} style={{
                  padding:'6px 14px', borderRadius:'20px', fontSize:'0.8rem',
                  background:s.card, border:`1px solid ${s.border}`,
                  color:s.textSec, display:'flex', alignItems:'center', gap:'6px',
                }}>
                  {pill.icon} {pill.label}
                </div>
              ))}
            </div>
          </div>

          {/* STATS ROW */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'10px', marginBottom:'20px' }}>
            {[
              { value:'12',  label:'Sessions',  color:'#4A6CF7' },
              { value:'7',   label:'Day Streak', color:'#F59E0B' },
              { value:`${unlockedCount}/${ACHIEVEMENTS.length}`, label:'Badges', color:'#8B5CF6' },
            ].map(stat => (
              <div key={stat.label} style={{
                background:s.card, borderRadius:'14px', padding:'16px 12px',
                border:`1px solid ${s.border}`, textAlign:'center',
              }}>
                <div style={{ fontSize:'1.4rem', fontWeight:'800', color:stat.color }}>{stat.value}</div>
                <div style={{ fontSize:'0.75rem', color:s.textSec, fontWeight:'500', marginTop:'2px' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* TABS */}
          <div style={{
            display:'flex', gap:'4px', background:s.inputBg,
            borderRadius:'12px', padding:'4px', marginBottom:'20px',
          }}>
            {[
              { id:'overview',      label:'Overview' },
              { id:'history',       label:'Sessions' },
              { id:'achievements',  label:'Badges' },
            ].map(t => (
              <button key={t.id} className="tab-btn" onClick={() => setTab(t.id)} style={{
                flex:1, padding:'9px', borderRadius:'9px', border:'none',
                cursor:'pointer', fontFamily:'inherit', fontWeight:'600', fontSize:'0.85rem',
                background: tab===t.id ? s.card : 'transparent',
                color: tab===t.id ? '#4A6CF7' : s.textSec,
                boxShadow: tab===t.id ? '0 1px 6px rgba(0,0,0,0.08)' : 'none',
                transition:'all 0.2s',
              }}>{t.label}</button>
            ))}
          </div>

          {/* OVERVIEW TAB */}
          {tab==='overview' && (
            <div style={{ animation:'fadeIn 0.3s ease', display:'flex', flexDirection:'column', gap:'14px' }}>

              {/* Progress goals */}
              <div style={{ background:s.card, borderRadius:'18px', padding:'20px', border:`1px solid ${s.border}` }}>
                <div style={{ fontWeight:'700', color:s.text, marginBottom:'16px' }}>🎯 Goal Progress</div>
                {[
                  { label:'Anxiety reduction',  pct:68, color:'#4A6CF7' },
                  { label:'Sleep quality',       pct:45, color:'#8B5CF6' },
                  { label:'Stress management',   pct:82, color:'#10B981' },
                ].map(g => (
                  <div key={g.label} style={{ marginBottom:'14px' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'6px' }}>
                      <span style={{ fontSize:'0.85rem', color:s.textSec, fontWeight:'500' }}>{g.label}</span>
                      <span style={{ fontSize:'0.82rem', color:g.color, fontWeight:'700' }}>{g.pct}%</span>
                    </div>
                    <div style={{ height:'7px', background:s.inputBg, borderRadius:'4px', overflow:'hidden' }}>
                      <div style={{
                        height:'100%', borderRadius:'4px', background:g.color,
                        width:`${g.pct}%`, transition:'width 1s cubic-bezier(0.34,1.56,0.64,1)',
                      }}/>
                    </div>
                  </div>
                ))}
              </div>

              {/* Settings */}
              <div style={{ background:s.card, borderRadius:'18px', padding:'20px', border:`1px solid ${s.border}` }}>
                <div style={{ fontWeight:'700', color:s.text, marginBottom:'14px' }}>⚙️ Settings</div>
                {[
                  { icon:'🧠', label:'Change AI therapist',  action:() => navigate('/onboarding') },
                  { icon:'🎯', label:'Update my goal',       action:() => navigate('/onboarding') },
                  { icon:'🌐', label:'Change language',      action:() => navigate('/chat') },
                  { icon:'🔔', label:'Notifications',        action:() => {} },
                  { icon:'🔒', label:'Privacy & Data',       action:() => {} },
                  { icon:'🚪', label:'Log out',              action:() => navigate('/'), danger:true },
                ].map(item => (
                  <button key={item.label} onClick={item.action} style={{
                    width:'100%', padding:'13px 14px', borderRadius:'10px', border:'none',
                    background:'transparent', cursor:'pointer', fontFamily:'inherit',
                    display:'flex', alignItems:'center', gap:'12px', textAlign:'left',
                    transition:'background 0.15s', color: item.danger ? '#EF4444' : s.text,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = item.danger ? 'rgba(239,68,68,0.06)' : s.inputBg}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <span style={{ fontSize:'1.1rem' }}>{item.icon}</span>
                    <span style={{ fontWeight:'500', fontSize:'0.9rem' }}>{item.label}</span>
                    <span style={{ marginLeft:'auto', color:s.textMuted, fontSize:'0.85rem' }}>›</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* HISTORY TAB */}
          {tab==='history' && (
            <div style={{ animation:'fadeIn 0.3s ease' }}>
              <div style={{ background:s.card, borderRadius:'18px', border:`1px solid ${s.border}`, overflow:'hidden' }}>
                {HISTORY.map((h, i) => (
                  <div key={i} className="history-row" style={{
                    padding:'16px 20px', borderBottom: i<HISTORY.length-1 ? `1px solid ${s.border}` : 'none',
                    display:'flex', alignItems:'center', gap:'14px', cursor:'pointer',
                    transition:'background 0.15s',
                  }}>
                    <div style={{
                      width:'44px', height:'44px', borderRadius:'12px',
                      background:'linear-gradient(135deg,rgba(74,108,247,0.1),rgba(139,92,246,0.1))',
                      display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', flexShrink:0,
                    }}>{h.emoji}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:'600', color:s.text, fontSize:'0.92rem' }}>{h.title}</div>
                      <div style={{ color:s.textMuted, fontSize:'0.78rem', marginTop:'2px' }}>
                        {h.date} · {h.duration}
                      </div>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <div style={{
                        padding:'4px 10px', borderRadius:'20px', fontSize:'0.75rem', fontWeight:'700',
                        background: h.mood>=7 ? 'rgba(16,185,129,0.1)' : h.mood>=5 ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)',
                        color: h.mood>=7 ? '#10B981' : h.mood>=5 ? '#F59E0B' : '#EF4444',
                      }}>
                        Mood {h.mood}/10
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACHIEVEMENTS TAB */}
          {tab==='achievements' && (
            <div style={{ animation:'fadeIn 0.3s ease' }}>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px' }}>
                {ACHIEVEMENTS.map(a => (
                  <div key={a.label} className="achievement-card" style={{
                    background: a.unlocked ? `${a.color}10` : s.inputBg,
                    borderRadius:'16px', padding:'18px 12px', textAlign:'center',
                    border: a.unlocked ? `1.5px solid ${a.color}33` : `1.5px solid ${s.border}`,
                    opacity: a.unlocked ? 1 : 0.55,
                    transition:'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                    cursor:'default',
                  }}>
                    <div style={{ fontSize:'1.8rem', marginBottom:'8px', filter: a.unlocked ? 'none' : 'grayscale(1)' }}>
                      {a.unlocked ? a.icon : '🔒'}
                    </div>
                    <div style={{ fontWeight:'700', fontSize:'0.78rem', color: a.unlocked ? s.text : s.textMuted, marginBottom:'4px' }}>
                      {a.label}
                    </div>
                    <div style={{ fontSize:'0.68rem', color:s.textMuted, lineHeight:'1.4' }}>
                      {a.desc}
                    </div>
                    {a.unlocked && (
                      <div style={{
                        marginTop:'8px', padding:'2px 8px', borderRadius:'10px', fontSize:'0.68rem',
                        background:`${a.color}22`, color:a.color, fontWeight:'700', display:'inline-block',
                      }}>Unlocked ✓</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM NAV */}
        <div style={{
          position:'fixed', bottom:0, left:0, right:0,
          background:s.card, borderTop:`1px solid ${s.border}`,
          display:'flex', padding:'8px 0 12px',
          boxShadow:'0 -4px 20px rgba(0,0,0,0.06)',
        }}>
          {[
            { icon:'🏠', label:'Home',    path:'/dashboard' },
            { icon:'💬', label:'Chat',    path:'/chat' },
            { icon:'🎮', label:'Games',   path:'/games' },
            { icon:'👤', label:'Profile', path:'/profile', active:true },
          ].map(item => (
            <div key={item.label} className="nav-item" onClick={() => navigate(item.path)} style={{
              flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'3px',
              cursor:'pointer', padding:'6px 4px', borderRadius:'10px',
              color: item.active ? '#4A6CF7' : s.textSec,
              transition:'all 0.2s', margin:'0 4px',
            }}>
              <span style={{ fontSize:'1.25rem' }}>{item.icon}</span>
              <span style={{ fontSize:'0.68rem', fontWeight: item.active ? '700' : '500' }}>{item.label}</span>
              {item.active && <div style={{ width:'4px', height:'4px', borderRadius:'50%', background:'#4A6CF7' }}/>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}