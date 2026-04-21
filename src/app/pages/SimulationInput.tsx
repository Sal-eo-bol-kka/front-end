import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

export default function SimulationInput() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    income: 350,
    employmentType: "직장인",
    currentCity: "서울특별시",
    currentDistrict: "강남구",
    householdType: "1인",
    targetCity: "",
    priorityCommute: 50,
    priorityHousing: 50,
    lifestyle: [] as string[],
  });

  const employmentTypes = ["직장인", "프리랜서", "원격근무", "구직중"];
  const householdTypes = ["1인", "커플", "가족"];
  const cities = [
    "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종",
    "수원", "성남", "고양", "용인", "청주", "천안", "전주", "포항"
  ];
  const lifestyles = ["문화생활", "자연친화", "유흥", "조용함", "국제적", "가성비"];

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
    else navigate("/result");
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleLifestyle = (item: string) => {
    setFormData(prev => ({
      ...prev,
      lifestyle: prev.lifestyle.includes(item)
        ? prev.lifestyle.filter(l => l !== item)
        : [...prev.lifestyle, item]
    }));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F5F7FB] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    num <= step
                      ? "bg-[#2563EB] text-white scale-110"
                      : "bg-[#E5E7EB] text-[#5F6368]"
                  }`}
                >
                  {num < step ? <Check size={20} /> : num}
                </div>
                {num < 5 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                      num < step ? "bg-[#2563EB]" : "bg-[#E5E7EB]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-[#5F6368] text-sm">
            {step}/5 단계 완료
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          key={step}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg p-10 shadow-xl"
        >
          {/* Step 1: Income & Employment */}
          {step === 1 && (
            <div>
              <h2 className="text-3xl font-bold text-[#222222] mb-2">
                현재 소득과 고용 형태를 알려주세요
              </h2>
              <p className="text-[#5F6368] mb-8">정확한 비교를 위해 필요합니다</p>

              <div className="mb-10">
                <label className="block text-lg font-semibold text-[#222222] mb-4">
                  월 소득 (세전)
                </label>
                <div className="mb-4">
                  <input
                    type="range"
                    min="0"
                    max="800"
                    step="10"
                    value={formData.income}
                    onChange={(e) => setFormData({ ...formData, income: parseInt(e.target.value) })}
                    className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                  />
                </div>
                <div className="text-center">
                  <span className="text-4xl font-bold text-[#2563EB]">
                    {formData.income}만 원
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-[#222222] mb-4">
                  고용 형태
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {employmentTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setFormData({ ...formData, employmentType: type })}
                      className={`py-4 rounded-lg font-semibold transition-all duration-200 ${
                        formData.employmentType === type
                          ? "bg-[#2563EB] text-white shadow-lg scale-105"
                          : "bg-[#F5F7FB]/30 text-[#5F6368] hover:bg-[#F5F7FB]/50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Current Location & Household */}
          {step === 2 && (
            <div>
              <h2 className="text-3xl font-bold text-[#222222] mb-2">
                현재 거주지와 가구 형태를 선택하세요
              </h2>
              <p className="text-[#5F6368] mb-8">비교 기준이 됩니다</p>

              <div className="mb-8">
                <label className="block text-lg font-semibold text-[#222222] mb-4">
                  현재 거주 지역
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={formData.currentCity}
                    onChange={(e) => setFormData({ ...formData, currentCity: e.target.value })}
                    className="py-3 px-4 rounded-lg bg-[#F5F7FB]/30 text-[#222222] font-medium border-2 border-transparent focus:border-[#2563EB] outline-none"
                  >
                    <option>서울특별시</option>
                    <option>경기도</option>
                    <option>인천광역시</option>
                  </select>
                  <select
                    value={formData.currentDistrict}
                    onChange={(e) => setFormData({ ...formData, currentDistrict: e.target.value })}
                    className="py-3 px-4 rounded-lg bg-[#F5F7FB]/30 text-[#222222] font-medium border-2 border-transparent focus:border-[#2563EB] outline-none"
                  >
                    <option>강남구</option>
                    <option>서초구</option>
                    <option>송파구</option>
                    <option>강동구</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-[#222222] mb-4">
                  가구 형태
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {householdTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setFormData({ ...formData, householdType: type })}
                      className={`py-4 rounded-lg font-semibold transition-all duration-200 ${
                        formData.householdType === type
                          ? "bg-[#2563EB] text-white shadow-lg scale-105"
                          : "bg-[#F5F7FB]/30 text-[#5F6368] hover:bg-[#F5F7FB]/50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Target City */}
          {step === 3 && (
            <div>
              <h2 className="text-3xl font-bold text-[#222222] mb-2">
                관심있는 도시를 선택하세요
              </h2>
              <p className="text-[#5F6368] mb-8">여러 도시를 비교할 수 있습니다</p>

              <div className="grid grid-cols-4 gap-3">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setFormData({ ...formData, targetCity: city })}
                    className={`py-5 rounded-lg font-semibold transition-all duration-200 ${
                      formData.targetCity === city
                        ? "bg-[#2563EB] text-white shadow-lg scale-105 border-2 border-[#2563EB]"
                        : "bg-white text-[#5F6368] hover:bg-[#F5F7FB]/20 border-2 border-[#E5E7EB]"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Priority & Lifestyle */}
          {step === 4 && (
            <div>
              <h2 className="text-3xl font-bold text-[#222222] mb-2">
                우선순위와 라이프스타일을 설정하세요
              </h2>
              <p className="text-[#5F6368] mb-8">더 정확한 추천을 위해 필요합니다</p>

              <div className="mb-10">
                <label className="block text-lg font-semibold text-[#222222] mb-4">
                  무엇이 더 중요한가요?
                </label>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#5F6368]">통근 편의</span>
                  <span className="text-sm text-[#5F6368]">주거비 절감</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.priorityCommute}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setFormData({
                      ...formData,
                      priorityCommute: val,
                      priorityHousing: 100 - val
                    });
                  }}
                  className="w-full h-2 bg-gradient-to-r from-[#2563EB] to-[#B7791F] rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-[#222222] mb-4">
                  선호하는 라이프스타일 (복수 선택 가능)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {lifestyles.map((item) => (
                    <button
                      key={item}
                      onClick={() => toggleLifestyle(item)}
                      className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                        formData.lifestyle.includes(item)
                          ? "bg-[#0F7A4D] text-white shadow-lg"
                          : "bg-[#F5F7FB]/30 text-[#5F6368] hover:bg-[#F5F7FB]/50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Summary */}
          {step === 5 && (
            <div>
              <h2 className="text-3xl font-bold text-[#222222] mb-2">
                입력 정보를 확인하세요
              </h2>
              <p className="text-[#5F6368] mb-8">모든 정보가 정확한지 확인해주세요</p>

              <div className="space-y-4 bg-[#F5F7FB]/20 rounded-lg p-6">
                <div className="flex justify-between py-3 border-b border-[#E5E7EB]">
                  <span className="text-[#5F6368]">월 소득</span>
                  <span className="font-bold text-[#222222]">{formData.income}만 원</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E5E7EB]">
                  <span className="text-[#5F6368]">고용 형태</span>
                  <span className="font-bold text-[#222222]">{formData.employmentType}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E5E7EB]">
                  <span className="text-[#5F6368]">현재 거주지</span>
                  <span className="font-bold text-[#222222]">{formData.currentCity} {formData.currentDistrict}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E5E7EB]">
                  <span className="text-[#5F6368]">가구 형태</span>
                  <span className="font-bold text-[#222222]">{formData.householdType}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#E5E7EB]">
                  <span className="text-[#5F6368]">관심 도시</span>
                  <span className="font-bold text-[#2563EB]">{formData.targetCity || "미선택"}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-[#5F6368]">라이프스타일</span>
                  <span className="font-bold text-[#0F7A4D]">
                    {formData.lifestyle.join(", ") || "미선택"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                step === 1
                  ? "bg-[#E5E7EB] text-[#5F6368] cursor-not-allowed"
                  : "bg-[#222222] text-white hover:bg-[#3F3F46]"
              }`}
            >
              <ArrowLeft size={20} />
              이전
            </button>
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-8 py-3 rounded-lg font-semibold bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-all hover:scale-105"
            >
              {step === 5 ? "시뮬레이션 실행" : "다음"}
              <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
