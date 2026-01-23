# 🤖 VagasTechPro

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-white)

> **Centralizador de Vagas de TI Inteligente**: Um sistema híbrido que monitora diversas fontes de vagas, notifica via Telegram e disponibiliza um dashboard web moderno.

## 🚀 Sobre o Projeto

O **VagasTechPro** resolve o problema da fragmentação de vagas de tecnologia. Em vez de visitar dezenas de sites diariamente, nosso sistema utiliza scrapers inteligentes para centralizar oportunidades, filtrar conteúdo irrelevante e entregar valor real para desenvolvedores.

O projeto opera em duas frentes integradas:
1.  **Bot & Scrapers:** Backend que varre a web e notifica canais do Telegram.
2.  **Web Dashboard:** Interface Next.js para busca, filtragem e visualização de dados históricos.

---

## 🛠️ Stack Tecnológica

O projeto foi construído utilizando as melhores práticas do mercado:

### Core & Backend
* **Node.js & TypeScript**: Base sólida e tipada.
* **Puppeteer (Stealth)**: Web Scraping avançado (LinkedIn, Indeed, etc.).
* **Telegraf**: Integração robusta com a API do Telegram.
* **Node-cron**: Agendamento de tarefas.

### Dados
* **SQLite**: Banco de dados leve e eficiente.
* **Prisma ORM**: Gerenciamento de schema e queries type-safe.

### Frontend (Web)
* **Next.js 14+**: App Router, Server Actions e SSR.
* **React**: Biblioteca de UI.
* **Tailwind CSS**: Estilização moderna e responsiva.
* **Date-fns**: Manipulação de datas.

---

## ⚙️ Funcionalidades

- [x] **Scraping Multi-Fonte**: Suporte a LinkedIn, Indeed e Programathor.
- [x] **Anti-Bot Protection**: Uso de plugins stealth para evitar bloqueios.
- [x] **Filtros Inteligentes**: Remove vagas que não são de TI (ex: motorista, vendedor).
- [x] **Telegram Bot**: Envio automático de novas vagas para canal.
- [x] **Web Dashboard**: Lista paginada com busca instantânea via Server Actions.
- [x] **Estatísticas**: Monitoramento de vagas diárias e fontes.
- [x] **API REST**: Endpoint `/api/jobs` para integrações externas.

---

## 📦 Instalação e Configuração

### Pré-requisitos
* Node.js (v18 ou superior)
* NPM ou Yarn

### 1. Clone o repositório
```bash
git clone [https://github.com/dants0/vagastechpro.git](https://github.com/dants0/vagastechpro.git)
cd vagastechpro# vagastechpro
