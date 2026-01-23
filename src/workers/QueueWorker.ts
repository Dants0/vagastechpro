import { Telegraf } from 'telegraf';
import { JsonDb } from '../utils/JsonDb';

export class QueueWorker {
  constructor(
    private bot: Telegraf,
    private channelId: string
  ) {}

  /**
   * 🧠 Cérebro de Tags (Sem IA)
   * Analisa o texto e retorna hashtags baseadas em palavras-chave.
   */
  private generateHashtags(title: string, origin: string): string {
    const text = title.toLowerCase();
    const tags: string[] = [];

    // 1. Mapeamento de Tecnologias (Adicione o que quiser aqui)
    const techMap: { [key: string]: string } = {
      'javascript': '#JavaScript', 'js': '#JavaScript',
      'typescript': '#TypeScript', 'ts': '#TypeScript',
      'react': '#React', 'next': '#NextJS', 'vue': '#VueJS', 'angular': '#Angular',
      'node': '#NodeJS', 'express': '#NodeJS', 'nest': '#NestJS',
      'python': '#Python', 'django': '#Python', 'flask': '#Python',
      'java': '#Java', 'spring': '#Java', 'kotlin': '#Kotlin',
      'c#': '#CSharp', '.net': '#DotNet',
      'php': '#PHP', 'laravel': '#Laravel',
      'go': '#GoLang', 'golang': '#GoLang',
      'rust': '#Rust',
      'flutter': '#Flutter', 'react native': '#ReactNative',
      'swift': '#Swift', 'ios': '#iOS', 'android': '#Android',
      'aws': '#AWS', 'azure': '#Azure', 'google cloud': '#GCP',
      'docker': '#Docker', 'kubernetes': '#K8s',
      'sql': '#SQL', 'postgres': '#Postgres', 'mongo': '#MongoDB',
      'qa': '#QA', 'test': '#QA'
    };

    // 2. Níveis e Tipos
    const typeMap: { [key: string]: string } = {
      'remote': '#Remoto', 'remoto': '#Remoto', 'hibrido': '#Hibrido', 'presencial': '#Presencial',
      'junior': '#Junior', 'júnior': '#Junior', 'estagio': '#Estágio', 'estágio': '#Estágio',
      'pleno': '#Pleno', 'senior': '#Senior', 'sênior': '#Senior', 'lead': '#TechLead',
      'tech lead': '#TechLead', 'principal': '#Principal',
      'freelance': '#Freelance', 'freela': '#Freelance',
      'usd': '#VagaInternacional', 'eur': '#VagaInternacional' // Pega [USD] do título
    };

    // Verifica Tecnologias
    Object.keys(techMap).forEach(key => {
      // Regex com 'boundary' (\b) para evitar falsos positivos (ex: "Go" dentro de "Google")
      if (new RegExp(`\\b${key}\\b`, 'i').test(text)) {
        tags.push(techMap[key]);
      }
    });

    // Verifica Tipos
    Object.keys(typeMap).forEach(key => {
      if (text.includes(key)) {
        tags.push(typeMap[key]);
      }
    });

    // 3. Fonte da Vaga
    if (origin) tags.push(`#${origin.replace(/\s/g, '')}`);

    // Fallback: Se não achou nada, coloca #VagaTech
    if (tags.length === 0) tags.push('#VagaTech');

    // Remove duplicatas
    return [...new Set(tags)].join(' ');
  }

  async process() {
    // Pega a próxima vaga da fila
    const job = await JsonDb.getNextJob();
    
    if (!job) return; // Fila vazia, não faz nada

    try {
      // Gera as tags baseadas no Título e na Origem
      const hashtags = this.generateHashtags(job.title, job.origin);
      
      // Limpa poluição visual do título (Ex: "[USD]" que já virou tag)
      // Opcional: Se quiser manter o título original, remova essa linha
      const cleanTitle = job.title.replace(/\[.*?\]/g, '').trim(); 

      // Monta a mensagem final (Sem "VIP", layout limpo)
      const message = 
        `💻 <b>NOVA VAGA TECH</b>\n\n` +
        `🚀 <b>${cleanTitle}</b>\n` +
        `🏢 ${job.company}\n\n` +
        `🏷 ${hashtags}\n\n` +
        `🔗 <a href="${job.link}"><b>Ver Vaga e Aplicar</b></a>`;

      await this.bot.telegram.sendMessage(this.channelId, message, { 
        parse_mode: 'HTML', 
        link_preview_options: { is_disabled: true } 
      });

      console.log(`✅ Postado: ${cleanTitle} [${hashtags}]`);

      await JsonDb.incrementStats("job")

    } catch (e: any) {
      console.error('❌ Erro no envio Telegram:', e.message);
    }
  }
}