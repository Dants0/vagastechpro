import puppeteer from 'puppeteer';
import { JsonDb } from '../utils/JsonDb';
import { SITES_TO_SCRAPE } from '../config/sites';

export class ScraperService {
  
  // Filtro básico para remover lixo
  private isValidJob(title: string): boolean {
    if (!title) return false;
    const lower = title.toLowerCase();
    
    // Blacklist: Coisas que aparecem em sites de TI mas não são TI
    const blocklist = ['motorista', 'recepcionista', 'vendedor', 'auxiliar administrativo', 'limpeza'];
    if (blocklist.some(word => lower.includes(word))) return false;

    // Tamanho mínimo suspeito
    if (lower.length < 4) return false;
    
    return true;
  }

  async run() {
    console.log(`🕵️ Iniciando Scraper Service...`);
    
    const browser = await puppeteer.launch({ 
      headless: true, // "new" é o padrão novo, mas true funciona
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });
    
    // Processa de 3 em 3 para não estourar memória
    const BATCH_SIZE = 3;

    for (let i = 0; i < SITES_TO_SCRAPE.length; i += BATCH_SIZE) {
      const batch = SITES_TO_SCRAPE.slice(i, i + BATCH_SIZE);

      await Promise.all(batch.map(async (site) => {
        let page;
        try {
          page = await browser.newPage();
          // User Agent comum
          await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
          
          // Otimização: Bloqueia imagens e fontes
          await page.setRequestInterception(true);
          page.on('request', (req) => {
            if (['image', 'stylesheet', 'font', 'media'].includes(req.resourceType())) {
              req.abort();
            } else {
              req.continue();
            }
          });

          await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
          
          // Executa o scrape definido no sites.ts
          const jobs = await site.scrape(page);
          
          let count = 0;
          for (const job of jobs) {
              if (!job.link || !this.isValidJob(job.title)) continue;

              // Verifica duplicidade antes de adicionar
              if (await JsonDb.isJobNew(job.link)) {
                  await JsonDb.addJobToBacklog({ 
                      title: job.title, 
                      company: job.company || 'Confidencial', 
                      link: job.link,
                      origin: site.name
                  });
                  count++;
              }
          }
          console.log(`   🔎 [${site.name}] Encontradas: ${jobs.length} | Novas: ${count}`);

        } catch (error: any) {
          console.error(`❌ Erro em ${site.name}:`, error.message);
        } finally {
          if (page) await page.close();
        }
      }));
    }

    await browser.close();
    console.log('✅ Ciclo de Scraping finalizado.');
  }
}