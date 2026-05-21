import { useState } from 'react';
import { HiCheck } from 'react-icons/hi';

const THEMES = [
  {
    id:'modern', name:'Modern', desc:'Minimalist ve çarpıcı',
    preview: { bg:'#1a1a2e', accent:'#6c63ff', text:'#fff' }
  },
  {
    id:'classic', name:'Klasik', desc:'Geleneksel ve güvenilir',
    preview: { bg:'#f8f6f0', accent:'#2c3e50', text:'#222' }
  },
  {
    id:'minimal', name:'Minimal', desc:'Sade ve zarif',
    preview: { bg:'#fff', accent:'#333', text:'#222' }
  },
  {
    id:'bold', name:'Bold', desc:'Dikkat çekici ve enerjik',
    preview: { bg:'#fff', accent:'#e74c3c', text:'#222' }
  },
  {
    id:'elegant', name:'Elegant', desc:'Lüks ve sofistike',
    preview: { bg:'#faf8f5', accent:'#8e44ad', text:'#222' }
  },
];

const FONT_PAIRS = [
  { id:'syne-dm',      display:'Syne',        body:'DM Sans',    label:'Modern Sans' },
  { id:'playfair-lato', display:'Playfair Display', body:'Lato', label:'Klasik Serif' },
  { id:'space-inter',  display:'Space Grotesk', body:'Inter',    label:'Teknik' },
  { id:'cormorant-nunito', display:'Cormorant', body:'Nunito',   label:'Zarif' },
];

const ACCENT_COLORS = [
  '#6c63ff','#e74c3c','#2ecc71','#3498db','#f39c12','#8e44ad',
  '#1abc9c','#e67e22','#e91e63','#00bcd4','#333333','#795548'
];

export default function CustomizationPanel({ data, onChange }) {
  const customize = data.customize || {};
  const update = (key, val) => onChange('customize', { ...customize, [key]: val });

  return (
    <div className="fade-in">
      <div className="section-card">
        <h2 className="section-title">🎨 CV Özelleştirme</h2>

        {/* Tema seçimi */}
        <div style={{ marginBottom:32 }}>
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:15, fontWeight:600, marginBottom:16, color:'var(--text2)' }}>
            TEMA
          </h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(140px, 1fr))', gap:12 }}>
            {THEMES.map(theme => {
              const isSelected = (data.theme || 'modern') === theme.id;
              return (
                <button key={theme.id}
                  onClick={() => onChange('theme', theme.id)}
                  style={{
                    padding:0, background:'none', border:`2px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius:'var(--radius)', cursor:'pointer', overflow:'hidden',
                    transition:'all .2s', transform: isSelected ? 'scale(1.02)' : 'scale(1)'
                  }}>
                  {/* Mini önizleme */}
                  <div style={{ background:theme.preview.bg, padding:'12px 12px 8px', height:72, position:'relative' }}>
                    <div style={{ width:'30%', height:6, background:theme.preview.accent, borderRadius:3, marginBottom:4 }} />
                    <div style={{ width:'60%', height:4, background: theme.preview.text === '#fff' ? 'rgba(255,255,255,.3)' : '#ccc', borderRadius:3, marginBottom:3 }} />
                    <div style={{ width:'45%', height:4, background: theme.preview.text === '#fff' ? 'rgba(255,255,255,.2)' : '#ddd', borderRadius:3 }} />
                    {isSelected && (
                      <div style={{
                        position:'absolute', top:6, right:6, width:18, height:18,
                        background:'var(--accent)', borderRadius:'50%',
                        display:'flex', alignItems:'center', justifyContent:'center'
                      }}>
                        <HiCheck size={11} color="#fff" />
                      </div>
                    )}
                  </div>
                  <div style={{ padding:'8px 12px', background:'var(--surface)', textAlign:'left' }}>
                    <div style={{ fontSize:12, fontWeight:600, color:'var(--text)' }}>{theme.name}</div>
                    <div style={{ fontSize:10, color:'var(--text2)' }}>{theme.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Vurgu rengi */}
        <div style={{ marginBottom:32 }}>
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:15, fontWeight:600, marginBottom:16, color:'var(--text2)' }}>
            VURGU RENGİ
          </h3>
          <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
            {ACCENT_COLORS.map(color => {
              const isSelected = (customize.accentColor || '#6c63ff') === color;
              return (
                <button key={color}
                  onClick={() => update('accentColor', color)}
                  style={{
                    width:36, height:36, borderRadius:'50%', background:color,
                    border:`3px solid ${isSelected ? '#fff' : 'transparent'}`,
                    cursor:'pointer', transition:'all .15s',
                    boxShadow: isSelected ? `0 0 0 2px ${color}` : 'none',
                    transform: isSelected ? 'scale(1.1)' : 'scale(1)'
                  }} />
              );
            })}
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <label style={{ fontSize:11, color:'var(--text2)', textTransform:'none', marginBottom:0 }}>
                Özel:
              </label>
              <input type="color" value={customize.accentColor || '#6c63ff'}
                onChange={e => update('accentColor', e.target.value)}
                style={{ width:36, height:36, padding:2, border:'1px solid var(--border)', borderRadius:'50%', cursor:'pointer', background:'none' }} />
            </div>
          </div>
        </div>

        {/* Font çifti */}
        <div style={{ marginBottom:32 }}>
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:15, fontWeight:600, marginBottom:16, color:'var(--text2)' }}>
            YAZI TİPİ
          </h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {FONT_PAIRS.map(pair => {
              const isSelected = (customize.fontPair || 'syne-dm') === pair.id;
              return (
                <button key={pair.id}
                  onClick={() => update('fontPair', pair.id)}
                  style={{
                    padding:'14px 16px', borderRadius:'var(--radius)',
                    background: isSelected ? 'rgba(108,99,255,.15)' : 'var(--bg3)',
                    border:`1px solid ${isSelected ? 'rgba(108,99,255,.5)' : 'var(--border)'}`,
                    cursor:'pointer', textAlign:'left', transition:'all .15s'
                  }}>
                  <div style={{ fontSize:15, fontWeight:700, color:'var(--text)', marginBottom:2 }}>{pair.display}</div>
                  <div style={{ fontSize:11, color:'var(--text2)' }}>{pair.body} · {pair.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Düzen seçenekleri */}
        <div>
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:15, fontWeight:600, marginBottom:16, color:'var(--text2)' }}>
            DÜZEN
          </h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {['two-column', 'single-column'].map(layout => (
              <button key={layout}
                onClick={() => update('layout', layout)}
                style={{
                  padding:'14px', borderRadius:'var(--radius)',
                  background: (customize.layout || 'two-column') === layout ? 'rgba(108,99,255,.15)' : 'var(--bg3)',
                  border:`1px solid ${(customize.layout || 'two-column') === layout ? 'rgba(108,99,255,.5)' : 'var(--border)'}`,
                  cursor:'pointer', display:'flex', alignItems:'center', gap:10, transition:'all .15s'
                }}>
                <span style={{ fontSize:20 }}>{layout === 'two-column' ? '⬜⬜' : '⬛'}</span>
                <div style={{ textAlign:'left' }}>
                  <div style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>
                    {layout === 'two-column' ? 'İki Sütun' : 'Tek Sütun'}
                  </div>
                  <div style={{ fontSize:11, color:'var(--text2)' }}>
                    {layout === 'two-column' ? 'Modern, kompakt' : 'Geleneksel, geniş'}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
