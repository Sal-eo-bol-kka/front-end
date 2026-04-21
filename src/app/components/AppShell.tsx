import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import {
  BarChart3,
  Bot,
  Briefcase,
  ClipboardList,
  FileCheck2,
  Home,
  LayoutDashboard,
  LogOut,
  Map,
  Menu,
  PanelLeftClose,
  User,
  X,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";

const navigationItems = [
  { label: "시뮬레이션", to: "/simulation", icon: ClipboardList },
  { label: "비교 결과", to: "/result", icon: BarChart3 },
  { label: "추천 동네", to: "/neighborhood", icon: Map },
  { label: "지원 정책", to: "/policy", icon: FileCheck2 },
  { label: "일자리", to: "/jobs", icon: Briefcase },
  { label: "AI 상담", to: "/assistant", icon: Bot },
  { label: "관리 대시보드", to: "/dashboard", icon: LayoutDashboard },
];

function initials(name: string) {
  return name.trim().slice(0, 1) || "살";
}

export default function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const showSidebarText = desktopOpen || mobileOpen;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const sidebar = (
    <aside
      className={`flex h-full flex-col border-r border-[#E5E7EB] bg-white transition-[width] duration-200 ${
        desktopOpen ? "lg:w-64" : "lg:w-20"
      } w-72`}
    >
      <div className="flex h-16 items-center justify-between border-b border-[#E5E7EB] px-4">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2563EB] font-bold text-white">
            살
          </div>
          {showSidebarText && (
            <div className="min-w-0">
              <p className="truncate font-bold text-[#222222]">살어볼까</p>
              <p className="truncate text-xs text-[#5F6368]">이주 의사결정 플랫폼</p>
            </div>
          )}
        </Link>
        <button
          type="button"
          onClick={() => setDesktopOpen((open) => !open)}
          className="hidden rounded-lg p-2 text-[#5F6368] transition-colors hover:bg-[#F1F5F9] lg:block"
          aria-label="사이드바 접기"
        >
          <PanelLeftClose size={18} />
        </button>
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="rounded-lg p-2 text-[#5F6368] transition-colors hover:bg-[#F1F5F9] lg:hidden"
          aria-label="메뉴 닫기"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="주요 메뉴">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-[#EAF1FF] text-[#1D4ED8]"
                  : "text-[#5F6368] hover:bg-[#F5F7FB] hover:text-[#222222]"
              }`
            }
          >
            <item.icon size={19} className="shrink-0" />
            {showSidebarText && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-[#E5E7EB] p-3">
        <div className="flex items-center gap-3 rounded-lg bg-[#F5F7FB] p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0F7A4D] font-bold text-white">
            {initials(user?.name || "사용자")}
          </div>
          {showSidebarText && (
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#222222]">
                {user?.name || "사용자"}
              </p>
              <p className="truncate text-xs text-[#5F6368]">{user?.email}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">{sidebar}</div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileOpen(false)}
            aria-label="메뉴 배경 닫기"
          />
          <div className="relative h-full w-72">{sidebar}</div>
        </div>
      )}

      <header
        className={`fixed right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-[#E5E7EB] bg-white/95 px-4 backdrop-blur transition-[left] duration-200 sm:px-6 ${
          desktopOpen ? "lg:left-64" : "lg:left-20"
        } left-0`}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-[#5F6368] transition-colors hover:bg-[#F1F5F9] lg:hidden"
            aria-label="메뉴 열기"
          >
            <Menu size={20} />
          </button>
          <Link
            to="/"
            className="hidden items-center gap-2 rounded-lg border border-[#E5E7EB] px-3 py-2 text-sm font-semibold text-[#5F6368] transition-colors hover:bg-[#F5F7FB] sm:flex"
          >
            <Home size={16} />
            홈
          </Link>
          <div className="hidden h-8 w-px bg-[#E5E7EB] sm:block" />
          <p className="text-sm font-semibold text-[#222222]">
            내 조건 기준으로 결과를 이어서 확인합니다
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/simulation"
            className="hidden rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] sm:inline-flex"
          >
            다시 계산
          </Link>
          <div className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] px-2 py-1.5">
            <User size={16} className="text-[#5F6368]" />
            <span className="hidden max-w-32 truncate text-sm font-semibold text-[#222222] sm:inline">
              {user?.name || "사용자"}
            </span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg p-2 text-[#5F6368] transition-colors hover:bg-[#FEF2F2] hover:text-[#B3261E]"
            aria-label="로그아웃"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <main
        className={`min-h-screen pt-16 transition-[padding-left] duration-200 ${
          desktopOpen ? "lg:pl-64" : "lg:pl-20"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}
