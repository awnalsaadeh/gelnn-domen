import { Suspense } from "react";
import LoginForm from "./LoginForm";

// ✅ FIXED: useSearchParams requires Suspense boundary in Next.js 15
// Without this wrapper the page crashes at build time
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-brand-500 font-bold text-xl">جارٍ التحميل...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
