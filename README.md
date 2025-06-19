# Chat Insight AI

## Proje Amacı

Kişisel WhatsApp veya SMS sohbetlerinizi yükleyerek, yapay zeka ile detaylı analiz ve içgörü elde edebileceğiniz bir platformdur. Sohbetlerinizde en sık konuşulan konuları, duygu durumlarını, yazışma tarzınızı ve daha fazlasını kolayca görebilirsiniz.

## Özellikler

- .txt, .json, .xml formatında sohbet yükleme
- Sohbet içeriğinden gereksiz satır ve link temizleme
- Google Gemini API ile Türkçe ve detaylı analiz
- En sık konuşulan konular, kelime bulutu, duygu analizi, kişi bazlı istatistikler
- Sonuçları sade ve anlaşılır şekilde ekranda görme

## Kurulum

1. **Projeyi klonla:**
   ```sh
   git clone <repo-url>
   cd ChatAnalys
   ```
2. **Backend bağımlılıklarını yükle:**
   ```sh
   cd backend
   npm install
   ```
3. **Frontend bağımlılıklarını yükle:**
   ```sh
   cd ../frontend
   npm install
   ```
4. **Backend için .env dosyası oluştur:**
   ```env
   GEMINI_API_KEY=senin_gemini_api_keyin
   ```
5. **Backend'i başlat:**
   ```sh
   cd backend
   node server.js
   ```
6. **Frontend'i başlat:**
   ```sh
   cd frontend
   npm run dev
   ```

## Kullanım

- Ana ekranda sohbet dosyanı yükle.
- Yüklenen dosya adı ve bilgisi ekranda görünür.
- "Analiz Başlat" butonuna tıkla.
- AI analiz sonucu Türkçe ve detaylı şekilde ekranda gösterilir.

## Teknolojiler

- **Frontend:** React, Vite, TailwindCSS
- **Backend:** Node.js, Express, Multer, Axios
- **AI:** Google Gemini API

## Notlar

- Dosya boyutu maksimum 5 MB olmalıdır.
- API kotası dolarsa ekranda uyarı verilir.
- Tüm analizler ve veriler gizlidir, yüklenen dosyalar kaydedilmez.

---
