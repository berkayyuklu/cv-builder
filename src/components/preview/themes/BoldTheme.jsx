export default function BoldTheme({ data }) {
  const { personalInfo: p = {}, summary, experiences = [], education = [], skills = [], projects = [] } = data;
  const accent = data.customize?.accentColor || '#e74c3c';

  return (
    <div style={{ fontFamily:'Arial, sans-serif', fontSize:10, color:'#222', background:'#fff', minHeight:'100%' }}>
      {/* Bold başlık */}
      <div style={{ background:'#111', padding:'32px 36px', display:'flex', alignItems:'center', gap:20 }}>
        {p.photoURL
          ? <img src={p.photoURL} alt={p.fullName} style={{ width:80, height:80, borderRadius:4, objectFit:'cover', border:`3px solid ${accent}`, flexShrink:0 }} />
          : <div style={{ width:80, height:80, borderRadius:4, background:accent, display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, flexShrink:0 }}>👤</div>
        }
        <div>
          <h1 style={{ fontSize:28, fontWeight:900, color:'#fff', margin:0, letterSpacing:-.5 }}>{p.fullName || 'AD SOYAD'}</h1>
          <div style={{ fontSize:13, color: accent, fontWeight:700, marginTop:4 }}>{p.jobTitle}</div>
          <div style={{ display:'flex', gap:12, marginTop:8, flexWrap:'wrap' }}>
            {[p.email, p.phone, p.location].filter(Boolean).map(v => (
              <span key={v} style={{ fontSize:9, color:'rgba(255,255,255,.6)' }}>{v}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display:'flex' }}>
        <div style={{ flex:1, padding:'28px 32px' }}>
          {summary && (
            <div style={{ marginBottom:20, padding:14, background:`${accent}10`, borderLeft:`4px solid ${accent}`, borderRadius:'0 4px 4px 0' }}>
              <p style={{ fontSize:9.5, lineHeight:1.6, color:'#333', margin:0 }}>{summary}</p>
            </div>
          )}

          {experiences.length > 0 && (
            <div style={{ marginBottom:20 }}>
              <h2 style={{ fontSize:13, fontWeight:900, color:'#111', marginBottom:12, display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ width:24, height:3, background: accent, display:'inline-block' }} />
                DENEYİM
              </h2>
              {experiences.map(exp => (
                <div key={exp.id} style={{ marginBottom:14, paddingBottom:12, borderBottom:'1px solid #f0f0f0' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                    <div>
                      <div style={{ fontWeight:'bold', fontSize:11, color:'#111' }}>{exp.jobTitle}</div>
                      <div style={{ fontSize:10, color: accent, fontWeight:700 }}>{exp.company}</div>
                    </div>
                    <div style={{ fontSize:9, color:'#999', background:'#f5f5f5', padding:'2px 8px', borderRadius:2 }}>
                      {exp.startDate} — {exp.current ? 'Hâlâ' : exp.endDate}
                    </div>
                  </div>
                  {exp.description && <p style={{ fontSize:9, color:'#555', lineHeight:1.5, margin:'6px 0 0' }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <h2 style={{ fontSize:13, fontWeight:900, color:'#111', marginBottom:12, display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ width:24, height:3, background: accent, display:'inline-block' }} />
                PROJELER
              </h2>
              {projects.map(p => (
                <div key={p.id} style={{ marginBottom:10 }}>
                  <div style={{ fontWeight:'bold', fontSize:10 }}>{p.name}</div>
                  {p.technologies && <div style={{ fontSize:9, color: accent }}>{p.technologies}</div>}
                  {p.description && <p style={{ fontSize:9, color:'#555', margin:'3px 0 0', lineHeight:1.5 }}>{p.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ width:180, background:'#f7f7f7', padding:'28px 18px', borderLeft:'1px solid #eee', flexShrink:0 }}>
          {education.length > 0 && (
            <div style={{ marginBottom:20 }}>
              <h2 style={{ fontSize:11, fontWeight:900, color:'#111', marginBottom:10 }}>EĞİTİM</h2>
              {education.map(edu => (
                <div key={edu.id} style={{ marginBottom:10 }}>
                  <div style={{ fontWeight:'bold', fontSize:9 }}>{edu.school}</div>
                  <div style={{ fontSize:8.5, color: accent }}>{edu.degree}</div>
                  <div style={{ fontSize:8, color:'#888' }}>{edu.endDate}</div>
                </div>
              ))}
            </div>
          )}
          {skills.length > 0 && (
            <div>
              <h2 style={{ fontSize:11, fontWeight:900, color:'#111', marginBottom:10 }}>BECERİLER</h2>
              {skills.map(s => (
                <div key={s.id} style={{ marginBottom:5 }}>
                  <div style={{ fontSize:9, fontWeight:'bold', marginBottom:2 }}>{s.name}</div>
                  <div style={{ height:4, background:'#e0e0e0', borderRadius:2, overflow:'hidden' }}>
                    <div style={{ height:'100%', background: accent, width: s.level === 'Uzman' ? '95%' : s.level === 'İleri' ? '80%' : s.level === 'Orta' ? '60%' : '35%', borderRadius:2 }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
