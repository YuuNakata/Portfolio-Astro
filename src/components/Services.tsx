import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Store,
  Calendar,
  MessageSquare,
  ShoppingCart,
  Users,
  TrendingUp,
  Globe,
  Smartphone,
  Mail,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Store,
      titleKey: "services.business.title",
      descriptionKey: "services.business.description",
      benefits: [
        "services.business.benefit1",
        "services.business.benefit2",
        "services.business.benefit3",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: ShoppingCart,
      titleKey: "services.ecommerce.title",
      descriptionKey: "services.ecommerce.description",
      benefits: [
        "services.ecommerce.benefit1",
        "services.ecommerce.benefit2",
        "services.ecommerce.benefit3",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Calendar,
      titleKey: "services.booking.title",
      descriptionKey: "services.booking.description",
      benefits: [
        "services.booking.benefit1",
        "services.booking.benefit2",
        "services.booking.benefit3",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Users,
      titleKey: "services.management.title",
      descriptionKey: "services.management.description",
      benefits: [
        "services.management.benefit1",
        "services.management.benefit2",
        "services.management.benefit3",
      ],
      color: "from-orange-500 to-red-500",
    },
  ];

  const features = [
    {
      icon: Globe,
      titleKey: "services.features.online.title",
      descKey: "services.features.online.desc",
    },
    {
      icon: Smartphone,
      titleKey: "services.features.mobile.title",
      descKey: "services.features.mobile.desc",
    },
    {
      icon: TrendingUp,
      titleKey: "services.features.growth.title",
      descKey: "services.features.growth.desc",
    },
    {
      icon: MessageSquare,
      titleKey: "services.features.communication.title",
      descKey: "services.features.communication.desc",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section
      id="services"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-900 overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">{t("services.badge")}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("services.title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("services.subtitle")}
          </p>
        </motion.div>

        {/* Main Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                />

                {/* Icon */}
                <div
                  className={`relative inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} mb-6 shadow-lg`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {t(service.titleKey)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {t(service.descriptionKey)}
                </p>

                {/* Benefits List */}
                <ul className="space-y-3">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {t(benefit)}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Hover Arrow */}
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-3xl p-8 sm:p-12 mb-16 shadow-2xl"
        >
          <h3 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            {t("services.features.title")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex p-4 bg-white/10 backdrop-blur-sm rounded-xl mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {t(feature.titleKey)}
                  </h4>
                  <p className="text-blue-100">{t(feature.descKey)}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-white dark:bg-gray-800 rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 dark:border-gray-700"
        >
          <Mail className="w-16 h-16 mx-auto mb-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("services.cta.title")}
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {t("services.cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <MessageSquare className="w-5 h-5" />
              {t("services.cta.button.contact")}
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-600"
            >
              <Calendar className="w-5 h-5" />
              {t("services.cta.button.quote")}
            </motion.a>
          </div>
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            {t("services.cta.note")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
