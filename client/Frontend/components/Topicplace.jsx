import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { generateNotes } from "../src/service/api";
import SideBar from "./SideBar";
import FinalResult from "./FinalResult";


export default function Topicplace() {


  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");
  const [exam, setExam] = useState("");

  // State for error, loading, and result
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // States for simulated loading progress bar
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("processing content");

  //toggle
  const [revisionMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeCharts, setIncludeCharts] = useState(false);

  // Effect to simulate dynamic, randomized progress bar progression
  useEffect(() => {
    let interval;
    if (loading) {
      setProgress(0);
      setLoadingMessage("processing content");

      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            return prev; // hold at 95% until complete
          }
          // Increment by a random small amount to simulate real work
          const increment = Math.floor(Math.random() * 6) + 2;
          return Math.min(prev + increment, 95);
        });
      }, 400);
    } else {
      setProgress(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading]);

  // Effect to dynamically set the loading text status based on current progress percentage
  useEffect(() => {
    if (!loading) return;

    if (progress < 25) {
      setLoadingMessage("processing content");
    } else if (progress < 50) {
      setLoadingMessage("generating notes");
    } else if (progress < 80) {
      setLoadingMessage("almost done");
    } else {
      setLoadingMessage("finalizing");
    }
  }, [progress, loading]);


  const handleSubmit = async () => {
    if (!topic.trim()) {
      setError("please enter the topic");
      return;
    }
   
    setError("");
    setLoading(true);
    setProgress(0);
    setLoadingMessage("processing content");
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
        // Set progress to 100% to animate completion
        setProgress(100);
        await new Promise((resolve) => setTimeout(resolve, 500));

        setResult(data.data);
        setLevel("");
        setTopic("");
        setExam("");
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
          <title>${result.title || "Study Notes"}</title>
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
            <h1>${result.title || "Study Notes"}</h1>
            <p>Generated by MindScribe AI</p>
          </div>
          
          ${result.overview ? `
            <div class="section-card">
              <h2>Overview</h2>
              <p>${result.overview}</p>
            </div>
          ` : ""}

          ${(result.keyPoints && result.keyPoints.length > 0) || (result.revisionSummary && result.revisionSummary.length > 0) ? `
            <div class="grid-2">
              ${result.keyPoints && result.keyPoints.length > 0 ? `
                <div class="section-card">
                  <h2>🎯 Key Exam Points</h2>
                  <ul>
                    ${result.keyPoints.map(p => `<li>${p}</li>`).join("")}
                  </ul>
                </div>
              ` : ""}
              ${result.revisionSummary && result.revisionSummary.length > 0 ? `
                <div class="section-card">
                  <h2>⚡ Revision Summary</h2>
                  <ul>
                    ${result.revisionSummary.map(p => `<li>${p}</li>`).join("")}
                  </ul>
                </div>
              ` : ""}
            </div>
          ` : ""}

          ${result.importantConcepts && result.importantConcepts.length > 0 ? `
            <div class="section-card">
              <h2>🧠 Core Concepts</h2>
              <div class="grid-2">
                ${result.importantConcepts.map(c => `
                  <div class="concept-card">
                    <h3>${c.heading}</h3>
                    <p style="font-size:13px; color:#4b5563; margin-bottom:0;">${c.explanation}</p>
                  </div>
                `).join("")}
              </div>
            </div>
          ` : ""}

          ${result.detailedExplanation && result.detailedExplanation.length > 0 ? `
            <div class="section-card">
              <h2>📖 Detailed Breakdown</h2>
              ${result.detailedExplanation.map(section => `
                <div style="margin-bottom: 20px; page-break-inside: avoid;">
                  <h3 style="border-bottom: 1px solid #e5e7eb; padding-bottom: 3px; font-size:16px;">${section.heading}</h3>
                  <p style="white-space: pre-line; font-size:13.5px;">${section.content}</p>
                </div>
              `).join("")}
            </div>
          ` : ""}

          ${result.definitions && result.definitions.length > 0 ? `
            <div class="section-card">
              <h2>📖 Key Definitions</h2>
              ${result.definitions.map(d => `
                <div class="definition-item">
                  <div class="definition-term">${d.term}</div>
                  <div style="font-size:13.5px;">${d.meaning}</div>
                </div>
              `).join("")}
            </div>
          ` : ""}

          ${result.formulas && result.formulas.length > 0 ? `
            <div class="section-card">
              <h2>➗ Formulas & Equations</h2>
              <div class="grid-2">
                ${result.formulas.map(f => `
                  <div class="formula-item">
                    <h4>${f.name}</h4>
                    <span class="formula-text">${f.formula}</span>
                    <span style="font-size: 12px; color: #4b5563;">${f.explanation}</span>
                  </div>
                `).join("")}
              </div>
            </div>
          ` : ""}

          ${result.examples && result.examples.length > 0 ? `
            <div class="section-card">
              <h2>💡 Practical Examples</h2>
              ${result.examples.map((ex, idx) => `
                <div class="qa-item">
                  <div class="question">Example ${idx + 1}: ${ex.question}</div>
                  <div class="answer">${ex.answer}</div>
                </div>
              `).join("")}
            </div>
          ` : ""}

          ${result.importantQuestions && result.importantQuestions.length > 0 ? `
            <div class="section-card">
              <h2>❓ Important Exam Questions</h2>
              ${result.importantQuestions.map(q => `
                <div class="qa-item">
                  <div class="question">Q: ${q.question}</div>
                  <div class="answer"><strong>A:</strong> ${q.answer}</div>
                </div>
              `).join("")}
            </div>
          ` : ""}

          ${result.diagrams && result.diagrams.length > 0 ? `
            <div class="section-card">
              <h2>📊 Visual Diagrams</h2>
              ${result.diagrams.map(diag => `
                <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin-bottom: 20px; page-break-inside: avoid; background:#f9fafb;">
                  <h3 style="margin-top:0; font-size:15px; color:#111827;">${diag.name} (${diag.type})</h3>
                  <pre class="code-box">${diag.content}</pre>
                  <p style="font-size: 12px; color: #4b5563; margin-bottom:0;">${diag.explanation}</p>
                </div>
              `).join("")}
            </div>
          ` : ""}

          ${result.charts && result.charts.length > 0 ? `
            <div class="section-card">
              <h2>📈 Visual Charts</h2>
              <div class="grid-2">
                ${result.charts.map(chart => `
                  <div class="chart-item">
                    <div style="font-weight: 600; margin-bottom: 5px; font-size:14px; color:#111827;">${chart.title}</div>
                    <div style="font-size: 12px; color: #6b7280; margin-bottom: 10px;">${chart.description}</div>
                    
                    ${chart.type === 'bar' && chart.data ? `
                      <div style="margin-top: 10px;">
                        ${chart.data.map(item => `
                          <div style="margin-bottom: 8px;">
                            <div style="display: flex; justify-content: space-between; font-size: 11px; color:#4b5563;">
                              <span>${item.label}</span>
                              <span>${item.value}</span>
                            </div>
                            <div class="bar-container">
                              <div class="bar-fill" style="width: ${Math.min(100, Math.max(0, item.value))}%"></div>
                            </div>
                          </div>
                        `).join("")}
                      </div>
                    ` : ""}

                    ${chart.type === 'pie' && chart.data ? `
                      <div style="margin-top: 10px;">
                        ${chart.data.map(item => `
                          <div style="margin-bottom: 8px;">
                            <div style="display: flex; justify-content: space-between; font-size: 11px; color:#4b5563;">
                              <span>${item.label}</span>
                              <span>${item.percentage}%</span>
                            </div>
                            <div class="bar-container">
                              <div class="bar-fill" style="background: #9333ea; width: ${Math.min(100, Math.max(0, item.percentage))}%"></div>
                            </div>
                          </div>
                        `).join("")}
                      </div>
                    ` : ""}

                    ${chart.type === 'line' && chart.data ? `
                      <div style="display: flex; gap: 8px; margin-top: 10px;">
                        ${chart.data.map(item => `
                          <div style="background: #ffffff; border:1px solid #e5e7eb; padding: 5px 8px; border-radius: 4px; text-align: center; min-width: 50px;">
                            <div style="font-size: 10px; color: #6b7280;">${item.x}</div>
                            <div style="font-weight: bold; font-size: 12px; color: #2563eb;">${item.y}</div>
                          </div>
                        `).join("")}
                      </div>
                    ` : ""}

                    ${chart.type === 'flowchart' && chart.nodes ? `
                      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 10px;">
                        ${chart.nodes.map(node => {
                          const hasNext = chart.connections?.some(conn => conn.from === node.id);
                          return `
                            <div style="display: flex; align-items: center; gap: 5px;">
                              <div style="background: #e0e7ff; border: 1px solid #c7d2fe; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 500; color: #3730a3;">
                                ${node.text}
                              </div>
                              ${hasNext ? `<span style="color: #9ca3af; font-size:10px;">➔</span>` : ""}
                            </div>
                          `;
                        }).join("")}
                      </div>
                    ` : ""}
                  </div>
                `).join("")}
              </div>
            </div>
          ` : ""}
          
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

{loading && (
  <div className="mt-6 w-full p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-inner space-y-3">
    <div className="flex justify-between items-center text-sm">
      <span className="text-indigo-400 font-semibold capitalize animate-pulse">
        {loadingMessage}...
      </span>
      <span className="text-white font-mono font-bold">
        {progress}%
      </span>
    </div>
    <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden border border-white/5 p-[2px]">
      <motion.div 
        className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-full rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>
  </div>
)}

{error && (
  <div className="mt-5 p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
    {error}
  </div>
)}

{result ? (
  <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
    {/* Left Sidebar (Quick Exam View) */}
    <div className="lg:col-span-1 lg:sticky lg:top-6">
      <SideBar result={result} />
    </div>

    {/* Right Content Area (Generated Notes) */}
    <div className="lg:col-span-3">
      <FinalResult result={result} handleDownloadPDF={handleDownloadPDF} />
    </div>
  </div>
) : (
  !loading && (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className="mt-8 h-48 rounded-2xl flex flex-col items-center justify-center bg-white/5 border border-dashed border-white/10 text-gray-400 backdrop-blur-sm"
    >
      <span className="text-2xl mb-2">📚</span>
      <p className="text-sm font-medium">Enter a topic and AI will generate notes for you.</p>
    </motion.div>
  )
)}



    </motion.div>

  )
}