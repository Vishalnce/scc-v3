
export const categoryOptions = [
  { value: "pre", label: "Pre" },
  { value: "mains", label: "Mains" },
];

export const subjectOptions = [
  { value: "quantitative-apptitude", label: "Quantitative Apptitude" },
  { value: "reasoning-general", label: "Reasoning & General Intelligence" },
  { value: "english-comprehension", label: "English Comprehension" },
  { value: "general-awareness", label: "General Awareness" },

  { value: "mathematical-abilities", label: "Mathematical Abilities" },

  { value: "computer-knowledge", label: "Computer Knowledge" },
];

export const topicOptions = [
  // English Comprehension
  {
    subject: "english-comprehension",
    label: "Vocabulary",
    value: "vocabulary",
  },
  { subject: "english-comprehension", label: "Grammar", value: "grammar" },
  {
    subject: "english-comprehension",
    label: "Error Spotting and Sentence Improvement",
    value: "error-spotting-sentence-improvement",
  },
  {
    subject: "english-comprehension",
    label: "Comprehension and Usage",
    value: "comprehension-usage",
  },

  // Quantitative Aptitude
  {
    subject: "quantitative-apptitude",
    label: "Arithmetic",
    value: "arithmetic",
  },
  {
    subject: "quantitative-apptitude",
    label: "Data Interpretation",
    value: "data-interpretation",
  },
  {
    subject: "quantitative-apptitude",
    label: "Area & Volume",
    value: "area-volume",
  },
  {
    subject: "quantitative-apptitude",
    label: "Simple Interest (SI) & Compound Interest (CI)",
    value: "si-ci",
  },
  {
    subject: "quantitative-apptitude",
    label: "Time, Speed, Distance",
    value: "time-speed-distance",
  },
  {
    subject: "quantitative-apptitude",
    label: "Time & Work",
    value: "time-work",
  },
  {
    subject: "quantitative-apptitude",
    label: "Ratio & Proportion",
    value: "ratio-proportion",
  },
  {
    subject: "quantitative-apptitude",
    label: "Profit & Loss",
    value: "profit-loss",
  },
  {
    subject: "quantitative-apptitude",
    label: "Percentages",
    value: "percentages",
  },
  { subject: "quantitative-apptitude", label: "Averages", value: "averages" },
  { subject: "quantitative-apptitude", label: "Numbers", value: "numbers" },
  {
    subject: "quantitative-apptitude",
    label: "Mixture and Allegation",
    value: "mixture-allegation",
  },
  {
    subject: "quantitative-apptitude",
    label: "Advanced Mathematics",
    value: "advanced-mathematics",
  },
  {
    subject: "quantitative-apptitude",
    label: "Mensuration",
    value: "mensuration",
  },
  {
    subject: "quantitative-apptitude",
    label: "Trigonometry",
    value: "trigonometry",
  },
  {
    subject: "quantitative-apptitude",
    label: "Statistics",
    value: "statistics",
  },
  { subject: "quantitative-apptitude", label: "Geometry", value: "geometry" },

  // Reasoning
  {
    subject: "reasoning-general",
    label: "Seating Arrangement",
    value: "seating-arrangement",
  },
  { subject: "reasoning-general", label: "Syllogism", value: "syllogism" },
  {
    subject: "reasoning-general",
    label: "Blood Relations",
    value: "blood-relations",
  },
  { subject: "reasoning-general", label: "Puzzles", value: "puzzles" },

  {
    subject: "reasoning-general",
    label: "Inequalities",
    value: "inequalities",
  },
  {
    subject: "reasoning-general",
    label: "Input-Output",
    value: "input-output",
  },
  {
    subject: "reasoning-general",
    label: "Coding-Decoding",
    value: "coding-decoding",
  },
  {
    subject: "reasoning-general",
    label: "Data Sufficiency",
    value: "data-sufficiency",
  },
  {
    subject: "reasoning-general",
    label: "Order and Ranking",
    value: "order-ranking",
  },
  {
    subject: "reasoning-general",
    label: "Alphanumeric Series",
    value: "alphanumeric-series",
  },
  { subject: "reasoning-general", label: "Directions", value: "directions" },
  { subject: "reasoning-general", label: "Analogy", value: "analogy" },
  {
    subject: "reasoning-general",
    label: "Classification/Odd One Out",
    value: "classification",
  },
  {
    subject: "reasoning-general",
    label: "Statement and Conclusion",
    value: "statement-conclusion",
  },
  {
    subject: "reasoning-general",
    label: "Statement and Assumption",
    value: "statement-assumption",
  },
  {
    subject: "reasoning-general",
    label: "Statement and Arguments",
    value: "statement-arguments",
  },
  {
    subject: "reasoning-general",
    label: "Cause and Effect",
    value: "cause-effect",
  },
  {
    subject: "reasoning-general",
    label: "Logical Venn Diagrams",
    value: "logical-venn-diagrams",
  },
  {
    subject: "reasoning-general",
    label: "Number Series",
    value: "number-series",
  },
  { subject: "reasoning-general", label: "Calender", value: "calender" },

  { subject: "reasoning-general", label: "Clock", value: "clock" },
  {
    subject: "reasoning-general",
    label:
      "Non-Verbal Reasoning (Mirror Image, Water Image, Paper Folding, etc.)",
    value: "non-verbal-reasoning",
  },
  {
    subject: "reasoning-general",
    label: "Embedded Figures",
    value: "embedded-figures",
  },
  { subject: "reasoning-general", label: "Cube and Dice", value: "cube-dice" },
  {
    subject: "reasoning-general",
    label: "Figure Series",
    value: "figure-series",
  },
  {
    subject: "reasoning-general",
    label: "Coding using Symbols",
    value: "coding",
  },

  // Computer Knowledge
  {
    subject: "computer-knowledge",
    label: "Basics of Computers",
    value: "basics-computers",
  },
  {
    subject: "computer-knowledge",
    label: "Operating System (OS)",
    value: "os",
  },
  { subject: "computer-knowledge", label: "Software", value: "software" },
  {
    subject: "computer-knowledge",
    label: "Internet and Web",
    value: "internet-web",
  },
  {
    subject: "computer-knowledge",
    label: "Networking and Communication",
    value: "networking",
  },
  {
    subject: "computer-knowledge",
    label: "MS Office Tools",
    value: "ms-office",
  },
  {
    subject: "computer-knowledge",
    label: "Cyber Security & Malware",
    value: "cyber-security",
  },
  {
    subject: "computer-knowledge",
    label: "Computer Abbreviations and Terminology",
    value: "computer-abbreviations",
  },

  // General Awareness
  { subject: "general-awareness", label: "History", value: "history" },
  { subject: "general-awareness", label: "Geography", value: "geography" },
  {
    subject: "general-awareness",
    label: "Indian Polity",
    value: "indian-polity",
  },
  {
    subject: "general-awareness",
    label: "Indian Economy",
    value: "indian-economy",
  },
  {
    subject: "general-awareness",
    label: "General Science",
    value: "general-science",
  },
  {
    subject: "general-awareness",
    label: "Current Affairs",
    value: "current-affairs",
  },
  {
    subject: "general-awareness",
    label: "Static General Knowledge",
    value: "static-gk",
  },
  {
    subject: "general-awareness",
    label: "Art and Culture",
    value: "art-culture",
  },

  {
    subject: "general-awareness",
    label: "Environment and Ecology",
    value: "environment-ecology",
  },
  {
    subject: "general-awareness",
    label: "Government Schemes and Policies",
    value: "govt-schemes",
  },
  {
    subject: "general-awareness",
    label: "Important Days and Events",
    value: "important-days",
  },
  {
    subject: "general-awareness",
    label: "Books and Authors",
    value: "books-authors",
  },
  {
    subject: "general-awareness",
    label: "Sports and Awards",
    value: "sports-awards",
  },
  {
    subject: "general-awareness",
    label: "Miscellaneous GK",
    value: "miscellaneous-gk",
  },
];