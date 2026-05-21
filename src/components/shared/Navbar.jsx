import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { HiLogout, HiUser } from 'react-icons/hi';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav style={{
      position:'sticky', top:0, zIndex:100,
      height:64, display:'flex', alignItems:'center',
      justifyContent:'space-between', padding:'0 24px',
      background:'rgba(10,10,15,.85)', backdropFilter:'blur(20px)',
      borderBottom:'1px solid var(--border)'
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' }}
        onClick={() => navigate('/dashboard')}>
        <span style={{ fontSize:20 }}>✦</span>
        <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:16, color:'var(--text)' }}>
          CV Builder <span style={{ color:'var(--accent)' }}>Pro</span>
        </span>
      </div>

      {user && (
        <div style={{ position:'relative' }}>
          <button
            onClick={() => setOpen(!open)}
            style={{
              display:'flex', alignItems:'center', gap:8,
              background:'var(--surface)', border:'1px solid var(--border)',
              borderRadius:'var(--radius)', padding:'6px 12px',
              cursor:'pointer', color:'var(--text)', transition:'all .15s'
            }}>
            {user.photoURL
              ? <img src={user.photoURL} alt="" style={{ width:24, height:24, borderRadius:'50%' }} />
              : <HiUser size={16} />
            }
            <span style={{ fontSize:13 }}>{user.displayName || user.email}</span>
          </button>

          {open && (
            <div style={{
              position:'absolute', right:0, top:'calc(100% + 8px)',
              background:'var(--surface)', border:'1px solid var(--border)',
              borderRadius:'var(--radius)', padding:8, minWidth:160,
              boxShadow:'var(--shadow)', zIndex:200
            }}>
              <div style={{ padding:'8px 12px', fontSize:12, color:'var(--text2)', borderBottom:'1px solid var(--border)', marginBottom:4 }}>
                {user.email}
              </div>
              <button
                onClick={handleLogout}
                style={{
                  width:'100%', display:'flex', alignItems:'center', gap:8,
                  padding:'8px 12px', background:'none', border:'none',
                  color:'var(--accent2)', cursor:'pointer', borderRadius:8, fontSize:13,
                  transition:'all .15s'
                }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(255,101,132,.1)'}
                onMouseLeave={e => e.currentTarget.style.background='none'}
              >
                <HiLogout size={14} /> Çıkış Yap
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
