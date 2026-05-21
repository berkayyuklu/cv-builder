import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../auth/AuthProvider';
import { getUserCVs, deleteCV } from '../../firebase/firestore';
import { HiPlus, HiDocumentText, HiTrash, HiPencil, HiDownload, HiClock } from 'react-icons/hi';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../shared/Navbar';

const THEME_COLORS = {
  modern:  { bg:'#6c63ff', label:'Modern' },
  classic: { bg:'#2c3e50', label:'Klasik' },
  minimal: { bg:'#333',    label:'Minimal' },
  bold:    { bg:'#e74c3c', label:'Bold' },
  elegant: { bg:'#8e44ad', label:'Elegant' },
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const [cvs, setCVs]         = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getUserCVs(user.uid).then(data => { setCVs(data); setLoading(false); });
  }, [user]);

  const handleNewCV = () => {
    const id = uuidv4();
    navigate(`/builder/${id}`);
  };

  const handleDelete = async (cvId) => {
    if (!window.confirm('Bu CV\'yi silmek istediğinize emin misiniz?')) return;
    await deleteCV(user.uid, cvId);
    setCVs(prev => prev.filter(c => c.id !== cvId));
  };

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <Navbar />
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'40px 24px' }}>
        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:48, flexWrap:'wrap', gap:16 }}>
          <div>
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:32, fontWeight:800, marginBottom:8 }}>
              Merhaba, {user?.displayName?.split(' ')[0] || 'Kullanıcı'} 👋
            </h1>
            <p style={{ color:'var(--text2)' }}>CV'lerini yönet, düzenle ve indir.</p>
          </div>
          <button className="btn-primary" onClick={handleNewCV}>
            <HiPlus size={18} /> Yeni CV Oluştur
          </button>
        </div>

        {/* İstatistik kartları */}
        <div className="grid-3" style={{ marginBottom:48 }}>
          {[
            { icon:'📄', label:'Toplam CV', value: cvs.length },
            { icon:'✏️', label:'Son Düzenleme', value: cvs[0] ? formatDistanceToNow(cvs[0].updatedAt?.toDate?.() || new Date(), { addSuffix:true, locale:tr }) : '-' },
            { icon:'🎨', label:'Kullanılan Temalar', value: [...new Set(cvs.map(c=>c.theme))].length || 0 },
          ].map(stat => (
            <motion.div key={stat.label} className="section-card"
              whileHover={{ y:-4 }} style={{ cursor:'default' }}>
              <div style={{ fontSize:28, marginBottom:8 }}>{stat.icon}</div>
              <div style={{ fontSize:24, fontWeight:700, fontFamily:'var(--font-display)' }}>{stat.value}</div>
              <div style={{ color:'var(--text2)', fontSize:13 }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* CV listesi */}
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:20, fontWeight:700, marginBottom:20 }}>
          CV'lerim
        </h2>

        {loading ? (
          <div style={{ textAlign:'center', padding:'60px', color:'var(--text2)' }}>Yükleniyor...</div>
        ) : cvs.length === 0 ? (
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            style={{ textAlign:'center', padding:'80px 20px',
              background:'var(--surface)', border:'2px dashed var(--border)',
              borderRadius:'var(--radius-lg)' }}>
            <div style={{ fontSize:48, marginBottom:16 }}>📄</div>
            <h3 style={{ fontFamily:'var(--font-display)', marginBottom:8 }}>Henüz CV'n Yok</h3>
            <p style={{ color:'var(--text2)', marginBottom:24 }}>İlk profesyonel CV'ni oluşturmak için başla!</p>
            <button className="btn-primary" onClick={handleNewCV}><HiPlus /> Yeni CV Oluştur</button>
          </motion.div>
        ) : (
          <div className="grid-3">
            {cvs.map((cv, i) => {
              const theme = THEME_COLORS[cv.theme] || THEME_COLORS.modern;
              return (
                <motion.div key={cv.id}
                  initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay: i * 0.08 }}
                  className="section-card"
                  style={{ cursor:'pointer', transition:'all .2s', position:'relative', overflow:'hidden' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor='var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}
                >
                  {/* Tema renk çizgisi */}
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:theme.bg }} />

                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
                    <div style={{ width:44, height:44, borderRadius:'var(--radius)', background:theme.bg,
                      display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <HiDocumentText size={22} color="#fff" />
                    </div>
                    <div className="badge">{theme.label}</div>
                  </div>

                  <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, marginBottom:6, fontSize:16 }}>
                    {cv.title || 'İsimsiz CV'}
                  </h3>
                  <p style={{ color:'var(--text2)', fontSize:13, marginBottom:4 }}>
                    {cv.personalInfo?.fullName || 'İsim girilmemiş'}
                  </p>
                  <p style={{ color:'var(--text2)', fontSize:12, marginBottom:20, display:'flex', alignItems:'center', gap:4 }}>
                    <HiClock size={12} />
                    {cv.updatedAt ? formatDistanceToNow(cv.updatedAt.toDate(), { addSuffix:true, locale:tr }) : 'Az önce'}
                  </p>

                  <div style={{ display:'flex', gap:8 }}>
                    <button className="btn-primary" style={{ flex:1, justifyContent:'center', padding:'8px' }}
                      onClick={() => navigate(`/builder/${cv.id}`)}>
                      <HiPencil size={14} /> Düzenle
                    </button>
                    <button className="btn-danger" style={{ padding:'8px 12px' }}
                      onClick={() => handleDelete(cv.id)}>
                      <HiTrash size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
