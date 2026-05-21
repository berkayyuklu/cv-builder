export default function ClassicTheme({ data }) {
  const { personalInfo: p = {}, summary, experiences = [], education = [], skills = [], projects = [] } = data;
  const accent = data.customize?.accentColor || '#2c3e50';

  return (
    <div style={{ fontFamily:'Georgia, serif', fontSize:10, color:'#2c3e50', padding:'36px 40px', background:'#f8f6f0', minHeight:'100%' }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:24, marginBottom:24, paddingBottom:20, borderBottom:`2px solid ${accent}` }}>
        {p.photoURL
          ? <img src={p.photoURL} alt={p.fullName} style={{ width:88, height:88, borderRadius:4, objectFit:'cover', border:`2px solid ${accent}`, flexShrink:0 }} />
          : null
        }
        <div style={{ flex:1 }}>
          <h1 style={{ fontFamily:'Georgia, serif', fontSize:28, fontWeight:'bold', color: accent, margin:0, marginBottom:4 }}>{p.fullName || 'Ad Soyad'}</h1>
          <div style={{ fontSize:12, color:'#666', fontStyle:'italic', marginBottom:8 }}>{p.jobTitle}</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'8px 16px', fontSize:9, color:'#555' }}>
            {p.email && <span>✉ {p.email}</span>}
            {p.phone && <span>📞 {p.phone}</span>}
            {p.location && <span>📍 {p.location}</span>}
            {p.linkedin && <span>in {p.linkedin}</span>}
          </div>
        </div>
      </div>

      {summary && (
        <div style={{ marginBottom:20 }}>
          <h2 style={{ fontFamily:'Georgia, serif', fontSize:12, fontWeight:'bold', color: accent, textTransform:'uppercase', letterSpacing:1, marginBottom:8 }}>Profesyonel Özet</h2>
          <p style={{ fontSize:9.5, lineHeight:1.6, color:'#444' }}>{summary}</p>
        </div>
      )}

      {experiences.length > 0 && (
        <div style={{ marginBottom:20 }}>
          <h2 style={{ fontFamily:'Georgia, serif', fontSize:12, fontWeight:'bold', color: accent, textTransform:'uppercase', letterSpacing:1, marginBottom:12, paddingBottom:4, borderBottom:`1px solid ${accent}50` }}>İş Deneyimi</h2>
          {experiences.map(exp => (
            <div key={exp.id} style={{ marginBottom:12 }}>
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <div><strong style={{ fontSize:11 }}>{exp.jobTitle}</strong> · <span style={{ color: accent, fontSize:10 }}>{exp.company}</span></div>
                <div style={{ fontSize:9, color:'#888' }}>{exp.startDate} — {exp.current ? 'Hâlâ' : exp.endDate}</div>
              </div>
              {exp.location && <div style={{ fontSize:9, color:'#888', marginBottom:3 }}>{exp.location}</div>}
              {exp.description && <p style={{ fontSize:9, color:'#444', lineHeight:1.5, margin:'4px 0 0' }}>{exp.description}</p>}
              {exp.achievements && <p style={{ fontSize:9, color:'#444', lineHeight:1.5, margin:'2px 0 0' }}>{exp.achievements}</p>}
            </div>
          ))}
        </div>
      )}

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
        {education.length > 0 && (
          <div>
            <h2 style={{ fontFamily:'Georgia, serif', fontSize:12, fontWeight:'bold', color: accent, textTransform:'uppercase', letterSpacing:1, marginBottom:10, paddingBottom:4, borderBottom:`1px solid ${accent}50` }}>Eğitim</h2>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom:10 }}>
                <div style={{ fontWeight:'bold', fontSize:10 }}>{edu.school}</div>
                <div style={{ fontSize:9, color: accent }}>{edu.degree} — {edu.field}</div>
                <div style={{ fontSize:9, color:'#888' }}>{edu.startDate} — {edu.current ? 'Devam' : edu.endDate}</div>
              </div>
            ))}
          </div>
        )}
        {skills.length > 0 && (
          <div>
            <h2 style={{ fontFamily:'Georgia, serif', fontSize:12, fontWeight:'bold', color: accent, textTransform:'uppercase', letterSpacing:1, marginBottom:10, paddingBottom:4, borderBottom:`1px solid ${accent}50` }}>Beceriler</h2>
            <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
              {skills.map(s => (
                <span key={s.id} style={{ padding:'2px 7px', fontSize:8.5, background:`${accent}12`, border:`1px solid ${accent}30`, borderRadius:2, color: accent }}>
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
