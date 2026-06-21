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
  <div className="mt-8 p-6 rounded-xl bg-white/5 border border-white/10 text-white">
    <h3 className="text-xl font-semibold mb-4 text-white">Generated Notes:</h3>
    <pre className="whitespace-pre-wrap text-gray-300 text-sm leading-relaxed font-sans">{result}</pre>
  </div>
)}



    </motion.div>

  )
}