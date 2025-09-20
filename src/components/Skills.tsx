import { motion } from "framer-motion";
import {
  Award,
  Code,
  Database,
  Globe,
  Layers,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { portfolioData } from "../data/portfolio";
import { useIntersectionObserver } from "../lib/hooks";

interface SkillItemProps {
  skill: (typeof portfolioData.skills)[0];
  index: number;
}

const Skills: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = React.useRef<HTMLElement>(null);
  const { hasIntersected } = useIntersectionObserver(sectionRef, {
    threshold: 0.1,
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "programming":
        return <Code className="w-6 h-6" />;
      case "database":
        return <Database className="w-6 h-6" />;
      case "framework":
        return <Layers className="w-6 h-6" />;
      case "tool":
        return <Star className="w-6 h-6" />;
      case "language":
        return <Globe className="w-6 h-6" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "from-red-500 to-orange-500";
      case "intermediate":
        return "from-yellow-500 to-orange-500";
      case "advanced":
        return "from-blue-500 to-green-500";
      case "expert":
        return "from-green-500 to-emerald-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getLevelPercentage = (level: string) => {
    switch (level) {
      case "beginner":
        return 25;
      case "intermediate":
        return 50;
      case "advanced":
        return 75;
      case "expert":
        return 95;
      default:
        return 0;
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "beginner":
        return <Star className="w-4 h-4" />;
      case "intermediate":
        return <TrendingUp className="w-4 h-4" />;
      case "advanced":
        return <Zap className="w-4 h-4" />;
      case "expert":
        return <Award className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const groupedSkills = portfolioData.skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof portfolioData.skills>
  );

  const SkillItem: React.FC<SkillItemProps> = ({ skill, index }) => {
    const percentage = getLevelPercentage(skill.level);
    const colorClass = getLevelColor(skill.level);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          ease: "easeOut",
        }}
        whileHover={{
          scale: 1.02,
          y: -2,
        }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg bg-gradient-to-r ${colorClass} text-white`}
            >
              {getLevelIcon(skill.level)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {skill.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {t(`skills.level.${skill.level}`)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={
                hasIntersected ? { width: `${percentage}%` } : { width: 0 }
              }
              transition={{
                duration: 1.5,
                delay: index * 0.1 + 0.3,
                ease: "easeOut",
              }}
              className={`h-full bg-gradient-to-r ${colorClass} rounded-full relative`}
            >
              <motion.div
                animate={{
                  x: [-10, 10, -10],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-white/20 rounded-full"
              />
            </motion.div>
          </div>
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

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/5 rounded-full filter blur-xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/5 rounded-full filter blur-xl"
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
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6"
          >
            <Code className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("skills.title")}
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("skills.description") ||
              "Explore my technical expertise and proficiency levels across different technologies and tools."}
          </p>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={hasIntersected ? "visible" : "hidden"}
            className="flex justify-center items-center space-x-8 mt-8"
          >
            <motion.div variants={categoryVariants} className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {portfolioData.skills.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {t("skills.total") || "Total Skills"}
              </div>
            </motion.div>
            <motion.div variants={categoryVariants} className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {Object.keys(groupedSkills).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {t("skills.categories") || "Categories"}
              </div>
            </motion.div>
            <motion.div variants={categoryVariants} className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {
                  portfolioData.skills.filter(
                    (skill) =>
                      skill.level === "advanced" || skill.level === "expert"
                  ).length
                }
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {t("skills.advanced") || "Advanced+"}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Skills by Category */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
          className="space-y-12"
        >
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <motion.div
              key={category}
              variants={categoryVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
            >
              {/* Category Header */}
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white">
                  {getCategoryIcon(category)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t(`skills.category.${category}`)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {skills.length} {skills.length === 1 ? "skill" : "skills"}
                  </p>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                  <SkillItem key={skill.id} skill={skill} index={index} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={
            hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              {t("skills.cta.title") || "Ready to work together?"}
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              {t("skills.cta.description") ||
                "I'm always excited to take on new challenges and collaborate on innovative projects."}
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
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t("skills.cta.button") || "Get In Touch"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
