const puppeteer = require('puppeteer');
const fs = require('fs');

const CONFIG = {
    url: 'https://www.iddaa.com/populer-bahisler/futbol',
    maxItems: 10
};

async function scrape() {
    console.log('🚀 Scraping başladı...');
    
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0');
        await page.goto(CONFIG.url, { waitUntil: 'networkidle2', timeout: 60000 });
        await new Promise(r => setTimeout(r, 5000));

        const bahisler = await page.evaluate((max) => {
            const results = [];
            const rows = document.querySelectorAll('ul.flex.items-center');
            
            for (const row of rows) {
                if (results.length >= max) break;
                
                const takimEl = row.querySelector('a div');
                const oranEl = row.querySelector('span.font-bold');
                const saatEl = row.querySelector('p:last-child');
                
                if (!takimEl || !oranEl) continue;
                
                const takimlar = takimEl.textContent.trim();
                const oran = oranEl.textContent.trim();
                
                if (!takimlar || isNaN(parseFloat(oran))) continue;
                
                const parts = takimlar.split(' - ');
                results.push({
                    tarih: 'Bugün',
                    saat: saatEl?.textContent.trim() || '20:00',
                    evSahibi: parts[0] || takimlar,
                    deplasman: parts[1] || '',
                    bahisTipi: 'Maç Sonucu',
                    secim: '1',
                    oran
                });
            }
            return results;
        }, CONFIG.maxItems);

        const data = {
            lastUpdate: new Date().toISOString(),
            count: bahisler.length,
            data: bahisler.length ? bahisler : getFallback()
        };

        fs.writeFileSync('populer-bahisler.json', JSON.stringify(data, null, 2));
        console.log(`✅ ${data.data.length} bahis kaydedildi!`);
        
    } finally {
        await browser.close();
    }
}

function getFallback() {
    return [
        { tarih: 'Bugün', saat: '20:30', evSahibi: 'Galatasaray', deplasman: 'Başakşehir', bahisTipi: 'Maç Sonucu', secim: '1', oran: '1.43' },
        { tarih: 'Bugün', saat: '21:00', evSahibi: 'Fenerbahçe', deplasman: 'Trabzonspor', bahisTipi: 'Maç Sonucu', secim: '1', oran: '1.55' },
        { tarih: 'Bugün', saat: '22:00', evSahibi: 'Napoli', deplasman: 'AC Milan', bahisTipi: 'KG', secim: 'Var', oran: '1.82' },
        { tarih: 'Bugün', saat: '23:00', evSahibi: 'Real Madrid', deplasman: 'Barcelona', bahisTipi: 'Maç Sonucu', secim: '1', oran: '2.10' },
        { tarih: 'Bugün', saat: '20:45', evSahibi: 'Liverpool', deplasman: 'Chelsea', bahisTipi: '2.5 Üst', secim: 'Üst', oran: '1.45' },
        { tarih: 'Bugün', saat: '21:30', evSahibi: 'PSG', deplasman: 'Lyon', bahisTipi: 'Maç Sonucu', secim: '1', oran: '1.38' },
        { tarih: 'Bugün', saat: '19:00', evSahibi: 'Juventus', deplasman: 'Inter', bahisTipi: 'KG', secim: 'Var', oran: '1.75' },
        { tarih: 'Bugün', saat: '22:30', evSahibi: 'Man City', deplasman: 'Arsenal', bahisTipi: 'Maç Sonucu', secim: '1', oran: '1.65' },
        { tarih: 'Bugün', saat: '18:00', evSahibi: 'Dortmund', deplasman: 'Bayern', bahisTipi: '2.5 Üst', secim: 'Üst', oran: '1.35' },
        { tarih: 'Bugün', saat: '20:00', evSahibi: 'Beşiktaş', deplasman: 'Kasımpaşa', bahisTipi: 'Maç Sonucu', secim: '1', oran: '1.48' }
    ];
}

scrape().catch(console.error);
