const getAccent = (data) => data.customize?.accentColor || '#6c63ff';

export default function ModernTheme({ data }) {
  const { personalInfo: p = {}, summary, experiences = [], education = [], skills = [], projects = [] } = data;
  const accent = getAccent(data);
  const layout = data.customize?.layout || 'two-column';

  const styles = {
    page:        { fontFamily:'Arial, sans-serif', fontSize:10, color:'#222', display:'flex', minHeight:'100%' },
    sidebar:     { width:220, background:accent, color:'#fff', padding:'28px 20px', flexShrink:0 },
    main:        { flex:1, padding:'28px 24px', background:'#fff' },
    photo:       { width:90, height:90, borderRadius:'50%', objectFit:'cover', border:'3px solid rgba(255,255,255,.3)', marginBottom:16, display:'block', marginLeft:'auto', marginRight:'auto' },
    photoPlaceholder: { width:90, height:90, borderRadius:'50%', background:'rgba(255,255,255,.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:36, marginBottom:16, marginLeft:'auto', marginRight:'auto' },
    name:        { fontFamily:'Georgia, serif', fontSize:22, fontWeight:'bold', color:'#fff', textAlign:'center', marginBottom:2, lineHeight:1.2 },
    jobTitle:    { fontSize:10, color:'rgba(255,255,255,.8)', textAlign:'center', marginBottom:20, fontStyle:'italic' },
    sideSection: { marginBottom:20 },
    sideTitle:   { fontSize:9, fontWeight:'bold', letterSpacing:1.5, textTransform:'uppercase', color:'rgba(255,255,255,.6)', marginBottom:10, borderBottom:'1px solid rgba(255,255,255,.2)', paddingBottom:4 },
    contactItem: { fontSize:9, color:'rgba(255,255,255,.9)', marginBottom:5, display:'flex', alignItems:'flex-start', gap:5, lineHeight:1.4 },
    sectionTitle:{ fontSize:13, fontWeight:'bold', color: accent, marginBottom:10, paddingBottom:4, borderBottom:`2px solid ${accent}`, textTransform:'uppercase', letterSpacing:.5 },
    expBlock:    { marginBottom:14 },
    expTitle:    { fontWeight:'bold', fontSize:11 },
    expCompany:  { color: accent, fontSize:10, marginBottom:2 },
    expDate:     { fontSize:9, color:'#888', marginBottom:4 },
    expDesc:     { fontSize:9, color:'#444', lineHeight:1.5 },
    skillTag:    { display:'inline-block', background:`${accent}18`, color: accent, border:`1px solid ${accent}40`, padding:'2px 8px', borderRadius:99, fontSize:8, marginRight:5, marginBottom:5 },
  };

  if (layout === 'single-column') {
    return (
      <div style={{ ...styles.page, flexDirection:'column' }}>
        {/* Tek sütun header */}
        <div style={{ background: accent, padding:'28px 32px', display:'flex', alignItems:'center', gap:24 }}>
          {p.photoURL
            ? <img src={p.photoURL} alt={p.fullName} style={{ width:80, height:80, borderRadius:'50%', objectFit:'cover', border:'3px solid rgba(255,255,255,.3)', flexShrink:0 }} />
            : <div style={{ width:80, height:80, borderRadius:'50%', background:'rgba(255,255,255,.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:30, flexShrink:0 }}>👤</div>
          }
          <div>
            <div style={{ fontFamily:'Georgia, serif', fontSize:26, fontWeight:'bold', color:'#fff' }}>{p.fullName || 'Ad Soyad'}</div>
            <div style={{ fontSize:12, color:'rgba(255,255,255,.8)', fontStyle:'italic', marginBottom:8 }}>{p.jobTitle || 'Pozisyon'}</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:12, fontSize:9, color:'rgba(255,255,255,.8)' }}>
              {p.email && <span>✉ {p.email}</span>}
              {p.phone && <span>📞 {p.phone}</span>}
              {p.location && <span>📍 {p.location}</span>}
            </div>
          </div>
        </div>
        <div style={{ padding:'24px 32px' }}>
          {summary && (
            <div style={{ marginBottom:20 }}>
              <div style={styles.sectionTitle}>Profesyonel Özet</div>
              <p style={{ fontSize:10, color:'#444', lineHeight:1.6 }}>{summary}</p>
            </div>
          )}
          {/* ... deneyim, eğitim, beceriler */}
          <ExperienceSection experiences={experiences} styles={styles} accent={accent} />
          <EducationSection education={education} styles={styles} accent={accent} />
          <SkillsSection skills={skills} styles={styles} />
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Sol sidebar */}
      <div style={styles.sidebar}>
        {p.photoURL
          ? <img src={p.photoURL} alt={p.fullName} style={styles.photo} />
          : <div style={styles.photoPlaceholder}>👤</div>
        }
        <div style={styles.name}>{p.fullName || 'Ad Soyad'}</div>
        <div style={styles.jobTitle}>{p.jobTitle || 'Pozisyon'}</div>

        <div style={styles.sideSection}>
          <div style={styles.sideTitle}>İletişim</div>
          {p.email    && <div style={styles.contactItem}><span>✉</span><span>{p.email}</span></div>}
          {p.phone    && <div style={styles.contactItem}><span>📞</span><span>{p.phone}</span></div>}
          {p.location && <div style={styles.contactItem}><span>📍</span><span>{p.location}</span></div>}
          {p.linkedin && <div style={styles.contactItem}><span>in</span><span>{p.linkedin}</span></div>}
          {p.github   && <div style={styles.contactItem}><span>⌥</span><span>{p.github}</span></div>}
          {p.website  && <div style={styles.contactItem}><span>🌐</span><span>{p.website}</span></div>}
        </div>

        {p.birthDate && (
          <div style={styles.sideSection}>
            <div style={styles.sideTitle}>Kişisel</div>
            {p.birthDate && <div style={styles.contactItem}><span>📅</span><span>{p.birthDate}</span></div>}
            {p.nationality && <div style={styles.contactItem}><span>🏳</span><span>{p.nationality}</span></div>}
            {p.drivingLicense && <div style={styles.contactItem}><span>🚗</span><span>Ehliyet: {p.drivingLicense}</span></div>}
          </div>
        )}

        {skills.filter(s => s.category === 'Diller').length > 0 && (
          <div style={styles.sideSection}>
            <div style={styles.sideTitle}>Diller</div>
            {skills.filter(s => s.category === 'Diller').map(s => (
              <div key={s.id} style={styles.contactItem}>
                <span>•</span><span>{s.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ana içerik */}
      <div style={styles.main}>
        {summary && (
          <div style={{ marginBottom:18 }}>
            <div style={styles.sectionTitle}>Hakkımda</div>
            <p style={{ fontSize:9.5, color:'#444', lineHeight:1.6, margin:0 }}>{summary}</p>
          </div>
        )}

        <ExperienceSection experiences={experiences} styles={styles} accent={accent} />
        <EducationSection education={education} styles={styles} accent={accent} />
        <SkillsSection skills={skills} styles={styles} />
        <ProjectsSection projects={projects} styles={styles} accent={accent} />
      </div>
    </div>
  );
}

function ExperienceSection({ experiences, styles, accent }) {
  if (!experiences.length) return null;
  return (
    <div style={{ marginBottom:18 }}>
      <div style={styles.sectionTitle}>İş Deneyimi</div>
      {experiences.map(exp => (
        <div key={exp.id} style={styles.expBlock}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <div style={styles.expTitle}>{exp.jobTitle}</div>
              <div style={styles.expCompany}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</div>
            </div>
            <div style={styles.expDate}>
              {exp.startDate} — {exp.current ? 'Hâlâ' : exp.endDate}
            </div>
          </div>
          {exp.description && <p style={styles.expDesc}>{exp.description}</p>}
          {exp.achievements && <p style={{ ...styles.expDesc, marginTop:3 }}>{exp.achievements}</p>}
        </div>
      ))}
    </div>
  );
}

function EducationSection({ education, styles, accent }) {
  if (!education.length) return null;
  return (
    <div style={{ marginBottom:18 }}>
      <div style={styles.sectionTitle}>Eğitim</div>
      {education.map(edu => (
        <div key={edu.id} style={{ ...styles.expBlock }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <div style={styles.expTitle}>{edu.school}</div>
              <div style={styles.expCompany}>{edu.degree} — {edu.field}</div>
              {edu.gpa && <div style={{ fontSize:9, color:'#666' }}>Not: {edu.gpa}</div>}
            </div>
            <div style={styles.expDate}>{edu.startDate} — {edu.current ? 'Devam' : edu.endDate}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillsSection({ skills, styles }) {
  const techSkills = skills.filter(s => s.category !== 'Diller');
  if (!techSkills.length) return null;
  const grouped = techSkills.reduce((acc, s) => { (acc[s.category] = acc[s.category] || []).push(s); return acc; }, {});
  return (
    <div style={{ marginBottom:18 }}>
      <div style={styles.sectionTitle}>Beceriler</div>
      {Object.entries(grouped).map(([cat, catSkills]) => (
        <div key={cat} style={{ marginBottom:8 }}>
          <div style={{ fontSize:8.5, fontWeight:'bold', color:'#666', marginBottom:4 }}>{cat}</div>
          <div>{catSkills.map(s => <span key={s.id} style={styles.skillTag}>{s.name}</span>)}</div>
        </div>
      ))}
    </div>
  );
}

function ProjectsSection({ projects, styles, accent }) {
  if (!projects.length) return null;
  return (
    <div>
      <div style={styles.sectionTitle}>Projeler</div>
      {projects.map(p => (
        <div key={p.id} style={{ ...styles.expBlock }}>
          <div style={styles.expTitle}>{p.name}</div>
          {p.technologies && <div style={{ ...styles.expCompany, marginBottom:3 }}>{p.technologies}</div>}
          {p.description && <p style={styles.expDesc}>{p.description}</p>}
          {(p.url || p.github) && (
            <div style={{ fontSize:8.5, color: accent }}>
              {p.url && <span>🔗 {p.url} </span>}
              {p.github && <span>⌥ {p.github}</span>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
