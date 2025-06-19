const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Multer ayarları
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Dosya yükleme endpointi
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Dosya bulunamadı." });
  }
  res.json({
    fileName: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
    buffer: req.file.buffer.toString("utf-8"),
    message: "Dosya başarıyla yüklendi.",
  });
});

// Analiz endpointi
app.post("/api/analyze", async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "İçerik yok." });
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    // İçerikten gereksiz satırları temizle
    let cleanedContent = content
      .replace(/medya dahil edilmedi/gi, "")
      .replace(/uçtan uca şifreli.*?mesaj/gi, "")
      .replace(/https?:\/\/\S+/gi, "")
      .replace(/\bbu mesaj uçtan uca şifrelidir\b/gi, "")
      .replace(/\n{2,}/g, "\n");
    // Daha detaylı, örnekli ve istatistikli analiz için yeni prompt
    const prompt = `Aşağıdaki sohbeti detaylı analiz et ve bana şu başlıklarda kapsamlı, örnekli ve istatistikli Türkçe bir rapor hazırla:

1. En sık konuşulan konular (örnek cümlelerle ve oranlarla belirt)
2. En çok kullanılan kelimeler ve kelime bulutu (en az 10 kelime, oranlarıyla)
3. Duygu analizi (pozitif/negatif/nötr mesaj oranı, örnek cümlelerle)
4. Kişilerle olan etkileşim dinamikleri (kimle ne kadar konuşulmuş, en çok etkileşimde olunan kişiler, örnek mesajlarla)
5. Cevap süreleri (ortalama cevap süresi, en hızlı ve en yavaş cevaplar, örneklerle)
6. Yazışma tarzı (agresif, pozitif, resmi, samimi, emoji kullanımı, örnek cümlelerle)
7. Zaman içinde yazışma davranışındaki değişimler (hangi dönemlerde daha yoğun, duygu değişimi, örneklerle)
8. En çok kullanılan emojiler ve anlamları
9. Sohbette öne çıkan ilginç veya dikkat çekici detaylar (örneklerle)
10. Sohbetin genel özeti ve ilişkilerin dinamiği hakkında kısa bir değerlendirme

Her başlığı madde madde, istatistik ve örneklerle detaylandır. Sonuçları tamamen Türkçe ve kolay anlaşılır şekilde yaz.

Sohbet:
${cleanedContent}`;
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        apiKey,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );
    res.json({ result: response.data });
  } catch (err) {
    if (
      err.response &&
      err.response.data &&
      (err.response.data.error?.message?.includes("quota") ||
        err.response.data.error?.message?.includes("limit"))
    ) {
      return res.status(429).json({
        error: "API kullanım kotası aşıldı, lütfen daha sonra tekrar deneyin.",
      });
    }
    res.status(500).json({ error: "Gemini API hatası", detail: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend çalışıyor: http://localhost:${PORT}`);
});
