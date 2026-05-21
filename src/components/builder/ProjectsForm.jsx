import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { HiPlus, HiTrash, HiChevronDown, HiChevronUp } from 'react-icons/hi';

const emptyProject = () => ({
  id: uuidv4(), name:'', description:'', technologies:'', url:'', github:'', startDate:'', endDate:''
});

export default function ProjectsForm({ data, onChange }) {
  const projects = data.projects || [];
  const [expanded, setExpanded] = useState(null);

  const add = () => {
    const np = emptyProject();
    onChange('projects', [...projects, np]);
    setExpanded(np.id);
  };

  const remove = (id) => onChange('projects', projects.filter(p => p.id !== id));
  const update = (id, field, val) =>
    onChange('projects', projects.map(p => p.id === id ? { ...p, [field]: val } : p));

  return (
    <div className="fade-in">
      <div className="section-card">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <h2 className="section-title" style={{ marginBottom:0 }}>🚀 Projeler</h2>
          <button className="btn-primary" onClick={add} style={{ padding:'8px 16px', fontSize:13 }}>
            <HiPlus /> Ekle
          </button>
        </div>

        {projects.length === 0 && (
          <div style={{ textAlign:'center', padding:'40px', color:'var(--text2)', fontSize:14 }}>
            <div style={{ fontSize:36, marginBottom:12 }}>🚀</div>
            <div>Henüz proje eklenmedi.</div>
          </div>
        )}

        {projects.map((p, i) => (
          <div key={p.id} style={{ background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:'var(--radius)', marginBottom:12, overflow:'hidden' }}>
            <div style={{ padding:'14px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer' }}
              onClick={() => setExpanded(expanded === p.id ? null : p.id)}>
              <div>
                <div style={{ fontWeight:600, fontSize:14 }}>{p.name || `Proje ${i+1}`}</div>
                {p.technologies && <div style={{ color:'var(--text2)', fontSize:12 }}>{p.technologies}</div>}
              </div>
              <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                <button className="btn-danger" style={{ padding:'4px 8px' }} onClick={e => { e.stopPropagation(); remove(p.id); }}>
                  <HiTrash size={12} />
                </button>
                {expanded === p.id ? <HiChevronUp /> : <HiChevronDown />}
              </div>
            </div>

            {expanded === p.id && (
              <div style={{ padding:'0 16px 16px', borderTop:'1px solid var(--border)' }}>
                <div style={{ marginTop:16 }}>
                  <div className="form-group">
                    <label>Proje Adı *</label>
                    <input value={p.name} onChange={e => update(p.id, 'name', e.target.value)} placeholder="E-Ticaret Uygulaması" />
                  </div>
                  <div className="form-group">
                    <label>Açıklama</label>
                    <textarea value={p.description} onChange={e => update(p.id, 'description', e.target.value)}
                      placeholder="Projenin amacı, çözdüğü problem ve etkileri nedir?" rows={3} />
                  </div>
                  <div className="form-group">
                    <label>Kullanılan Teknolojiler</label>
                    <input value={p.technologies} onChange={e => update(p.id, 'technologies', e.target.value)}
                      placeholder="React, Node.js, MongoDB, AWS" />
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label>Canlı Link</label>
                      <input value={p.url} onChange={e => update(p.id, 'url', e.target.value)} placeholder="https://..." />
                    </div>
                    <div className="form-group">
                      <label>GitHub</label>
                      <input value={p.github} onChange={e => update(p.id, 'github', e.target.value)} placeholder="github.com/..." />
                    </div>
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label>Başlangıç</label>
                      <input type="month" value={p.startDate} onChange={e => update(p.id, 'startDate', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Bitiş</label>
                      <input type="month" value={p.endDate} onChange={e => update(p.id, 'endDate', e.target.value)} />
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
