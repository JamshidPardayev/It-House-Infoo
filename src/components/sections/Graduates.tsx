import { motion } from "motion/react";
import { Building2, TrendingUp, Award, MapPin } from "lucide-react";
import { useMediumStatistics } from "../../api/hooks/useMediumStatistics";
import { useCompanies } from "../../api/hooks/useCompanies";

export function Graduates() {
  const {
    data: statsData,
    isLoading: statsLoading,
    isError: statsError,
  } = useMediumStatistics();

  const {
    data: companiesData,
    isLoading: companiesLoading,
    isError: companiesError,
  } = useCompanies();

  console.log(companiesData);

  if (statsLoading || companiesLoading)
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[-100]">
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Yuklanmoqda...
        </p>
      </div>
    );

  if (statsError || companiesError)
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[-100]">
        <p className="text-red-500 text-lg">Xatolik yuz berdi!</p>
      </div>
    );

  if (!statsData)
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[-100]">
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Statistik ma'lumot topilmadi.
        </p>
      </div>
    );

  // Statistikani tayyorlash
  const stats = [
    {
      icon: TrendingUp,
      value: statsData.total_employed,
      label: "3 oyda ishga joylashish",
      color: "text-green-500",
    },
    {
      icon: Award,
      value: statsData.avg_start_salary,
      label: "O'rtacha boshlang'ich maosh",
      color: "text-yellow-500",
    },
    {
      icon: Building2,
      value: statsData.total_graduates,
      label: "Muvaffaqiyatli bitiruvchilar",
      color: "text-blue-500",
    },
    {
      icon: MapPin,
      value: statsData.partners,
      label: "Hamkor kompaniyalar",
      color: "text-purple-500",
    },
  ];

  return (
    <section
      id="graduates"
      className="py-32 bg-gray-50 dark:bg-black relative overflow-hidden transition-colors duration-300"
    >
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-600/10 rounded-full blur-[150px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Sarlavha */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block bg-green-600/20 border border-green-600/30 px-6 py-3 rounded-full mb-6">
            <span className="text-green-500">Bizning Yutuqlarimiz</span>
          </div>

          <h2 className="text-black dark:text-white mb-6">
            <span className="text-green-600">{statsData.total_graduates}+</span>{" "}
            o'quvchilar IT sohasida o'z kelajagini qurishmoqda
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Bizning o'quvchilar nafaqat ishga joylashishadi, balki o'z kompaniyalariga ham asos solishadi 
          </p>
        </motion.div>

        {/* Statistikalar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-gray-200 shadow-lg dark:from-white/5 dark:to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-green-600/30 transition-all cursor-pointer"
            >
              <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
              <div className="text-gray-500 dark:text-white text-4xl mb-2">
                {stat.value}
                {index === 0 ? "%" : "+"}
              </div>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Kompaniyalar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-black dark:text-white text-center mb-12">
            Bitiruvchilarimiz Ishlaydigan Kompaniyalar
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {companiesData?.map((company: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="relative cursor-pointer rounded-2xl p-8 text-center 
                   border border-gray-300 dark:border-white/10 
                   bg-white dark:bg-white/5 
                   backdrop-blur-sm shadow-md 
                   hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-300 
                   dark:hover:from-white/10 dark:hover:to-white/5 
                   hover:border-gray-400 transition-all duration-500"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-12 mx-auto mb-4 object-contain"
                />
                <p className="text-green-500 text-sm bg-green-200 py-1.5 border  border-green-500 dark:border-green-800 dark:bg-green-950 dark:text-green-600 rounded-[10px]">
                  {company.workers} bitiruvchi
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-600/20 rounded-3xl p-12"
        >
          <h3 className="text-black dark:text-white mb-4">
            Siz ham <span className="text-green-600">ular </span>qatoriga
            qo'shiling!
          </h3>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Kelajakdagi professional IT mutaxassisga aylaning va dunyoning yirik
            kompaniyalarida ishlang!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-xl shadow-green-600/30"
          >
            Ro'yxatdan O'tish
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
