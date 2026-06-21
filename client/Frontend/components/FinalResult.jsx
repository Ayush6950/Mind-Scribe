import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import RechartsSetUp from "./RechartSetUp";

export default function FinalResult({ result, handleDownloadPDF }) {
  if (!result) return null;

  const [revisionModeActive, setRevisionModeActive] = useState(false);

  const concepts = result.importantConcepts || [];
  
  // Divide concepts for the Sub Topics summary
  const total = concepts.length;
  let tier3 = [];
  let tier2 = [];
  let tier1 = [];

  if (total > 0) {
    const tierSize = Math.ceil(total / 3);
    tier3 = concepts.slice(0, tierSize);
    tier2 = concepts.slice(tierSize, tierSize * 2);
    tier1 = concepts.slice(tierSize * 2);
  }

  return (
    <div className="w-full bg-white border border-gray-200/80 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] p-6 md:p-8 space-y-8 text-gray-800">
      
      {/* Header Container */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="h-6 w-3 bg-indigo-600 rounded-sm" />
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            {revisionModeActive ? "Quick Revision Guide" : "Generated Notes"}
          </h2>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          {/* Quick Revision Toggle */}
          <button
            onClick={() => setRevisionModeActive(!revisionModeActive)}
            className={`px-4 py-2 text-xs font-semibold rounded-full shadow-sm transition duration-200 flex items-center gap-1.5 ${
              revisionModeActive
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100"
            }`}
          >
            <span>⚡</span>
            {revisionModeActive ? "Show Full Notes" : "Quick Revision (5 min)"}
          </button>

          {/* PDF Download Button */}
          {handleDownloadPDF && (
            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 text-xs font-semibold bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-full shadow-sm transition duration-200 flex items-center gap-1.5"
            >
              <span>📄</span> Download PDF
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={revisionModeActive ? "revision" : "full"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-8"
        >
          {/* OVERVIEW SECTION (Show in both modes) */}
          {result.overview && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>📘</span> Overview
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                {result.overview}
              </p>
            </div>
          )}

          {/* SUB TOPICS SECTION (Only in Full Notes mode) */}
          {!revisionModeActive && concepts.length > 0 && (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50/30 border border-indigo-100/50 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-indigo-800">
                  <span>⭐</span> Sub Topics
                </div>
                <div className="space-y-2">
                  {tier1.length > 0 && (
                    <div className="text-xs text-gray-700">
                      <span className="font-bold text-amber-500 mr-2">⭐ Priority:</span>
                      {tier1.map(c => c.heading).join(", ")}
                    </div>
                  )}
                  {tier2.length > 0 && (
                    <div className="text-xs text-gray-700">
                      <span className="font-bold text-amber-500 mr-2">⭐⭐ Priority:</span>
                      {tier2.map(c => c.heading).join(", ")}
                    </div>
                  )}
                  {tier3.length > 0 && (
                    <div className="text-xs text-gray-700">
                      <span className="font-bold text-amber-500 mr-2">⭐⭐⭐ Priority:</span>
                      {tier3.map(c => c.heading).join(", ")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* CORE CONCEPTS (Only in Full Notes mode) */}
          {!revisionModeActive && concepts.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>🧠</span> Core Concepts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {concepts.map((concept, index) => (
                  <div 
                    key={index} 
                    className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition duration-200 space-y-2"
                  >
                    <h4 className="font-bold text-gray-900 text-sm md:text-base">
                      {concept.heading}
                    </h4>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                      {concept.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DETAILED EXPLANATION (Only in Full Notes mode) */}
          {!revisionModeActive && result.detailedExplanation && result.detailedExplanation.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>📖</span> Detailed Breakdown
              </h3>
              <div className="space-y-4">
                {result.detailedExplanation.map((section, index) => (
                  <div key={index} className="p-6 rounded-2xl bg-gray-50/30 border border-gray-100 space-y-3">
                    <h4 className="font-bold text-gray-900 text-base md:text-lg border-b border-gray-100 pb-2">
                      {section.heading}
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* KEY EXAM POINTS (In both modes, but prioritized in Revision Mode) */}
          {result.keyPoints && result.keyPoints.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>🎯</span> Key Exam Points
              </h3>
              <div className="p-5 rounded-2xl bg-indigo-50/10 border border-indigo-100 space-y-3">
                <ul className="space-y-2">
                  {result.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                      <span className="text-indigo-600 mt-1 font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* QUICK REVISION SUMMARY (In both modes, but prioritized in Revision Mode) */}
          {result.revisionSummary && result.revisionSummary.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>⚡</span> Quick Revision Summary
              </h3>
              <div className="p-5 rounded-2xl bg-purple-50/10 border border-purple-100 space-y-3">
                <ul className="space-y-2">
                  {result.revisionSummary.map((point, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                      <span className="text-purple-600 mt-1">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* KEY DEFINITIONS (Show in both modes) */}
          {result.definitions && result.definitions.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>📖</span> Key Definitions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.definitions.map((def, index) => (
                  <div key={index} className="border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-50/10 pr-4 rounded-r-xl">
                    <span className="font-bold text-gray-900 block text-xs md:text-sm">{def.term}</span>
                    <span className="text-gray-500 text-xs mt-1 block leading-relaxed">{def.meaning}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FORMULAS & EQUATIONS (Show in both modes) */}
          {result.formulas && result.formulas.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>➗</span> Formulas & Equations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.formulas.map((form, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <span className="font-bold text-gray-900 block text-xs md:text-sm mb-1">{form.name}</span>
                    <code className="text-indigo-600 font-mono text-xs md:text-sm block my-2 p-2 bg-indigo-50/50 rounded border border-indigo-100 overflow-x-auto">
                      {form.formula}
                    </code>
                    <span className="text-gray-400 text-xs block">{form.explanation}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* IMPORTANT QUESTIONS (Show in both modes) */}
          {result.importantQuestions && result.importantQuestions.length > 0 && (
            <div id="important-questions-section" className="space-y-4 pt-2">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>❓</span> Important Exam Questions
              </h3>
              <div className="space-y-4">
                {result.importantQuestions.map((q, index) => (
                  <div key={index} className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-3">
                    <div className="text-xs md:text-sm font-bold text-amber-600">
                      Q: {q.question}
                    </div>
                    <div className="text-xs md:text-sm text-gray-600 bg-gray-50/60 p-4 rounded-xl border border-gray-100 leading-relaxed">
                      <span className="font-bold text-emerald-600 mr-1.5">A:</span> 
                      {q.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PRACTICAL EXAMPLES (Only in Full Notes mode) */}
          {!revisionModeActive && result.examples && result.examples.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>💡</span> Practical Examples
              </h3>
              <div className="space-y-4">
                {result.examples.map((ex, index) => (
                  <div key={index} className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-3">
                    <div className="text-xs md:text-sm font-semibold text-indigo-700">
                      Example {index + 1}: {ex.question}
                    </div>
                    <div className="text-xs md:text-sm text-gray-600 bg-gray-50/60 p-4 rounded-xl border border-gray-100 leading-relaxed">
                      {ex.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VISUAL DIAGRAMS (Only in Full Notes mode) */}
          {!revisionModeActive && result.diagrams && result.diagrams.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>📊</span> Visual Diagrams
              </h3>
              <div className="space-y-6">
                {result.diagrams.map((diag, index) => (
                  <div key={index} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-3">
                    <h4 className="font-bold text-gray-900 text-sm md:text-base flex items-center gap-2">
                      {diag.name} 
                      <span className="text-[10px] text-gray-500 font-mono px-2 py-0.5 bg-gray-100 rounded">
                        {diag.type}
                      </span>
                    </h4>
                    {diag.content && (
                      <pre className="p-4 bg-gray-950 rounded-xl font-mono text-xs text-emerald-400 border border-gray-800 overflow-x-auto whitespace-pre leading-normal">
                        {diag.content}
                      </pre>
                    )}
                    {diag.explanation && (
                      <p className="text-gray-500 text-xs leading-relaxed">
                        {diag.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CHARTS (Only in Full Notes mode) */}
          {!revisionModeActive && result.charts && result.charts.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span>📈</span> Visual Charts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {result.charts.map((chart, index) => (
                  <RechartsSetUp key={index} chart={chart} />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
