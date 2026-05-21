# CV Builder Pro 🚀

Modern, tamamen özelleştirilebilir CV oluşturucu. React + Firebase ile yapılmıştır.

## Özellikler
- 🔐 Google ve e-posta ile giriş
- 🎨 5 profesyonel CV teması (Modern, Klasik, Minimal, Bold, Elegant)
- 🖼️ Profil fotoğrafı yükleme
- ✏️ Tam özelleştirme (renk, font, düzen)
- 💾 Firebase'de otomatik kayıt
- 📄 PDF indirme
- 💼 Deneyim, eğitim, beceri, proje yönetimi

## Kurulum

### 1. Bağımlılıkları yükle
\`\`\`bash
npm install
\`\`\`

### 2. Firebase projesi oluştur
1. [Firebase Console](https://console.firebase.google.com) aç
2. Yeni proje oluştur
3. Authentication → Sign-in method → Email/Password ve Google'ı etkinleştir
4. Firestore Database oluştur (production mode)
5. Storage oluştur
6. Project Settings → Web app → config değerlerini kopyala

### 3. .env dosyası oluştur
\`\`\`bash
cp .env.example .env
\`\`\`
.env dosyasını Firebase config değerleriyle doldur.

### 4. Firebase Security Rules uygula
Firestore Console → Rules sekmesine `firestore.rules` içeriğini yapıştır.
Storage Console → Rules sekmesine `storage.rules` içeriğini yapıştır.

### 5. Uygulamayı başlat
\`\`\`bash
npm run dev
\`\`\`

### 6. Üretim ortamı için build
\`\`\`bash
npm run build
\`\`\`

## Firebase Hosting ile Yayınlama
\`\`\`bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
\`\`\`

## Proje Yapısı
- `src/components/auth` - Giriş / kayıt sayfaları
- `src/components/builder` - CV form bileşenleri
- `src/components/preview/themes` - 5 CV teması
- `src/components/dashboard` - CV listesi ve yönetim
- `src/firebase` - Firebase yapılandırması
- `src/utils` - PDF export ve varsayılan değerler
