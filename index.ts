import 'dotenv/config';
import { Telegraf } from 'telegraf';
import cron from 'node-cron';
import { startServer } from './src/api/server'; // Importe o servidor

// Serviços
import { ScraperService } from './src/services/ScraperService';
import { HardScraperService } from './src/services/HardScraperService';
import { QueueWorker } from './src/workers/QueueWorker';
import { BotMessages } from './src/config/botMessages';
import { JsonDb } from './src/utils/JsonDb';

// Validação de ENV
const BOT_TOKEN = process.env.BOT_TOKEN;
const TARGET_CHANNEL_ID = process.env.TARGET_CHANNEL_ID;

if (!BOT_TOKEN || !TARGET_CHANNEL_ID) {
  console.error('❌ ERRO: Verifique seu .env. Faltando BOT_TOKEN ou TARGET_CHANNEL_ID.');
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

// Instâncias
const scraper = new ScraperService();
const hardScraper = new HardScraperService();
const worker = new QueueWorker(bot, TARGET_CHANNEL_ID);

// --- AGENDAMENTOS ---

// 1. Scraper Padrão (Leve): A cada 4 horas (ex: 8h, 12h, 16h...)
cron.schedule('0 */4 * * *', async () => {
  console.log('⏰ Cron: Rodando Scraper Padrão...');
  await scraper.run();
});

// // 2. Scraper Pesado (Hard): Apenas 3x ao dia (Manhã, Tarde, Noite)
cron.schedule('0 6,12,21 * * *', async () => {
  console.log('⏰ Cron: Rodando Hard Scraper...');
  await hardScraper.run();
});

// 3. Worker (Postador): A cada 10 minutos
// Ele verifica se tem vaga na fila e posta 1. Isso evita "flood" no canal.
cron.schedule('*/10 * * * *', async () => {
  await worker.process();
});

// Menu Principal (/start) - AGORA COM BOTÕES
bot.start((ctx) => {
  ctx.reply(BotMessages.START(ctx.from.first_name), {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [
          { text: BotMessages.BUTTONS.HELP, callback_data: 'cmd_help' },
          { text: BotMessages.BUTTONS.PRIVACY, callback_data: 'cmd_privacy' },
          { text: BotMessages.BUTTONS.GITHUB, callback_data: 'cmd_github' },
        ]
        // Se tiver um canal ou grupo de suporte, pode por aqui
      ]
    }
  });
});

// Comandos Simples
bot.command('ping', (ctx) => ctx.reply('🏓 Pong! Estou vivo.'));

// Status
bot.command('status', async (ctx) => {
  const stats = await JsonDb.getDailyStats();

  await ctx.reply(
    `📊 <b>Status do Sistema</b>\n\n` +
    `🟢 <b>Serviço:</b> Operacional\n` +
    `📅 <b>Data:</b> ${stats.date}\n` +
    `📈 <b>Vagas processadas hoje:</b> ${stats.jobCount}\n\n` +
    `<i>🤖 Monitorando: LinkedIn, Programathor, RemoteOK...</i>`,
    { parse_mode: 'HTML' }
  );
});

// Ajuda e Privacidade (Reutilizáveis)
const sendHelp = (ctx: any) => ctx.reply(BotMessages.HELP, { parse_mode: 'HTML' });
const sendPrivacy = (ctx: any) => ctx.reply(BotMessages.PRIVACY, { parse_mode: 'HTML' });
const sendGithub = (ctx: any) => ctx.reply(BotMessages.GITHUB, { parse_mode: 'HTML' });

// Registra gatilhos (Tanto comando texto quanto clique no botão)
bot.command('help', sendHelp);
bot.action('cmd_help', sendHelp);

bot.command('github', sendGithub);
bot.action('cmd_github', sendGithub);

bot.command('privacidade', sendPrivacy);
bot.action('cmd_privacy', sendPrivacy);

// Inicialização
const start = async () => {
  console.log('🚀 Iniciando Bot Vagas Tech (Community Edition)...');

  // Roda uma limpeza inicial ou verificação se necessário
  bot.launch(() => {
    console.log('✅ Bot conectado ao Telegram!');
  });

  // Inicia o servidor API
  await startServer();
};

start();

// Encerramento Gracioso
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));