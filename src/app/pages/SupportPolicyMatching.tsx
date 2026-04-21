import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ChevronDown, ChevronUp, Award, Calendar, DollarSign, FileText, CheckCircle, AlertCircle, XCircle, ArrowRight } from "lucide-react";

export default function SupportPolicyMatching() {
  const navigate = useNavigate();
  const [expandedPolicy, setExpandedPolicy] = useState<number | null>(null);
  const [totalBenefits, setTotalBenefits] = useState(0);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += 5;
      if (count >= 320) {
        setTotalBenefits(320);
        clearInterval(interval);
      } else {
        setTotalBenefits(count);
      }
    }, 10);
    return () => clearInterval(interval);
  }, []);

  const policies = [
    {
      status: "eligible",
      title: "대전 청년 월세 지원",
      amount: 240,
      deadline: "2026-12-31",
      organization: "대전광역시",
      description: "만 19-34세 청년에게 월 최대 20만 원, 최장 12개월 지원",
      requirements: ["만 19-34세", "대전시 거주 3개월 이상", "중위소득 150% 이하"],
      documents: ["주민등록등본", "소득증빙서류", "임대차계약서"],
      aiTip: "이 정책은 신청자가 많아 조기 마감될 수 있습니다. 매월 1일 오전 9시에 신청이 열리므로 사전에 서류를 준비하고 정확히 9시에 접속하세요. 임대차계약서는 확정일자를 받은 것이어야 합니다.",
    },
    {
      status: "eligible",
      title: "청년 구직활동 지원금",
      amount: 60,
      deadline: "2026-06-30",
      organization: "고용노동부",
      description: "구직 중인 청년에게 월 50만 원, 최대 6개월 지원",
      requirements: ["만 18-34세", "미취업자", "구직활동 증빙 가능"],
      documents: ["졸업증명서", "실업급여 미수급 확인서", "구직활동계획서"],
      aiTip: "월 2회 이상의 구직활동 증빙이 필요합니다. 채용 박람회 참석, 기업 지원 내역, 직업훈련 수강 등이 인정됩니다. 온라인 채용공고 지원도 증빙서류를 캡처해두면 활용 가능합니다.",
    },
    {
      status: "check",
      title: "청년 내일채움공제",
      amount: 0,
      deadline: "상시",
      organization: "고용노동부",
      description: "정규직 청년이 2년간 근무하면 최대 1,200만 원 지급",
      requirements: ["만 15-34세", "정규직 근로자", "5인 이상 사업장"],
      documents: ["재직증명서", "근로계약서"],
      aiTip: "입사 후 6개월 이내 신청해야 합니다. 중소·중견기업 대상이며, 본인·기업·정부가 함께 적립하는 구조입니다. 회사의 참여 여부를 먼저 확인하세요.",
    },
    {
      status: "eligible",
      title: "대전 청년 교통비 지원",
      amount: 20,
      deadline: "2026-10-31",
      organization: "대전광역시",
      description: "대중교통 이용 청년에게 월 2만 원 교통카드 충전",
      requirements: ["만 19-39세", "대전시 거주", "대중교통 월 15회 이상 이용"],
      documents: ["주민등록등본", "교통카드 사용내역"],
      aiTip: "자동 연장되지 않으므로 매년 재신청이 필요합니다. 교통카드는 본인 명의로 등록된 것만 인정되며, 월 15회 이용 기준은 이전 달 실적으로 판단합니다.",
    },
    {
      status: "ineligible",
      title: "서울 청년 월세 지원",
      amount: 0,
      deadline: "-",
      organization: "서울특별시",
      description: "서울 거주 청년 대상 월세 지원",
      requirements: ["서울시 거주 필수"],
      documents: [],
      aiTip: "대전으로 이주하면 해당 지역의 월세 지원을 받을 수 있어 이 정책보다 유리할 수 있습니다.",
    },
  ];

  const eligiblePolicies = policies.filter(p => p.status === "eligible");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "eligible": return <CheckCircle className="text-[#0F7A4D]" size={20} />;
      case "check": return <AlertCircle className="text-[#B7791F]" size={20} />;
      case "ineligible": return <XCircle className="text-[#E5E7EB]" size={20} />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "eligible": return "#0F7A4D";
      case "check": return "#B7791F";
      case "ineligible": return "#E5E7EB";
      default: return "#E5E7EB";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "eligible": return "신청 가능";
      case "check": return "확인 필요";
      case "ineligible": return "대상 아님";
      default: return "";
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F5F7FB] py-8 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Top Banner */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[#B7791F] to-[#D99A2B] rounded-lg p-8 mb-8 shadow-xl text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/90 mb-2">당신이 받을 수 있는 혜택</p>
              <h1 className="text-4xl font-bold mb-2">
                총 {eligiblePolicies.length}개의 정책 대상
              </h1>
              <p className="text-xl">
                연간 최대 <span className="text-5xl font-bold">{totalBenefits}만 원</span> 수혜 가능
              </p>
            </div>
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <Award size={48} />
            </div>
          </div>
        </motion.div>

        {/* Policy List */}
        <div className="space-y-4">
          {policies.map((policy, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              style={{ borderLeft: `6px solid ${getStatusColor(policy.status)}` }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(policy.status)}
                      <h3 className="text-2xl font-bold text-[#222222]">{policy.title}</h3>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: `${getStatusColor(policy.status)}20`,
                          color: getStatusColor(policy.status),
                          border: `1px solid ${getStatusColor(policy.status)}40`,
                        }}
                      >
                        {getStatusText(policy.status)}
                      </span>
                    </div>
                    <p className="text-[#5F6368] mb-3">{policy.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-[#B7791F]" />
                        <span className="font-bold text-[#B7791F] text-lg">
                          {policy.amount > 0 ? `연 ${policy.amount}만 원` : "조건부"}
                        </span>
                      </div>
                      {policy.deadline !== "-" && (
                        <div className="flex items-center gap-2 text-[#5F6368]">
                          <Calendar size={16} />
                          <span>마감: {policy.deadline}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-[#5F6368]">
                        <FileText size={16} />
                        <span>{policy.organization}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setExpandedPolicy(expandedPolicy === index ? null : index)}
                    className="ml-4 p-2 hover:bg-[#F5F7FB]/20 rounded-lg transition-colors"
                  >
                    {expandedPolicy === index ? (
                      <ChevronUp size={24} className="text-[#222222]" />
                    ) : (
                      <ChevronDown size={24} className="text-[#222222]" />
                    )}
                  </button>
                </div>

                {/* Expanded Content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedPolicy === index ? "auto" : 0,
                    opacity: expandedPolicy === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {expandedPolicy === index && (
                    <div className="pt-4 border-t border-[#E5E7EB] space-y-4">
                      {/* Requirements */}
                      <div>
                        <h4 className="font-semibold text-[#222222] mb-2">신청 자격</h4>
                        <ul className="space-y-1">
                          {policy.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-center gap-2 text-[#5F6368]">
                              <div className="w-1.5 h-1.5 bg-[#0F7A4D] rounded-full" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Documents */}
                      {policy.documents.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-[#222222] mb-2">필요 서류</h4>
                          <div className="flex flex-wrap gap-2">
                            {policy.documents.map((doc, docIndex) => (
                              <span
                                key={docIndex}
                                className="px-3 py-1 bg-[#2563EB]/10 text-[#2563EB] text-sm rounded-lg border border-[#2563EB]/20"
                              >
                                {doc}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* AI Tip */}
                      <div className="bg-[#2563EB]/5 rounded-lg p-4 border border-[#2563EB]/20">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-[#2563EB]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Award size={18} className="text-[#2563EB]" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#222222] mb-1 flex items-center gap-2">
                              AI 신청 가이드
                              <span className="px-2 py-0.5 bg-[#2563EB]/20 text-[#2563EB] text-xs rounded-full">
                                RAG 기반
                              </span>
                            </h4>
                            <p className="text-sm text-[#5F6368] leading-relaxed">{policy.aiTip}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 flex gap-4"
        >
          <button
            onClick={() => navigate("/jobs")}
            className="flex-1 bg-[#2563EB] text-white py-4 rounded-lg font-semibold hover:bg-[#1D4ED8] transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            일자리 정보 보기
            <ArrowRight size={20} />
          </button>
          <button
            onClick={() => navigate("/assistant")}
            className="flex-1 bg-[#B7791F] text-white py-4 rounded-lg font-semibold hover:bg-[#9A6318] transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            AI 상담 받기
            <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
