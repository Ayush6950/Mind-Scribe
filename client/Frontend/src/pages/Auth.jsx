import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "motion/react";
import {auth,provider} from "../utils/firebase";
import { serverUrl } from "../App";
import axios from "axios";
import {
  BookOpen,
  FileText,
  FolderKanban,
  BarChart3,
  Download,
} from "lucide-react";
import { signInWithPopup } from "firebase/auth";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError("");
    try {
     const response = await signInWithPopup(auth, provider);
     const user = response.user;
     const name = user.displayName;
     const userEmail = user.email;
     const result = await axios.post(serverUrl + "/api/auth/google", { name, email: userEmail }, { withCredentials: true });
     console.log("Auth successful:", result.data);
   }  
    catch (error) {
      setError(error.response?.data?.message || error.message || "Authentication failed");
      console.error("Auth error:", error);
   }
   finally {
     setLoading(false);
   }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const result = await axios.post(serverUrl + "/api/auth/email", { email, password }, { withCredentials: true });
      console.log("Sign in successful:", result.data);
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Sign in failed");
      console.error("Sign in error:", error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <BookOpen size={22} />,
      title: "Notes",
      desc: "Generate smart notes instantly.",
    },
    {
      icon: <FileText size={22} />,
      title: "Exam Notes",
      desc: "Exam-focused summaries.",
    },
    {
      icon: <FolderKanban size={22} />,
      title: "Project Notes",
      desc: "Create project documents.",
    },
    {
      icon: <BarChart3 size={22} />,
      title: "Charts & Graphs",
      desc: "Visual learning support.",
    },
    {
      icon: <Download size={22} />,
      title: "Free PDF",
      desc: "Download notes anytime.",
    },
  ];

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 text-black px-6">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto mt-4 rounded-2xl bg-black text-white px-6 py-4 shadow-lg"
      >
        <h1 className="text-2xl font-bold">
          MindScribe AI
        </h1>

        <p className="text-xs text-gray-300">
          AI-powered exam-oriented notes & revision
        </p>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto h-[calc(100vh-110px)] grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="
            text-4xl lg:text-5xl
            font-extrabold
            leading-tight
            bg-gradient-to-r
            from-black
            via-gray-700
            to-black
            bg-clip-text
            text-transparent"
          >
            Unlock Smart <br />
            AI Notes
          </h1>

          <p className="mt-4 text-base text-gray-600 max-w-lg">
            Generate exam-ready notes, project documentation,
            visual charts, and downloadable PDFs in seconds.
          </p>

          {/* Features */}
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-4">
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
                transition"
              >
                <div className="mb-2 text-black">
                  {item.icon}
                </div>

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

        {/* Right Side Login Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div
            className="
            w-full
            max-w-sm
            bg-white
            rounded-3xl
            p-6
            border
            border-gray-200
            shadow-xl"
          >
            <h2 className="text-2xl font-bold text-center">
              Welcome Back
            </h2>

            <p className="text-center text-sm text-gray-500 mt-2">
              Sign in to continue using MindScribe AI
            </p>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Google Login */}
            <button 
            onClick={handleGoogleAuth}
            disabled={loading}
              className="
              w-full
              mt-6
              flex
              items-center
              justify-center
              gap-3
              border
              border-gray-300
              py-3
              rounded-xl
              hover:bg-gray-100
              disabled:opacity-50
              disabled:cursor-not-allowed
              transition"
            >
              <FcGoogle size={22} />
              {loading ? "Signing in..." : "Continue with Google"}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="border-t border-gray-300"></div>

              <span
                className="
                absolute
                left-1/2
                -translate-x-1/2
                -top-3
                bg-white
                px-3
                text-xs
                text-gray-500"
              >
                OR
              </span>
            </div>

            {/* Inputs */}
            <form onSubmit={handleEmailSignIn}>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                mb-3
                outline-none
                focus:ring-2
                focus:ring-black"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                mb-4
                outline-none
                focus:ring-2
                focus:ring-black"
              />

              <button
                type="submit"
                disabled={loading}
                className="
                w-full
                bg-black
                text-white
                py-3
                rounded-xl
                hover:bg-gray-800
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-5">
              Don't have an account?
              <span className="font-semibold text-black ml-1 cursor-pointer">
                Sign Up
              </span>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};


export default Auth;