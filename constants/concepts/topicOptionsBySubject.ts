// constants/concepts/topicOptionsBySubject.ts

export type TopicOption = {
  value: string;
  label: string;
};

export const topicOptionsBySubject: Record<string, TopicOption[]> = {
  "english-comprehension": [
    { label: "Vocabulary", value: "vocabulary" },
    { label: "Grammar", value: "grammar" },
    {
      label: "Error Spotting and Sentence Improvement",
      value: "error-spotting-sentence-improvement",
    },
    { label: "Comprehension and Usage", value: "comprehension-usage" },
  ],
  "quantitative-apptitude": [
    { label: "Arithmetic", value: "arithmetic" },
    { label: "Data Interpretation", value: "data-interpretation" },
    { label: "Area & Volume", value: "area-volume" },
    { label: "Simple Interest (SI) & Compound Interest (CI)", value: "si-ci" },
    { label: "Time, Speed, Distance", value: "time-speed-distance" },
    { label: "Time & Work", value: "time-work" },
    { label: "Ratio & Proportion", value: "ratio-proportion" },

    { label: "Profit & Loss", value: "profit-loss" },

    { label: "Percentages", value: "percentages" },

    { label: "Averages", value: "averages" },

    { label: "Numbers", value: "numbers" },

    { label: "Mixture and Allegation", value: "mixture-allegation" },

    { label: "Advanced Mathematics", value: "advanced-mathematics" },
    { label: "Mensuration", value: "mensuration" },
    { label: "Trigonometry", value: "trigonometry" },
    { label: "Statistics", value: "statistics" },
    { label: "Geometry", value: "geometry" },
  ],
  "reasoning-general": [
    { label: "Seating Arrangement", value: "seating-arrangement" },
    { label: "Syllogism", value: "syllogism" },
    { label: "Blood Relations", value: "blood-relations" },
    { label: "Puzzles", value: "puzzles" },
    { label: "Inequalities", value: "inequalities" },
    { label: "Input-Output", value: "input-output" },
    { label: "Coding-Decoding", value: "coding-decoding" },
    { label: "Data Sufficiency", value: "data-sufficiency" },
    { label: "Order and Ranking", value: "order-ranking" },
    { label: "Alphanumeric Series", value: "alphanumeric-series" },
    { label: "Directions", value: "directions" },
    { label: "Analogy", value: "analogy" },
    { label: "Classification/Odd One Out", value: "classification" },
    { label: "Statement and Conclusion", value: "statement-conclusion" },
    { label: "Cause and Effect", value: "cause-effect" },
    { label: "Logical Venn Diagrams", value: "logical-venn-diagrams" },
    { label: "Number Series", value: "number-series" },

    { label: "Calender", value: "calender" },
    { label: "Clock", value: "clock" },
    {
      label:
        "Non-Verbal Reasoning (Mirror Image, Water Image, Paper Folding, etc.)",
      value: "non-verbal-reasoning",
    },
    { label: "Embedded Figures", value: "embedded-figures" },

    { label: "Cube and Dice", value: "cube-dice" },
    { label: "Coding using Symbols", value: "coding" },
    { label: "Figure Series", value: "figure-series" },
  ],
  "computer-knowledge": [
    { label: "Basics of Computers", value: "basics-computers" },
    { label: "Operating System (OS)", value: "os" },
    { label: "Software", value: "software" },
    { label: "Internet and Web", value: "internet-web" },
    { label: "Networking and Communication", value: "networking" },
    { label: "MS Office Tools", value: "ms-office" },
    { label: "Cyber Security & Malware", value: "cyber-security" },
    {
      label: "Computer Abbreviations and Terminology",
      value: "computer-abbreviations",
    },
  ],

  "general-awareness": [
    { label: "History", value: "history" },
    { label: "Geography", value: "geography" },
    { label: "Indian Polity", value: "indian-polity" },
    { label: "Indian Economy", value: "indian-economy" },
    { label: "General Science", value: "general-science" },
    { label: "Current Affairs", value: "current-affairs" },
    { label: "Static General Knowledge", value: "static-gk" },
    { label: "Art and Culture", value: "art-culture" },

    { label: "Environment and Ecology", value: "environment-ecology" },
    { label: "Government Schemes and Policies", value: "govt-schemes" },
    { label: "Important Days and Events", value: "important-days" },
    { label: "Books and Authors", value: "books-authors" },
    { label: "Sports and Awards", value: "sports-awards" },
    { label: "Miscellaneous GK", value: "miscellaneous-gk" },
  ],

  "mathematics-ability": [
    { label: "Arithmetic", value: "arithmetic" },
    { label: "Data Interpretation", value: "data-interpretation" },
    { label: "Area & Volume", value: "area-volume" },
    { label: "Simple Interest (SI) & Compound Interest (CI)", value: "si-ci" },
    { label: "Time, Speed, Distance", value: "time-speed-distance" },
    { label: "Time & Work", value: "time-work" },
    { label: "Ratio & Proportion", value: "ratio-proportion" },

    { label: "Profit & Loss", value: "profit-loss" },

    { label: "Percentages", value: "percentages" },

    { label: "Averages", value: "averages" },

    { label: "Numbers", value: "numbers" },

    { label: "Mixture and Allegation", value: "mixture-allegation" },

    { label: "Advanced Mathematics", value: "advanced-mathematics" },
    { label: "Mensuration", value: "mensuration" },
    { label: "Trigonometry", value: "trigonometry" },
    { label: "Statistics", value: "statistics" },
    { label: "Geometry", value: "geometry" },

    
  ],

    "pyq": [
    { label: "Quantitative Aptitude", value: "quantitative-apptitude" },
    { label: "Reasoning & General Intelligence", value: "reasoning-general" },
    { label: "General Awareness", value: "general-awareness" },
    { label: "Mathematical Abilities", value: "mathematical-abilities" },
    { label: "Computer Knowledge", value: "computer-knowledge" },
    { label: "English Comprehension", value: "english-comprehension" },
   
  ],
};
