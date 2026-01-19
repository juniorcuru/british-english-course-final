# British English Daily (Course Platform)

Plataforma de curso (Next.js App Router) com:
- Login simples offline (localStorage)
- 12 semanas / 60 aulas
- Vídeos embutidos
- Worksheets em PDF por aula
- Quizzes e flashcards
- Progresso local (localStorage)

## Rodar localmente
```bash
npm install
npm run dev
```

## Deploy na Vercel
Importe o repositório no GitHub. A Vercel detecta Next.js automaticamente.

Ou via CLI:
```bash
npm i -g vercel
vercel login
vercel --prod
```

## Login padrão
Edite em `src/lib/auth.ts`
- usuário: antonio
- senha: 1234
