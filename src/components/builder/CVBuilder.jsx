import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../auth/AuthProvider';
import { saveCV, getCVById } from '../../firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import CVPreview from '../preview/CVPreview';
import PersonalInfoForm from './PersonalInfoForm';
import SummaryForm from './SummaryForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';
import CustomizationPanel from './CustomizationPanel';
import Navbar from '../shared/Navbar';
import { defaultCVData } from '../../utils/cvDefaults';
import { downloadPDF } from '../../utils/pdfExport';
import {
  HiUser, HiDocumentText, HiBriefcase, HiAcademicCap,
  HiLightningBolt, HiCode, HiColorSwatch, HiDownload,
  HiSave, HiEye, HiChevronLeft, HiChevronRight
} from 'react-icons/hi';

const STEPS = [
  { id:'personal',      label:'Kişisel Bilgiler', icon: HiUser },
  { id:'summary',       label:'Özet',             icon: HiDocumentText },
  { id:'experience',    label:'Deneyim',          icon: HiBriefcase },
  { id:'education',     label:'Eğitim',           icon: HiAcademicCap },
  { id:'skills',        label:'Beceriler',        icon: HiLightningBolt },
  { id:'projects',      label:'Projeler',         icon: HiCode },
  { id:'customize',     label:'Özelleştir',       icon: HiColorSwatch },
];

