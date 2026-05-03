"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const floatingWords = [
  "أمي", "أبي", "حب", "نور", "قمر", "شمس", "بيت", "قطة", "كلب", "تفاحة",
  "أخت", "أخ", "ماء", "خبز", "حليب", "يد", "عين", "قلب"
];

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden relative" dir="rtl">
      {/* Floating background words decoration */}
      {mounted && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
          {floatingWords.map((word, i) => (
            <span
              key={i}
              className="absolute text-brand-300 font-bold opacity-20"
              style={{
                fontSize: `${1.5 + (i % 4) * 0.5}rem`,
                top: `${5 + (i * 17 + i * 3) % 88}%`,
                right: `${3 + (i * 23 + i * 7) % 90}%`,
                transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (5 + (i * 11) % 20)}deg)`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              {word}
            </span>
          ))}
        </div>
      )}

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-5 md:px-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-500 rounded-2xl flex items-center justify-center">
              <span className="text-white font-black text-lg">ن</span>
            </div>
            <span className="font-black text-brand-700 text-2xl">نور</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-brand-600 font-bold hover:text-brand-700 transition-colors px-4 py-2"
            >
              دخول
            </Link>
            <Link
              href="/login?mode=signup"
              className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-5 py-2.5 rounded-2xl transition-all hover:shadow-lg active:scale-95"
            >
              ابدأ مجاناً
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-100 border border-brand-200 text-brand-700 font-bold text-sm px-4 py-2 rounded-full mb-8">
              <span>✨</span>
              <span>مبني على منهج غلين دومان العالمي</span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl font-black text-brand-900 leading-tight mb-6">
              علّم طفلك
              <br />
              <span className="text-brand-500">القراءة مبكراً</span>
              <br />
              بكل سهولة
            </h1>

            <p className="text-xl md:text-2xl text-brand-700 font-medium leading-relaxed mb-10 max-w-xl mx-auto">
              نظام ذكي يساعدك على تنظيم بطاقات التعلم، الجداول اليومية، والتذكيرات — كل ذلك باللغة العربية
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login?mode=signup"
                className="bg-brand-500 hover:bg-brand-600 text-white font-black text-xl px-10 py-5 rounded-3xl transition-all hover:shadow-2xl hover:-translate-y-1 active:scale-95 shadow-lg shadow-brand-200"
              >
                ابدأ رحلة التعلم 🚀
              </Link>
              <Link
                href="/dashboard"
                className="bg-white border-2 border-brand-200 hover:border-brand-400 text-brand-700 font-black text-xl px-10 py-5 rounded-3xl transition-all hover:-translate-y-1 active:scale-95"
              >
                جرب بدون تسجيل
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-16 md:px-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-black text-brand-900 text-center mb-12">
              كل ما تحتاجه في مكان واحد
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "⚡",
                  title: "جلسات يومية ذكية",
                  desc: "3 جلسات يومياً، كل جلسة أقل من دقيقتين. النظام يذكرك متى وماذا تعرض",
                  color: "bg-amber-50 border-amber-200",
                  iconBg: "bg-amber-100",
                },
                {
                  icon: "🖨️",
                  title: "طباعة + رقمي",
                  desc: "اطبع البطاقات بنقرة واحدة، أو استخدم الوضع الرقمي على جهازك",
                  color: "bg-terra-50 border-orange-200",
                  iconBg: "bg-orange-100",
                },
                {
                  icon: "🔔",
                  title: "تذكيرات تلقائية",
                  desc: "لا تنسى أي جلسة. النظام يعلمك متى تضيف كلمات جديدة ومتى تتقاعد القديمة",
                  color: "bg-green-50 border-green-200",
                  iconBg: "bg-green-100",
                },
                {
                  icon: "📊",
                  title: "تتبع التقدم",
                  desc: "شاهد كم كلمة تعلّم طفلك، وما هي المرحلة التالية في رحلة التعلم",
                  color: "bg-purple-50 border-purple-200",
                  iconBg: "bg-purple-100",
                },
                {
                  icon: "🌍",
                  title: "ثلاث لغات",
                  desc: "عربي، إنجليزي، وإسباني. كل بطاقة بالغة التي تريدها",
                  color: "bg-blue-50 border-blue-200",
                  iconBg: "bg-blue-100",
                },
                {
                  icon: "💕",
                  title: "مصمم للأمهات",
                  desc: "سهل الاستخدام، جميل التصميم، يعمل على الجوال والكمبيوتر والأيباد",
                  color: "bg-pink-50 border-pink-200",
                  iconBg: "bg-pink-100",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className={`card card-hover p-6 border-2 ${f.color}`}
                >
                  <div className={`w-14 h-14 ${f.iconBg} rounded-2xl flex items-center justify-center text-2xl mb-4`}>
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-black text-brand-900 mb-2">{f.title}</h3>
                  <p className="text-brand-700 font-medium leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Glenn Doman Method Section */}
        <section className="px-6 py-16 md:px-12 bg-brand-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-6">منهج غلين دومان</h2>
            <p className="text-xl font-medium text-brand-100 leading-relaxed mb-8">
              الدكتور غلين دومان اكتشف أن الأطفال من الولادة حتى 6 سنوات لديهم قدرة مذهلة على التعلم.
              بطاقات كبيرة، جلسات قصيرة ممتعة، وكلمات متجددة — هذا سر النجاح.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { num: "5", label: "مجموعات يومياً" },
                { num: "3", label: "جلسات لكل مجموعة" },
                { num: "5", label: "أيام لكل كلمة" },
                { num: "١ ث", label: "لكل بطاقة" },
              ].map((stat) => (
                <div key={stat.label} className="bg-brand-800 rounded-2xl p-4">
                  <div className="text-4xl font-black text-brand-300 mb-1">{stat.num}</div>
                  <div className="text-brand-200 font-medium text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-8 text-center text-brand-600 font-medium">
          <p>صُنع بـ 💕 من عون — لأخواته الصغيرتين وكل طفل في العالم</p>
          <p className="text-sm mt-1 text-brand-400">
            مبني على أعمال الدكتور غلين دومان
          </p>
        </footer>
      </div>
    </main>
  );
}
