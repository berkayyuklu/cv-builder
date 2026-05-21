import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { HiPlus, HiTrash, HiChevronDown, HiChevronUp } from 'react-icons/hi';

const emptyEdu = () => ({
  id: uuidv4(), school:'', degree:'', field:'', gpa:'', startDate:'', endDate:'', current:false, description:''
});

export default function EducationForm({ data, onChange }) {
  const education = data.education || [];
  const [expanded, setExpanded] = useState(null);

  const add = () => {
    const ne = emptyEdu();
    onChange('education', [...education, ne]);
    setExpanded(ne.id);
  };

  const remove = (id) => onChange('education', education.filter(e => e.id !== id));

  const update = (id, field, val) =>
    onChange('education', education.map(e => e.id === id ? { ...e, [field]: val } : e));

  return (
    <div className="fade-in">
      <div className="section-card">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <h2 className="section-title" style={{ marginBottom:0 }}>🎓 Eğitim</h2>
          <button className="btn-primary" onClick={add} style={{ padding:'8px 16px', fontSize:13 }}>
            <HiPlus /> Ekle
          </button>
        </div>

        {education.length === 0 && (
          <div style={{ textAlign:'center', padding:'40px', color:'var(--text2)', fontSize:14 }}>
            <div style={{ fontSize:36, marginBottom:12 }}>🎓</div>
            <div>Eğitim bilgisi eklenmedi.</div>
          </div>
        )}

        {education.map((edu, i) => (
          <div key={edu.id} style={{ background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:'var(--radius)', marginBottom:12, overflow:'hidden' }}>
            <div style={{ padding:'14px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer' }}
              onClick={() => setExpanded(expanded === edu.id ? null : edu.id)}>
              <div>
                <div style={{ fontWeight:600, fontSize:14 }}>{edu.school || `Eğitim ${i+1}`}</div>
                {edu.degree && <div style={{ color:'var(--text2)', fontSize:12 }}>{edu.degree} - {edu.field}</div>}
              </div>
              <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                <button className="btn-danger" style={{ padding:'4px 8px' }} onClick={e => { e.stopPropagation(); remove(edu.id); }}>
                  <HiTrash size={12} />
                </button>
                {expanded === edu.id ? <HiChevronUp /> : <HiChevronDown />}
              </div>
            </div>

            {expanded === edu.id && (
              <div style={{ padding:'0 16px 16px', borderTop:'1px solid var(--border)' }}>
                <div style={{ marginTop:16 }}>
                  <div className="form-group">
                    <label>Okul / Üniversite *</label>
                    <input value={edu.school} onChange={e => update(edu.id, 'school', e.target.value)} placeholder="İstanbul Teknik Üniversitesi" />
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label>Derece</label>
                      <select value={edu.degree} onChange={e => update(edu.id, 'degree', e.target.value)}>
                        <option value="">Seçiniz</option>
                        <option value="Lisans">Lisans</option>
                        <option value="Yüksek Lisans">Yüksek Lisans</option>
                        <option value="Doktora">Doktora</option>
                        <option value="Ön Lisans">Ön Lisans</option>
                        <option value="Lise">Lise</option>
                        <option value="Sertifika">Sertifika</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Bölüm / Alan</label>
                      <input value={edu.field} onChange={e => update(edu.id, 'field', e.target.value)} placeholder="Bilgisayar Mühendisliği" />
                    </div>
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label>Başlangıç</label>
                      <input type="month" value={edu.startDate} onChange={e => update(edu.id, 'startDate', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Bitiş</label>
                      <input type="month" value={edu.endDate} onChange={e => update(edu.id, 'endDate', e.target.value)} disabled={edu.current} />
                      <label style={{ display:'flex', alignItems:'center', gap:6, marginTop:6, textTransform:'none', letterSpacing:0, cursor:'pointer' }}>
                        <input type="checkbox" checked={edu.current} onChange={e => update(edu.id, 'current', e.target.checked)} style={{ width:'auto' }} />
                        Devam ediyor
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Not Ortalaması (GPA)</label>
                    <input value={edu.gpa} onChange={e => update(edu.id, 'gpa', e.target.value)} placeholder="3.50 / 4.00" />
                  </div>
                  <div className="form-group">
                    <label>Notlar / Aktiviteler</label>
                    <textarea value={edu.description} onChange={e => update(edu.id, 'description', e.target.value)}
                      placeholder="Onur listesi, kulüp aktiviteleri, önemli projeler..." rows={2} />
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
