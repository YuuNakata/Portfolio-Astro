import { motion, easeOut } from "framer-motion";
import {
  Database,
  Rocket,
  Shield,
  Zap,
  Code,
  ChevronRight,
  Clock,
  TrendingUp,
} from "lucide-react";
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { portfolioData } from "../data/portfolio";
import { useIntersectionObserver } from "../lib/hooks";

interface WhatIBringItemProps {
  item: (typeof portfolioData.whatIBring)[0];
  index: number;
}

const WhatIBring: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = React.useRef<HTMLElement>(null);
  const { hasIntersected } = useIntersectionObserver(sectionRef, {
    threshold: 0.1,
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "rocket":
        return <Rocket className="w-6 h-6" />;
      case "zap":
        return <Zap className="w-6 h-6" />;
      case "database":
        return <Database className="w-6 h-6" />;
      case "shield":
        return <Shield className="w-6 h-6" />;
      default:
        return <Code className="w-6 h-6" />;
    }
  };

  const getIconColor = (iconName: string) => {
    switch (iconName) {
      case "rocket":
        return "from-blue-500 to-indigo-600";
      case "zap":
        return "from-yellow-500 to-orange-600";
      case "database":
        return "from-green-500 to-emerald-600";
      case "shield":
        return "from-purple-500 to-violet-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const WhatIBringItem: React.FC<WhatIBringItemProps> = ({ item, index }) => {
    const iconColor = getIconColor(item.icon);

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{
          duration: 0.6,
          delay: index * 0.15,
          ease: "easeOut",
        }}
        whileHover={{
          scale: 1.02,
          y: -8,
        }}
        className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div
              className={`p-3 rounded-xl bg-gradient-to-r ${iconColor} text-white group-hover:scale-110 transition-transform duration-300`}
            >
              {getIcon(item.icon)}
            </div>
            <div className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 font-mono">
              {t(item.algorithm)}
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
            {t(item.title)}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            {t(item.description)}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="px-6 pb-6">
          <div className="flex items-center mb-3">
            <Code className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("whatibring.tech")}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {item.tech.map((tech, techIndex) => (
              <motion.span
                key={techIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  hasIntersected
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{
                  duration: 0.3,
                  delay: index * 0.1 + techIndex * 0.05,
                }}
                className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 font-medium hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 transition-all duration-200"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Hover Effect Arrow */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
        </div>
      </motion.div>
    );
  };

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-20 -right-20 w-60 h-60 bg-blue-500/5 rounded-full filter blur-xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-500/5 rounded-full filter blur-xl"
        />
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
            className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg"
          >
            <TrendingUp className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("whatibring.title")}
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t("whatibring.description")}
          </p>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={hasIntersected ? "visible" : "hidden"}
            className="flex justify-center items-center space-x-8 mt-8"
          >
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {portfolioData.whatIBring.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Value Props
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Results Focused
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                <Clock className="w-8 h-8 mx-auto" />
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Always Shipped
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* What I Bring Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {portfolioData.whatIBring.map((item, index) => (
            <WhatIBringItem key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={
            hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20" />

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {t("whatibring.cta.title")}
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
                {t("whatibring.cta.description")}
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
                className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center space-x-2"
              >
                <span>{t("whatibring.cta.button")}</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIBring;
