export type QuizQ = {
  q: string;
  options: string[];
  answerIndex: number;
  explain?: string;
};

export type Lesson = {
  slug: string;
  title: string;
  module: number;
  week: number;
  day: number; // 1-5
  minutes: number;
  goals: string[];
  pronunciation: { focus: string; drills: string[] };
  listening: {
    title: string;
    link: string;
    embedType: "youtube" | "audio" | "none";
    embedUrl?: string;     // usado para iframe (YouTube)
    audioUrl?: string;     // usado para player HTML5
    tasks: string[];
  };
  worksheetPdf: string; // caminho em /public
  vocab: { term: string; meaning: string; example: string }[];
  grammar: { topic: string; notes: string[]; practice: string[] };
  speaking: { task: string; prompts: string[]; shadowing: string };
  quiz: QuizQ[];
  checklist: string[];
  flashcards: { front: string; back: string }[];
};

const weekdays = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function makeVocab(base: string[]) {
  return base.slice(0, 12).map((t, i) => ({
    term: t,
    meaning: `Significado e uso britânico de "${t}"`,
    example: `Example: I use "${t}" in a UK sentence (${i + 1}).`
  }));
}

function makeFlashcards(vocab: { term: string; meaning: string; example: string }[]) {
  return vocab.map(v => ({
    front: v.term,
    back: `${v.meaning}\n${v.example}`
  }));
}

function makeQuiz(week: number, day: number, topic: string): QuizQ[] {
  const base: QuizQ[] = [
    {
      q: `Qual opção é mais comum no inglês britânico para o tema: ${topic}?`,
      options: ["US-only phrasing", "UK-natural phrasing", "Portuguese literal translation", "Random word"],
      answerIndex: 1,
      explain: "O objetivo é reforçar naturalidade no padrão UK."
    },
    {
      q: `Complete a frase no padrão UK: "Could you ____ help me?"`,
      options: ["to", "please", "for", "at"],
      answerIndex: 1
    },
    {
      q: `Escolha a melhor resposta curta (UK): "Do you fancy a coffee?"`,
      options: ["I fancy", "Sounds good", "I do coffee", "I want fancy"],
      answerIndex: 1
    },
    {
      q: `Identifique a forma correta (UK):`,
      options: ["I have got", "I have gotten", "I gotten", "I got have"],
      answerIndex: 0
    },
    {
      q: `Word choice UK: "lift" significa...`,
      options: ["elevator", "subway", "apartment", "queue"],
      answerIndex: 0
    }
  ];
  while (base.length < 10) {
    const n = base.length + 1;
    base.push({
      q: `Questão ${n}: (Semana ${week}, Dia ${day}) Qual é a melhor opção?`,
      options: [`Opção A`, `Opção B (correta)`, `Opção C`, `Opção D`],
      answerIndex: 1
    });
  }
  return base;
}

function moduleOfWeek(week: number) {
  if (week <= 4) return 1;
  if (week <= 8) return 2;
  return 3;
}

const weekThemes: Record<number, string> = {
  1: "Foundation UK",
  2: "Daily Life UK",
  3: "Survival Conversations",
  4: "Past & Stories",
  5: "Present Perfect UK",
  6: "Opinions & Talking",
  7: "Travel UK",
  8: "Work & Study",
  9: "Real British Listening",
  10: "Phrasal Verbs & Idioms UK",
  11: "Advanced Conversation",
  12: "Final Sprint"
};

const weekPronunciation: Record<number, string> = {
  1: "T britânico + ritmo",
  2: "vogais /ɑː/ vs /ɒ/ + entonação",
  3: "linking (conexão de palavras)",
  4: "-ed endings",
  5: "schwa /ə/",
  6: "entonação para opinião",
  7: "non-rhotic R (R não pronunciado no fim)",
  8: "word stress",
  9: "glottal T",
  10: "contrações e ritmo",
  11: "question tags + entonação",
  12: "polimento geral"
};

const dayTopics = [
  "Introdução & expressões base",
  "Vocabulário e rotina",
  "Perguntas e respostas",
  "Situações reais",
  "Teste semanal"
];

const vocabBanks: Record<number, string[]> = {
  1: ["cheers", "mate", "brilliant", "lovely", "queue", "flat", "lift", "bin", "biscuit", "holiday", "trainers", "postcode"],
  2: ["cinema", "petrol", "garden", "tap", "rubber", "lorry", "boot", "nappy", "pram", "crisps", "torch", "timetable"],
  3: ["Could you...?", "Would you mind...?", "Excuse me", "I’m afraid...", "No worries", "That’d be great", "How much is it?", "I’ll have...", "Takeaway", "bill", "tap water", "toilets"],
  4: ["yesterday", "last week", "ago", "then", "suddenly", "eventually", "went", "saw", "bought", "met", "told", "felt"],
  5: ["already", "yet", "just", "ever", "never", "since", "for", "lately", "recently", "I’ve been", "I’ve seen", "I’ve done"],
  6: ["in my view", "I reckon", "I suppose", "however", "although", "besides", "on the other hand", "fair enough", "I agree", "I’m not sure", "definitely", "probably"],
  7: ["departure", "gate", "boarding pass", "luggage", "single ticket", "return ticket", "platform", "mind the gap", "reception", "reservation", "complaint", "pharmacy"],
  8: ["meeting", "deadline", "schedule", "colleague", "manager", "feedback", "follow up", "asap", "minutes (meeting)", "agenda", "onboarding", "remote"],
  9: ["chunking", "gist", "key points", "accent", "intonation", "speed", "repeat", "pause", "shadow", "note-taking", "predict", "context"],
  10: ["carry on", "sort out", "pick up", "look after", "put off", "run out", "come across", "turn up", "take the mick", "knackered", "faff", "dodgy"],
  11: ["isn’t it?", "don’t you?", "shall we?", "I’d rather", "it depends", "to be honest", "in fact", "I’d say", "I see your point", "I take your point", "nevertheless", "overall"],
  12: ["review", "mastery", "fluency", "clarity", "confidence", "accuracy", "coherence", "summary", "key takeaways", "final speaking", "final writing", "goals"]
};

