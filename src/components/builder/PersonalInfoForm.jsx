import { useRef } from 'react';
import { uploadProfilePhoto } from '../../firebase/firestore';
import { HiCamera, HiX } from 'react-icons/hi';

export default function PersonalInfoForm({ data, onChange, userId }) {
  const info = data.personalInfo || {};
  const fileRef = useRef();

  const update = (field, val) => onChange('personalInfo', { ...info, [field]: val });

  const handlePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await uploadProfilePhoto(userId, file);
      update('photoURL', url);
    } catch(err) {
      alert('Fotoğraf yüklenirken hata oluştu.');
    }
  };

  return (
    <div className="fade-in">
      <div className="section-card">
        <h2 className="section-title">👤 Kişisel Bilgiler</h2>

        {/* Fotoğraf */}
        <div style={{ display:'flex', alignItems:'center', gap:20, marginBottom:28,
          padding:20, background:'var(--bg3)', borderRadius:'var(--radius)', border:'1px dashed var(--border)' }}>
          <div style={{ position:'relative', flexShrink:0 }}>
            {info.photoURL ? (
              <img src={info.photoURL} alt="Profil" style={{ width:80, height:80, borderRadius:'50%', objectFit:'cover' }} />
            ) : (
              <div style={{ width:80, height:80, borderRadius:'50%', background:'var(--border)',
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:30 }}>
                👤
              </div>
            )}
            <button onClick={() => fileRef.current.click()}
              style={{ position:'absolute', bottom:0, right:0, width:26, height:26,
                background:'var(--accent)', border:'2px solid var(--bg3)',
                borderRadius:'50%', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <HiCamera size={12} color="#fff" />
            </button>
          </div>
          <div>
            <div style={{ fontWeight:600, marginBottom:4, fontSize:14 }}>Profil Fotoğrafı</div>
            <div style={{ color:'var(--text2)', fontSize:12, marginBottom:8 }}>
              JPG, PNG, max 5MB. Yuvarlak kırpılır.
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button className="btn-secondary" style={{ padding:'6px 12px', fontSize:12 }}
                onClick={() => fileRef.current.click()}>
                Fotoğraf Seç
              </button>
              {info.photoURL && (
                <button className="btn-danger" style={{ padding:'6px 12px', fontSize:12 }}
                  onClick={() => update('photoURL', '')}>
                  <HiX size={12} /> Kaldır
                </button>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={handlePhoto} />
          </div>
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label>Ad Soyad *</label>
            <input value={info.fullName || ''} onChange={e => update('fullName', e.target.value)}
              placeholder="Ahmet Yılmaz" />
          </div>
          <div className="form-group">
            <label>Unvan / Pozisyon *</label>
            <input value={info.jobTitle || ''} onChange={e => update('jobTitle', e.target.value)}
              placeholder="Senior Frontend Developer" />
          </div>
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label>E-posta *</label>
            <input type="email" value={info.email || ''} onChange={e => update('email', e.target.value)}
              placeholder="ornek@email.com" />
          </div>
          <div className="form-group">
            <label>Telefon</label>
            <input value={info.phone || ''} onChange={e => update('phone', e.target.value)}
              placeholder="+90 555 000 00 00" />
          </div>
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label>Şehir / Konum</label>
            <input value={info.location || ''} onChange={e => update('location', e.target.value)}
              placeholder="İstanbul, Türkiye" />
          </div>
          <div className="form-group">
            <label>LinkedIn</label>
            <input value={info.linkedin || ''} onChange={e => update('linkedin', e.target.value)}
              placeholder="linkedin.com/in/kullanici" />
          </div>
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label>GitHub</label>
            <input value={info.github || ''} onChange={e => update('github', e.target.value)}
              placeholder="github.com/kullanici" />
          </div>
          <div className="form-group">
            <label>Kişisel Website</label>
            <input value={info.website || ''} onChange={e => update('website', e.target.value)}
              placeholder="www.siteniz.com" />
          </div>
        </div>

        {/* Doğum tarihi ve milliyet */}
        <div className="grid-2">
          <div className="form-group">
            <label>Doğum Tarihi</label>
            <input type="date" value={info.birthDate || ''} onChange={e => update('birthDate', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Milliyet</label>
            <input value={info.nationality || ''} onChange={e => update('nationality', e.target.value)}
              placeholder="T.C. Vatandaşı" />
          </div>
        </div>

        {/* Ehliyet ve askerlik */}
        <div className="grid-2">
          <div className="form-group">
            <label>Ehliyet</label>
            <select value={info.drivingLicense || ''} onChange={e => update('drivingLicense', e.target.value)}>
              <option value="">Seçiniz</option>
              <option value="A">A Sınıfı</option>
              <option value="B">B Sınıfı</option>
              <option value="AB">A+B Sınıfı</option>
              <option value="none">Yok</option>
            </select>
          </div>
          <div className="form-group">
            <label>Askerlik Durumu</label>
            <select value={info.militaryStatus || ''} onChange={e => update('militaryStatus', e.target.value)}>
              <option value="">Seçiniz</option>
              <option value="done">Tamamlandı</option>
              <option value="exempt">Muaf</option>
              <option value="deferred">Tecilli</option>
              <option value="not_applicable">Uygulanmaz</option>
            </select>
          </div>
        </div>
      </div>

      {/* Profesyonel ipucu */}
      <div style={{ padding:16, borderRadius:'var(--radius)',
        background:'rgba(108,99,255,.08)', border:'1px solid rgba(108,99,255,.2)' }}>
        <div style={{ fontSize:13, color:'var(--accent)', fontWeight:600, marginBottom:4 }}>💡 Pro İpucu</div>
        <div style={{ fontSize:12, color:'var(--text2)', lineHeight:1.6 }}>
          Profesyonel bir fotoğraf CV'nin görsel etkisini %40 artırır. Sade arka planlı, güncel ve resmi bir fotoğraf seçin.
        </div>
      </div>
    </div>
  );
}
