import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Store,
  Calendar,
  ShoppingCart,
  Users,
  TrendingUp,
  Globe,
  Smartphone,
  MessageSquare,
  CheckCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Phone,
  Package,
  CreditCard,
  Bell,
  BarChart3,
  UserCheck,
} from "lucide-react";

const Services = () => {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const services = [
    {
      id: "business",
      icon: Store,
      titleKey: "services.business.title",
      descriptionKey: "services.business.description",
      benefits: [
        "services.business.benefit1",
        "services.business.benefit2",
        "services.business.benefit3",
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
    },
    {
      id: "ecommerce",
      icon: ShoppingCart,
      titleKey: "services.ecommerce.title",
      descriptionKey: "services.ecommerce.description",
      benefits: [
        "services.ecommerce.benefit1",
        "services.ecommerce.benefit2",
        "services.ecommerce.benefit3",
      ],
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
    },
    {
      id: "booking",
      icon: Calendar,
      titleKey: "services.booking.title",
      descriptionKey: "services.booking.description",
      benefits: [
        "services.booking.benefit1",
        "services.booking.benefit2",
        "services.booking.benefit3",
      ],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
    },
    {
      id: "management",
      icon: Users,
      titleKey: "services.management.title",
      descriptionKey: "services.management.description",
      benefits: [
        "services.management.benefit1",
        "services.management.benefit2",
        "services.management.benefit3",
      ],
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % services.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, services.length]);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + services.length) % services.length);
  };

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

  const BusinessDemo = () => (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white">
                {t("services.demo.business.name")}
              </h4>
              <p className="text-sm text-gray-500">
                {t("services.demo.business.tagline")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="bg-blue-50 dark:bg-gray-700 rounded-lg p-3"
            >
              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 mb-1" />
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {t("services.demo.business.address")}
              </p>
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="bg-blue-50 dark:bg-gray-700 rounded-lg p-3"
            >
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 mb-1" />
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {t("services.demo.business.hours")}
              </p>
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              className="bg-blue-50 dark:bg-gray-700 rounded-lg p-3"
            >
              <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400 mb-1" />
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {t("services.demo.business.phone")}
              </p>
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 2 }}
              className="bg-blue-50 dark:bg-gray-700 rounded-lg p-3"
            >
              <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400 mb-1" />
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {t("services.demo.business.available")}
              </p>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="aspect-square bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );

  const EcommerceDemo = () => (
    <div className="relative w-full h-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-3">
          {[
            { nameKey: "services.demo.ecommerce.product1", price: "$25" },
            { nameKey: "services.demo.ecommerce.product2", price: "$35" },
          ].map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-lg"
            >
              <div className="aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg mb-2" />
              <h5 className="font-semibold text-sm text-gray-900 dark:text-white">
                {t(product.nameKey)}
              </h5>
              <p className="text-purple-600 dark:text-purple-400 font-bold">
                {product.price}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs py-2 rounded-lg flex items-center justify-center gap-1"
              >
                <ShoppingCart className="w-3 h-3" />
                {t("services.demo.ecommerce.add")}
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="font-semibold text-gray-900 dark:text-white">
                {t("services.demo.ecommerce.cart")}
              </span>
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
            >
              2
            </motion.div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300 text-sm">
              {t("services.demo.ecommerce.total")}
            </span>
            <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
              $60
            </span>
          </div>
          <motion.button
            animate={{
              boxShadow: [
                "0 4px 6px rgba(168, 85, 247, 0.4)",
                "0 8px 16px rgba(168, 85, 247, 0.6)",
                "0 4px 6px rgba(168, 85, 247, 0.4)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-3 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            {t("services.demo.ecommerce.checkout")}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );

  const BookingDemo = () => (
    <div className="relative w-full h-full bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-900 dark:text-white">
              {t("services.demo.booking.name")}
            </h4>
            <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>

          <div className="space-y-2">
            {[
              {
                time: "10:00 AM",
                status: "available",
                serviceKey: "services.demo.booking.service1",
              },
              {
                time: "11:30 AM",
                status: "booked",
                serviceKey: "services.demo.booking.service2",
              },
              {
                time: "02:00 PM",
                status: "available",
                serviceKey: "services.demo.booking.service3",
              },
            ].map((slot, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className={`p-3 rounded-lg border-2 ${
                  slot.status === "available"
                    ? "border-green-300 bg-green-50 dark:bg-green-900/20"
                    : "border-gray-300 bg-gray-100 dark:bg-gray-700/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">
                      {slot.time}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {t(slot.serviceKey)}
                    </p>
                  </div>
                  {slot.status === "available" ? (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold"
                    >
                      {t("services.demo.booking.available")}
                    </motion.div>
                  ) : (
                    <div className="px-3 py-1 bg-gray-400 text-white rounded-full text-xs">
                      {t("services.demo.booking.booked")}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white shadow-lg"
        >
          <div className="flex items-start gap-3">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Bell className="w-5 h-5" />
            </motion.div>
            <div>
              <p className="font-semibold text-sm">
                {t("services.demo.booking.reminder")}
              </p>
              <p className="text-xs opacity-90 mt-1">
                {t("services.demo.booking.reminderText")}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );

  const ManagementDemo = () => (
    <div className="relative w-full h-full bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              labelKey: "services.demo.management.salesToday",
              value: "$1,250",
              icon: TrendingUp,
              change: "+15%",
            },
            {
              labelKey: "services.demo.management.products",
              value: "324",
              icon: Package,
              change: "-5",
            },
            {
              labelKey: "services.demo.management.customers",
              value: "48",
              icon: Users,
              change: "+8",
            },
            {
              labelKey: "services.demo.management.employees",
              value: "12",
              icon: UserCheck,
              change: "100%",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <span className="text-xs text-green-600 dark:text-green-400 font-semibold">
                  {stat.change}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {t(stat.labelKey)}
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-900 dark:text-white text-sm">
              {t("services.demo.management.weeklySales")}
            </span>
            <BarChart3 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="flex items-end justify-between gap-2 h-24">
            {[60, 80, 45, 90, 70, 95, 85].map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex-1 bg-gradient-to-t from-orange-500 to-red-500 rounded-t-lg"
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {["L", "M", "X", "J", "V", "S", "D"].map((day, i) => (
              <span
                key={i}
                className="text-xs text-gray-500 dark:text-gray-400"
              >
                {day}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-xl p-3"
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Package className="w-4 h-4 text-red-600 dark:text-red-400" />
            </motion.div>
            <div>
              <p className="text-xs font-semibold text-red-800 dark:text-red-300">
                {t("services.demo.management.stockAlert")}
              </p>
              <p className="text-xs text-red-600 dark:text-red-400">
                {t("services.demo.management.stockAlertText")}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );

  const demoComponents: { [key: string]: () => React.ReactElement } = {
    business: BusinessDemo,
    ecommerce: EcommerceDemo,
    booking: BookingDemo,
    management: ManagementDemo,
  };

  const currentService = services[activeSlide];
  const DemoComponent = demoComponents[currentService.id];

  return (
    <section
      id="services"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-900 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
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

        <div
          className="mb-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              key={`info-${activeSlide}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-4 rounded-2xl bg-gradient-to-br ${currentService.color} shadow-xl`}
                >
                  <currentService.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {t(currentService.titleKey)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t(currentService.descriptionKey)}
                  </p>
                </div>
              </div>

              <ul className="space-y-3">
                {currentService.benefits.map((benefit, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {t(benefit)}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <div className="flex items-center gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevSlide}
                  className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </motion.button>

                <div className="flex gap-2">
                  {services.map((_, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === activeSlide
                          ? `w-8 bg-gradient-to-r ${currentService.color}`
                          : "w-2 bg-gray-300 dark:bg-gray-600"
                      }`}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextSlide}
                  className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              key={`demo-${activeSlide}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="aspect-square max-w-lg mx-auto">
                <AnimatePresence mode="wait">
                  <DemoComponent />
                </AnimatePresence>
              </div>

              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className={`absolute -inset-4 bg-gradient-to-r ${currentService.color} rounded-3xl blur-3xl -z-10`}
              />
            </motion.div>
          </div>
        </div>

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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-white dark:bg-gray-800 rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 dark:border-gray-700"
        >
          <MessageSquare className="w-16 h-16 mx-auto mb-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("services.cta.title")}
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {t("services.cta.description")}
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MessageSquare className="w-5 h-5" />
            {t("services.cta.button.contact")}
          </motion.a>
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            {t("services.cta.note")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
