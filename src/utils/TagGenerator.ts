export async function generateHashtags(title: string, origin: string): Promise<string> {
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