export type MonologueContent = {
  intro: string;
  introHighlight: string;
  introSuffix: string;
  story: string;
  listLead: string;
  items: string[];
  closing: string;
  closingHighlight: string;
  closingSuffix: string;
};

export const monologue: MonologueContent = {
  intro: "Hi, I'm Harsh. I'm a software engineer. I write backend code and build features on top of",
  introHighlight: 'AI models',
  introSuffix: '.',
  story:
    'I got into computers as a kid, fixing up an old PC so it could run games. I\'ve been tinkering ever since.',
  listLead: "A few things I've worked on:",
  items: [
    'a zero-downtime database migration',
    'prompts running on six OpenAI models',
    'REST APIs on AWS Lambda',
  ],
  closing: "I'm looking for my next role. If any of that sounds interesting,",
  closingHighlight: 'say hello',
  closingSuffix: '.',
};
