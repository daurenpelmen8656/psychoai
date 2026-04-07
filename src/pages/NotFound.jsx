import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight:'100vh', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      fontFamily:"'Inter',sans-serif", background:'#F8FAFC',
      textAlign:'center', padding:'20px',
    }}>
      <div style={{ fontSize:'5rem', marginBottom:'16px' }}>🧠</div>
      <h1 style={{ fontSize:'2rem', fontWeight:'800', color:'#1E293B', marginBottom:'8px' }}>
        Page not found
      </h1>
      <p style={{ color:'#64748B', marginBottom:'28px' }}>
        Looks like this page doesn't exist.
      </p>
      <button onClick={() => navigate('/chat')} style={{
        padding:'12px 28px', borderRadius:'12px', border:'none',
        background:'linear-gradient(135deg,#4A6CF7,#8B5CF6)',
        color:'white', cursor:'pointer', fontWeight:'700',
        fontSize:'1rem', fontFamily:'inherit',
      }}>
        Go to Chat →
      </button>
    </div>
  );
}
