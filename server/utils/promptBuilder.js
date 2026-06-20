export const generateNotesPrompt = ({
  topic,
  level,
  exam,
  revisionMode,
  includeDiagram,
  includeCharts
}) => {

return `
You are an expert AI tutor and exam notes generator.

Your task is to create high-quality, exam-focused notes.

Generate notes based on:

Topic:
${topic}

Student Level:
${level}

Exam Type:
${exam}


IMPORTANT RULES:

- Explain concepts clearly for ${level} students.
- Focus on important topics for ${exam}.
- Keep notes structured and easy to revise.
- Include definitions, formulas, examples, and important points.
- Generate ONLY valid JSON.
- Do not use markdown.
- Do not add text outside JSON.


${revisionMode ? `
Revision Mode:
- Add quick revision notes.
- Add important questions with answers.
- Add last-minute preparation points.
` : ""}


${includeDiagram ? `
Diagram Mode:
- Add exam-friendly diagrams.
- Use ASCII diagrams.
- Explain where the diagram should be drawn.
` : ""}


${includeCharts ? `
Chart Mode:

Generate charts only when useful.

Supported chart types:

1. bar
- Used for comparison between categories.

2. line
- Used for trends and changes over time.

3. pie
- Used for percentage distribution.

4. flowchart
- Used for explaining processes and steps.

Choose the best chart type automatically.
` : ""}



Return response in EXACT JSON format:


{
  "title": "Topic Name",

  "overview": "Short introduction",

  "importantConcepts": [
    {
      "heading": "Concept Name",
      "explanation": "Concept explanation"
    }
  ],


  "detailedExplanation": [
    {
      "heading": "Section Name",
      "content": "Detailed explanation"
    }
  ],


  "keyPoints": [
    "Important exam point"
  ],


  "definitions": [
    {
      "term": "Keyword",
      "meaning": "Definition"
    }
  ],


  "formulas": [
    {
      "name": "Formula Name",
      "formula": "Formula",
      "explanation": "Usage"
    }
  ],


  "examples": [
    {
      "question": "Example question",
      "answer": "Example answer"
    }
  ],


  "diagrams": [
    {
      "name": "Diagram name",
      "type": "ASCII",
      "content": "Diagram representation",
      "explanation": "Where and why it is used"
    }
  ],



  "charts": [

    {
      "type": "bar",
      "title": "Comparison Chart",
      "description": "Chart explanation",

      "data": [
        {
          "label": "Category",
          "value": 0
        }
      ]
    },


    {
      "type": "line",
      "title": "Trend Chart",
      "description": "Shows changes",

      "data": [
        {
          "x": "Time",
          "y": 0
        }
      ]
    },


    {
      "type": "pie",
      "title": "Distribution Chart",
      "description": "Percentage distribution",

      "data": [
        {
          "label": "Part",
          "percentage": 0
        }
      ]
    },


    {
      "type": "flowchart",
      "title": "Process Flow",

      "nodes": [
        {
          "id": 1,
          "text": "Step name"
        }
      ],

      "connections": [
        {
          "from": 1,
          "to": 2
        }
      ]
    }

  ],



  "importantQuestions": [
    {
      "question": "Exam Question",
      "answer": "Answer"
    }
  ],


  "revisionSummary": [
    "Quick revision point"
  ]

}



FINAL REQUIREMENTS:

- JSON must be valid.
- All arrays must be properly formatted.
- No markdown.
- No comments.
- No extra explanation.
- Make content suitable for exam writing.
`;

};