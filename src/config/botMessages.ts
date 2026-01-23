export const BotMessages = {
  // --- TEXTOS GERAIS ---
  START: (firstName: string) =>
    `👋 <b>Olá, ${firstName}!</b>\n\n` +
    `Eu sou o <b>Bot Vagas Tech</b> (Community Edition).\n` +
    `Meu trabalho é varrer a internet para trazer as melhores vagas de TI direto para você, de graça.\n\n` +
    `🔻 <b>Como posso ajudar?</b>`,

  HELP:
    `🤖 <b>Como funciona?</b>\n\n` +
    `1️⃣ <b>Coleta:</b> Monitoramos LinkedIn, Programathor, RemoteOK e outros.\n` +
    `2️⃣ <b>Filtro:</b> Removemos vagas que não são de TI.\n` +
    `3️⃣ <b>Entrega:</b> Postamos no canal assim que encontramos.\n\n` +
    `Este é um projeto Open Source mantido pela comunidade.`,

  PRIVACY:
    `🔒 <b>Privacidade</b>\n\n` +
    `Nós não armazenamos seus dados pessoais. Apenas seu ID do Telegram é usado para logs técnicos de erro, se necessário.\n` +
    `Nenhum dado é vendido ou compartilhado.`,

  GITHUB:
    `https://github.com/dants0`,

  // --- BOTÕES ---
  BUTTONS: {
    HELP: '❓ Como funciona?',
    PRIVACY: '🔒 Privacidade',
    GITHUB: '🐱 GitHub (Código)' // Opcional: Link pro repo
  }
};