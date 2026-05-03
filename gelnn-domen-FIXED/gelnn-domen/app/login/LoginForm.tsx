"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultMode = searchParams.get("mode") === "signup" ? "signup" : "login";

  const [mode, setMode] = useState<"login" | "signup">(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    if (!email || !password) {
      setError("يرجى ملء جميع الحقول");
      return;
    }
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        });
        if (error) throw error;
        setSuccess("تم إنشاء حسابك! تحقق من بريدك الإلكتروني لتأكيده.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "حدث خطأ";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10" dir="rtl">
      <Link href="/" className="absolute top-5 right-5 flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700">
        → الرئيسية
      </Link>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-500 rounded-3xl flex items-center justify-center mx-auto mb-3 shadow-xl shadow-brand-200">
            <span className="text-white font-black text-3xl">ن</span>
          </div>
          <h1 className="text-3xl font-black text-brand-900">نور</h1>
          <p className="text-brand-600 font-medium">منهج غلين دومان للتعلم المبكر</p>
        </div>

        <div className="flex bg-brand-100 rounded-2xl p-1 mb-6">
          <button onClick={() => setMode("login")} className={`flex-1 py-3 rounded-xl font-black text-sm transition-all ${mode === "login" ? "bg-white shadow text-brand-700" : "text-brand-500"}`}>
            دخول
          </button>
          <button onClick={() => setMode("signup")} className={`flex-1 py-3 rounded-xl font-black text-sm transition-all ${mode === "signup" ? "bg-white shadow text-brand-700" : "text-brand-500"}`}>
            حساب جديد
          </button>
        </div>

        <div className="card p-6 space-y-4">
          {mode === "signup" && (
            <div>
              <label className="font-bold text-brand-700 text-sm block mb-1">اسمك</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="مثال: أم نورة"
                className="w-full border-2 border-brand-200 rounded-2xl p-4 font-bold text-right focus:outline-none focus:border-brand-500 text-brand-900 text-lg" />
            </div>
          )}
          <div>
            <label className="font-bold text-brand-700 text-sm block mb-1">البريد الإلكتروني</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" dir="ltr"
              className="w-full border-2 border-brand-200 rounded-2xl p-4 font-bold focus:outline-none focus:border-brand-500 text-brand-900" />
          </div>
          <div>
            <label className="font-bold text-brand-700 text-sm block mb-1">كلمة المرور</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" dir="ltr"
              className="w-full border-2 border-brand-200 rounded-2xl p-4 font-bold focus:outline-none focus:border-brand-500 text-brand-900" />
          </div>

          {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3"><p className="text-red-700 font-bold text-sm">{error}</p></div>}
          {success && <div className="bg-green-50 border border-green-200 rounded-xl p-3"><p className="text-green-700 font-bold text-sm">{success}</p></div>}

          <button onClick={handleSubmit} disabled={loading}
            className="w-full bg-brand-500 hover:bg-brand-600 text-white font-black text-lg py-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-brand-200 disabled:opacity-60 mt-2">
            {loading ? "جارٍ..." : mode === "login" ? "دخول" : "إنشاء الحساب"}
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-brand-600 font-medium text-sm mb-2">أو</p>
          <Link href="/dashboard" className="text-brand-600 hover:text-brand-700 font-bold underline">
            جرب بدون تسجيل (وضع تجريبي)
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-brand-500 font-medium text-sm italic">&quot;أنت المعلم الأفضل لطفلك&quot;</p>
          <p className="text-brand-400 font-medium text-xs mt-1">— غلين دومان</p>
        </div>
      </div>
    </div>
  );
}