export default function CVBuilder() {
  const { id: cvId }  = useParams();
  const { user }      = useAuth();
  const navigate      = useNavigate();
  const [cvData, setCVData]         = useState(defaultCVData);
  const [activeStep, setActiveStep] = useState(0);
  const [saving, setSaving]         = useState(false);
  const [saved, setSaved]           = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [previewRef]                = useState({ current: null });
  const autoSaveTimer = useRef(null);

  // CV'yi yükle
  useEffect(() => {
    if (!user || !cvId) return;
    getCVById(user.uid, cvId).then(data => {
      if (data) setCVData(data);
      else setCVData({ ...defaultCVData, id: cvId });
    });
  }, [user, cvId]);

  // Otomatik kayıt (3 saniye sonra)
  useEffect(() => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => handleSave(true), 3000);
    return () => clearTimeout(autoSaveTimer.current);
  }, [cvData]);

  const handleSave = async (silent = false) => {
    if (!user || !cvId) return;
    if (!silent) setSaving(true);
    try {
      await saveCV(user.uid, cvId, { ...cvData, id: cvId });
      if (!silent) { setSaved(true); setTimeout(() => setSaved(false), 2000); }
    } catch (e) { console.error(e); }
    if (!silent) setSaving(false);
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadPDF('cv-preview-container', cvData.personalInfo?.fullName || 'CV');
    } catch (e) { alert('PDF oluşturulurken hata oluştu.'); }
    setDownloading(false);
  };

  const updateSection = useCallback((section, value) => {
    setCVData(prev => ({ ...prev, [section]: value }));
  }, []);

  const step = STEPS[activeStep];

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column' }}>
      <Navbar />

      {/* Top bar */}
      <div className="glass" style={{
        position:'sticky', top:64, zIndex:90,
        borderTop:'none', borderLeft:'none', borderRight:'none',
        padding:'12px 24px', display:'flex', alignItems:'center',
        justifyContent:'space-between', gap:12, flexWrap:'wrap'
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <button onClick={() => navigate('/dashboard')} className="btn-secondary" style={{ padding:'8px 14px', fontSize:13 }}>
            <HiChevronLeft /> Dashboard
          </button>
          <input
            value={cvData.title || ''}
            onChange={e => updateSection('title', e.target.value)}
            placeholder="CV Başlığı..."
            style={{ background:'transparent', border:'1px solid var(--border)', borderRadius:'var(--radius)',
              padding:'8px 14px', fontSize:14, width:200 }}
          />
        </div>

        <div style={{ display:'flex', gap:8 }}>
          <button className="btn-secondary" style={{ padding:'8px 14px', fontSize:13 }}
            onClick={() => setShowPreview(!showPreview)}>
            <HiEye /> {showPreview ? 'Formu Göster' : 'Önizleme'}
          </button>
          <button className="btn-secondary" style={{ padding:'8px 14px', fontSize:13 }}
            onClick={() => handleSave()} disabled={saving}>
            <HiSave /> {saving ? 'Kaydediliyor...' : saved ? '✓ Kaydedildi' : 'Kaydet'}
          </button>
          <button className="btn-primary" style={{ padding:'8px 16px', fontSize:13 }}
            onClick={handleDownload} disabled={downloading}>
            <HiDownload /> {downloading ? 'Hazırlanıyor...' : 'PDF İndir'}
          </button>
        </div>
      </div>

      <div style={{ flex:1, display:'flex', maxWidth:1600, margin:'0 auto', width:'100%', padding:'24px' }}>

        {/* Sol sidebar: adımlar */}
        {!showPreview && (
          <div style={{
            width:220, flexShrink:0, marginRight:24,
            position:'sticky', top:140, alignSelf:'flex-start'
          }}>
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === activeStep;
              const isDone   = i < activeStep;
              return (
                <button key={s.id}
                  onClick={() => setActiveStep(i)}
                  style={{
                    width:'100%', display:'flex', alignItems:'center', gap:10,
                    padding:'11px 14px', borderRadius:'var(--radius)',
                    background: isActive ? 'rgba(108,99,255,.15)' : 'transparent',
                    border: isActive ? '1px solid rgba(108,99,255,.4)' : '1px solid transparent',
                    color: isActive ? 'var(--accent)' : isDone ? 'var(--text)' : 'var(--text2)',
                    cursor:'pointer', transition:'all .15s',
                    fontFamily:'var(--font-body)', fontSize:13,
                    textAlign:'left', marginBottom:4
                  }}
                >
                  <Icon size={16} style={{ flexShrink:0 }} />
                  <span>{s.label}</span>
                  {isDone && <span style={{ marginLeft:'auto', fontSize:11, color:'var(--accent3)' }}>✓</span>}
                </button>
              );
            })}
          </div>
        )}

        {/* Ana içerik */}
        {!showPreview ? (
          <div style={{ flex:1, maxWidth:700 }}>
            <AnimatePresence mode="wait">
              <motion.div key={activeStep}
                initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}
                transition={{ duration:.2 }}>
                {step.id === 'personal'   && <PersonalInfoForm data={cvData} onChange={updateSection} userId={user?.uid} />}
                {step.id === 'summary'    && <SummaryForm data={cvData} onChange={updateSection} />}
                {step.id === 'experience' && <ExperienceForm data={cvData} onChange={updateSection} />}
                {step.id === 'education'  && <EducationForm data={cvData} onChange={updateSection} />}
                {step.id === 'skills'     && <SkillsForm data={cvData} onChange={updateSection} />}
                {step.id === 'projects'   && <ProjectsForm data={cvData} onChange={updateSection} />}
                {step.id === 'customize'  && <CustomizationPanel data={cvData} onChange={updateSection} />}
              </motion.div>
            </AnimatePresence>

            {/* İleri / Geri butonları */}
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:24 }}>
              <button className="btn-secondary" onClick={() => setActiveStep(Math.max(0, activeStep-1))}
                disabled={activeStep === 0}>
                <HiChevronLeft /> Geri
              </button>
              <button className="btn-primary" onClick={() => setActiveStep(Math.min(STEPS.length-1, activeStep+1))}
                disabled={activeStep === STEPS.length-1}>
                İleri <HiChevronRight />
              </button>
            </div>
          </div>
        ) : null}

        {/* Önizleme */}
        <div style={{
          flex:1, marginLeft: showPreview ? 0 : 24,
          display: showPreview ? 'block' : 'block',
          minWidth:0
        }}>
          <div id="cv-preview-container">
            <CVPreview data={cvData} />
          </div>
        </div>
      </div>
    </div>
  );
}
