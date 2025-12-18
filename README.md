# 🐻 Lucky Bear iddaa Biolink - GitHub Pages

## 🚀 5 Dakikada Kurulum

### 1. GitHub'da Yeni Repo Oluştur
- https://github.com/new adresine git
- Repo adı: `iddaa-biolink`
- **Public** seç
- "Create repository" tıkla

### 2. Dosyaları Yükle
- "uploading an existing file" tıkla
- Bu klasördeki TÜM dosyaları sürükle:
  - `index.html`
  - `scraper.js`
  - `populer-bahisler.json`
  - `.github/` klasörü (workflows dahil)
- "Commit changes" tıkla

### 3. GitHub Pages Aktif Et
- Repo ayarlarına git (Settings)
- Sol menüden "Pages" seç
- Source: "Deploy from a branch"
- Branch: `main` / `root`
- Save tıkla

### 4. Actions İzni Ver
- Repo'da "Actions" sekmesine git
- "I understand my workflows, go ahead and enable them" tıkla

### 5. Bitti! 🎉
- Site adresi: `https://KULLANICI_ADIN.github.io/iddaa-biolink`
- Her 2 saatte otomatik güncellenir
- Manuel güncelleme: Actions → "iddaa Scraper" → "Run workflow"

---

## 📁 Dosya Yapısı

```
iddaa-biolink/
├── index.html              # Ana sayfa
├── scraper.js              # Puppeteer scraper
├── populer-bahisler.json   # Güncel bahis verileri
├── README.md               # Bu dosya
└── .github/
    └── workflows/
        └── scrape.yml      # Otomatik güncelleme
```

## ⚙️ Özelleştirme

### Sosyal Medya Linkleri
`index.html` dosyasında şunları değiştir:
- `YOUR_INSTAGRAM` → Instagram kullanıcı adın
- `905XXXXXXXXX` → WhatsApp numaran
- `YOUR_TELEGRAM` → Telegram kanal adın

### Güncelleme Sıklığı
`.github/workflows/scrape.yml` dosyasında:
```yaml
- cron: '0 */2 * * *'  # Her 2 saatte
# Değiştir:
- cron: '0 */1 * * *'  # Her 1 saatte
- cron: '*/30 * * * *' # Her 30 dakikada
```

---

## 🔧 Sorun Giderme

### Actions çalışmıyor
1. Actions sekmesinde "Enable" yaptın mı?
2. Repo public mı?

### Sayfa açılmıyor
1. Pages ayarlarında branch seçtin mi?
2. 2-3 dakika bekle, deploy sürer

### Veriler güncellenmiyor
1. Actions sekmesinde hata var mı?
2. Manuel tetikle: "Run workflow"

---

🐻 **Lucky Bear** - Bol şans!
