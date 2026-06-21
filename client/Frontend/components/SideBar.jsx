import { motion } from "motion/react";

export default function SideBar({ result }) {
  if (!result) return null;

  const concepts = result.importantConcepts || [];
  
  // Dynamically divide important concepts into 3 priority tiers
  const total = concepts.length;
  let tier3 = []; // ⭐⭐⭐ (High Priority)
  let tier2 = []; // ⭐⭐ (Medium Priority)
  let tier1 = []; // ⭐ (Low/Specific Priority)

  if (total > 0) {
    const tierSize = Math.ceil(total / 3);
    tier3 = concepts.slice(0, tierSize);
    tier2 = concepts.slice(tierSize, tierSize * 2);
    tier1 = concepts.slice(tierSize * 2);
  }

  // Smooth scroll handler
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Sidebar Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
        <span className="text-xl">📌</span>
        <h3 className="text-lg font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
          Quick Exam View
        </h3>
      </div>

      {/* Sub Topics Grouped by Priority */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <span>⭐</span>
          <span>Sub Topics (Priority Wise)</span>
        </div>

        {/* Priority 1 Star */}
        {tier1.length > 0 && (
          <motion.div 
            whileHover={{ y: -2 }}
            className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-2"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500">
              <span>⭐</span>
              <span>Priority</span>
            </div>
            <ul className="space-y-1.5">
              {tier1.map((item, idx) => (
                <li key={idx} className="text-xs text-gray-600 flex items-start gap-1.5">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>{item.heading}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Priority 2 Stars */}
        {tier2.length > 0 && (
          <motion.div 
            whileHover={{ y: -2 }}
            className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-2"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500">
              <span>⭐⭐</span>
              <span>Priority</span>
            </div>
            <ul className="space-y-1.5">
              {tier2.map((item, idx) => (
                <li key={idx} className="text-xs text-gray-600 flex items-start gap-1.5">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>{item.heading}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Priority 3 Stars */}
        {tier3.length > 0 && (
          <motion.div 
            whileHover={{ y: -2 }}
            className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-2"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500">
              <span>⭐⭐⭐</span>
              <span>Priority</span>
            </div>
            <ul className="space-y-1.5">
              {tier3.map((item, idx) => (
                <li key={idx} className="text-xs text-gray-600 flex items-start gap-1.5">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>{item.heading}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {/* Exam Importance */}
      <div className="p-4 bg-amber-50/50 border border-amber-100/50 rounded-2xl space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
          <span>🔥</span>
          <span>Exam Importance</span>
        </div>
        <div className="flex gap-1 text-lg text-amber-500">
          <span>⭐</span>
          <span>⭐</span>
          <span>⭐</span>
        </div>
      </div>

      {/* Important Questions Quick Links */}
      {result.importantQuestions && result.importantQuestions.length > 0 && (
        <div className="p-4 bg-indigo-50/30 border border-indigo-100/30 rounded-2xl space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
            <span>❓</span>
            <span>Important Questions</span>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => scrollToSection("important-questions-section")}
              className="w-full text-left text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center justify-between group"
            >
              <span>Short & Long Questions</span>
              <span className="transition-transform group-hover:translate-x-1">➔</span>
            </button>
            <div className="max-h-[120px] overflow-y-auto space-y-1 pr-1 border-t border-indigo-100/50 pt-2">
              {result.importantQuestions.map((q, idx) => (
                <div 
                  key={idx} 
                  onClick={() => scrollToSection("important-questions-section")}
                  className="text-[10px] text-gray-500 hover:text-indigo-600 cursor-pointer truncate"
                  title={q.question}
                >
                  Q{idx + 1}: {q.question}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
