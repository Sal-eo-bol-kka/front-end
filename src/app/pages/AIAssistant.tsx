import { motion } from "motion/react";
import { useState } from "react";
import { Send, Sparkles, MapPin, DollarSign, Briefcase, Home } from "lucide-react";

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "안녕하세요! 저는 살어볼까 AI 상담사입니다. 대전 이주와 관련해서 궁금하신 점을 물어보세요.",
      timestamp: "14:30",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const suggestedQuestions = [
    "통근하기 좋은 동네는?",
    "주거 지원금 대상인가요?",
    "IT 개발자 채용이 많은가요?",
    "생활비가 얼마나 절약되나요?",
  ];

  const userProfile = {
    income: "350만 원",
    currentLocation: "서울 강남구",
    targetLocation: "대전 유성구",
    employment: "직장인",
    expectedSavings: "480만 원/년",
    topNeighborhoods: ["도룡동", "궁동", "봉명동"],
  };

  const handleSend = (messageText = inputValue) => {
    const trimmedMessage = messageText.trim();
    if (!trimmedMessage) return;

    const userMessage = {
      role: "user",
      content: trimmedMessage,
      timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const aiResponse = {
        role: "ai",
        content: generateAIResponse(trimmedMessage),
        timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 800);

    setInputValue("");
  };

  const generateAIResponse = (question: string) => {
    if (question.includes("통근")) {
      return "유성구 도룡동을 추천드립니다. 대덕연구단지와 가까워 IT 기업 출퇴근이 편리하며, 지하철 1호선 도룡역이 있어 대전 시내 어디든 30분 이내 접근이 가능합니다. 평균 월세는 55만 원으로 합리적입니다.";
    } else if (question.includes("지원금") || question.includes("혜택")) {
      return "네, 대전 청년 월세 지원(연 240만 원), 청년 구직활동 지원금(연 60만 원), 대전 청년 교통비 지원(연 20만 원)을 받으실 수 있습니다. 총 연 320만 원의 혜택이 예상됩니다.";
    } else if (question.includes("개발자") || question.includes("IT")) {
      return "대전은 대덕연구단지를 중심으로 IT 기업이 밀집되어 있어 백엔드 개발자 공고가 247건으로 많은 편입니다. 평균 연봉은 4,800만 원이며, 생활비를 고려한 실질 소득은 서울 대비 18% 높습니다.";
    } else if (question.includes("생활비") || question.includes("절약")) {
      return "서울 강남구 대비 월 약 75만 원을 절약할 수 있어, 연간 480만 원의 추가 저축이 가능합니다. 특히 주거비가 50% 절감되며, 교통비와 식비도 20-30% 저렴합니다.";
    } else {
      return "좋은 질문입니다! 구체적으로 어떤 부분이 궁금하신가요? 주거, 일자리, 생활비, 교통 등 다양한 측면에서 도움을 드릴 수 있습니다.";
    }
  };

  const handleQuestionClick = (question: string) => {
    handleSend(question);
  };

  return (
    <div className="h-[calc(100vh-4rem)] bg-[#F5F7FB] flex">
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-[#222222] to-[#3F3F46] text-white p-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#B7791F] rounded-full flex items-center justify-center">
              <Sparkles size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI 이주 상담사</h1>
              <p className="text-white/80 text-sm">24/7 실시간 상담 가능</p>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 flex overflow-hidden">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-5 py-3 ${
                      message.role === "user"
                        ? "bg-[#2563EB] text-white"
                        : "bg-white text-[#222222] shadow-md"
                    }`}
                  >
                    {message.role === "ai" && (
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={16} className="text-[#B7791F]" />
                        <span className="text-xs font-semibold text-[#B7791F]">AI 상담사</span>
                      </div>
                    )}
                    <p className="leading-relaxed">{message.content}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.role === "user" ? "text-white/70" : "text-[#5F6368]"
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="px-6 pb-4"
              >
                <p className="text-sm text-[#5F6368] mb-3">추천 질문</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuestionClick(question)}
                      className="px-4 py-2 bg-white text-[#222222] rounded-full text-sm font-medium hover:bg-[#2563EB] hover:text-white transition-all shadow-sm hover:shadow-md"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Input */}
            <div className="p-6 bg-white border-t border-[#E5E7EB]">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="궁금한 점을 물어보세요..."
                  className="flex-1 px-5 py-3 bg-[#F5F7FB]/20 rounded-lg border-2 border-transparent focus:border-[#2563EB] outline-none text-[#222222] placeholder-[#5F6368]"
                />
                <button
                  onClick={handleSend}
                  className="px-6 py-3 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1D4ED8] transition-all flex items-center gap-2"
                >
                  <Send size={20} />
                  전송
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - User Profile */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="hidden w-80 overflow-y-auto border-l border-[#E5E7EB] bg-white p-6 lg:block"
          >
            <h2 className="text-xl font-bold text-[#222222] mb-6">시뮬레이션 요약</h2>

            <div className="space-y-4">
              {/* Expected Savings */}
              <div className="bg-gradient-to-br from-[#B7791F]/20 to-[#B7791F]/10 rounded-lg p-4 border border-[#B7791F]/30">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={20} className="text-[#B7791F]" />
                  <span className="text-sm text-[#5F6368]">예상 저축액</span>
                </div>
                <p className="text-3xl font-bold text-[#B7791F]">{userProfile.expectedSavings}</p>
              </div>

              {/* Current Location */}
              <div className="bg-[#F5F7FB]/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={18} className="text-[#B3261E]" />
                  <span className="text-sm text-[#5F6368]">현재 거주지</span>
                </div>
                <p className="font-semibold text-[#222222]">{userProfile.currentLocation}</p>
              </div>

              {/* Target Location */}
              <div className="bg-[#F5F7FB]/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={18} className="text-[#2563EB]" />
                  <span className="text-sm text-[#5F6368]">목표 지역</span>
                </div>
                <p className="font-semibold text-[#222222]">{userProfile.targetLocation}</p>
              </div>

              {/* Income */}
              <div className="bg-[#F5F7FB]/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={18} className="text-[#0F7A4D]" />
                  <span className="text-sm text-[#5F6368]">월 소득</span>
                </div>
                <p className="font-semibold text-[#222222]">{userProfile.income}</p>
              </div>

              {/* Employment */}
              <div className="bg-[#F5F7FB]/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase size={18} className="text-[#222222]" />
                  <span className="text-sm text-[#5F6368]">고용 형태</span>
                </div>
                <p className="font-semibold text-[#222222]">{userProfile.employment}</p>
              </div>

              {/* Top Neighborhoods */}
              <div className="bg-[#F5F7FB]/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Home size={18} className="text-[#2563EB]" />
                  <span className="text-sm text-[#5F6368]">추천 동네 Top 3</span>
                </div>
                <div className="space-y-2">
                  {userProfile.topNeighborhoods.map((neighborhood, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-white rounded-lg px-3 py-2"
                    >
                      <div className="w-6 h-6 bg-[#0F7A4D] rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-[#222222]">{neighborhood}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
