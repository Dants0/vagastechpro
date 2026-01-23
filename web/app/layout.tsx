import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vagastechpro.codivatech.com'), // Define a base para imagens relativas
  title: {
    default: "Vagas Tech Pro | Agregador de Vagas de TI e Programação",
    template: "%s | Vagas Tech Pro"
  },
  description: "Centralizamos milhares de vagas de TI, Dados e Infraestrutura em tempo real. Encontre oportunidades remotas e presenciais sem perder tempo em múltiplos sites. 100% Gratuito e Open Source.",
  keywords: [
    "Vagas TI",
    "Emprego Programador",
    "Vagas Home Office",
    "Desenvolvedor Frontend",
    "Backend",
    "Data Science",
    "DevOps",
    "Agregador de Vagas",
    "Bot Telegram TI"
  ],
  authors: [{ name: "CodivaTech", url: "https://codivatech.com" }],
  creator: "CodivaTech",
  publisher: "CodivaTech",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Vagas Tech Pro | Achar vaga de TI nunca foi tão fácil",
    description: "Nosso robô varre a internet 24h por dia para trazer as melhores vagas de tecnologia para você. Acesse agora.",
    url: 'https://vagastechpro.codivatech.com',
    siteName: 'Vagas Tech Pro',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Vagas Tech Pro | Agregador de Vagas de TI",
    description: "Pare de abrir 10 sites diferentes. Todas as vagas de tecnologia em um só lugar.",
    creator: "@codivatech", // Se tiver twitter da empresa
  },
  applicationName: 'Vagas Tech Pro',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <GoogleAnalytics gaId="G-33RFRM68QK" />
      </body>
    </html>
  );
}