function listeningLinkForWeek(week: number) {
  if (week <= 6) return "https://www.bbc.co.uk/learningenglish/";
  if (week <= 8) return "https://learnenglish.britishcouncil.org/";
  return "https://www.bbc.co.uk/sounds";
}

// vídeos demonstrativos (você pode trocar depois para vídeos próprios)
const youtubeEmbeds: Record<number, string> = {
  1: "https://www.youtube.com/embed/QjD0bB3Z1dU",
  2: "https://www.youtube.com/embed/UpjvJvJQWJc",
  3: "https://www.youtube.com/embed/3FDXisgqE2g",
  4: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  5: "https://www.youtube.com/embed/oHg5SJYRHA0",
  6: "https://www.youtube.com/embed/TuE4jG4c73c",
  7: "https://www.youtube.com/embed/9F8pS8pD1z4",
  8: "https://www.youtube.com/embed/7wGJt2uQpuc",
  9: "https://www.youtube.com/embed/5a3F2Uq5d1Y",
  10:"https://www.youtube.com/embed/KxkY5C4R1wA",
  11:"https://www.youtube.com/embed/NmTQXzjF3dI",
  12:"https://www.youtube.com/embed/6g5ZpBq4M3s"
};

export function buildCourse(): Lesson[] {
  const lessons: Lesson[] = [];
  for (let week = 1; week <= 12; week++) {
    for (let day = 1; day <= 5; day++) {
      const module = moduleOfWeek(week);
      const topic = `${weekThemes[week]} — ${dayTopics[day - 1]}`;
      const title = `Semana ${week} • ${weekdays[day - 1]} — ${dayTopics[day - 1]}`;
      const slug = slugify(`w${week}-d${day}-${topic}`);

      const vocab = makeVocab(vocabBanks[week] ?? vocabBanks[1]);

      lessons.push({
        slug,
        title,
        module,
        week,
        day,
        minutes: 60,
        goals: [
          `Falar com mais naturalidade no padrão UK (${weekThemes[week]})`,
          `Treinar pronúncia: ${weekPronunciation[week]}`,
          "Fixar 10–15 termos essenciais + 1 ponto de gramática",
          "Praticar speaking (shadowing) diariamente"
        ],
        pronunciation: {
          focus: weekPronunciation[week],
          drills: [
            "Minimal pairs (2 min)",
            "Frases curtas com ritmo UK (4 min)",
            "Shadowing de 30 segundos (4 min)"
          ]
        },
        listening: {
          title: `Aula em vídeo — ${topic}`,
          link: listeningLinkForWeek(week),
          embedType: "youtube",
          embedUrl: youtubeEmbeds[week],
          tasks: [
            "Assista uma vez sem pausa e anote 3 expressões",
            "Reassista e copie 5 frases (transcrição)",
            "Faça shadowing por 60 segundos"
          ]
        },
        worksheetPdf: `/worksheets/week-${String(week).padStart(2,"0")}-day-${day}.pdf`,
        vocab,
        grammar: {
          topic: week <= 2 ? "Present Simple / perguntas" :
                 week <= 4 ? "Past Simple" :
                 week <= 5 ? "Present Perfect" :
                 week <= 6 ? "Connectors & comparisons" :
                 week <= 8 ? "Work English + polite phrases" :
                 week <= 10 ? "Phrasal verbs & idioms" :
                 "Conversation patterns + review",
          notes: [
            "Regra principal em 3 linhas (simples e prática).",
            "Exemplo UK natural.",
            "Erro comum de brasileiro (tradução literal)."
          ],
          practice: [
            "Escreva 5 frases usando o tópico.",
            "Transforme 5 frases em perguntas.",
            "Faça 3 respostas completas em voz alta."
          ]
        },
        speaking: {
          task: `Grave 60–120s falando sobre: ${topic}`,
          prompts: [
            "Diga 3 ideias principais",
            "Dê um exemplo real",
            "Use 2 expressões britânicas do vocabulário"
          ],
          shadowing: "Repita 5 vezes um trecho curto do vídeo com ritmo britânico."
        },
        quiz: makeQuiz(week, day, topic),
        checklist: [
          "Fiz o warm-up de pronúncia",
          "Assisti a aula em vídeo (1x sem pausa)",
          "Reassisti a aula em vídeo (com anotações)",
          "Aprendi o vocabulário do dia",
          "Fiz a prática de gramática",
          "Gravei o speaking task",
          "Fiz o quiz",
          "Baixei/completei o worksheet em PDF"
        ],
        flashcards: makeFlashcards(vocab)
      });
    }
  }
  return lessons;
}

export const course = buildCourse();

export function getLesson(slug: string) {
  return course.find(l => l.slug === slug) ?? null;
}

export function groupedCurriculum() {
  const modules = [1,2,3].map(m => ({
    module: m,
    title: m === 1 ? "Módulo 1 — Foundation UK" : m === 2 ? "Módulo 2 — Fluency" : "Módulo 3 — Real British",
    weeks: [] as number[]
  }));

  function moduleOfWeekInner(week: number) {
    if (week <= 4) return 1;
    if (week <= 8) return 2;
    return 3;
  }

  for (let w = 1; w <= 12; w++) {
    modules[moduleOfWeekInner(w)-1].weeks.push(w);
  }

  return modules;
}
