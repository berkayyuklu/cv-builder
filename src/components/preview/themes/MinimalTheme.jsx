export default function MinimalTheme({ data }) {
  const { personalInfo: p = {}, summary, experiences = [], education = [], skills = [], projects = [] } = data;
  const accent = data.customize?.accentColor || '#111';

  return (
    <div style={{ fontFamily:'Helvetica Neue, Arial, sans-serif', fontSize:10, color:'#111', padding:'48px 52px', background:'#fff', minHeight:'100%' }}>
      <div style={{ marginBottom:32 }}>
        <h1 style={{ fontSize:32, fontWeight:300, letterSpacing:2, color:'#111', margin:0, marginBottom:4 }}>
          {p.fullName?.toUpperCase() || 'AD SOYAD'}
        </h1>
        <div style={{ fontSize:11, color:'#666', letterSpacing:1, marginBottom:12 }}>{p.jobTitle}</div>
        {p.photoURL && <img src={p.photoURL} alt={p.fullName} style={{ width:60, height:60, borderRadius:2, objectFit:'cover', marginBottom:12 }} />}
        <div style={{ display:'flex', gap:16, fontSize:9, color:'#888', flexWrap:'wrap' }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}
        </div>
      </div>

      <div style={{ height:1, background:'#e0e0e0', marginBottom:28 }} />

      {summary && (
        <div style={{ marginBottom:24 }}>
          <p style={{ fontSize:10, lineHeight:1.7, color:'#333', maxWidth:560 }}>{summary}</p>
        </div>
      )}

      {experiences.map(exp => (
        <div key={exp.id} style={{ display:'flex', gap:20, marginBottom:16 }}>
          <div style={{ width:100, flexShrink:0, fontSize:8.5, color:'#999', paddingTop:1.5, textAlign:'right' }}>
            {exp.startDate}<br/>{exp.current ? 'Hâlâ' : exp.endDate}
          </div>
          <div style={{ flex:1, paddingLeft:16, borderLeft:'1px solid #e0e0e0' }}>
            <div style={{ fontWeight:'bold', fontSize:11 }}>{exp.jobTitle}</div>
            <div style={{ fontSize:9.5, color:'#666', marginBottom:4 }}>{exp.company}</div>
            {exp.description && <p style={{ fontSize:9, color:'#555', lineHeight:1.5, margin:0 }}>{exp.description}</p>}
          </div>
        </div>
      ))}

      {education.map(edu => (
        <div key={edu.id} style={{ display:'flex', gap:20, marginBottom:12 }}>
          <div style={{ width:100, flexShrink:0, fontSize:8.5, color:'#999', textAlign:'right' }}>
            {edu.startDate}<br/>{edu.current ? 'Devam' : edu.endDate}
          </div>
          <div style={{ flex:1, paddingLeft:16, borderLeft:'1px solid #e0e0e0' }}>
            <div style={{ fontWeight:'bold', fontSize:11 }}>{edu.school}</div>
            <div style={{ fontSize:9.5, color:'#666' }}>{edu.degree} — {edu.field}</div>
          </div>
        </div>
      ))}

      {skills.length > 0 && (
        <div style={{ marginTop:20 }}>
          <div style={{ height:1, background:'#e0e0e0', marginBottom:16 }} />
          <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
            {skills.map(s => <span key={s.id} style={{ fontSize:9, color:'#444', padding:'2px 6px', border:'1px solid #ddd', borderRadius:1 }}>{s.name}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}
