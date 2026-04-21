import { motion } from "motion/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Building2,
  DollarSign,
  FileText,
  MapPin,
  TrendingUp,
  Users,
} from "lucide-react";

export default function Dashboard() {
  const kpiData = [
    { label: "총 세션", value: "12,847", icon: Users, change: "+18%", color: "#2563EB" },
    { label: "평균 절감액", value: "420만 원", icon: DollarSign, change: "+12%", color: "#B7791F" },
    { label: "정책 문의율", value: "68%", icon: FileText, change: "+5%", color: "#0F7A4D" },
    { label: "이주 전환율", value: "23%", icon: TrendingUp, change: "+8%", color: "#B3261E" },
  ];

  const cityInterestData = [
    { city: "대전", interest: 2847 },
    { city: "부산", interest: 2103 },
    { city: "대구", interest: 1876 },
    { city: "광주", interest: 1654 },
    { city: "세종", interest: 1432 },
    { city: "청주", interest: 1289 },
  ];

  const policyData = [
    { name: "주거 지원", value: 3840, color: "#2563EB" },
    { name: "구직 지원", value: 2560, color: "#0F7A4D" },
    { name: "교통 지원", value: 1920, color: "#B7791F" },
    { name: "교육 지원", value: 1280, color: "#B3261E" },
    { name: "기타", value: 640, color: "#E5E7EB" },
  ];

  const companyData = [
    { company: "한국전자통신연구원", exposures: 3847, matches: 92, conversion: "2.4%" },
    { company: "LG전자 R&D", exposures: 3210, matches: 78, conversion: "2.1%" },
    { company: "SK텔레콤 대전", exposures: 2876, matches: 65, conversion: "2.3%" },
    { company: "대덕SW마이스터고", exposures: 2543, matches: 58, conversion: "2.3%" },
    { company: "한화시스템", exposures: 2198, matches: 52, conversion: "2.4%" },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F5F7FB] p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-4 rounded-lg border border-[#E5E7EB] bg-white p-5 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-[#2563EB]">운영 지표</p>
            <h1 className="mt-1 text-3xl font-bold text-[#222222]">대시보드 개요</h1>
            <p className="mt-1 text-sm text-[#5F6368]">B2G/B2B 분석 데이터 · 2026-04-14 15:30 기준</p>
          </div>
          <div className="flex items-center gap-3">
            <select className="rounded-lg border border-[#DADCE0] bg-white px-4 py-2 text-sm font-semibold text-[#222222] outline-none focus:border-[#2563EB]">
              <option>최근 30일</option>
              <option>최근 7일</option>
              <option>최근 90일</option>
            </select>
            <button className="rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8]">
              보고서 생성
            </button>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
              className="rounded-lg border border-[#E5E7EB] bg-white p-5"
            >
              <div className="mb-4 flex items-start justify-between">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${kpi.color}18` }}
                >
                  <kpi.icon size={22} style={{ color: kpi.color }} />
                </div>
                <span className="rounded-lg bg-[#ECFDF5] px-2.5 py-1 text-sm font-bold text-[#0F7A4D]">
                  {kpi.change}
                </span>
              </div>
              <h2 className="text-sm text-[#5F6368]">{kpi.label}</h2>
              <p className="mt-1 text-3xl font-bold text-[#222222]">{kpi.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="rounded-lg border border-[#E5E7EB] bg-white p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#222222]">도시별 이주 관심도</h2>
              <MapPin size={20} className="text-[#2563EB]" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cityInterestData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="city" tick={{ fill: "#5F6368" }} />
                <YAxis tick={{ fill: "#5F6368" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="interest" fill="#2563EB" name="조회수" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="rounded-lg border border-[#E5E7EB] bg-white p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#222222]">정책 유형별 문의 분포</h2>
              <FileText size={20} className="text-[#0F7A4D]" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={policyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={98}
                  fill="#2563EB"
                  dataKey="value"
                >
                  {policyData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 22, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="rounded-lg border border-[#E5E7EB] bg-white p-6"
        >
          <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold text-[#222222]">기업 채용 성과 분석</h2>
              <p className="mt-1 text-sm text-[#5F6368]">노출 대비 매칭 성과를 기업별로 확인합니다.</p>
            </div>
            <button className="rounded-lg border border-[#DADCE0] px-4 py-2 text-sm font-semibold text-[#222222] transition-colors hover:bg-[#F5F7FB]">
              전체 보고서
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="border-b border-[#E5E7EB]">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-[#5F6368]">기업명</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-[#5F6368]">노출수</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-[#5F6368]">매칭수</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-[#5F6368]">전환율</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-[#5F6368]">상태</th>
                </tr>
              </thead>
              <tbody>
                {companyData.map((company, index) => (
                  <motion.tr
                    key={company.company}
                    initial={{ x: -14, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.08, duration: 0.3 }}
                    className="border-b border-[#F1F3F4] hover:bg-[#F8FAFC]"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF1FF]">
                          <Building2 size={20} className="text-[#2563EB]" />
                        </div>
                        <span className="font-semibold text-[#222222]">{company.company}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center font-medium text-[#222222]">
                      {company.exposures.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-center font-medium text-[#222222]">
                      {company.matches}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="rounded-lg bg-[#ECFDF5] px-3 py-1 text-sm font-semibold text-[#0F7A4D]">
                        {company.conversion}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="rounded-lg bg-[#EAF1FF] px-3 py-1 text-sm font-semibold text-[#1D4ED8]">
                        활성
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
