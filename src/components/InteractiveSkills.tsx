import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Monitor,
  Zap,
  Database,
  Code,
  Play,
  RotateCcw,
  ChevronRight,
  Cpu,
} from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useIntersectionObserver } from "../lib/hooks";

interface InteractiveDemo {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  component: React.ReactNode;
}

const InteractiveSkills: React.FC = () => {
  useLanguage();
  const sectionRef = React.useRef<HTMLElement>(null);
  const { hasIntersected } = useIntersectionObserver(sectionRef, {
    threshold: 0.1,
  });

  const [activeDemo, setActiveDemo] = useState(0);

  // Responsive Design Demo State
  const [isResponsiveMode, setIsResponsiveMode] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Algorithm Demo State
  const [sortingArray, setSortingArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [sortingStep, setSortingStep] = useState(0);

  // Performance Demo State
  const [performanceMetrics, setPerformanceMetrics] = useState({
    loading: 0,
    optimization: 0,
  });

  // Database Demo State
  const [querySpeed, setQuerySpeed] = useState(0);
  const [isQueryRunning, setIsQueryRunning] = useState(false);

  // Initialize sorting array
  useEffect(() => {
    resetSortingArray();
  }, []);

  const resetSortingArray = useCallback(() => {
    const newArray = Array.from(
      { length: 8 },
      () => Math.floor(Math.random() * 100) + 10,
    );
    setSortingArray(newArray);
    setSortingStep(0);
  }, []);

  // Quick Sort Visualization
  const startSorting = useCallback(async () => {
    if (isSorting) return;

    setIsSorting(true);
    const arr = [...sortingArray];

    const quickSort = async (start: number, end: number) => {
      if (start >= end) return;

      const pivotIndex = await partition(arr, start, end);
      await quickSort(start, pivotIndex - 1);
      await quickSort(pivotIndex + 1, end);
    };

    const partition = async (array: number[], start: number, end: number) => {
      const pivot = array[end];
      let i = start - 1;

      for (let j = start; j < end; j++) {
        setSortingStep(j);
        await new Promise((resolve) => setTimeout(resolve, 400));

        if (array[j] < pivot) {
          i++;
          [array[i], array[j]] = [array[j], array[i]];
          setSortingArray([...array]);
          await new Promise((resolve) => setTimeout(resolve, 400));
        }
      }

      [array[i + 1], array[end]] = [array[end], array[i + 1]];
      setSortingArray([...array]);
      await new Promise((resolve) => setTimeout(resolve, 400));

      return i + 1;
    };

    await quickSort(0, arr.length - 1);
    setIsSorting(false);
    setSortingStep(-1);
  }, [sortingArray, isSorting]);

  // Responsive Design Demo
  const ResponsiveDemo = () => (
    <div className="relative h-80 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-xl overflow-hidden">
      <motion.div
        className="absolute inset-4"
        animate={
          isResponsiveMode
            ? {
                scale: 0.4,
                x: 80,
                rotateY: 8,
              }
            : {
                scale: 1,
                x: 0,
                rotateY: 0,
              }
        }
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
        style={{
          transformOrigin: "center top",
        }}
      >
        <div className="w-full h-full bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-600 overflow-hidden">
          {/* Browser Header */}
          <div className="h-8 bg-gray-100 dark:bg-gray-800 flex items-center px-3 space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-1 bg-white dark:bg-gray-700 rounded text-xs px-2 py-1 text-gray-600 dark:text-gray-300">
              portfolio.dev
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            <motion.div
              className="h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded"
              animate={{ width: isResponsiveMode ? "100%" : "100%" }}
              transition={{ delay: 0.2, duration: 0.6 }}
            />
            <motion.div
              className="grid gap-2"
              animate={{
                gridTemplateColumns: isResponsiveMode ? "1fr" : "1fr 1fr 1fr",
              }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="h-12 bg-gray-200 dark:bg-gray-600 rounded"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-600 rounded"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-600 rounded"></div>
            </motion.div>
            <motion.div
              className="h-3 bg-gray-300 dark:bg-gray-600 rounded"
              animate={{ width: isResponsiveMode ? "100%" : "70%" }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
            <motion.div
              className="h-3 bg-gray-300 dark:bg-gray-600 rounded"
              animate={{ width: isResponsiveMode ? "80%" : "50%" }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Mobile Frame */}
      <AnimatePresence>
        {isResponsiveMode && (
          <motion.div
            initial={{
              scale: 0,
              x: 300,
              y: 100,
              opacity: 0,
              rotateY: 45,
            }}
            animate={{
              scale: 1,
              x: 280,
              y: 30,
              opacity: 1,
              rotateY: -8,
            }}
            exit={{
              scale: 0,
              opacity: 0,
              y: 200,
              transition: { duration: 0.4 },
            }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: "easeOut",
            }}
            className="absolute w-28 h-52 bg-gray-900 rounded-xl p-1 shadow-2xl"
          >
            <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden relative">
              {/* Mobile Notch */}
              <div className="h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full w-8 mx-auto mt-1"></div>

              {/* Mobile Content - Mirroring Desktop */}
              <div className="p-2 mt-1 space-y-2">
                {/* Header bar matching desktop */}
                <div className="h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded w-full"></div>

                {/* Cards stacked vertically (mobile responsive) */}
                <div className="space-y-1">
                  <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded"></div>
                </div>

                {/* Text content matching desktop */}
                <div className="space-y-1 mt-2">
                  <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                  <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-4/5"></div>
                  <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                </div>
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-1 left-0 right-0 h-1 bg-gray-800 rounded-full w-8 mx-auto"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (!isAnimating) {
            setIsAnimating(true);
            setIsResponsiveMode(!isResponsiveMode);
            setTimeout(() => setIsAnimating(false), 1200);
          }
        }}
        disabled={isAnimating}
        className="absolute bottom-4 left-4 flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
      >
        {isResponsiveMode ? (
          <Monitor className="w-4 h-4" />
        ) : (
          <Smartphone className="w-4 h-4" />
        )}
        <span>
          {isAnimating
            ? "Transforming..."
            : isResponsiveMode
              ? "Desktop View"
              : "Mobile View"}
        </span>
      </motion.button>
    </div>
  );

  // Algorithm Visualization Demo
  const AlgorithmDemo = () => (
    <div className="h-80 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
          Quick Sort Algorithm
        </h4>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startSorting}
            disabled={isSorting}
            className="flex items-center space-x-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            <span>{isSorting ? "Sorting..." : "Sort"}</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetSortingArray}
            disabled={isSorting}
            className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg disabled:opacity-50"
          >
            <RotateCcw className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <div className="flex items-end justify-center space-x-2 h-48">
        {sortingArray.map((value, index) => (
          <motion.div
            key={index}
            className={`w-8 rounded-t-lg transition-colors duration-300 ${
              sortingStep === index || sortingStep === index - 1
                ? "bg-red-500"
                : sortingStep === -1
                  ? "bg-green-500"
                  : "bg-purple-500"
            }`}
            animate={{ height: `${value * 1.5}px` }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="text-xs text-white font-bold text-center mt-1">
              {value}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Time Complexity:{" "}
          <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
            O(n log n) avg
          </code>
        </div>
      </div>
    </div>
  );

  // Performance Demo
  const PerformanceDemo = () => {
    const [isOptimizing, setIsOptimizing] = useState(false);

    const runOptimization = async () => {
      if (isOptimizing) return;

      setIsOptimizing(true);
      setPerformanceMetrics({ loading: 0, optimization: 0 });

      // Simulate loading without optimization
      for (let i = 0; i <= 100; i += 2) {
        setPerformanceMetrics((prev) => ({ ...prev, loading: i }));
        await new Promise((resolve) => setTimeout(resolve, 30));
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      // Simulate optimization improvements
      for (let i = 0; i <= 100; i += 5) {
        setPerformanceMetrics((prev) => ({ ...prev, optimization: i }));
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      setIsOptimizing(false);
    };

    return (
      <div className="h-80 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">
            Performance Optimization
          </h4>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={runOptimization}
            disabled={isOptimizing}
            className="flex items-center space-x-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm disabled:opacity-50"
          >
            <Zap className="w-4 h-4" />
            <span>{isOptimizing ? "Optimizing..." : "Run Test"}</span>
          </motion.button>
        </div>

        <div className="space-y-6">
          {/* Before Optimization */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Before Optimization
              </span>
              <span className="text-sm text-gray-500">
                {performanceMetrics.loading}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <motion.div
                className="bg-red-500 h-3 rounded-full"
                animate={{ width: `${performanceMetrics.loading}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Load Time: {(5 - performanceMetrics.loading / 20).toFixed(1)}s
            </div>
          </div>

          {/* After Optimization */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                After Optimization
              </span>
              <span className="text-sm text-gray-500">
                {performanceMetrics.optimization}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <motion.div
                className="bg-green-500 h-3 rounded-full"
                animate={{ width: `${performanceMetrics.optimization}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Load Time:{" "}
              {(1.2 - performanceMetrics.optimization / 100).toFixed(1)}s
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">-75%</div>
              <div className="text-xs text-gray-500">Load Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">+90%</div>
              <div className="text-xs text-gray-500">Performance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">98</div>
              <div className="text-xs text-gray-500">Lighthouse</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Database Query Demo
  const DatabaseDemo = () => {
    const [queryResults, setQueryResults] = useState<any[]>([]);
    const [showResults, setShowResults] = useState(false);

    const runQuery = async () => {
      if (isQueryRunning) return;

      setIsQueryRunning(true);
      setQuerySpeed(0);
      setShowResults(false);
      setQueryResults([]);

      // Simulate query execution with steps
      const steps = [
        { progress: 20, message: "Parsing query..." },
        { progress: 40, message: "Optimizing execution plan..." },
        { progress: 60, message: "Applying indexes..." },
        { progress: 80, message: "Fetching data..." },
        { progress: 100, message: "Formatting results..." },
      ];

      for (const step of steps) {
        setQuerySpeed(step.progress);
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      // Show results
      const mockResults = [
        {
          id: 1,
          name: "Alice Johnson",
          projects: 12,
          department: "Engineering",
        },
        { id: 2, name: "Bob Smith", projects: 8, department: "Design" },
        { id: 3, name: "Carol Davis", projects: 15, department: "Engineering" },
        { id: 4, name: "David Wilson", projects: 6, department: "Marketing" },
      ];

      setQueryResults(mockResults);
      setShowResults(true);
      setIsQueryRunning(false);
    };

    return (
      <div className="h-80 bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">
            Database Query Optimization
          </h4>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={runQuery}
            disabled={isQueryRunning}
            className="flex items-center space-x-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm disabled:opacity-50"
          >
            <Database className="w-4 h-4" />
            <span>{isQueryRunning ? "Executing..." : "Run Query"}</span>
          </motion.button>
        </div>

        <div className="space-y-4">
          {/* SQL Query */}
          <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
            <div className="text-blue-400">SELECT</div>
            <div className="ml-4">u.name, COUNT(p.id) as projects</div>
            <div className="text-blue-400">FROM</div>
            <div className="ml-4">users u</div>
            <div className="text-blue-400">JOIN</div>
            <div className="ml-4">projects p ON u.id = p.user_id</div>
            <div className="text-blue-400">WHERE</div>
            <div className="ml-4">u.active = true</div>
            <div className="text-blue-400">GROUP BY</div>
            <div className="ml-4">u.id, u.name;</div>
          </div>

          {/* Execution Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Query Execution
              </span>
              <span className="text-sm text-gray-500">{querySpeed}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-indigo-500 h-2 rounded-full"
                animate={{ width: `${querySpeed}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Results */}
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-h-32 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-300 dark:border-gray-600">
                      <th className="text-left p-1">Name</th>
                      <th className="text-left p-1">Projects</th>
                      <th className="text-left p-1">Dept</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queryResults.map((row, index) => (
                      <motion.tr
                        key={row.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-gray-200 dark:border-gray-700"
                      >
                        <td className="p-1 font-medium">{row.name}</td>
                        <td className="p-1 text-blue-600 dark:text-blue-400">
                          {row.projects}
                        </td>
                        <td className="p-1 text-gray-600 dark:text-gray-400">
                          {row.department}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          <div className="text-center space-y-2 mt-3">
            <div className="text-xs text-gray-500">
              Execution Time: {isQueryRunning ? "..." : "23ms"}
            </div>
            <div className="text-xs text-gray-500">
              Rows Returned: {isQueryRunning ? "..." : queryResults.length}
            </div>
            <div className="text-xs text-green-600 font-medium">
              {querySpeed === 100 &&
                !isQueryRunning &&
                "✓ Query Optimized with Indexes"}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const demos: InteractiveDemo[] = [
    {
      id: "responsive",
      title: "Responsive Design",
      description: "Watch the magic of responsive design in action",
      icon: <Smartphone className="w-5 h-5" />,
      color: "from-blue-500 to-indigo-600",
      component: <ResponsiveDemo />,
    },
    {
      id: "algorithms",
      title: "Algorithm Visualization",
      description: "See sorting algorithms come to life",
      icon: <Code className="w-5 h-5" />,
      color: "from-purple-500 to-pink-600",
      component: <AlgorithmDemo />,
    },
    {
      id: "performance",
      title: "Performance Optimization",
      description: "Experience the impact of optimization",
      icon: <Zap className="w-5 h-5" />,
      color: "from-green-500 to-emerald-600",
      component: <PerformanceDemo />,
    },
    {
      id: "database",
      title: "Database Queries",
      description: "Optimized SQL queries in real-time",
      icon: <Database className="w-5 h-5" />,
      color: "from-indigo-500 to-blue-600",
      component: <DatabaseDemo />,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
    >
      {/* Background Effects */}
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
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full filter blur-3xl"
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
            className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-6 shadow-lg"
          >
            <Cpu className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Interactive Skills Demo
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Don't just read about it—experience it! Interactive demonstrations
            of real-world development skills.
          </p>
        </motion.div>

        {/* Demo Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {demos.map((demo, index) => (
            <motion.button
              key={demo.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveDemo(index)}
              className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-3 ${
                activeDemo === index
                  ? `bg-gradient-to-r ${demo.color} text-white shadow-lg transform scale-105`
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md"
              }`}
            >
              {demo.icon}
              <div className="text-left">
                <div className="font-bold">{demo.title}</div>
                <div className="text-xs opacity-80">{demo.description}</div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Demo Content */}
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {demos[activeDemo].component}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={
            hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px]" />

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to See More?
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
                These interactive demos showcase just a glimpse of what's
                possible. Let's build something amazing together.
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
                className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center space-x-2 group"
              >
                <span>Let's Work Together</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveSkills;
