import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // Regra para todos os robôs (Google, Bing, etc)
      allow: '/',     // Permite ler tudo
      disallow: ['/api/', '/admin/'], // Bloqueia pastas privadas (opcional)
    },
    sitemap: 'https://auditor.codivatech.com/sitemap.xml', // Aponta para o sitemap
  }
}