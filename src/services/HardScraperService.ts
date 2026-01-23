import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { JsonDb } from '../utils/JsonDb';

puppeteer.use(StealthPlugin());

export class HardScraperService {

  // Lista de termos para buscar
  private readonly KEYWORDS = [
    'Desenvolvedor',
    'Engenheiro de Software',
    'Node.js',
    'React',
    'Python',
    'Java',
    'DevOps',
    'Data Engineer'
  ];

  async run() {
    console.log('🥷 Iniciando Hard Scraper (LinkedIn + Indeed)...');

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      // =================================================================
      // 1. LINKEDIN SCRAPER
      // =================================================================
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });

      for (const keyword of this.KEYWORDS) {
        try {
          console.log(`   💼 [LinkedIn] Buscando por: "${keyword}"...`);
          
          const linkedinUrl = `https://www.linkedin.com/jobs/search?keywords=${encodeURIComponent(keyword)}&f_TPR=r86400&position=1&pageNum=0`;

          await page.goto(linkedinUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
          
          await page.evaluate(() => window.scrollBy(0, window.innerHeight));
          await new Promise(r => setTimeout(r, 2000 + Math.random() * 3000));

          const linkedinJobs = await page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('li div.base-search-card'));
            return cards.map(card => ({
              title: card.querySelector('.base-search-card__title')?.textContent?.trim() || 'Vaga',
              company: card.querySelector('.base-search-card__subtitle')?.textContent?.trim() || 'Confidencial',
              link: card.querySelector('a.base-card__full-link')?.getAttribute('href') || ''
            }));
          });

          let newCount = 0;
          for (const job of linkedinJobs) {
            // Remove parâmetros de rastreio para checar duplicidade
            const cleanLink = job.link.split('?')[0]; 
            
            if (cleanLink && await JsonDb.isJobNew(cleanLink)) {
              await JsonDb.addJobToBacklog({
                title: job.title,
                company: job.company,
                link: cleanLink,
                origin: 'LinkedIn'
              });
              newCount++;
            }
          }
          console.log(`      ↳ Encontradas: ${linkedinJobs.length} | Novas: ${newCount}`);

          // Delay de segurança entre palavras-chave
          await new Promise(r => setTimeout(r, 10000));

        } catch (e: any) {
          console.error(`      ❌ Erro ao buscar "${keyword}":`, e.message);
        }
      }
      
      await page.close(); // Fecha aba do LinkedIn antes de ir para o Indeed

      // =================================================================
      // 2. INDEED SCRAPER
      // =================================================================
      try {
        console.log('🦁 [Indeed] Iniciando busca...');
        const indeedPage = await browser.newPage();
        await indeedPage.setViewport({ width: 1280, height: 800 });
        
        // User Agent para tentar enganar o Cloudflare
        await indeedPage.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        // Busca genérica para "Programador" e "Remoto" nas últimas 24h
        const indeedUrl = 'https://br.indeed.com/jobs?q=programador&l=Remote&fromage=1';
        
        await indeedPage.goto(indeedUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await new Promise(r => setTimeout(r, 5000)); // Delay inicial

        // Verificação anti-robô simples
        const title = await indeedPage.title();
        if (title.includes('Just a moment') || title.includes('Cloudflare')) {
          throw new Error('Bloqueado pelo Cloudflare.');
        }

        const indeedJobs = await indeedPage.evaluate(() => {
          const cards = Array.from(document.querySelectorAll('td.resultContent'));
          return cards.map(card => {
            const titleEl = card.querySelector('h2.jobTitle span[title]');
            const companyEl = card.querySelector('span[data-testid="company-name"]');
            const linkEl = card.closest('tr')?.querySelector('a.jcs-JobTitle');

            return {
              title: titleEl?.textContent?.trim() || 'Vaga Indeed',
              company: companyEl?.textContent?.trim() || 'Confidencial',
              link: linkEl ? 'https://br.indeed.com' + linkEl.getAttribute('href') : ''
            };
          });
        });

        console.log(`   ↳ Indeed: ${indeedJobs.length} vagas brutas encontradas.`);

        let indeedCount = 0;
        for (const job of indeedJobs) {
            // Tratamento de link específico do Indeed
            if (job.link && await JsonDb.isJobNew(job.link)) {
                await JsonDb.addJobToBacklog({
                    title: `[Indeed] ${job.title}`,
                    company: job.company,
                    link: job.link,
                    origin: 'Indeed'
                });
                indeedCount++;
            }
        }
        console.log(`   ✅ Indeed processado: ${indeedCount} novas vagas.`);
        
        await indeedPage.close();

      } catch (error: any) {
        console.error('❌ Erro no Indeed:', error.message);
      }

    } catch (error: any) {
      console.error('❌ Erro Crítico no Browser:', error.message);
    } finally {
      // O browser só fecha AQUI, depois de tentar tudo
      await browser.close();
      console.log('🥷 Ciclo Hard Scraper finalizado.');
    }
  }
}