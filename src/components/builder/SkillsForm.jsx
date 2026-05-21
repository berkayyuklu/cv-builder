import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { HiX, HiPlus } from 'react-icons/hi';

const SKILL_CATEGORIES = ['Teknik Beceriler', 'Yazılım & Araçlar', 'Diller', 'Soft Skills', 'Sertifikalar', 'Diğer'];

const SUGGESTED_SKILLS = {
  'Teknik Beceriler': ['JavaScript','TypeScript','Python','React','Vue.js','Node.js','SQL','Git','Docker','AWS','Figma'],
  'Soft Skills': ['Liderlik','Takım Çalışması','Problem Çözme','İletişim','Zaman Yönetimi','Analitik Düşünce'],
  'Diller': ['Türkçe (Anadil)','İngilizce (İleri)','Almanca (Orta)','Fransızca (Başlangıç)'],
};

const LEVELS = ['Başlangıç','Orta','İleri','Uzman'];

export default function SkillsForm({ data, onChange }) {
  const skills = data.skills || [];
  const [input, setInput]     = useState('');
  const [category, setCategory] = useState('Teknik Beceriler');
  const [level, setLevel]     = useState('İleri');

  const addSkill = (name = input) => {
    if (!name.trim()) return;
    const skill = { id:uuidv4(), name: name.trim(), category, level };
    onChange('skills', [...skills, skill]);
    setInput('');
  };

  const remove = (id) => onChange('skills', skills.filter(s => s.id !== id));

  // Kategoriye göre grupla
  const grouped = skills.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <div className="fade-in">
      <div className="section-card">
        <h2 className="section-title">⚡ Beceriler</h2>

        {/* Ekleme formu */}
        <div style={{ background:'var(--bg3)', padding:16, borderRadius:'var(--radius)', border:'1px solid var(--border)', marginBottom:20 }}>
          <div className="grid-2" style={{ marginBottom:12 }}>
            <div className="form-group" style={{ marginBottom:0 }}>
              <label>Kategori</label>
              <select value={category} onChange={e => setCategory(e.target.value)}>
                {SKILL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ marginBottom:0 }}>
              <label>Seviye</label>
              <select value={level} onChange={e => setLevel(e.target.value)}>
                {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addSkill()}
              placeholder="Beceri adı yazın ve Enter'a basın..." style={{ flex:1 }} />
            <button className="btn-primary" onClick={() => addSkill()} style={{ padding:'10px 16px', flexShrink:0 }}>
              <HiPlus />
            </button>
          </div>
        </div>

        {/* Öneri etiketleri */}
        {SUGGESTED_SKILLS[category] && (
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:11, color:'var(--text2)', marginBottom:8, textTransform:'uppercase', letterSpacing:'.05em' }}>
              Popüler Öneriler
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {SUGGESTED_SKILLS[category]
                .filter(s => !skills.find(sk => sk.name === s))
                .map(s => (
                  <button key={s} onClick={() => { setInput(s); addSkill(s); }}
                    style={{ padding:'4px 10px', fontSize:11, background:'var(--bg3)',
                      border:'1px dashed var(--border)', borderRadius:99, color:'var(--text2)',
                      cursor:'pointer', transition:'all .15s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor='var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}>
                    + {s}
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Beceri listesi */}
        {Object.entries(grouped).map(([cat, catSkills]) => (
          <div key={cat} style={{ marginBottom:16 }}>
            <div style={{ fontSize:12, fontWeight:600, color:'var(--text2)', marginBottom:8, textTransform:'uppercase', letterSpacing:'.05em' }}>
              {cat}
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {catSkills.map(skill => (
                <div key={skill.id} style={{
                  display:'flex', alignItems:'center', gap:6,
                  padding:'6px 12px', borderRadius:99,
                  background:'rgba(108,99,255,.12)', border:'1px solid rgba(108,99,255,.25)',
                  fontSize:13
                }}>
                  <span>{skill.name}</span>
                  <span style={{ fontSize:10, color:'var(--accent)', opacity:.7 }}>· {skill.level}</span>
                  <button onClick={() => remove(skill.id)}
                    style={{ background:'none', border:'none', cursor:'pointer',
                      color:'var(--text2)', display:'flex', alignItems:'center', padding:0 }}>
                    <HiX size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {skills.length === 0 && (
          <div style={{ textAlign:'center', padding:'30px', color:'var(--text2)', fontSize:14 }}>
            Beceri eklemeye başlayın.
          </div>
        )}
      </div>
    </div>
  );
}
