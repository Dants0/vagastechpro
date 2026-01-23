import { Page } from 'puppeteer';

export interface SiteConfig {
  name: string;
  url: string;
  // A função scrape recebe a página aberta e devolve uma lista de objetos
  scrape: (page: Page) => Promise<Array<{ title: string; link: string; company: string }>>;
}

export const SITES_TO_SCRAPE: SiteConfig[] = [
  // --- 1. Programathor ---
  {
    name: 'Programathor',
    url: 'https://programathor.com.br/jobs',
    scrape: async (page: Page) => {
      return await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('.cell-list'));
        return cards.map(card => {
          const linkEl = card.querySelector('a');
          const href = linkEl?.getAttribute('href');
          return {
            title: card.querySelector('h3')?.textContent?.trim() || 'Vaga Tech',
            link: href ? 'https://programathor.com.br' + href : '',
            company: 'Programathor'
          };
        });
      });
    }
  },

  // --- 2. Nerdin ---
  {
    name: 'Nerdin',
    url: 'https://nerdin.com.br/vagas',
    scrape: async (page: Page) => {
      return await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('div[data-id]'));
        return cards.map(card => {
          const titleElement = card.querySelector('h2 a') || card.querySelector('a');
          return {
            title: titleElement?.textContent?.trim() || 'Vaga Nerdin',
            link: (titleElement as HTMLAnchorElement)?.href || '',
            company: card.querySelector('span.badge')?.textContent?.trim() || 'Nerdin'
          };
        }).filter(v => v.link.includes('nerdin.com.br'));
      });
    }
  },

  // --- 3. GeekHunter ---
  {
    name: 'GeekHunter',
    url: 'https://www.geekhunter.com.br/vagas',
    scrape: async (page: Page) => {
      return await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('.job-offer-card'));
        return cards.map(card => ({
          title: card.querySelector('h2')?.textContent?.trim() || 'Vaga Tech',
          link: (card.querySelector('a') as HTMLAnchorElement)?.href || '',
          company: 'GeekHunter'
        }));
      });
    }
  },

  // --- 4. InfoJobs (TI) ---
  {
    name: 'InfoJobs',
    url: 'https://www.infojobs.com.br/empregos.aspx?Palabra=programador',
    scrape: async (page: Page) => {
      return await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('.js_rowCard'));
        return cards.map(card => {
          const titleEl = card.querySelector('h2 a');
          return {
            title: titleEl?.textContent?.trim() || 'Vaga InfoJobs',
            link: (titleEl as HTMLAnchorElement)?.href || '',
            company: card.querySelector('.company-name')?.textContent?.trim() || 'Confidencial'
          };
        });
      });
    }
  },

  // --- 5. Workana (Freelance) ---
  {
    name: 'Workana',
    url: 'https://www.workana.com/jobs?category=it-programming&language=pt',
    scrape: async (page: Page) => {
      return await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('.project-item'));
        return cards.map(card => {
          const titleEl = card.querySelector('.project-title a');
          return {
            title: '[FREELA] ' + (titleEl?.getAttribute('title') || titleEl?.textContent?.trim()),
            link: titleEl ? 'https://www.workana.com' + titleEl.getAttribute('href') : '',
            company: 'Workana Project'
          };
        });
      });
    }
  },

  // --- 6. WeWorkRemotely ---
  {
    name: 'WeWorkRemotely',
    url: 'https://weworkremotely.com/categories/remote-programming-jobs',
    scrape: async (page: Page) => {
      return await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('section.jobs article li:not(.view-all)'));
        return rows.map(row => ({
          title: row.querySelector('.title')?.textContent?.trim() || 'Remote Job',
          company: row.querySelector('.company')?.textContent?.trim() || 'WWR',
          link: 'https://weworkremotely.com' + row.querySelector('a')?.getAttribute('href')
        }));
      });
    }
  },
  // --- 7. Hipsters.jobs (Focado em Tech Brasil) ---
  {
    name: 'Hipsters.jobs',
    url: 'https://hipsters.jobs/jobs/?q=desenvolvedor',
    scrape: async (page: Page) => {
      return await page.evaluate(() => {
        // Hipsters usa links como containers principais
        const cards = Array.from(document.querySelectorAll('a.listing-item'));
        
        return cards.map(card => {
          const titleEl = card.querySelector('.listing-item__info--title');
          const companyEl = card.querySelector('.listing-item__info--item-company');
          
          return {
            title: titleEl?.textContent?.trim() || 'Vaga Hipsters',
            link: (card as HTMLAnchorElement).href, // O próprio card é o link
            company: companyEl?.textContent?.trim() || 'Hipsters.jobs'
          };
        });
      });
    }
  },

  // --- 8. Profissionais TI (Muita vaga legacy/bancos) ---
  {
    name: 'ProfissionaisTI',
    url: 'https://profissionaisti.com.br/vagas/',
    scrape: async (page: Page) => {
      return await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('ul.list-jobs li.list-jobs__item'));
        
        return rows.map(row => {
          const titleEl = row.querySelector('h3.list-jobs__title a');
          const companyEl = row.querySelector('span.list-jobs__company');
          
          return {
            title: titleEl?.textContent?.trim() || 'Vaga PTI',
            link: titleEl ? (titleEl as HTMLAnchorElement).href : '',
            company: companyEl?.textContent?.trim() || 'Confidencial'
          };
        }).slice(0, 15); // Pega só as 15 primeiras para garantir rapidez
      });
    }
  },

  // --- 9. RemoteOK (Dólar - Tentativa Safe) ---
  {
    name: 'RemoteOK',
    url: 'https://remoteok.com/remote-dev-jobs',
    scrape: async (page: Page) => {
      return await page.evaluate(() => {
        // RemoteOK usa tabelas (tr) com classe 'job'
        const rows = Array.from(document.querySelectorAll('tr.job'));
        
        return rows.map(row => {
          const titleEl = row.querySelector('h2');
          const companyEl = row.querySelector('h3');
          const linkEl = row.querySelector('a.preventLink'); // Eles usam essa classe pra evitar clique acidental

          return {
            title: '[USD] ' + (titleEl?.textContent?.trim() || 'Dev Job'),
            company: companyEl?.textContent?.trim() || 'RemoteOK',
            link: linkEl ? 'https://remoteok.com' + linkEl.getAttribute('href') : ''
          };
        });
      });
    }
  }
];