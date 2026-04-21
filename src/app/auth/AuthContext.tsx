import { createContext, type ReactNode, useContext, useMemo, useState } from "react";

type AuthUser = {
  name: string;
  email: string;
  joinedAt: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const STORAGE_KEY = "sareobolka:user";

const AuthContext = createContext<AuthContextValue | null>(null);

function getStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

function persistUser(user: AuthUser | null) {
  if (user) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}

function nameFromEmail(email: string) {
  const [localPart] = email.split("@");
  return localPart ? localPart.replace(/[._-]/g, " ") : "사용자";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      async login(email, password) {
        if (!email.trim() || password.length < 4) {
          throw new Error("이메일과 비밀번호를 확인해주세요.");
        }

        const nextUser = {
          name: nameFromEmail(email.trim()),
          email: email.trim(),
          joinedAt: new Date().toISOString(),
        };
        setUser(nextUser);
        persistUser(nextUser);
      },
      async signup(name, email, password) {
        if (!name.trim()) {
          throw new Error("이름을 입력해주세요.");
        }
        if (!email.trim() || !email.includes("@")) {
          throw new Error("사용 가능한 이메일을 입력해주세요.");
        }
        if (password.length < 6) {
          throw new Error("비밀번호는 6자 이상이어야 합니다.");
        }

        const nextUser = {
          name: name.trim(),
          email: email.trim(),
          joinedAt: new Date().toISOString(),
        };
        setUser(nextUser);
        persistUser(nextUser);
      },
      logout() {
        setUser(null);
        persistUser(null);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return value;
}
