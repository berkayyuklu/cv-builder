export default function ElegantTheme({ data }) {
  const { personalInfo: p = {}, summary, experiences = [], education = [], skills = [], projects = [] } = data;
  const accent = data.customize?.accentColor || '#8e44ad';

  return (
    <div style={{ fontFamily:'Garamond, Georgia, serif', fontSize:10, color:'#2d2d2d', padding:'44px 48px', background:'#faf8f5', minHeight:'100%' }}>
      {/* Dekoratif çizgi */}
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:28 }}>
        <div style={{ height:1, flex:1, background: accent }} />
        <div style={{ width:6, height:6, borderRadius:'50%', background: accent }} />
        <div style={{ height:1, flex:1, background: accent }} />
      </div>

      <div style={{ textAlign:'center', marginBottom:28 }}>
        {p.photoURL && (
          <img src={p.photoURL} alt={p.fullName}
            style={{ width:88, height:88, borderRadius:'50%', objectFit:'cover',
              border:`3px solid ${accent}`, marginBottom:14, display:'block', margin:'0 auto 14px' }} />
        )}
        <h1 style={{ fontFamily:'Garamond, Georgia, serif', fontSize:30, fontWeight:400, letterSpacing:3, color:'#111', margin:0, marginBottom:6 }}>
          {p.fullName?.toUpperCase() || 'AD SOYAD'}
        </h1>
        <div style={{ fontSize:11, color: accent, letterSpacing:2, fontStyle:'italic', marginBottom:14 }}>{p.jobTitle}</div>
        <div style={{ display:'flex', justifyContent:'center', gap:20, flexWrap:'wrap', fontSize:9, color:'#666' }}>
          {p.email && <span>✉ {p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
        </div>
      </div>

      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
        <div style={{ height:1, flex:1, background:'#ddd' }} />
        <div style={{ width:4, height:4, borderRadius:'50%', background:'#ddd' }} />
        <div style={{ height:1, flex:1, background:'#ddd' }} />
      </div>

      {summary && (
        <div style={{ marginBottom:24, textAlign:'center' }}>
          <p style={{ fontSize:10, lineHeight:1.8, color:'#555', fontStyle:'italic', maxWidth:540, margin:'0 auto' }}>{summary}</p>
        </div>
      )}

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32 }}>
        <div>
          {experiences.length > 0 && (
            <div style={{ marginBottom:24 }}>
              <h2 style={{ fontSize:10, fontWeight:400, letterSpacing:3, textTransform:'uppercase', color: accent, marginBottom:14, paddingBottom:6, borderBottom:`1px solid ${accent}40` }}>Deneyim</h2>
              {experiences.map(exp => (
                <div key={exp.id} style={{ marginBottom:14 }}>
                  <div style={{ fontWeight:'bold', fontSize:10.5 }}>{exp.jobTitle}</div>
                  <div style={{ fontSize:9.5, color: accent, fontStyle:'italic', marginBottom:2 }}>{exp.company}</div>
                  <div style={{ fontSize:8.5, color:'#999', marginBottom:4 }}>{exp.startDate} — {exp.current ? 'Hâlâ' : exp.endDate}</div>
                  {exp.description && <p style={{ fontSize:9, color:'#555', lineHeight:1.6, margin:0 }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}
          {projects.length > 0 && (
            <div>
              <h2 style={{ fontSize:10, fontWeight:400, letterSpacing:3, textTransform:'uppercase', color: accent, marginBottom:14, paddingBottom:6, borderBottom:`1px solid ${accent}40` }}>Projeler</h2>
              {projects.map(p => (
                <div key={p.id} style={{ marginBottom:10 }}>
                  <div style={{ fontWeight:'bold', fontSize:10.5 }}>{p.name}</div>
                  {p.technologies && <div style={{ fontSize:9, color: accent, fontStyle:'italic' }}>{p.technologies}</div>}
                  {p.description && <p style={{ fontSize:9, color:'#555', lineHeight:1.5, margin:'4px 0 0' }}>{p.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          {education.length > 0 && (
            <div style={{ marginBottom:24 }}>
              <h2 style={{ fontSize:10, fontWeight:400, letterSpacing:3, textTransform:'uppercase', color: accent, marginBottom:14, paddingBottom:6, borderBottom:`1px solid ${accent}40` }}>Eğitim</h2>
              {education.map(edu => (
                <div key={edu.id} style={{ marginBottom:12 }}>
                  <div style={{ fontWeight:'bold', fontSize:10.5 }}>{edu.school}</div>
                  <div style={{ fontSize:9.5, color: accent, fontStyle:'italic' }}>{edu.degree} — {edu.field}</div>
                  <div style={{ fontSize:8.5, color:'#999' }}>{edu.startDate} — {edu.current ? 'Devam' : edu.endDate}</div>
                </div>
              ))}
            </div>
          )}
          {skills.length > 0 && (
            <div>
              <h2 style={{ fontSize:10, fontWeight:400, letterSpacing:3, textTransform:'uppercase', color: accent, marginBottom:14, paddingBottom:6, borderBottom:`1px solid ${accent}40` }}>Beceriler</h2>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {skills.map(s => (
                  <span key={s.id} style={{ fontSize:9, padding:'3px 10px', border:`1px solid ${accent}40`, borderRadius:99, color:'#444', fontStyle:'italic' }}>{s.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
