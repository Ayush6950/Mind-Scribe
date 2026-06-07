import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "motion/react";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";

import { auth, provider } from "../utils/firebase";
import { serverUrl } from "../App";

import {
  BookOpen,
  FileText,
  FolderKanban,
  BarChart3,
  Download,
} from "lucide-react";

function Auth() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);




  const handleGoogleAuth = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await signInWithPopup(auth, provider);

      const user = response.user;

       const result = await axios.post(
  `${serverUrl}/api/auth/google`,
  { name: user.displayName, email: user.email },
  { withCredentials: true }
);

      console.log("Auth Successful:", result.data);

      // Example:
      // navigate("/dashboard");
    } catch (error) {
      console.error("Auth Error:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Authentication Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <BookOpen size={22} />,
      title: "Smart Notes",
      desc: "Generate structured AI notes instantly.",
    },
    {
      icon: <FileText size={22} />,
      title: "Exam Notes",
      desc: "Quick revision and exam preparation.",
    },
    {
      icon: <FolderKanban size={22} />,
      title: "Project Docs",
      desc: "Create project documentation easily.",
    },
    {
      icon: <BarChart3 size={22} />,
      title: "Charts & Graphs",
      desc: "Visualize concepts with AI.",
    },
    {
      icon: <Download size={22} />,
      title: "Export PDF",
      desc: "Download notes anytime.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-black px-6">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto pt-6"
      >
        <div className="bg-black text-white rounded-2xl px-6 py-4 shadow-lg">
          <h1 className="text-2xl font-bold">MindScribe AI</h1>

          <p className="text-xs text-gray-300 mt-1">
            AI-Powered Notes Generator
          </p>
        </div>
      </motion.header>

      {/* Main Section */}
      <main className="max-w-7xl mx-auto py-12 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="
              text-5xl
              lg:text-6xl
              font-extrabold
              leading-tight
              bg-gradient-to-r
              from-black
              via-gray-700
              to-black
              bg-clip-text
              text-transparent
            "
          >
            Generate Smart
            <br />
            AI Notes
          </h1>

          <p className="mt-5 text-lg text-gray-600 max-w-xl">
            Create exam-ready notes, project documentation,
            visual charts, summaries, and downloadable PDFs
            within seconds.
          </p>

          <div className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -4,
                  scale: 1.02,
                }}
                className="
                  bg-white
                  border
                  border-gray-200
                  rounded-xl
                  p-4
                  shadow-sm
                  hover:shadow-md
                  transition
                "
              >
                <div className="mb-2">{item.icon}</div>

                <h3 className="font-semibold text-sm">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div
            className="
              w-full
              max-w-md
              bg-white
              rounded-3xl
              p-8
              border
              border-gray-200
              shadow-xl
            "
          >
            <h2 className="text-3xl font-bold text-center">
              Welcome
            </h2>

            <p className="text-center text-gray-500 mt-3">
              Continue with Google to access MindScribe AI
            </p>

            {error && (
              <div className="mt-5 p-3 rounded-lg border border-red-300 bg-red-50 text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleGoogleAuth}
              disabled={loading}
              className="
                w-full
                mt-8
                flex
                items-center
                justify-center
                gap-3
                border
                border-gray-300
                py-4
                rounded-xl
                hover:bg-gray-100
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition
              "
            >
              <FcGoogle size={24} />

              {loading
                ? "Signing in..."
                : "Continue with Google"}
            </button>

            <p className="text-center text-xs text-gray-400 mt-6">
              By continuing, you agree to our Terms &
              Privacy Policy.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default Auth;