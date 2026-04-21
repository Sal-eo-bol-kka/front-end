import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Home, Users, Train, ArrowRight } from "lucide-react";

export default function NeighborhoodRecommendation() {
  const navigate = useNavigate();
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(0);

  const neighborhoods = [
    {
      rank: 1,
      name: "유성구 도룡동",
      matchScore: 94,
      avgRent: 55,
      commuteScore: "상",
      youthRatio: 32,
      tags: ["가성비", "문화중심", "교통편의"],
      description: "대덕연구단지 인근으로 IT 기업 밀집, 월세 평균 55만 원",
      position: { top: "45%", left: "48%" },
    },
    {
      rank: 2,
      name: "유성구 궁동",
      matchScore: 89,
      avgRent: 50,
      commuteScore: "상",
      youthRatio: 28,
      tags: ["저렴한주거", "조용함", "자연친화"],
      description: "충남대 인근, 조용한 주거 환경과 저렴한 월세",
      position: { top: "52%", left: "44%" },
    },
    {
      rank: 3,
      name: "유성구 봉명동",
      matchScore: 86,
      avgRent: 58,
      commuteScore: "중",
      youthRatio: 30,
      tags: ["문화생활", "카페거리", "활기참"],
      description: "원도심 접근성 우수, 청년 문화 공간 다수",
      position: { top: "48%", left: "52%" },
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F5F7FB] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-[#222222] mb-2">
            대전에서 당신에게 맞는 동네 Top 3
          </h1>
          <p className="text-[#5F6368] text-lg">
            당신의 조건과 선호도를 기반으로 AI가 추천하는 지역입니다
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Map Section */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-white rounded-lg shadow-xl overflow-hidden h-[700px] relative"
          >
            {/* Mock Map */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#E8F4F8] to-[#D4E8D4]">
              {/* Map Grid Pattern */}
              <svg className="absolute inset-0 w-full h-full opacity-20">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#222222" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* City Label */}
              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm rounded-lg px-6 py-3 shadow-lg">
                <h3 className="text-2xl font-bold text-[#222222]">대전광역시 유성구</h3>
              </div>

              {/* Neighborhood Pins */}
              {neighborhoods.map((neighborhood, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.2, duration: 0.5, type: "spring" }}
                  className="absolute"
                  style={neighborhood.position}
                  onMouseEnter={() => setSelectedNeighborhood(index)}
                >
                  <div className="relative group cursor-pointer">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="w-12 h-12 bg-[#0F7A4D] rounded-full flex items-center justify-center shadow-lg border-4 border-white"
                    >
                      <span className="text-white font-bold text-lg">{neighborhood.rank}</span>
                    </motion.div>

                    {/* Hover Popup */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-lg shadow-2xl p-4 min-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    >
                      <h4 className="font-bold text-[#222222] mb-1">{neighborhood.name}</h4>
                      <p className="text-sm text-[#5F6368] mb-2">{neighborhood.description}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-[#0F7A4D]/10 rounded-full h-2">
                          <div
                            className="bg-[#0F7A4D] h-full rounded-full"
                            style={{ width: `${neighborhood.matchScore}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-[#0F7A4D]">{neighborhood.matchScore}%</span>
                      </div>
                    </motion.div>

                    {/* Pulse Effect */}
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                      className="absolute inset-0 bg-[#0F7A4D] rounded-full"
                    />
                  </div>
                </motion.div>
              ))}

              {/* Legend */}
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <h4 className="font-semibold text-[#222222] mb-2">범례</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#0F7A4D] rounded-full" />
                    <span className="text-[#5F6368]">추천 지역</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Train size={16} className="text-[#2563EB]" />
                    <span className="text-[#5F6368]">주요 역세권</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Neighborhood Cards */}
          <div className="lg:col-span-2 space-y-4">
            {neighborhoods.map((neighborhood, index) => (
              <motion.div
                key={index}
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => setSelectedNeighborhood(index)}
                className={`bg-[#F5F7FB] rounded-lg p-6 cursor-pointer transition-all shadow-lg ${
                  selectedNeighborhood === index
                    ? "ring-4 ring-[#0F7A4D] bg-white"
                    : "hover:shadow-xl"
                }`}
              >
                {/* Rank Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#0F7A4D] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">{neighborhood.rank}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#222222]">{neighborhood.name}</h3>
                      <p className="text-sm text-[#5F6368] mt-1">{neighborhood.description}</p>
                    </div>
                  </div>
                </div>

                {/* Match Score */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#5F6368] font-medium">매칭 점수</span>
                    <span className="text-lg font-bold text-[#0F7A4D]">{neighborhood.matchScore}%</span>
                  </div>
                  <div className="w-full bg-[#E5E7EB] rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${neighborhood.matchScore}%` }}
                      transition={{ delay: 0.6 + index * 0.2, duration: 0.8 }}
                      className="bg-gradient-to-r from-[#0F7A4D] to-[#10B981] h-full rounded-full"
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-white rounded-lg p-3 text-center">
                    <Home size={20} className="text-[#2563EB] mx-auto mb-1" />
                    <div className="text-lg font-bold text-[#222222]">{neighborhood.avgRent}만</div>
                    <div className="text-xs text-[#5F6368]">평균 월세</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <Train size={20} className="text-[#B7791F] mx-auto mb-1" />
                    <div className="text-lg font-bold text-[#222222]">{neighborhood.commuteScore}</div>
                    <div className="text-xs text-[#5F6368]">통근 편의</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <Users size={20} className="text-[#0F7A4D] mx-auto mb-1" />
                    <div className="text-lg font-bold text-[#222222]">{neighborhood.youthRatio}%</div>
                    <div className="text-xs text-[#5F6368]">청년 비중</div>
                  </div>
                </div>

                {/* Lifestyle Tags */}
                <div className="flex flex-wrap gap-2">
                  {neighborhood.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-[#0F7A4D]/10 text-[#0F7A4D] text-xs font-semibold rounded-full border border-[#0F7A4D]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* CTA */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              onClick={() => navigate("/policy")}
              className="w-full bg-[#2563EB] text-white py-4 rounded-lg font-semibold hover:bg-[#1D4ED8] transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              이 지역에서 받을 수 있는 혜택 보기
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
