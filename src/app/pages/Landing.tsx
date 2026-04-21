import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  CheckCircle2,
  FileCheck2,
  MapPin,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";

export default function Landing() {
  const { user } = useAuth();
  const [count, setCount] = useState(0);
  const targetSavings = 480;

  useEffect(() => {
    const duration = 600;
    const steps = 60;
    const increment = targetSavings / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetSavings) {
        setCount(targetSavings);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const primaryPath = user ? "/simulation" : "/signup";
  const secondaryPath = user ? "/dashboard" : "/login";

  const featureItems = [
    {
      icon: BarChart3,
      title: "생활비 비교",
      description: "주거비, 교통비, 식비를 월 단위로 나눠 실제 남는 돈을 계산합니다.",
      color: "#2563EB",
    },
    {
      icon: FileCheck2,
      title: "정책 매칭",
      description: "연령, 소득, 지역 조건을 기준으로 신청 가능한 정책을 먼저 보여줍니다.",
      color: "#0F7A4D",
    },
    {
      icon: Briefcase,
      title: "일자리 통찰",
      description: "연봉 차이와 생활비 차이를 함께 반영해 실질 소득을 비교합니다.",
      color: "#B7791F",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FB] text-[#222222]">
      <header className="sticky top-0 z-30 border-b border-[#E5E7EB] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563EB] font-bold text-white">
              살
            </div>
            <div>
              <p className="font-bold text-[#222222]">살어볼까</p>
              <p className="text-xs text-[#5F6368]">청년 이주 시뮬레이션</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-[#5F6368] md:flex">
            <a href="#compare" className="hover:text-[#222222]">
              비교
            </a>
            <a href="#policy" className="hover:text-[#222222]">
              정책
            </a>
            <a href="#trust" className="hover:text-[#222222]">
              데이터 기준
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to={secondaryPath}
              className="rounded-lg border border-[#DADCE0] px-4 py-2 text-sm font-semibold text-[#222222] transition-colors hover:bg-[#F5F7FB]"
            >
              {user ? "대시보드" : "로그인"}
            </Link>
            <Link
              to={primaryPath}
              className="rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
            >
              {user ? "시뮬레이션" : "회원가입"}
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_480px] lg:py-20">
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-lg border border-[#BFDBFE] bg-white px-3 py-2 text-sm font-semibold text-[#1D4ED8]">
              <ShieldCheck size={16} />
              공공 데이터와 개인 조건을 함께 반영
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-[#222222] sm:text-5xl">
              서울 밖의 선택지가 내 삶에 더 유리한지 숫자로 확인하세요
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#5F6368]">
              월 생활비, 지원 정책, 직무 기회를 같은 화면에서 비교해 이주 후 남는 돈과
              준비해야 할 일을 명확하게 정리합니다.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to={primaryPath}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
              >
                내 조건으로 계산하기
                <ArrowRight size={18} />
              </Link>
              <Link
                to={secondaryPath}
                className="inline-flex items-center justify-center rounded-lg border border-[#DADCE0] bg-white px-6 py-3 font-semibold text-[#222222] transition-colors hover:bg-[#F5F7FB]"
              >
                {user ? "결과 관리" : "저장된 결과 보기"}
              </Link>
            </div>

            <div id="trust" className="mt-10 grid gap-3 sm:grid-cols-3">
              {["실거래가 기준", "정책 조건 분리", "실질 소득 환산"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-semibold text-[#5F6368]">
                  <CheckCircle2 size={17} className="text-[#0F7A4D]" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="rounded-lg border border-[#E5E7EB] bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
          >
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
              <div>
                <p className="text-sm font-semibold text-[#5F6368]">이주 효과 요약</p>
                <h2 className="mt-1 text-2xl font-bold text-[#222222]">서울 강남구 → 대전 유성구</h2>
              </div>
              <TrendingUp className="text-[#0F7A4D]" size={28} />
            </div>

            <div className="grid gap-3 py-5">
              {[
                ["월 주거비", "120만 원", "60만 원", "-50%"],
                ["월 생활비", "95만 원", "65만 원", "-32%"],
                ["월 가용소득", "85만 원", "125만 원", "+47%"],
              ].map(([label, current, target, change]) => (
                <div key={label} className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-3 rounded-lg bg-[#F8FAFC] px-4 py-3">
                  <span className="text-sm font-semibold text-[#5F6368]">{label}</span>
                  <span className="text-sm font-bold text-[#B3261E]">{current}</span>
                  <ArrowRight size={15} className="text-[#8A8F98]" />
                  <span className="text-sm font-bold text-[#0F7A4D]">
                    {target}
                    <span className="ml-2 text-xs">{change}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-[#BFDBFE] bg-[#EAF1FF] p-5">
              <p className="text-sm font-semibold text-[#1D4ED8]">연간 예상 추가 저축액</p>
              <p className="mt-2 text-4xl font-bold text-[#1D4ED8]">+{count}만 원</p>
              <p className="mt-2 text-sm text-[#5F6368]">월 평균 40만 원 절감 기준</p>
            </div>
          </motion.div>
        </section>

        <section id="compare" className="border-y border-[#E5E7EB] bg-white py-14">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold text-[#2563EB]">핵심 흐름</p>
                <h2 className="mt-2 text-3xl font-bold text-[#222222]">입력부터 상담까지 한 번에 이어집니다</h2>
              </div>
              <p className="max-w-xl text-[#5F6368]">
                계산 결과는 추천 동네, 지원 정책, 일자리 분석, AI 상담으로 연결됩니다.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {featureItems.map((feature) => (
                <motion.div
                  key={feature.title}
                  initial={{ y: 18, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                  className="rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] p-6"
                >
                  <div
                    className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-white"
                    style={{ color: feature.color }}
                  >
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#222222]">{feature.title}</h3>
                  <p className="mt-3 leading-relaxed text-[#5F6368]">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="policy" className="mx-auto grid max-w-7xl gap-6 px-6 py-14 lg:grid-cols-[380px_1fr]">
          <div>
            <p className="text-sm font-semibold text-[#0F7A4D]">정책 준비</p>
            <h2 className="mt-2 text-3xl font-bold text-[#222222]">받을 수 있는 혜택과 서류를 먼저 확인하세요</h2>
            <p className="mt-4 leading-relaxed text-[#5F6368]">
              지역 이동 후 놓치기 쉬운 월세, 교통, 구직 지원을 조건별로 분류합니다.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["대전 청년 월세 지원", "연 240만 원", "주민등록등본, 임대차계약서"],
              ["청년 구직활동 지원금", "연 60만 원", "구직활동계획서"],
              ["대전 청년 교통비 지원", "연 20만 원", "교통카드 사용내역"],
            ].map(([title, amount, docs]) => (
              <div key={title} className="rounded-lg border border-[#E5E7EB] bg-white p-5">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#0F7A4D]">
                  <FileCheck2 size={17} />
                  신청 가능
                </div>
                <h3 className="font-bold text-[#222222]">{title}</h3>
                <p className="mt-3 text-2xl font-bold text-[#B7791F]">{amount}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#5F6368]">{docs}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#222222] px-6 py-12 text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#93C5FD]">
                <MapPin size={17} />
                다음 선택지
              </div>
              <h2 className="text-3xl font-bold">내 조건으로 가장 유리한 지역을 확인하세요</h2>
            </div>
            <Link
              to={primaryPath}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-[#222222] transition-colors hover:bg-[#E5E7EB]"
            >
              시작하기
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
