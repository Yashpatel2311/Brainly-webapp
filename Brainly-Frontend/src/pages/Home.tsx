import { useRef } from "react";
import { BrainIcon } from "../Icons/BrainIcon";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Lottie from "lottie-react";
import creativityAnimation from "../assets/creativity.json";
import bulbAnimation from "../assets/bulb.json";
import organizeAnimation from "../assets/organize.json";
import shareAnimation from "../assets/share.json";
import upgradeAnimation from "../assets/upgrade.json";

function ParallaxBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Twitter-like background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwLTIuMjA5IDEuNzkxLTQgNC00czQgMS43OTEgNCA0LTEuNzkxIDQtNCA0LTQtMS43OTEtNC00eiIgZmlsbD0iI2E3OGJmYSIgZmlsbC1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>

      {/* YouTube-like gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-purple-500/10 to-blue-500/10"></div>

      {/* Animated shapes */}
      <svg
        className="absolute top-0 left-0 w-96 opacity-20 animate-float-slow"
        viewBox="0 0 200 200"
      >
        <circle cx="100" cy="100" r="100" fill="#a78bfa" />
      </svg>
      <svg
        className="absolute bottom-0 right-0 w-80 opacity-10 animate-float-reverse"
        viewBox="0 0 200 200"
      >
        <rect x="0" y="0" width="200" height="200" rx="60" fill="#7c3aed" />
      </svg>
      <svg
        className="absolute top-1/2 left-10 w-32 opacity-30 animate-spin-slow"
        viewBox="0 0 100 100"
      >
        <polygon points="50,15 80,80 20,80" fill="#f472b6" />
      </svg>
      <svg
        className="absolute bottom-10 left-1/3 w-24 opacity-20 animate-float"
        viewBox="0 0 100 100"
      >
        <ellipse cx="50" cy="50" rx="40" ry="20" fill="#facc15" />
      </svg>
      <svg
        className="absolute top-10 right-1/4 w-20 opacity-20 animate-float-reverse"
        viewBox="0 0 100 100"
      >
        <rect x="10" y="10" width="80" height="80" rx="20" fill="#34d399" />
      </svg>
    </div>
  );
}

export function Home() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  // Parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useTransform(mouseX, [0, 1], [-20, 20]);
  const parallaxY = useTransform(mouseY, [0, 1], [-10, 10]);

  function handleMouseMove(e: React.MouseEvent) {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-200 flex flex-col relative overflow-x-hidden">
      <ParallaxBackground />
      {/* Hero Section with Parallax */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="flex flex-col items-center justify-center flex-1 pt-24 pb-12 relative select-none"
      >
        <motion.div
          style={{ x: parallaxX, y: parallaxY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <BrainIcon className="w-32 h-32 mb-6 animate-float" color="#fff" />
          <motion.h1
            style={{ x: parallaxX, y: parallaxY }}
            className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4 text-center"
          >
            What is Brainly?
          </motion.h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl text-center mb-8">
            Brainly is your personal digital brain – a place to collect,
            organize, and share knowledge, links, and inspiration. Effortlessly
            save content, categorize it, and access your ideas from anywhere.{" "}
            <span className="font-semibold text-purple-200">
              Empower your mind, one link at a time.
            </span>
          </p>
          <div className="flex gap-6 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-lg bg-white text-purple-700 font-bold text-lg shadow-lg hover:bg-purple-100 transition"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-lg bg-purple-700 text-white font-bold text-lg shadow-lg hover:bg-purple-800 transition"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </motion.button>
          </div>
        </motion.div>
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 10 }}
          transition={{
            delay: 1.2,
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <path
              d="M12 5v14m0 0l-6-6m6 6l6-6"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </section>

      {/* Lottie Animation Section */}
      <section className="flex flex-col items-center py-12 bg-transparent">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-xl mx-auto"
        >
          <Lottie
            animationData={creativityAnimation}
            loop={true}
            className="w-full h-64"
          />
          <h2 className="text-3xl font-bold text-purple-700 text-center mt-4 mb-2">
            Creativity Unleashed
          </h2>
          <p className="text-gray-700 text-center text-lg">
            Experience a new way to capture, organize, and share your ideas.
            Brainly brings your creativity to life with a beautiful, intuitive
            interface and smart features.
          </p>
        </motion.div>
      </section>

      {/* Animated Info Sections with Lottie/SVGs */}
      <section className="max-w-4xl mx-auto py-12 px-4 grid md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 flex flex-col items-center transform transition-all duration-300"
        >
          <Lottie
            animationData={bulbAnimation}
            loop={true}
            className="w-20 h-20 mb-2"
          />
          <h2 className="text-2xl font-bold text-purple-700 mb-2">
            Save Anything
          </h2>
          <p className="text-gray-700 text-center">
            Quickly save links, notes, and ideas from anywhere. Your digital
            brain is always with you.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 flex flex-col items-center transform transition-all duration-300"
        >
          <Lottie
            animationData={organizeAnimation}
            loop={true}
            className="w-20 h-20 mb-2"
          />
          <h2 className="text-2xl font-bold text-purple-700 mb-2">
            Organize Effortlessly
          </h2>
          <p className="text-gray-700 text-center">
            Tag, categorize, and search your content. Stay organized and find
            what you need in seconds.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 flex flex-col items-center transform transition-all duration-300"
        >
          <Lottie
            animationData={shareAnimation}
            loop={true}
            className="w-20 h-20 mb-2"
          />
          <h2 className="text-2xl font-bold text-purple-700 mb-2">
            Share & Collaborate
          </h2>
          <p className="text-gray-700 text-center">
            Share your collections with friends or teammates. Collaborate and
            grow your knowledge together.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 flex flex-col items-center transform transition-all duration-300"
        >
          <Lottie
            animationData={upgradeAnimation}
            loop={true}
            className="w-20 h-20 mb-2"
          />
          <h2 className="text-2xl font-bold text-purple-700 mb-2">
            Your Brain, Upgraded
          </h2>
          <p className="text-gray-700 text-center">
            Access your digital brain from any device, anytime. Your ideas are
            always at your fingertips.
          </p>
        </motion.div>
      </section>

      {/* Extra Animated Section */}
      <section className="py-16 px-4 flex flex-col items-center bg-gradient-to-r from-purple-100 to-indigo-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl text-center"
        >
          <h2 className="text-4xl font-bold text-purple-700 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            Join thousands of users who are already organizing their digital
            life with Brainly.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 rounded-lg bg-purple-600 text-white font-bold text-lg shadow-lg hover:bg-purple-700 transition"
            onClick={() => navigate("/signup")}
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
