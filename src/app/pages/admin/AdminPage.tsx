import { useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation, Link } from "react-router-dom";
import { LoginForm } from "../../components/admin/LoginForm";
import { OTPVerification } from "../../components/admin/OTPVerification";
import { TestimonialsManager } from "../../components/admin/TestimonialsManager";
import { AgentsManager } from "../../components/admin/AgentsManager";
import { Button } from "../../components/ui/button";
import { LogOut, MessageSquare, Users, Menu, X } from "lucide-react";

const API_BASE = "https://cascaderealtors.com/api/admin";

type AuthState = "loading" | "unauthenticated" | "awaiting-otp" | "authenticated";

interface AuthContextType {
  email: string | null;
  logout: () => Promise<void>;
}

export function AdminPage() {
  const [authState, setAuthState] = useState<AuthState>("loading");
  const [email, setEmail] = useState<string | null>(null);
  const [pendingEmail, setPendingEmail] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/auth/me`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setEmail(data.data.email);
        setAuthState("authenticated");
      } else {
        setAuthState("unauthenticated");
      }
    } catch {
      setAuthState("unauthenticated");
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleRequestOTP = async (inputEmail: string) => {
    const response = await fetch(`${API_BASE}/auth/request-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: inputEmail }),
      credentials: "include",
    });

    if (response.ok) {
      setPendingEmail(inputEmail);
      setAuthState("awaiting-otp");
      return { success: true };
    }

    const data = await response.json();
    return { success: false, error: data.error?.message || "Failed to send code" };
  };

  const handleVerifyOTP = async (code: string) => {
    const response = await fetch(`${API_BASE}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: pendingEmail, code }),
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      setEmail(data.data.email);
      setAuthState("authenticated");
      navigate("/admin/testimonials");
      return { success: true };
    }

    return { success: false, error: data.error?.message || "Invalid code" };
  };

  const handleLogout = async () => {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setEmail(null);
    setAuthState("unauthenticated");
    navigate("/admin");
  };

  const handleBackToLogin = () => {
    setAuthState("unauthenticated");
    setPendingEmail("");
  };

  // Loading state
  if (authState === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  // Login flow
  if (authState === "unauthenticated") {
    return <LoginForm onSubmit={handleRequestOTP} />;
  }

  if (authState === "awaiting-otp") {
    return (
      <OTPVerification
        email={pendingEmail}
        onVerify={handleVerifyOTP}
        onResend={() => handleRequestOTP(pendingEmail)}
        onBack={handleBackToLogin}
      />
    );
  }

  // Authenticated layout
  const navItems = [
    { path: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
    { path: "/admin/agents", label: "Agents", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 -ml-2 text-gray-600 hover:text-gray-900"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-semibold text-gray-900">Cascade Admin</span>
        <div className="w-10" />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200
          transform transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h1 className="font-semibold text-gray-900">Cascade Admin</h1>
              <p className="text-xs text-gray-500 truncate">{email}</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                    transition-colors
                    ${isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-gray-900"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-64">
        <div className="p-4 lg:p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/admin/testimonials" replace />} />
            <Route path="/testimonials" element={<TestimonialsManager />} />
            <Route path="/agents" element={<AgentsManager />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export { API_BASE };
