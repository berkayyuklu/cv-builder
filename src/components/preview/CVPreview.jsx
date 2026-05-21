import ModernTheme from './themes/ModernTheme';
import ClassicTheme from './themes/ClassicTheme';
import MinimalTheme from './themes/MinimalTheme';
import BoldTheme from './themes/BoldTheme';
import ElegantTheme from './themes/ElegantTheme';

const THEMES = {
  modern:  ModernTheme,
  classic: ClassicTheme,
  minimal: MinimalTheme,
  bold:    BoldTheme,
  elegant: ElegantTheme,
};

export default function CVPreview({ data }) {
  const ThemeComponent = THEMES[data.theme || 'modern'] || ModernTheme;
  return (
    <div style={{
      background: '#fff',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      borderRadius: 4,
      overflow: 'hidden',
      maxWidth: 794,   // A4 genişliği px
      margin: '0 auto',
      minHeight: 1123, // A4 yüksekliği px
    }}>
      <ThemeComponent data={data} />
    </div>
  );
}
