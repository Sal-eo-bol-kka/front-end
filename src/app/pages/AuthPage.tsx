import { FormEvent, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import {
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";

type AuthPageProps = {
  mode: "login" | "signup";
};

export default function AuthPage({ mode }: AuthPageProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSignup = mode === "signup";
  const nextPath = searchParams.get("next") || "/simulation";

  const copy = useMemo(
    () =>
      isSignup
        ? {
            eyebrow: "계정 만들기",
            title: "내 조건을 저장하고 이어서 비교하세요",
            description:
              "입력한 소득, 선호 지역, 정책 조건을 보관해 다음 방문에도 같은 기준으로 확인할 수 있습니다.",
            submit: "회원가입하고 시작",
            switchText: "이미 계정이 있나요?",
            switchLink: "로그인",
            switchTo: `/login?next=${encodeURIComponent(nextPath)}`,
          }
        : {
            eyebrow: "로그인",
            title: "저장된 시뮬레이션을 이어서 확인하세요",
            description:
              "최근 비교 결과, 추천 동네, 받을 수 있는 정책을 한 번에 다시 확인할 수 있습니다.",
            submit: "로그인",
            switchText: "처음 이용하시나요?",
            switchLink: "회원가입",
            switchTo: `/signup?next=${encodeURIComponent(nextPath)}`,
          },
    [isSignup, nextPath],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (isSignup) {
        await signup(name, email, password);
      } else {
        await login(email, password);
      }
      navigate(nextPath, { replace: true });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setError("");
    setIsSubmitting(true);

    try {
      await login("demo@sareobolka.kr", "demo1234");
      navigate(nextPath, { replace: true });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F7FB] text-[#222222]">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1fr_520px]">
        <section className="flex flex-col justify-between px-6 py-8 sm:px-10 lg:px-14">
          <Link to="/" className="flex w-fit items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563EB] text-white">
              살
            </div>
            <div>
              <p className="font-bold text-[#222222]">살어볼까</p>
              <p className="text-xs text-[#5F6368]">청년 이주 시뮬레이션</p>
            </div>
          </Link>

          <div className="py-16">
            <p className="mb-4 inline-flex items-center gap-2 rounded-lg border border-[#BFDBFE] bg-white px-3 py-2 text-sm font-semibold text-[#1D4ED8]">
              <ShieldCheck size={16} />
              공공 데이터 기반 의사결정
            </p>
            <h1 className="max-w-2xl text-4xl font-bold leading-tight text-[#222222] sm:text-5xl">
              이주 비용, 정책, 일자리를 같은 기준으로 비교하세요
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#5F6368]">
              로그인하면 입력 조건과 추천 결과가 저장되어 생활비 비교부터 정책 신청 준비까지
              끊김 없이 이어집니다.
            </p>

            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                ["480만 원", "연간 예상 추가 저축"],
                ["3개", "신청 가능 정책"],
                ["247개", "직무 매칭 공고"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border border-[#E5E7EB] bg-white p-4">
                  <p className="text-2xl font-bold text-[#2563EB]">{value}</p>
                  <p className="mt-1 text-sm text-[#5F6368]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 text-sm text-[#5F6368] sm:grid-cols-3">
            {["민감 정보 최소 수집", "로컬 데모 세션", "결과 기준 명확화"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#0F7A4D]" />
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center bg-white px-6 py-10 shadow-[0_0_40px_rgba(15,23,42,0.08)] sm:px-10">
          <div className="w-full">
            <p className="text-sm font-semibold text-[#2563EB]">{copy.eyebrow}</p>
            <h2 className="mt-2 text-3xl font-bold text-[#222222]">{copy.title}</h2>
            <p className="mt-3 leading-relaxed text-[#5F6368]">{copy.description}</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {isSignup && (
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#222222]">이름</span>
                  <div className="flex items-center gap-3 rounded-lg border border-[#DADCE0] bg-[#F8FAFC] px-4 py-3 focus-within:border-[#2563EB]">
                    <User size={18} className="text-[#5F6368]" />
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="홍길동"
                      className="w-full bg-transparent text-[#222222] outline-none placeholder:text-[#8A8F98]"
                    />
                  </div>
                </label>
              )}

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#222222]">이메일</span>
                <div className="flex items-center gap-3 rounded-lg border border-[#DADCE0] bg-[#F8FAFC] px-4 py-3 focus-within:border-[#2563EB]">
                  <Mail size={18} className="text-[#5F6368]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-transparent text-[#222222] outline-none placeholder:text-[#8A8F98]"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#222222]">비밀번호</span>
                <div className="flex items-center gap-3 rounded-lg border border-[#DADCE0] bg-[#F8FAFC] px-4 py-3 focus-within:border-[#2563EB]">
                  <LockKeyhole size={18} className="text-[#5F6368]" />
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder={isSignup ? "6자 이상 입력" : "비밀번호 입력"}
                    className="w-full bg-transparent text-[#222222] outline-none placeholder:text-[#8A8F98]"
                  />
                </div>
              </label>

              {error && (
                <div className="rounded-lg border border-[#FCA5A5] bg-[#FEF2F2] px-4 py-3 text-sm font-medium text-[#B3261E]">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:bg-[#9DB7F5]"
              >
                {copy.submit}
                <ArrowRight size={18} />
              </button>
            </form>

            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isSubmitting}
              className="mt-3 w-full rounded-lg border border-[#DADCE0] bg-white px-5 py-3 font-semibold text-[#222222] transition-colors hover:bg-[#F5F7FB] disabled:cursor-not-allowed disabled:text-[#8A8F98]"
            >
              데모 계정으로 둘러보기
            </button>

            <p className="mt-8 text-center text-sm text-[#5F6368]">
              {copy.switchText}{" "}
              <Link to={copy.switchTo} className="font-semibold text-[#2563EB]">
                {copy.switchLink}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
