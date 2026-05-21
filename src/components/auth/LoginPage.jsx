import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { FcGoogle } from 'react-icons/fc';
import { HiMail, HiLockClosed, HiUser, HiEye, HiEyeOff } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const { loginWithEmail, registerWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode]       = useState('login'); // 'login' | 'register'
  const [form, setForm]       = useState({ email: '', password: '', name: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      if (mode === 'login') {
        await loginWithEmail(form.email, form.password);
      } else {
        if (!form.name.trim()) { setError('İsim zorunludur.'); setLoading(false); return; }
        await registerWithEmail(form.email, form.password, form.name);
      }
      navigate('/dashboard');
    } catch (err) {
      const msgs = {
        'auth/user-not-found':    'Bu e-posta adresi kayıtlı değil.',
        'auth/wrong-password':    'Şifre hatalı.',
        'auth/email-already-in-use': 'Bu e-posta zaten kullanılıyor.',
        'auth/weak-password':     'Şifre en az 6 karakter olmalı.',
        'auth/invalid-email':     'Geçersiz e-posta adresi.',
      };
      setError(msgs[err.code] || 'Bir hata oluştu. Tekrar deneyin.');
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError(''); setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError('Google ile giriş başarısız.');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight:'100vh', display:'flex', background:'var(--bg)' }}>
      {/* Sol panel */}
      <div style={{
        flex:1, display:'flex', flexDirection:'column', justifyContent:'center',
        alignItems:'center', padding:'60px 40px',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #111130 50%, #0a0a1a 100%)',
        position:'relative', overflow:'hidden'
      }}>
        {/* Dekoratif daireler */}
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            position:'absolute',
            width: `${200 + i*100}px`, height: `${200 + i*100}px`,
            borderRadius:'50%',
            border: `1px solid rgba(108,99,255,${0.08 - i*0.015})`,
            top:'50%', left:'50%',
            transform:'translate(-50%,-50%)',
            pointerEvents:'none'
          }} />
        ))}

        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6 }}
          style={{ textAlign:'center', maxWidth:480, position:'relative', zIndex:1 }}>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:10,
            marginBottom:32, padding:'10px 20px',
            background:'rgba(108,99,255,.15)', border:'1px solid rgba(108,99,255,.3)',
            borderRadius:99
          }}>
            <span style={{ fontSize:20 }}>✦</span>
            <span style={{ fontFamily:'var(--font-display)', fontWeight:700, color:'var(--accent)', fontSize:14 }}>
              CV BUILDER PRO
            </span>
          </div>

          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(36px,5vw,56px)', fontWeight:800, lineHeight:1.1, marginBottom:20 }}>
            Profesyonel CV'ni<br />
            <span style={{ color:'var(--accent)' }}>Dakikalar İçinde</span><br />
            Oluştur
          </h1>

          <p style={{ color:'var(--text2)', fontSize:16, lineHeight:1.7, marginBottom:40 }}>
            5 farklı tema, tam özelleştirme, PDF indirme ve otomatik kayıt ile kariyerinde fark yarat.
          </p>

          <div style={{ display:'flex', flexWrap:'wrap', gap:12, justifyContent:'center' }}>
            {['5 Profesyonel Tema','PDF İndirme','Otomatik Kayıt','Fotoğraf Desteği','Renk Özelleştirme'].map(f => (
              <div key={f} className="badge">{f}</div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Sağ panel: form */}
      <div style={{
        width:'min(480px, 100vw)', display:'flex', flexDirection:'column',
        justifyContent:'center', padding:'60px 40px',
        background:'var(--bg2)', borderLeft:'1px solid var(--border)'
      }}>
        <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ duration:.4 }}>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:700, marginBottom:8 }}>
            {mode === 'login' ? 'Tekrar Hoş Geldin' : 'Hesap Oluştur'}
          </h2>
          <p style={{ color:'var(--text2)', marginBottom:32 }}>
            {mode === 'login' ? 'Devam etmek için giriş yap' : 'Hemen ücretsiz başla'}
          </p>

          {/* Google butonu */}
          <button onClick={handleGoogle} disabled={loading} style={{
            width:'100%', padding:'13px', display:'flex', alignItems:'center',
            justifyContent:'center', gap:10,
            background:'var(--surface)', border:'1px solid var(--border)',
            borderRadius:'var(--radius)', color:'var(--text)',
            fontFamily:'var(--font-body)', fontSize:14, fontWeight:500,
            cursor:'pointer', transition:'all .2s', marginBottom:20
          }}
          onMouseEnter={e=>e.currentTarget.style.borderColor='var(--accent)'}
          onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}
          >
            <FcGoogle size={20} />
            Google ile {mode === 'login' ? 'Giriş Yap' : 'Kaydol'}
          </button>

          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
            <div style={{ flex:1, height:1, background:'var(--border)' }} />
            <span style={{ color:'var(--text2)', fontSize:12 }}>veya</span>
            <div style={{ flex:1, height:1, background:'var(--border)' }} />
          </div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence>
              {mode === 'register' && (
                <motion.div className="form-group"
                  initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }}
                  exit={{ opacity:0, height:0 }}>
                  <label>Ad Soyad</label>
                  <div style={{ position:'relative' }}>
                    <HiUser style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--text2)' }} />
                    <input type="text" placeholder="Adınız Soyadınız"
                      value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      style={{ paddingLeft:36 }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="form-group">
              <label>E-posta</label>
              <div style={{ position:'relative' }}>
                <HiMail style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--text2)' }} />
                <input type="email" placeholder="ornek@email.com"
                  value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  style={{ paddingLeft:36 }} required />
              </div>
            </div>

            <div className="form-group">
              <label>Şifre</label>
              <div style={{ position:'relative' }}>
                <HiLockClosed style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--text2)' }} />
                <input type={showPw ? 'text' : 'password'} placeholder="••••••••"
                  value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                  style={{ paddingLeft:36, paddingRight:40 }} required />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)',
                    background:'none', border:'none', color:'var(--text2)', cursor:'pointer' }}>
                  {showPw ? <HiEyeOff /> : <HiEye />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
                style={{ padding:'10px 14px', borderRadius:'var(--radius)',
                  background:'rgba(255,101,132,.1)', border:'1px solid rgba(255,101,132,.3)',
                  color:'var(--accent2)', fontSize:13, marginBottom:16 }}>
                {error}
              </motion.div>
            )}

            <button type="submit" className="btn-primary" disabled={loading}
              style={{ width:'100%', justifyContent:'center', padding:'13px' }}>
              {loading ? 'Lütfen bekleyin...' : mode === 'login' ? 'Giriş Yap' : 'Hesap Oluştur'}
            </button>
          </form>

          <p style={{ textAlign:'center', marginTop:20, color:'var(--text2)', fontSize:14 }}>
            {mode === 'login' ? 'Hesabın yok mu?' : 'Zaten hesabın var mı?'}{' '}
            <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              style={{ background:'none', border:'none', color:'var(--accent)', cursor:'pointer', fontWeight:600 }}>
              {mode === 'login' ? 'Kayıt Ol' : 'Giriş Yap'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
