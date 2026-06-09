export type NavItem = {
  href: string;
  label: string;
};

export const navItems: NavItem[] = [
  { href: '/projects', label: 'Projects' },
  { href: '/work', label: 'Work' },
  { href: '/writing', label: 'Writing' },
  { href: '/contact', label: 'Contact' },
];

export const heroContent = {
  intro:
    'Building production RAG systems that ship reliably, fail gracefully, and behave predictably under real load.',
  location: 'Redmond, WA',
};

export const retrievalConstellation = {
  kicker: 'Interactive Lab',
  title: 'Retrieval Constellation',
  description:
    'A small map of what a production RAG system sees before it decides what to trust.',
  fieldNote:
    'I grew up in Delhi, India - surrounded by chaos but more interested in what happened when systems broke. Today I build production RAG systems for workflows that do not get a second chance to hallucinate in front of a real user. I care as much about how a system fails as I do about how it runs on a good day.',
  scenarios: [
    {
      id: 'good-answer',
      label: 'Good Answer',
      status: 'Healthy Retrieval',
      query: 'How do we spot source drift before users do?',
      summary:
        'The top context agrees with fresh traces and eval notes, so the answer can cite confidently.',
      diagnosis: 'Pass with citation freshness monitoring.',
      nodes: [
        {
          id: 'trace-logs',
          title: 'Trace Logs',
          type: 'Observability',
          score: '0.94',
          source: 'Production sessions',
          reason: 'Matches recent successful answers and request metadata.',
          x: 24,
          y: 28,
        },
        {
          id: 'eval-notebook',
          title: 'Eval Notebook',
          type: 'Quality Gate',
          score: '0.91',
          source: 'Regression suite',
          reason: 'Confirms the new retrieval set passes answer-grounding checks.',
          x: 74,
          y: 24,
        },
        {
          id: 'source-policy',
          title: 'Source Policy',
          type: 'Guardrail',
          score: '0.87',
          source: 'Internal docs',
          reason: 'Provides the citation rules used to filter stale snippets.',
          x: 80,
          y: 70,
        },
        {
          id: 'runbook',
          title: 'Runbook',
          type: 'Ops Context',
          score: '0.82',
          source: 'On-call notes',
          reason: 'Adds the expected remediation path if drift returns.',
          x: 28,
          y: 76,
        },
      ],
    },
    {
      id: 'bad-retrieval',
      label: 'Bad Retrieval',
      status: 'Source Drift',
      query: 'Why did answer quality drop after the latest knowledge update?',
      summary:
        'The retriever found high-score chunks, but two came from stale docs that contradict the new policy.',
      diagnosis: 'Block answer, lower stale-source weight, and queue trace review.',
      nodes: [
        {
          id: 'stale-doc',
          title: 'Legacy Policy',
          type: 'Stale Source',
          score: '0.89',
          source: 'Archived docs',
          reason: 'Looks semantically close but conflicts with the current policy.',
          x: 20,
          y: 34,
        },
        {
          id: 'fresh-doc',
          title: 'Current Policy',
          type: 'Fresh Source',
          score: '0.86',
          source: 'Release notes',
          reason: 'Contains the correct rule but was ranked below older context.',
          x: 76,
          y: 27,
        },
        {
          id: 'complaint-trace',
          title: 'Complaint Trace',
          type: 'User Signal',
          score: '0.77',
          source: 'Support queue',
          reason: 'Shows the answer failed when stale and fresh sources mixed.',
          x: 82,
          y: 74,
        },
        {
          id: 'index-diff',
          title: 'Index Diff',
          type: 'Infra Signal',
          score: '0.72',
          source: 'Vector index',
          reason: 'Highlights the ingestion batch that introduced the conflict.',
          x: 30,
          y: 78,
        },
      ],
    },
    {
      id: 'prompt-regression',
      label: 'Prompt Regression',
      status: 'Instruction Collision',
      query: 'Why is the model citing correctly but answering too broadly?',
      summary:
        'Retrieval is healthy, but the prompt now over-prioritizes coverage instead of concise grounded answers.',
      diagnosis: 'Patch prompt priority and replay the eval harness.',
      nodes: [
        {
          id: 'prompt-diff',
          title: 'Prompt Diff',
          type: 'Instruction Change',
          score: '0.93',
          source: 'Prompt registry',
          reason: 'Shows the exact instruction that broadened answer scope.',
          x: 24,
          y: 22,
        },
        {
          id: 'grounded-answer',
          title: 'Grounded Answer',
          type: 'Reference Output',
          score: '0.84',
          source: 'Golden set',
          reason: 'Provides the shorter answer shape the system should preserve.',
          x: 76,
          y: 32,
        },
        {
          id: 'latency-budget',
          title: 'Latency Budget',
          type: 'Runtime Limit',
          score: '0.79',
          source: 'Service metrics',
          reason: 'Confirms the longer answer also increased generation time.',
          x: 78,
          y: 76,
        },
        {
          id: 'eval-failure',
          title: 'Eval Failure',
          type: 'Regression Signal',
          score: '0.88',
          source: 'CI eval run',
          reason: 'Flags verbosity and missed refusal boundary after the prompt update.',
          x: 26,
          y: 70,
        },
      ],
    },
  ],
} as const;

export const routeLabels = {
  projects: { en: 'Projects', hi: 'परियोजनाएं' },
  work: { en: 'Work', hi: 'कार्य' },
  writing: { en: 'Writing', hi: 'लेखन' },
  contact: { en: 'Contact', hi: 'संपर्क' },
  currently: { en: 'Currently', hi: 'अभी' },
  education: { en: 'Education', hi: 'शिक्षा' },
} as const;
