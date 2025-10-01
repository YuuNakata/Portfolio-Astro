import { AnimatePresence, motion, easeOut } from "framer-motion";
import {
  Code2,
  ExternalLink,
  Eye,
  Filter,
  Grid,
  List,
  Search,
  Star,
  X,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { portfolioData } from "../data/portfolio";
import { useIntersectionObserver } from "../lib/hooks";

interface ProjectCardProps {
  project: (typeof portfolioData.projects)[0];
  index: number;
  viewMode: "grid" | "list";
}

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = React.useRef<HTMLElement>(null);
  const { hasIntersected } = useIntersectionObserver(sectionRef, {
    threshold: 0.1,
  });

  const [filter, setFilter] = useState<"all" | "featured">("featured");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    return portfolioData.projects.filter((project) => {
      const matchesFilter = filter === "all" || project.featured;
      const matchesSearch =
        t(project.titleKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
        t(project.descriptionKey)
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesTech =
        !selectedTech || project.technologies.includes(selectedTech);

      return matchesFilter && matchesSearch && matchesTech;
    });
  }, [filter, searchTerm, selectedTech]);

  const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    index,
    viewMode,
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const cardVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          delay: index * 0.1,
          ease: easeOut,
        },
      },
    };

    if (viewMode === "list") {
      return (
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex flex-col md:flex-row">
            {/* Project Image */}
            <div className="md:w-1/3 relative overflow-hidden bg-gray-100 dark:bg-gray-700">
              {project.imageUrl ? (
                <div className="relative h-48 md:h-full">
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
                  )}
                  <img
                    src={project.imageUrl}
                    alt={t(project.titleKey)}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      isHovered ? "scale-105" : "scale-100"
                    } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                    onLoad={() => setImageLoaded(true)}
                  />
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Featured
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-48 md:h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Code2 className="w-16 h-16 text-white opacity-50" />
                </div>
              )}
            </div>

            {/* Project Content */}
            <div className="md:w-2/3 p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {t(project.titleKey)}
                </h3>
                <div className="flex space-x-2">
                  {project.githubUrl && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      aria-label={t("projects.view.code")}
                    >
                      <Code2 className="w-5 h-5" />
                    </motion.a>
                  )}
                  {project.liveUrl && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      aria-label={t("projects.view.live")}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                  )}
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {t(project.descriptionKey)}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <motion.button
                    key={tech}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setSelectedTech(selectedTech === tech ? null : tech)
                    }
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedTech === tech
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600"
                    }`}
                  >
                    {tech}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={hasIntersected ? "visible" : "hidden"}
        whileHover={{ y: -8 }}
        className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Project Image */}
        <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700 h-48">
          {project.imageUrl ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
              )}
              <img
                src={project.imageUrl}
                alt={t(project.titleKey)}
                className={`w-full h-full object-cover transition-all duration-300 ${
                  isHovered ? "scale-110" : "scale-100"
                } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setImageLoaded(true)}
              />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Code2 className="w-16 h-16 text-white opacity-50" />
            </div>
          )}

          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center"
          >
            <div className="flex space-x-4">
              {project.liveUrl && (
                <motion.a
                  initial={{ scale: 0 }}
                  animate={{ scale: isHovered ? 1 : 0 }}
                  transition={{ delay: 0.1 }}
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white text-gray-900 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                  aria-label={t("projects.view.live")}
                >
                  <Eye className="w-5 h-5" />
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  initial={{ scale: 0 }}
                  animate={{ scale: isHovered ? 1 : 0 }}
                  transition={{ delay: 0.2 }}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-800 hover:text-white transition-colors"
                  aria-label={t("projects.view.code")}
                >
                  <Code2 className="w-5 h-5" />
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-2 rounded-full"
              >
                <Star className="w-4 h-4" />
              </motion.div>
            </div>
          )}
        </div>

        {/* Project Content */}
        {/* Project Title */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {t(project.titleKey)}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {t(project.descriptionKey)}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <motion.button
                key={tech}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setSelectedTech(selectedTech === tech ? null : tech)
                }
                className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedTech === tech
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600"
                }`}
              >
                {tech}
              </motion.button>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            {project.liveUrl && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium"
              >
                {t("projects.view.live")}
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors text-center text-sm font-medium"
              >
                {t("projects.view.code")}
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/5 rounded-full filter blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500/5 rounded-full filter blur-3xl"
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
            <Code2 className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("projects.title")}
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            {t("projects.description") ||
              "Explore my portfolio of web applications, games, and software projects showcasing various technologies and solutions."}
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={
                    t("projects.search.placeholder") || "Search projects..."
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Filter Buttons */}
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter("featured")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === "featured"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  <Star className="w-4 h-4 inline mr-2" />
                  Featured
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  All Projects
                </motion.button>
              </div>
            </div>

            {/* View Mode and Tech Filter */}
            <div className="flex items-center gap-4">
              {/* Technology Filter */}
              {selectedTech && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  <Filter className="w-4 h-4" />
                  {selectedTech}
                  <button
                    onClick={() => setSelectedTech(null)}
                    className="p-1 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              )}

              {/* View Mode Toggle */}
              <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <List className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${filter}-${searchTerm}-${selectedTech}-${viewMode}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
            }
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                viewMode={viewMode}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
