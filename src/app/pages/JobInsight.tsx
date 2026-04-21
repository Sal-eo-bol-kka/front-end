import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Briefcase, TrendingUp, DollarSign, BarChart3, ArrowRight, MapPin } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function JobInsight() {
  const navigate = useNavigate();

  const stats = [
    { label: "매칭 공고 수", value: "247개", icon: Briefcase, color: "#2563EB" },
    { label: "평균 연봉", value: "4,200만", icon: DollarSign, color: "#B7791F" },
    { label: "실질 소득", value: "+18%", icon: TrendingUp, color: "#0F7A4D" },
    { label: "연봉 상승분", value: "+320만", icon: BarChart3, color: "#B3261E" },
  ];

  const salaryComparisonData = [
    { role: "개발자", current: 5200, target: 4800 },
    { role: "디자이너", current: 4000, target: 3700 },
    { role: "마케터", current: 3800, target: 3500 },
    { role: "기획자", current: 4200, target: 4000 },
    { role: "영업", current: 4500, target: 4100 },
  ];

  const hiringTrendData = [
    { month: "1월", count: 180 },
    { month: "2월", count: 210 },
    { month: "3월", count: 245 },
    { month: "4월", count: 280 },
    { month: "5월", count: 320 },
    { month: "6월", count: 290 },
    { month: "7월", count: 265 },
    { month: "8월", count: 240 },
    { month: "9월", count: 310 },
    { month: "10월", count: 340 },
    { month: "11월", count: 360 },
    { month: "12월", count: 330 },
  ];

  const jobs = [
    {
      company: "한국전자통신연구원",
      role: "백엔드 개발자",
      salary: 5000,
      realIncome: 5900,
      advantage: "대전은 연구개발 특구로 IT 인재 우대, 주거비 절감으로 실질 소득 18% 증가",
      location: "유성구",
    },
    {
      company: "LG전자 R&D 센터",
      role: "임베디드 엔지니어",
      salary: 5200,
      realIncome: 6100,
      advantage: "대덕연구단지 내 위치, 통근 시간 감소 및 생활비 절감",
      location: "유성구",
    },
    {
      company: "SK텔레콤 대전지사",
      role: "데이터 분석가",
      salary: 4800,
      realIncome: 5700,
      advantage: "서울 본사 대비 생활비 40% 저렴, 청년 정책 혜택 추가",
      location: "서구",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F5F7FB] py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-[#222222] mb-2">
            대전의 일자리 통찰
          </h1>
          <p className="text-[#5F6368] text-lg">
            당신의 직무에 맞는 채용 정보와 실질 소득을 분석합니다
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="bg-white rounded-lg p-6 shadow-lg"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon size={24} style={{ color: stat.color }} />
              </div>
              <div className="text-3xl font-bold text-[#222222] mb-1">{stat.value}</div>
              <div className="text-sm text-[#5F6368]">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Salary Comparison Chart */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white rounded-lg p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold text-[#222222] mb-4">직군별 연봉 비교</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salaryComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="role" tick={{ fill: "#5F6368" }} />
                <YAxis tick={{ fill: "#5F6368" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="current" fill="#B3261E" name="서울 평균 (만원)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="target" fill="#2563EB" name="대전 평균 (만원)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-sm text-[#5F6368] mt-4 text-center">
              연봉은 낮지만 생활비 감소로 실질 소득은 증가합니다
            </p>
          </motion.div>

          {/* Hiring Trend Chart */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white rounded-lg p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold text-[#222222] mb-4">12개월 채용 트렌드</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hiringTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fill: "#5F6368" }} />
                <YAxis tick={{ fill: "#5F6368" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#0F7A4D"
                  strokeWidth={3}
                  name="채용 공고 수"
                  dot={{ fill: "#0F7A4D", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-sm text-[#5F6368] mt-4 text-center">
              하반기 채용 시즌에 공고가 증가하는 추세입니다
            </p>
          </motion.div>
        </div>

        {/* Job Cards */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-[#222222] mb-4">추천 채용 공고</h2>
          <div className="space-y-4">
            {jobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                whileHover={{ x: 4, scale: 1.01 }}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-[#222222]">{job.company}</h3>
                      <span className="px-3 py-1 bg-[#2563EB]/10 text-[#2563EB] text-sm font-semibold rounded-full border border-[#2563EB]/20">
                        {job.location}
                      </span>
                    </div>
                    <p className="text-lg text-[#5F6368] mb-4">{job.role}</p>

                    <div className="flex items-center gap-6 mb-4">
                      <div>
                        <p className="text-sm text-[#5F6368] mb-1">제시 연봉</p>
                        <p className="text-2xl font-bold text-[#222222]">{job.salary}만 원</p>
                      </div>
                      <ArrowRight size={24} className="text-[#B7791F]" />
                      <div>
                        <p className="text-sm text-[#5F6368] mb-1">실질 소득 환산</p>
                        <p className="text-2xl font-bold text-[#B7791F]">{job.realIncome}만 원</p>
                      </div>
                      <div className="px-4 py-2 bg-[#0F7A4D]/10 rounded-lg">
                        <p className="text-xl font-bold text-[#0F7A4D]">
                          +{Math.round(((job.realIncome - job.salary) / job.salary) * 100)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Local Advantage */}
                <div className="bg-gradient-to-r from-[#B7791F]/10 to-[#B7791F]/5 border-2 border-[#B7791F]/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#B7791F]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-[#B7791F]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[#222222] mb-2 flex items-center gap-2">
                        Local Advantage
                        <span className="px-2 py-0.5 bg-[#B7791F]/20 text-[#B7791F] text-xs rounded-full">
                          지역 이점
                        </span>
                      </h4>
                      <p className="text-sm text-[#5F6368] leading-relaxed">{job.advantage}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={() => navigate("/assistant")}
            className="bg-[#2563EB] text-white px-12 py-4 rounded-lg font-semibold hover:bg-[#1D4ED8] transition-all hover:scale-105 shadow-lg flex items-center gap-2"
          >
            AI에게 커리어 상담 받기
            <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
