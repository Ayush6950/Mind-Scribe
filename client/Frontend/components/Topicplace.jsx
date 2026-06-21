import { motion } from "motion/react";
import { useState } from "react";
import { generateNotes } from "../src/service/api";


export default function Topicplace() {


  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");
  const [exam, setExam] = useState("");

  // State for error, loading, and result
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  //toggle
  const [revisionMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeCharts, setIncludeCharts] = useState(false);


  const handleSubmit = async () => {
    if (!topic.trim()) {
      setError("please enter the topic");
      return;
    }
   
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const data = await generateNotes({
        topic,
        level,
        exam,
        revisionMode,
        includeDiagram,
        includeCharts,
      });

      if (data && data.success) {
        setResult(data.data);
      } else {
        setError(data?.message || "Failed to generate notes");
      }
    } catch (err) {
      setError(err.message || "Failed to generate notes");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!result) return;
    
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to download/print the PDF.");
      return;
    }
    
    printWindow.document.write(`
      <html>
        <head>
          <title>\${result.title || "Study Notes"}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            body {
              font-family: 'Inter', sans-serif;
              color: #1f2937;
              background: #ffffff;
              padding: 40px;
              line-height: 1.6;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
              border-bottom: 2px solid #e5e7eb;
              padding-bottom: 20px;
            }
            .header h1 {
              font-size: 32px;
              color: #111827;
              margin: 0 0 10px 0;
            }
            .header p {
              font-size: 14px;
              color: #6b7280;
              margin: 0;
            }
            h2 {
              font-size: 20px;
              color: #374151;
              margin-top: 30px;
              margin-bottom: 15px;
              border-bottom: 1px solid #e5e7eb;
              padding-bottom: 5px;
            }
            p {
              font-size: 14px;
              color: #4b5563;
              margin-bottom: 15px;
            }
            ul, ol {
              margin-bottom: 15px;
              padding-left: 20px;
            }
            li {
              font-size: 14px;
              color: #4b5563;
              margin-bottom: 6px;
            }
            .section-card {
              margin-bottom: 30px;
              page-break-inside: avoid;
            }
            .grid-2 {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
            }
            @media (max-width: 600px) {
              .grid-2 {
                grid-template-columns: 1fr;
              }
            }
            .concept-card {
              border: 1px solid #e5e7eb;
              padding: 15px;
              border-radius: 8px;
              background: #f9fafb;
              margin-bottom: 15px;
              page-break-inside: avoid;
            }
            .concept-card h3 {
              margin-top: 0;
              margin-bottom: 8px;
              font-size: 15px;
              color: #111827;
            }
            .code-box {
              background: #f3f4f6;
              border: 1px solid #e5e7eb;
              border-radius: 6px;
              padding: 15px;
              font-family: monospace;
              font-size: 12px;
              white-space: pre-wrap;
              margin: 10px 0;
              color: #1f2937;
              overflow-x: auto;
            }
            .definition-item {
              border-left: 3px solid #10b981;
              padding-left: 15px;
              margin-bottom: 15px;
              page-break-inside: avoid;
            }
            .definition-term {
              font-weight: 600;
              color: #111827;
              font-size: 14px;
            }
            .formula-item {
              background: #f3f4f6;
              border-radius: 8px;
              padding: 15px;
              margin-bottom: 15px;
              page-break-inside: avoid;
              border: 1px solid #e5e7eb;
            }
            .formula-item h4 {
              margin: 0 0 5px 0;
              font-size: 14px;
              color: #111827;
            }
            .formula-text {
              font-family: monospace;
              font-weight: bold;
              font-size: 15px;
              display: block;
              margin: 8px 0;
              color: #2563eb;
              background: #ffffff;
              padding: 8px;
              border-radius: 4px;
              border: 1px solid #e5e7eb;
            }
            .qa-item {
              background: #f9fafb;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 15px;
              margin-bottom: 15px;
              page-break-inside: avoid;
            }
            .question {
              font-weight: 600;
              color: #b45309;
              font-size: 14px;
            }
            .answer {
              margin-top: 8px;
              font-size: 14px;
              color: #047857;
            }
            .chart-item {
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 15px;
              margin-bottom: 15px;
              page-break-inside: avoid;
              background: #f9fafb;
            }
            .bar-container {
              background: #e5e7eb;
              height: 8px;
              border-radius: 4px;
              overflow: hidden;
              margin-top: 5px;
            }
            .bar-fill {
              background: #4f46e5;
              height: 100%;
            }
            @media print {
              body {
                padding: 0;
              }
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>\${result.title || "Study Notes"}</h1>
            <p>Generated by MindScribe AI</p>
          </div>
          
          \${result.overview ? \`
            <div class="section-card">
              <h2>Overview</h2>
              <p>\${result.overview}</p>
            </div>
          \` : ""}

          \${(result.keyPoints && result.keyPoints.length > 0) || (result.revisionSummary && result.revisionSummary.length > 0) ? \`
            <div class="grid-2">
              \${result.keyPoints && result.keyPoints.length > 0 ? \`
                <div class="section-card">
                  <h2>🎯 Key Exam Points</h2>
                  <ul>
                    \${result.keyPoints.map(p => \`<li>\${p}</li>\`).join("")}
                  </ul>
                </div>
              \` : ""}
              \${result.revisionSummary && result.revisionSummary.length > 0 ? \`
                <div class="section-card">
                  <h2>⚡ Revision Summary</h2>
                  <ul>
                    \${result.revisionSummary.map(p => \`<li>\${p}</li>\`).join("")}
                  </ul>
                </div>
              \` : ""}
            </div>
          \` : ""}

          \${result.importantConcepts && result.importantConcepts.length > 0 ? \`
            <div class="section-card">
              <h2>🧠 Core Concepts</h2>
              <div class="grid-2">
                \${result.importantConcepts.map(c => \`
                  <div class="concept-card">
                    <h3>\${c.heading}</h3>
                    <p style="font-size:13px; color:#4b5563; margin-bottom:0;">\${c.explanation}</p>
                  </div>
                \`).join("")}
              </div>
            </div>
          \` : ""}

          \${result.detailedExplanation && result.detailedExplanation.length > 0 ? \`
            <div class="section-card">
              <h2>📖 Detailed Breakdown</h2>
              \${result.detailedExplanation.map(section => \`
                <div style="margin-bottom: 20px; page-break-inside: avoid;">
                  <h3 style="border-bottom: 1px solid #e5e7eb; padding-bottom: 3px; font-size:16px;">\${section.heading}</h3>
                  <p style="white-space: pre-line; font-size:13.5px;">\${section.content}</p>
                </div>
              \`).join("")}
            </div>
          \` : ""}

          \${result.definitions && result.definitions.length > 0 ? \`
            <div class="section-card">
              <h2>📖 Key Definitions</h2>
              \${result.definitions.map(d => \`
                <div class="definition-item">
                  <div class="definition-term">\${d.term}</div>
                  <div style="font-size:13.5px;">\${d.meaning}</div>
                </div>
              \`).join("")}
            </div>
          \` : ""}

          \${result.formulas && result.formulas.length > 0 ? \`
            <div class="section-card">
              <h2>➗ Formulas & Equations</h2>
              <div class="grid-2">
                \${result.formulas.map(f => \`
                  <div class="formula-item">
                    <h4>\${f.name}</h4>
                    <span class="formula-text">\${f.formula}</span>
                    <span style="font-size: 12px; color: #4b5563;">\${f.explanation}</span>
                  </div>
                \`).join("")}
              </div>
            </div>
          \` : ""}

          \${result.examples && result.examples.length > 0 ? \`
            <div class="section-card">
              <h2>💡 Practical Examples</h2>
              \${result.examples.map((ex, idx) => \`
                <div class="qa-item">
                  <div class="question">Example \${idx + 1}: \${ex.question}</div>
                  <div class="answer">\${ex.answer}</div>
                </div>
              \`).join("")}
            </div>
          \` : ""}

          \${result.importantQuestions && result.importantQuestions.length > 0 ? \`
            <div class="section-card">
              <h2>❓ Important Exam Questions</h2>
              \${result.importantQuestions.map(q => \`
                <div class="qa-item">
                  <div class="question">Q: \${q.question}</div>
                  <div class="answer"><strong>A:</strong> \${q.answer}</div>
                </div>
              \`).join("")}
            </div>
          \` : ""}

          \${result.diagrams && result.diagrams.length > 0 ? \`
            <div class="section-card">
              <h2>📊 Visual Diagrams</h2>
              \${result.diagrams.map(diag => \`
                <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin-bottom: 20px; page-break-inside: avoid; background:#f9fafb;">
                  <h3 style="margin-top:0; font-size:15px; color:#111827;">\${diag.name} (\${diag.type})</h3>
                  <pre class="code-box">\${diag.content}</pre>
                  <p style="font-size: 12px; color: #4b5563; margin-bottom:0;">\${diag.explanation}</p>
                </div>
              \`).join("")}
            </div>
          \` : ""}

          \${result.charts && result.charts.length > 0 ? \`
            <div class="section-card">
              <h2>📈 Visual Charts</h2>
              <div class="grid-2">
                \${result.charts.map(chart => \`
                  <div class="chart-item">
                    <div style="font-weight: 600; margin-bottom: 5px; font-size:14px; color:#111827;">\${chart.title}</div>
                    <div style="font-size: 12px; color: #6b7280; margin-bottom: 10px;">\${chart.description}</div>
                    
                    \${chart.type === 'bar' && chart.data ? \`
                      <div style="margin-top: 10px;">
                        \${chart.data.map(item => \`
                          <div style="margin-bottom: 8px;">
                            <div style="display: flex; justify-content: space-between; font-size: 11px; color:#4b5563;">
                              <span>\${item.label}</span>
                              <span>\${item.value}</span>
                            </div>
                            <div class="bar-container">
                              <div class="bar-fill" style="width: \${Math.min(100, Math.max(0, item.value))}%"></div>
                            </div>
                          </div>
                        \`).join("")}
                      </div>
                    \` : ""}

                    \${chart.type === 'pie' && chart.data ? \`
                      <div style="margin-top: 10px;">
                        \${chart.data.map(item => \`
                          <div style="margin-bottom: 8px;">
                            <div style="display: flex; justify-content: space-between; font-size: 11px; color:#4b5563;">
                              <span>\${item.label}</span>
                              <span>\${item.percentage}%</span>
                            </div>
                            <div class="bar-container">
                              <div class="bar-fill" style="background: #9333ea; width: \${Math.min(100, Math.max(0, item.percentage))}%"></div>
                            </div>
                          </div>
                        \`).join("")}
                      </div>
                    \` : ""}

                    \${chart.type === 'line' && chart.data ? \`
                      <div style="display: flex; gap: 8px; margin-top: 10px;">
                        \${chart.data.map(item => \`
                          <div style="background: #ffffff; border:1px solid #e5e7eb; padding: 5px 8px; border-radius: 4px; text-align: center; min-width: 50px;">
                            <div style="font-size: 10px; color: #6b7280;">\${item.x}</div>
                            <div style="font-weight: bold; font-size: 12px; color: #2563eb;">\${item.y}</div>
                          </div>
                        \`).join("")}
                      </div>
                    \` : ""}

                    \${chart.type === 'flowchart' && chart.nodes ? \`
                      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 10px;">
                        \${chart.nodes.map(node => {
                          const hasNext = chart.connections?.some(conn => conn.from === node.id);
                          return \`
                            <div style="display: flex; align-items: center; gap: 5px;">
                              <div style="background: #e0e7ff; border: 1px solid #c7d2fe; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 500; color: #3730a3;">
                                \${node.text}
                              </div>
                              \${hasNext ? \`<span style="color: #9ca3af; font-size:10px;">➔</span>\` : ""}
                            </div>
                          \`;
                        }).join("")}
                      </div>
                    \` : ""}
                  </div>
                \`).join("")}
              </div>
            </div>
          \` : ""}
          
          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (

    <motion.div

      initial={{
        opacity:0,
        y:-15
      }}

      animate={{
        opacity:1,
        y:0
      }}

      transition={{
        duration:0.7
      }}

      className="
        relative
        z-20
        mx-6
        mt-6
        rounded-2xl
        bg-gradient-to-br
        from-black/90
        via-black/80
        to-black/90
        backdrop-blur-2xl
        border
        border-white/10
        shadow-[0_22px_55px_rgba(0,0,0,0.75)]
        px-8
        py-8
      "
    >

      {/* Logo */}

      <div className="
        flex
        items-center
        gap-3
        mb-8
      ">

        <div className="
          h-9
          w-9
          rounded-full
          bg-white/10
          flex
          items-center
          justify-center
          text-white
        ">
          🤖
        </div>  


        <span className="
          text-lg
          font-semibold
          text-white
        ">
          ExamNotes
          <span className="text-gray-400">
            AI
          </span>
        </span>


      </div>





      {/* Input Fields */}

      <div className="
        space-y-5
      ">


        {/* Topic */}

        <input
          type="text"

          value={topic}

          onChange={(e)=>setTopic(e.target.value)}

          placeholder="Enter Topic Name"

          className="
            w-full
            px-5
            py-4
            rounded-xl
            bg-white/10
            text-white
            placeholder-gray-400
            border
            border-white/10
            outline-none
            focus:border-white/40
          "
        />





        {/* Class / Level */}

        <input
          type="text"

          value={level}

          onChange={(e)=>setLevel(e.target.value)}

          placeholder="Enter Class / Level"

          className="
            w-full
            px-5
            py-4
            rounded-xl
            bg-white/10
            text-white
            placeholder-gray-400
            border
            border-white/10
            outline-none
            focus:border-white/40
          "
        />





        {/* Exam Type */}

        <input
          type="text"

          value={exam}

          onChange={(e)=>setExam(e.target.value)}

          placeholder="Enter Exam Type"

          className="
            w-full
            px-5
            py-4
            rounded-xl
            bg-white/10
            text-white
            placeholder-gray-400
            border
            border-white/10
            outline-none
            focus:border-white/40
          "
        />


      </div>

      {/* Toggle Options */}

<div className="
  mt-6
  flex
  flex-wrap
  items-center
  justify-between
  gap-4
">


  {/* Exam Revision Mode */}

  <div className="
    flex
    items-center
    gap-3
    text-white
  ">

    <span className="text-sm">
      Exam Revision Mode
    </span>


    <button
      onClick={() => setRevisionMode(!revisionMode)}

      className={`
        w-11
        h-6
        rounded-full
        transition
        ${
          revisionMode
          ? "bg-white"
          : "bg-gray-600"
        }
      `}
    >

      <div
        className={`
          h-5
          w-5
          rounded-full
          bg-black
          transition-transform

          ${
            revisionMode
            ? "translate-x-5"
            : "translate-x-1"
          }
        `}
      />

    </button>

  </div>






  {/* Include Diagram */}

  <div className="
    flex
    items-center
    gap-3
    text-white
  ">

    <span className="text-sm">
      Include Diagram
    </span>


    <button
      onClick={() => setIncludeDiagram(!includeDiagram)}

      className={`
        w-11
        h-6
        rounded-full
        transition

        ${
          includeDiagram
          ? "bg-white"
          : "bg-gray-600"
        }
      `}
    >

      <div
        className={`
          h-5
          w-5
          rounded-full
          bg-black
          transition-transform

          ${
            includeDiagram
            ? "translate-x-5"
            : "translate-x-1"
          }
        `}
      />

    </button>

  </div>






  {/* Include Charts */}

  <div className="
    flex
    items-center
    gap-3
    text-white
  ">

    <span className="text-sm">
      Include Charts
    </span>


    <button
      onClick={() => setIncludeCharts(!includeCharts)}

      className={`
        w-11
        h-6
        rounded-full
        transition

        ${
          includeCharts
          ? "bg-white"
          : "bg-gray-600"
        }
      `}
    >

      <div
        className={`
          h-5
          w-5
          rounded-full
          bg-black
          transition-transform

          ${
            includeCharts
            ? "translate-x-5"
            : "translate-x-1"
          }
        `}
      />

    </button>

  </div>


</div>

<motion.button
  onClick={handleSubmit}
  disabled={loading}
  whileHover={{
    scale: loading ? 1 : 1.03
  }}

  whileTap={{
    scale: loading ? 1 : 0.97
  }}

  className={`
    mt-8
    w-full
    py-4
    rounded-xl
    bg-white
    text-black
    font-semibold
    text-lg
    shadow-lg
    hover:bg-gray-200
    transition
    ${loading ? "opacity-50 cursor-not-allowed" : ""}
  `}
>

  {loading ? "Generating Notes..." : "Generate Notes"}

</motion.button>

{error && (
  <div className="mt-5 p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
    {error}
  </div>
)}

{result && (
  <div className="mt-8 space-y-8 text-white">
    {/* Title & Overview */}
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex-1">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
          {result.title || "Generated Notes"}
        </h2>
        {result.overview && (
          <p className="mt-3 text-gray-300 leading-relaxed text-base">
            {result.overview}
          </p>
        )}
      </div>
      <div className="flex-shrink-0">
        <button
          onClick={handleDownloadPDF}
          className="w-full md:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg transition duration-200 flex items-center justify-center gap-2 text-sm"
        >
          <span>📄</span> Download PDF
        </button>
      </div>
    </div>

    {/* Key Points & Revision Summary */}
    {((result.keyPoints && result.keyPoints.length > 0) || (result.revisionSummary && result.revisionSummary.length > 0)) && (
      <div className="grid md:grid-cols-2 gap-6">
        {result.keyPoints && result.keyPoints.length > 0 && (
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-indigo-400 flex items-center gap-2">
              <span>🎯</span> Key Exam Points
            </h3>
            <ul className="space-y-2">
              {result.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                  <span className="text-indigo-400 mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {result.revisionSummary && result.revisionSummary.length > 0 && (
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-purple-400 flex items-center gap-2">
              <span>⚡</span> Quick Revision Summary
            </h3>
            <ul className="space-y-2">
              {result.revisionSummary.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )}

    {/* Important Concepts */}
    {result.importantConcepts && result.importantConcepts.length > 0 && (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span>🧠</span> Core Concepts
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {result.importantConcepts.map((concept, index) => (
            <div key={index} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition duration-300">
              <h4 className="font-semibold text-white text-base mb-2">{concept.heading}</h4>
              <p className="text-gray-300 text-sm leading-relaxed">{concept.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Detailed Explanation */}
    {result.detailedExplanation && result.detailedExplanation.length > 0 && (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span>📖</span> Detailed Breakdown
        </h3>
        <div className="space-y-4">
          {result.detailedExplanation.map((section, index) => (
            <div key={index} className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h4 className="font-semibold text-white text-lg mb-3 border-b border-white/10 pb-2">{section.heading}</h4>
              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Definitions & Formulas */}
    {((result.definitions && result.definitions.length > 0) || (result.formulas && result.formulas.length > 0)) && (
      <div className="grid md:grid-cols-2 gap-6">
        {result.definitions && result.definitions.length > 0 && (
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-emerald-400 flex items-center gap-2">
              <span>📖</span> Key Definitions
            </h3>
            <div className="space-y-4">
              {result.definitions.map((def, index) => (
                <div key={index} className="border-l-2 border-emerald-500 pl-4 py-1">
                  <span className="font-semibold text-white block text-sm">{def.term}</span>
                  <span className="text-gray-300 text-xs mt-1 block">{def.meaning}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {result.formulas && result.formulas.length > 0 && (
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-blue-400 flex items-center gap-2">
              <span>➗</span> Formulas & Equations
            </h3>
            <div className="space-y-4">
              {result.formulas.map((form, index) => (
                <div key={index} className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <span className="font-semibold text-white block text-sm mb-1">{form.name}</span>
                  <code className="text-blue-300 font-mono text-sm block my-2 p-2 bg-black/60 rounded border border-white/5">{form.formula}</code>
                  <span className="text-gray-400 text-xs block">{form.explanation}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )}

    {/* Examples & Important Questions */}
    {((result.examples && result.examples.length > 0) || (result.importantQuestions && result.importantQuestions.length > 0)) && (
      <div className="space-y-6">
        {result.examples && result.examples.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>💡</span> Practical Examples
            </h3>
            <div className="space-y-4">
              {result.examples.map((ex, index) => (
                <div key={index} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="text-sm font-semibold text-indigo-300">Example {index + 1}: {ex.question}</div>
                  <div className="text-sm text-gray-300 bg-black/35 p-3 rounded-lg border border-white/5 leading-relaxed">{ex.answer}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {result.importantQuestions && result.importantQuestions.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>❓</span> Important Exam Questions
            </h3>
            <div className="space-y-4">
              {result.importantQuestions.map((q, index) => (
                <div key={index} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="text-sm font-semibold text-amber-300">Q: {q.question}</div>
                  <div className="text-sm text-gray-300 bg-black/35 p-3 rounded-lg border border-white/5 leading-relaxed"><span className="font-semibold text-emerald-400">A:</span> {q.answer}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )}

    {/* Diagrams */}
    {result.diagrams && result.diagrams.length > 0 && (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span>📊</span> Visual Diagrams
        </h3>
        <div className="space-y-6">
          {result.diagrams.map((diag, index) => (
            <div key={index} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <h4 className="font-semibold text-white text-base">{diag.name} <span className="text-xs text-gray-400 font-mono px-2 py-0.5 bg-white/10 rounded">{diag.type}</span></h4>
              {diag.content && (
                <pre className="p-4 bg-black/60 rounded-xl font-mono text-xs text-emerald-400 border border-white/5 overflow-x-auto whitespace-pre">
                  {diag.content}
                </pre>
              )}
              {diag.explanation && (
                <p className="text-gray-300 text-xs leading-relaxed">{diag.explanation}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Charts */}
    {result.charts && result.charts.length > 0 && (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span>📈</span> Visual Charts
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {result.charts.map((chart, index) => (
            <div key={index} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div>
                <h4 className="font-semibold text-white text-base">{chart.title || "Comparison Chart"}</h4>
                <p className="text-gray-400 text-xs mt-1">{chart.description}</p>
              </div>

              {/* Simple inline visualization for charts */}
              {chart.type === 'bar' && chart.data && (
                <div className="space-y-3 pt-2">
                  {chart.data.map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-300">
                        <span>{item.label}</span>
                        <span>{item.value}</span>
                      </div>
                      <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-indigo-500 h-full rounded-full" 
                          style={{ width: `${Math.min(100, Math.max(0, item.value))}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {chart.type === 'pie' && chart.data && (
                <div className="space-y-3 pt-2">
                  {chart.data.map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-300">
                        <span>{item.label}</span>
                        <span>{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-purple-500 h-full rounded-full" 
                          style={{ width: `${Math.min(100, Math.max(0, item.percentage))}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {chart.type === 'line' && chart.data && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {chart.data.map((item, i) => (
                      <div key={i} className="flex flex-col items-center bg-black/40 border border-white/5 p-2 rounded min-w-[60px]">
                        <span className="text-[10px] text-gray-400">{item.x}</span>
                        <span className="text-xs font-semibold text-blue-400">{item.y}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {chart.type === 'flowchart' && chart.nodes && (
                <div className="pt-2 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    {chart.nodes.map((node, i) => {
                      const hasNext = chart.connections?.some(conn => conn.from === node.id);
                      return (
                        <div key={node.id} className="flex items-center gap-2">
                          <div className="px-3 py-1.5 bg-indigo-500/20 border border-indigo-500/30 rounded-lg text-xs font-medium text-indigo-200">
                            {node.text}
                          </div>
                          {hasNext && <span className="text-gray-500 text-xs">➔</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
)}



    </motion.div>

  )
}