import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowRight, TrendingUp, Home, Bus, Coffee, Zap, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function ComparisonResult() {
  const navigate = useNavigate();
  const [savingsCount, setSavingsCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let count = 0;
      const interval = setInterval(() => {
        count += 8;
        if (count >= 480) {
          setSavingsCount(480);
          clearInterval(interval);
        } else {
          setSavingsCount(count);
        }
      }, 10);
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const comparisonData = [
    { category: "주거비", icon: Home, current: 120, target: 60, color: "#2563EB" },
    { category: "교통비", icon: Bus, current: 35, target: 25, color: "#0F7A4D" },
    { category: "식비", icon: Coffee, current: 45, target: 30, color: "#B7791F" },
    { category: "문화생활", icon: Sparkles, current: 25, target: 20, color: "#B3261E" },
    { category: "공과금", icon: Zap, current: 15, target: 10, color: "#222222" },
  ];

  const currentTotal = comparisonData.reduce((sum, item) => sum + item.current, 0);
  const targetTotal = comparisonData.reduce((sum, item) => sum + item.target, 0);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F5F7FB]">
      {/* Gold Banner */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-gradient-to-r from-[#B7791F] to-[#D99A2B] py-8 px-6"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <p className="text-white text-xl mb-2">이주 시 예상 효과</p>
            <h1 className="text-5xl font-bold text-white mb-2">
              연간 <span className="text-6xl">{savingsCount}만 원</span>을 더 아낄 수 있습니다
            </h1>
            <p className="text-white/90 text-lg">월 평균 40만 원 절약 가능</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Comparison Section */}
      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Current City */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gradient-to-br from-[#B3261E] to-[#222222] rounded-lg p-8 text-white shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-white/70 mb-1">현재</p>
                <h2 className="text-3xl font-bold">서울, 강남구</h2>
              </div>
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <TrendingUp size={32} className="text-white/80" />
              </div>
            </div>

            <div className="space-y-4">
              {comparisonData.map((item, index) => (
                <motion.div
                  key={item.category}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <item.icon size={18} className="text-white/70" />
                      <span className="text-white/90">{item.category}</span>
                    </div>
                    <span className="font-bold text-lg">{item.current}만 원</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.current / 150) * 100}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                      className="h-full bg-white/60 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}

              <div className="pt-6 mt-6 border-t border-white/20">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold">월 총 생활비</span>
                  <span className="text-3xl font-bold">{currentTotal}만 원</span>
                </div>
                <div className="flex justify-between items-center mt-4 text-white/80">
                  <span>월 소득 300만 원 기준</span>
                  <span className="text-2xl font-bold">가용 {300 - currentTotal}만 원</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Target City */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gradient-to-br from-[#2563EB] to-[#0F7A4D] rounded-lg p-8 text-white shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-white/70 mb-1">이주 후</p>
                <h2 className="text-3xl font-bold">대전, 유성구</h2>
              </div>
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <TrendingUp size={32} className="text-[#B7791F]" />
              </div>
            </div>

            <div className="space-y-4">
              {comparisonData.map((item, index) => (
                <motion.div
                  key={item.category}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <item.icon size={18} className="text-white/70" />
                      <span className="text-white/90">{item.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">{item.target}만 원</span>
                      <span className="text-[#B7791F] text-sm font-semibold">
                        -{item.current - item.target}만
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.target / 150) * 100}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                      className="h-full bg-[#B7791F] rounded-full"
                    />
                  </div>
                </motion.div>
              ))}

              <div className="pt-6 mt-6 border-t border-white/20">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold">월 총 생활비</span>
                  <span className="text-3xl font-bold">{targetTotal}만 원</span>
                </div>
                <div className="flex justify-between items-center mt-4 bg-[#B7791F]/20 rounded-lg p-4">
                  <span className="text-lg">월 소득 300만 원 기준</span>
                  <span className="text-3xl font-bold text-[#B7791F]">
                    가용 {300 - targetTotal}만 원
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* AI Insight */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="bg-white rounded-lg p-8 shadow-xl mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#2563EB]/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles size={24} className="text-[#2563EB]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl font-bold text-[#222222]">AI 인사이트</h3>
                <span className="px-3 py-1 bg-[#2563EB]/10 text-[#2563EB] text-xs font-semibold rounded-full border border-[#2563EB]/20">
                  AI 분석
                </span>
              </div>
              <p className="text-[#5F6368] leading-relaxed">
                대전 유성구로 이주할 경우, <span className="font-bold text-[#222222]">주거비가 50% 절감</span>되며
                월 가용소득이 <span className="font-bold text-[#B7791F]">85만 원에서 155만 원으로 82% 증가</span>합니다.
                또한 유성구는 대덕연구단지 인근으로 IT·연구직 기회가 풍부하며,
                청년 주거지원 정책 3건에 해당되어 <span className="font-bold text-[#0F7A4D]">추가 연 120만 원의 혜택</span>을 받으실 수 있습니다.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex gap-4 justify-center"
        >
          <button
            onClick={() => navigate("/neighborhood")}
            className="flex items-center gap-2 px-8 py-4 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1D4ED8] transition-all hover:scale-105 shadow-lg"
          >
            추천 동네 보기
            <ArrowRight size={20} />
          </button>
          <button
            onClick={() => navigate("/policy")}
            className="flex items-center gap-2 px-8 py-4 bg-[#B7791F] text-white rounded-lg font-semibold hover:bg-[#9A6318] transition-all hover:scale-105 shadow-lg"
          >
            받을 수 있는 혜택 확인
            <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
