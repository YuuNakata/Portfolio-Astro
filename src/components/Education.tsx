import { easeInOut, easeOut, motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Brain,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  GraduationCap,
  Star,
  TrendingUp,
} from "lucide-react";
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { portfolioData } from "../data/portfolio";
import { useIntersectionObserver } from "../lib/hooks";

interface EducationItemProps {
  education: (typeof portfolioData.education)[0];
  index: number;
}

const Education: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = React.useRef<HTMLElement>(null);
  const { hasIntersected } = useIntersectionObserver(sectionRef, {
    threshold: 0.1,
  });

  const formatDate = (dateString: string) => {
    const [month, year] = dateString.split("/");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString(undefined, {
      month: "short",
      year: "numeric",
    });
  };

  const isCurrentEducation = (endDate: string) => {
    const [month, year] = endDate.split("/");
    const endDateTime = new Date(parseInt(year), parseInt(month) - 1);
    return endDateTime > new Date();
  };

  const EducationItem: React.FC<EducationItemProps> = ({
    education,
    index,
  }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const isCurrent = isCurrentEducation(education.endDate);

    const cardVariants = {
      hidden: {
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
        y: 30,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.8,
          delay: index * 0.3,
          ease: easeOut,
        },
      },
    };

    const timelineVariants = {
      hidden: { scaleY: 0 },
      visible: {
        scaleY: 1,
        transition: {
          duration: 1,
          delay: index * 0.3 + 0.5,
          ease: easeOut,
        },
      },
    };

    const dotVariants = {
      hidden: { scale: 0, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.6,
          delay: index * 0.3 + 0.8,
          ease: easeOut,
        },
      },
    };

    return (
      <div className="relative flex items-center mb-12 last:mb-0">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-200 dark:bg-gray-700 h-full">
          <motion.div
            variants={timelineVariants}
            initial="hidden"
            animate={hasIntersected ? "visible" : "hidden"}
            className={`w-full bg-gradient-to-b ${
              isCurrent
                ? "from-green-500 to-blue-500"
                : "from-blue-500 to-purple-500"
            } origin-top`}
          />
        </div>

        {/* Timeline Dot */}
        <motion.div
          variants={dotVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
          className="absolute left-1/2 transform -translate-x-1/2 z-10"
        >
          <div
            className={`w-6 h-6 rounded-full bg-gradient-to-r ${
              isCurrent
                ? "from-green-500 to-blue-500"
                : "from-blue-500 to-purple-500"
            } shadow-lg flex items-center justify-center`}
          >
            <motion.div
              animate={
                isCurrent
                  ? {
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1],
                    }
                  : {}
              }
              transition={
                isCurrent
                  ? {
                      duration: 2,
                      repeat: Infinity,
                      ease: easeInOut,
                    }
                  : {}
              }
              className="w-3 h-3 bg-white rounded-full"
            />
          </div>
        </motion.div>

        {/* Education Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
          whileHover={{ scale: 1.02, y: -4 }}
          className={`w-full md:w-5/12 ${
            index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Background Gradient */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isHovered
                  ? { opacity: 0.1, scale: 1.1 }
                  : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.3 }}
              className={`absolute inset-0 bg-gradient-to-br ${
                isCurrent
                  ? "from-green-500 to-blue-500"
                  : "from-blue-500 to-purple-500"
              } rounded-2xl`}
            />

            {/* Current Badge */}
            {isCurrent && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-4 right-4"
              >
                <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {t("education.current")}
                </div>
              </motion.div>
            )}

            <div className="relative z-10">
              {/* Institution Icon */}
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                className={`inline-flex items-center justify-center p-3 bg-gradient-to-r ${
                  isCurrent
                    ? "from-green-500 to-blue-500"
                    : "from-blue-500 to-purple-500"
                } rounded-xl text-white mb-4 shadow-lg`}
              >
                <GraduationCap className="w-6 h-6" />
              </motion.div>

              {/* Education Details */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                  {education.degree}
                </h3>

                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  {education.field}
                </p>

                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                  <Building className="w-4 h-4 mr-2" />
                  <span className="font-medium">{education.institution}</span>
                </div>

                <div className="flex items-center text-gray-500 dark:text-gray-500 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {formatDate(education.startDate)} -{" "}
                    {isCurrent
                      ? t("education.current")
                      : formatDate(education.endDate)}
                  </span>
                </div>
              </div>

              {/* Skills/Highlights */}
              <div className="flex flex-wrap gap-2">
                {[
                  "education.skills.computer_engineering",
                  "education.skills.software_development",
                  "education.skills.database_management",
                  "education.skills.programming",
                ].map((skillKey) => (
                  <motion.span
                    key={skillKey}
                    whileHover={{ scale: 1.05 }}
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      isCurrent
                        ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                        : "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                    }`}
                  >
                    {t(skillKey)}
                  </motion.span>
                ))}
              </div>

              {/* Progress Bar for Current Education */}
              {isCurrent && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t("education.stats.progress")}
                    </span>
                    <span className="text-sm text-green-600 dark:text-green-400">
                      75%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={hasIntersected ? { width: "75%" } : { width: 0 }}
                      transition={{ duration: 1.5, delay: index * 0.3 + 1 }}
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const statVariants = {
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

  return (
    <section
      ref={sectionRef}
      id="education"
      className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
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
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/5 rounded-full filter blur-xl"
        />

        {/* Floating Education Icons */}
        {[BookOpen, Award, Brain, Star].map((Icon, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -15, 0],
              x: [0, 8, 0],
              rotate: [0, 10, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 6 + i * 1.5,
              repeat: Infinity,
              delay: i * 1,
              ease: easeInOut,
            }}
            className="absolute text-blue-500/20"
            style={{
              left: `${15 + i * 20}%`,
              top: `${25 + i * 15}%`,
            }}
          >
            <Icon className="w-6 h-6" />
          </motion.div>
        ))}
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
            className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6"
          >
            <GraduationCap className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("education.title")}
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            {t("education.cta.description")}
          </p>

          {/* Education Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={hasIntersected ? "visible" : "hidden"}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            <motion.div variants={statVariants} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  2022-2026
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t("education.stats.study_period")}
              </p>
            </motion.div>

            <motion.div variants={statVariants} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                  75%
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t("education.stats.completed")}
              </p>
            </motion.div>

            <motion.div variants={statVariants} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Building className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-2" />
                <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  UCI
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t("education.stats.institution")}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Education Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {portfolioData.education.map((edu, index) => (
            <EducationItem key={edu.id} education={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
