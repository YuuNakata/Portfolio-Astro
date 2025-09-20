import { easeInOut, easeOut, motion } from "framer-motion";
import {
  Award,
  Database,
  Download,
  Gamepad2,
  Globe,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { portfolioData } from "../data/portfolio";
import { useIntersectionObserver } from "../lib/hooks";

interface AchievementCardProps {
  achievement: (typeof portfolioData.achievements)[0];
  index: number;
}

const Achievements: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = React.useRef<HTMLElement>(null);
  const { hasIntersected } = useIntersectionObserver(sectionRef, {
    threshold: 0.1,
  });

  const getAchievementIcon = (iconName: string) => {
    const iconProps = { className: "w-8 h-8" };

    switch (iconName) {
      case "globe":
        return <Globe {...iconProps} />;
      case "database":
        return <Database {...iconProps} />;
      case "gamepad-2":
        return <Gamepad2 {...iconProps} />;
      case "shield-check":
        return <ShieldCheck {...iconProps} />;
      default:
        return <Trophy {...iconProps} />;
    }
  };

  const getGradientClass = (index: number) => {
    const gradients = [
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-pink-500",
      "from-green-500 to-emerald-500",
      "from-orange-500 to-red-500",
    ];
    return gradients[index % gradients.length];
  };

  const AchievementCard: React.FC<AchievementCardProps> = ({
    achievement,
    index,
  }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const gradientClass = getGradientClass(index);

    const cardVariants = {
      hidden: {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          delay: index * 0.2,
          ease: easeOut,
        },
      },
    };

    const iconVariants = {
      initial: { rotate: 0, scale: 1 },
      hover: {
        rotate: 360,
        scale: 1.1,
        transition: {
          duration: 0.6,
          ease: easeInOut,
        },
      },
    };

    const backgroundVariants = {
      initial: { scale: 1, opacity: 0.1 },
      hover: {
        scale: 1.05,
        opacity: 0.2,
        transition: {
          duration: 0.3,
          ease: easeOut,
        },
      },
    };

    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={hasIntersected ? "visible" : "hidden"}
        whileHover={{
          y: -8,
          transition: { duration: 0.2 },
        }}
        className="group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Card */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Background Gradient */}
          <motion.div
            variants={backgroundVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
            className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-5 rounded-2xl`}
          />

          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 opacity-10">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Star className="w-16 h-16 text-gray-400" />
            </motion.div>
          </div>

          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              variants={iconVariants}
              initial="initial"
              animate={isHovered ? "hover" : "initial"}
              className={`inline-flex items-center justify-center p-4 bg-gradient-to-br ${gradientClass} rounded-2xl text-white mb-6 shadow-lg`}
            >
              {getAchievementIcon(achievement.icon)}
            </motion.div>

            {/* Achievement Title */}
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
              {achievement.title}
            </h3>

            {/* Achievement Description */}
            <p
              className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed"
              suppressHydrationWarning
            >
              {t(`achievements.${achievement.id}.description`) ||
                achievement.description}
            </p>

            {/* Metrics */}
            {achievement.metrics && (
              <div className="flex items-center justify-between">
                <div
                  className={`px-4 py-2 bg-gradient-to-r ${gradientClass} text-white rounded-full font-semibold text-lg shadow-md`}
                >
                  {achievement.metrics}
                </div>

                {/* Animated Progress Indicator */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={hasIntersected ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: index * 0.2 + 0.5, duration: 0.3 }}
                  className="flex items-center space-x-1"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={
                        hasIntersected
                          ? {
                              opacity: i < 4 ? 1 : 0.3,
                              scale: 1,
                            }
                          : {
                              opacity: 0,
                              scale: 0,
                            }
                      }
                      transition={{
                        delay: index * 0.2 + 0.7 + i * 0.1,
                        duration: 0.2,
                      }}
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradientClass}`}
                    />
                  ))}
                </motion.div>
              </div>
            )}

            {/* Hover Effect Indicator */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.3 }}
              className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientClass} rounded-full origin-left`}
            />
          </div>
        </div>

        {/* Floating Icon Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={
            isHovered
              ? {
                  opacity: 0.2,
                  scale: 2,
                  x: 20,
                  y: -20,
                  rotate: 45,
                }
              : {
                  opacity: 0,
                  scale: 0,
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
          }
          transition={{ duration: 0.3 }}
          className="absolute top-4 left-4 pointer-events-none"
        >
          {getAchievementIcon(achievement.icon)}
        </motion.div>
      </motion.div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      id="achievements"
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
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full filter blur-3xl"
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
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/10 to-purple-600/10 rounded-full filter blur-3xl"
        />

        {/* Floating Achievement Icons */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: easeInOut,
            }}
            className="absolute text-blue-500/20"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          >
            <Trophy className="w-8 h-8" />
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
            className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full mb-6"
          >
            <Award className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("achievements.title")}
          </h2>

          <p
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8"
            suppressHydrationWarning
          >
            {t("achievements.description") ||
              "Significant milestones and accomplishments that showcase my impact and expertise in software development."}
          </p>

          {/* Achievement Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={hasIntersected ? "visible" : "hidden"}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            <motion.div variants={statVariants} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  500+
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Daily Users Reached
              </p>
            </motion.div>

            <motion.div variants={statVariants} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                  30%
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Performance Improvement
              </p>
            </motion.div>

            <motion.div variants={statVariants} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Download className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-2" />
                <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  1K+
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Game Downloads
              </p>
            </motion.div>

            <motion.div variants={statVariants} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <ShieldCheck className="w-6 h-6 text-orange-600 dark:text-orange-400 mr-2" />
                <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  90%
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Risk Reduction
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Achievement Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {portfolioData.achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={index}
            />
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={
            hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl p-8 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-20" />
            </div>

            <div className="relative z-10">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: easeInOut,
                }}
                className="inline-block mb-4"
              >
                <Target className="w-12 h-12 mx-auto" />
              </motion.div>

              <h3
                className="text-2xl md:text-3xl font-bold mb-4"
                suppressHydrationWarning
              >
                {t("achievements.cta.title") ||
                  "Ready to achieve more together?"}
              </h3>

              <p
                className="text-blue-100 mb-6 max-w-2xl mx-auto text-lg"
                suppressHydrationWarning
              >
                {t("achievements.cta.description") ||
                  "Let's collaborate to create impactful solutions and reach new milestones in your next project."}
              </p>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const contactSection = document.querySelector("#contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                <Zap className="w-5 h-5" />
                <span suppressHydrationWarning>
                  {t("achievements.cta.button") || "Start a Project"}
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
