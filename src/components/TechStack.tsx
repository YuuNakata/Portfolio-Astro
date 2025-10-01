import { motion, easeOut } from "framer-motion";
import {
  Code2,
  Layers,
  Wrench,
  Brain,
  Clock,
  Zap,
  TrendingUp,
  ChevronRight,
  GitBranch,
  Terminal,
  Cpu,
} from "lucide-react";
import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { portfolioData } from "../data/portfolio";
import { useIntersectionObserver } from "../lib/hooks";

const TechStack: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = React.useRef<HTMLElement>(null);
  const { hasIntersected } = useIntersectionObserver(sectionRef, {
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState<
    "languages" | "frameworks" | "tools" | "algorithms"
  >("languages");

  const tabs = [
    {
      id: "languages" as const,
      label: t("techstack.languages"),
      icon: <Code2 className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "frameworks" as const,
      label: t("techstack.frameworks"),
      icon: <Layers className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "tools" as const,
      label: t("techstack.tools"),
      icon: <Wrench className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "algorithms" as const,
      label: t("techstack.algorithms"),
      icon: <Brain className="w-5 h-5" />,
      color: "from-orange-500 to-red-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  const getYearsColor = (years: number) => {
    if (years >= 3) return "from-green-500 to-emerald-600";
    if (years >= 2) return "from-blue-500 to-cyan-600";
    return "from-purple-500 to-pink-600";
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full filter blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full filter blur-3xl" />

        {/* Code Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100/50 dark:bg-grid-slate-700/25 bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={
            hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-700 dark:to-slate-600 rounded-2xl mb-6 shadow-2xl"
          >
            <Terminal className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("techstack.title")}
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t("techstack.description")}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
          className="min-h-[400px]"
        >
          {/* Languages */}
          {activeTab === "languages" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolioData.techStack.languages.map((lang) => (
                <motion.div
                  key={lang.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-r ${getYearsColor(lang.yearsOfExp)} text-white`}
                      >
                        <Code2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                          {lang.name}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>
                            {lang.yearsOfExp} {t("techstack.years")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {lang.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        {t("techstack.usecase")}:{" "}
                      </span>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {lang.useCase}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Frameworks */}
          {activeTab === "frameworks" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {portfolioData.techStack.frameworks.map((framework) => (
                <motion.div
                  key={framework.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      <Layers className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                      {framework.name}
                    </h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {framework.description}
                  </p>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="text-gray-500 dark:text-gray-400">
                          {t("techstack.performance")}:
                        </span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium ml-6">
                        {framework.performance}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-gray-500 dark:text-gray-400">
                          {t("techstack.bestfor")}:
                        </span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium ml-6">
                        {framework.bestFor}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Tools */}
          {activeTab === "tools" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioData.techStack.tools.map((tool) => (
                <motion.div
                  key={tool.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-green-600 group-hover:to-emerald-600 transition-all duration-300">
                      {tool.name}
                    </h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <div className="flex items-start space-x-2 text-sm">
                      <Zap className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-green-700 dark:text-green-400 font-medium">
                          {t("techstack.whycool")}:{" "}
                        </span>
                        <span className="text-green-600 dark:text-green-300">
                          {tool.whyCool}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Algorithms */}
          {activeTab === "algorithms" && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <motion.div
                  whileHover={{ rotate: 5 }}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-medium mb-4"
                >
                  <Cpu className="w-4 h-4" />
                  <span>{t("techstack.fundamentals")}</span>
                </motion.div>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  {t("techstack.algorithms.description")}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {portfolioData.techStack.algorithms.map((algo) => (
                  <motion.div
                    key={algo.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-grid-slate-100/30 dark:bg-grid-slate-700/20 bg-[size:20px_20px]" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white">
                          <Brain className="w-5 h-5" />
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                            {t("techstack.implemented")}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-orange-600 group-hover:to-red-600 transition-all duration-300">
                        {algo.name}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                        {algo.description}
                      </p>

                      <div className="space-y-3">
                        <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                          <div className="flex items-center space-x-2 text-sm mb-1">
                            <Cpu className="w-4 h-4 text-blue-500" />
                            <span className="text-gray-500 dark:text-gray-400 font-medium">
                              {t("techstack.complexity")}:
                            </span>
                          </div>
                          <code className="text-blue-600 dark:text-blue-400 font-mono font-bold text-sm">
                            {algo.complexity}
                          </code>
                        </div>

                        <div>
                          <div className="flex items-center space-x-2 text-sm mb-2">
                            <GitBranch className="w-4 h-4 text-purple-500" />
                            <span className="text-gray-500 dark:text-gray-400 font-medium">
                              {t("techstack.realworld")}:
                            </span>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">
                            {algo.realWorldUse}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={
            hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/5 bg-[size:30px_30px]" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {t("techstack.cta.title")}
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                {t("techstack.cta.description")}
              </p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const contactSection = document.querySelector("#contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center space-x-2 group"
              >
                <span>{t("techstack.cta.button")}</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
