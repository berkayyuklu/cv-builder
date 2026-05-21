import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { HiPlus, HiTrash, HiChevronDown, HiChevronUp } from 'react-icons/hi';

const emptyExp = () => ({
  id: uuidv4(), company:'', jobTitle:'', location:'', startDate:'', endDate:'',
  current: false, description:'', achievements:''
});

export default function ExperienceForm({ data, onChange }) {
  const experiences = data.experiences || [];
  const [expanded, setExpanded] = useState(null);

  const add = () => {
    const ne = emptyExp();
    onChange('experiences', [...experiences, ne]);
    setExpanded(ne.id);
  };

  const remove = (id) => onChange('experiences', experiences.filter(e => e.id !== id));

  const update = (id, field, val) =>
    onChange('experiences', experiences.map(e => e.id === id ? { ...e, [field]: val } : e));

  return (
    <div className="fade-in">
      <div className="section-card">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <h2 className="section-title" style={{ marginBottom:0 }}>💼 İş Deneyimi</h2>
          <button className="btn-primary" onClick={add} style={{ padding:'8px 16px', fontSize:13 }}>
            <HiPlus /> Ekle
          </button>
        </div>

        {experiences.length === 0 && (
          <div style={{ textAlign:'center', padding:'40px', color:'var(--text2)', fontSize:14 }}>
            <div style={{ fontSize:36, marginBottom:12 }}>💼</div>
            <div>Henüz deneyim eklenmedi.</div>
            <div style={{ fontSize:12, marginTop:4 }}>Yukarıdaki "Ekle" butonuna tıklayın.</div>
          </div>
        )}

        {experiences.map((exp, i) => (
          <div key={exp.id} style={{
            background:'var(--bg3)', border:'1px solid var(--border)',
            borderRadius:'var(--radius)', marginBottom:12, overflow:'hidden'
          }}>
            {/* Header */}
            <div style={{
              padding:'14px 16px', display:'flex', alignItems:'center',
              justifyContent:'space-between', cursor:'pointer'
            }} onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}>
              <div>
                <div style={{ fontWeight:600, fontSize:14 }}>
                  {exp.jobTitle || `Deneyim ${i+1}`}
                </div>
                {exp.company && (
                  <div style={{ color:'var(--text2)', fontSize:12 }}>{exp.company}</div>
                )}
              </div>
              <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                <button className="btn-danger" style={{ padding:'4px 8px', fontSize:12 }}
                  onClick={e => { e.stopPropagation(); remove(exp.id); }}>
                  <HiTrash size={12} />
                </button>
                {expanded === exp.id ? <HiChevronUp /> : <HiChevronDown />}
              </div>
            </div>

            {/* Form */}
            {expanded === exp.id && (
              <div style={{ padding:'0 16px 16px', borderTop:'1px solid var(--border)' }}>
                <div style={{ marginTop:16 }}>
                  <div className="grid-2">
                    <div className="form-group">
                      <label>Şirket Adı *</label>
                      <input value={exp.company} onChange={e => update(exp.id, 'company', e.target.value)} placeholder="Google, Microsoft..." />
                    </div>
                    <div className="form-group">
                      <label>Pozisyon / Unvan *</label>
                      <input value={exp.jobTitle} onChange={e => update(exp.id, 'jobTitle', e.target.value)} placeholder="Senior Developer" />
                    </div>
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label>Başlangıç Tarihi</label>
                      <input type="month" value={exp.startDate} onChange={e => update(exp.id, 'startDate', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Bitiş Tarihi</label>
                      <input type="month" value={exp.endDate} onChange={e => update(exp.id, 'endDate', e.target.value)} disabled={exp.current} />
                      <label style={{ display:'flex', alignItems:'center', gap:6, marginTop:6, textTransform:'none', letterSpacing:0, cursor:'pointer' }}>
                        <input type="checkbox" checked={exp.current} onChange={e => update(exp.id, 'current', e.target.checked)} style={{ width:'auto' }} />
                        Hâlâ burada çalışıyorum
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Şehir / Uzaktan</label>
                    <input value={exp.location} onChange={e => update(exp.id, 'location', e.target.value)} placeholder="İstanbul / Uzaktan" />
                  </div>
                  <div className="form-group">
                    <label>Görev Tanımı</label>
                    <textarea value={exp.description} onChange={e => update(exp.id, 'description', e.target.value)}
                      placeholder="Bu pozisyonda ne tür görevler üstlendiniz?" rows={3} style={{ resize:'vertical' }} />
                  </div>
                  <div className="form-group">
                    <label>Başarılar ve Katkılar</label>
                    <textarea value={exp.achievements} onChange={e => update(exp.id, 'achievements', e.target.value)}
                      placeholder="• Performansı %30 artırdım&#10;• X projesini liderlik ederek zamanında teslim ettim"
                      rows={3} style={{ resize:'vertical' }} />
                    <div style={{ fontSize:11, color:'var(--text2)', marginTop:4 }}>
                      💡 Rakamlarla desteklenmiş başarılar çok daha etkili görünür.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
