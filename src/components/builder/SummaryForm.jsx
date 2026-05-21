export default function SummaryForm({ data, onChange }) {
  const summary = data.summary || '';

  const templates = [
    {
      label: 'Yazılım Geliştirici',
      text: '5+ yıl deneyimli, kullanıcı odaklı çözümler geliştiren yazılım geliştirici. React, Node.js ve cloud teknolojilerinde uzman. Çevik metodolojilere adapte, ekip çalışmasına yatkın.'
    },
    {
      label: 'Pazarlama Uzmanı',
      text: 'Dijital pazarlama stratejileri ve marka yönetimi konusunda deneyimli. SEO, SEM ve içerik pazarlamasında kanıtlanmış başarı geçmişi. Veri odaklı kararlarla büyüme hedeflerini aşma konusunda uzman.'
    },
    {
      label: 'Proje Yöneticisi',
      text: 'PMP sertifikalı, 8+ yıl deneyimli proje yöneticisi. Çok disiplinli ekipleri yöneterek bütçe ve zaman kısıtları içinde başarılı sonuçlar elde etme konusunda kanıtlanmış yetkinlik.'
    },
    {
      label: 'Yeni Mezun',
      text: 'Bilgisayar mühendisliği mezunu, teknolojiye tutkulu ve öğrenmeye açık genç profesyonel. Akademik projelerde [teknoloji] deneyimi, takım çalışması ve problem çözme becerisi.'
    }
  ];

  return (
    <div className="fade-in">
      <div className="section-card">
        <h2 className="section-title">📝 Profesyonel Özet</h2>
        <p style={{ color:'var(--text2)', fontSize:13, marginBottom:20, lineHeight:1.6 }}>
          3-5 cümlelik güçlü bir özet, işverenin dikkatini anında çeker. Kim olduğunuzu, ne yaptığınızı ve ne sunabileceğinizi net ifade edin.
        </p>

        <div className="form-group">
          <label>Özet (3-5 cümle önerilir)</label>
          <textarea
            value={summary}
            onChange={e => onChange('summary', e.target.value)}
            placeholder="Sektörünüzde ne kadar deneyiminiz var? Hangi teknoloji veya konularda uzmanlaştınız? Ne tür bir pozisyon arıyorsunuz ve ne sunabilirsiniz?"
            rows={5}
            style={{ resize:'vertical' }}
          />
          <div style={{ display:'flex', justifyContent:'flex-end', marginTop:4 }}>
            <span style={{ fontSize:11, color: summary.length > 500 ? 'var(--accent2)' : 'var(--text2)' }}>
              {summary.length}/500
            </span>
          </div>
        </div>

        <div>
          <div style={{ fontSize:12, fontWeight:600, color:'var(--text2)', marginBottom:10, textTransform:'uppercase', letterSpacing:'.05em' }}>
            Hazır Şablonlar
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
            {templates.map(t => (
              <button key={t.label}
                onClick={() => onChange('summary', t.text)}
                style={{
                  padding:'10px 12px', borderRadius:'var(--radius)',
                  background:'var(--bg3)', border:'1px solid var(--border)',
                  color:'var(--text)', cursor:'pointer', textAlign:'left',
                  fontSize:12, transition:'all .15s', lineHeight:1.4
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor='var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}
              >
                <div style={{ fontWeight:600, marginBottom:2 }}>{t.label}</div>
                <div style={{ color:'var(--text2)', fontSize:11 }}>{t.text.slice(0,50)}...</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding:16, borderRadius:'var(--radius)',
        background:'rgba(67,233,123,.08)', border:'1px solid rgba(67,233,123,.2)' }}>
        <div style={{ fontSize:13, color:'var(--accent3)', fontWeight:600, marginBottom:4 }}>✅ Etkili Özet İçin</div>
        <ul style={{ fontSize:12, color:'var(--text2)', lineHeight:1.8, paddingLeft:16 }}>
          <li>Deneyim yılınızı belirtin</li>
          <li>Uzmanlık alanlarınıza değinin</li>
          <li>Ölçülebilir başarılardan bahsedin</li>
          <li>"Ben" ile başlamayın, doğrudan konuya girin</li>
        </ul>
      </div>
    </div>
  );
}
