"use client";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { READING_STAGES } from "@/lib/doman";

export default function SettingsPage() {
  const [language, setLanguage] = useState<"ar" | "en" | "es">("ar");
  const [childName, setChildName] = useState("نورة");
  const [sessionTimes, setSessionTimes] = useState(["08:00", "12:00", "16:00"]);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen pb-32 md:pr-64" dir="rtl">
      <BottomNav />
      <header className="px-5 pt-6 pb-4 md:px-8">
        <h1 className="text-3xl font-black text-brand-900">الإعدادات ⚙️</h1>
        <p className="text-brand-600 font-medium mt-1">اضبطي النظام لطفلتك</p>
      </header>

      <div className="px-5 md:px-8 space-y-5">
        {/* Child info */}
        <div className="card p-5">
          <h3 className="font-black text-brand-900 mb-4">معلومات الطفل</h3>
          <div className="space-y-3">
            <div>
              <label className="font-bold text-brand-700 text-sm block mb-1">اسم الطفل</label>
              <input type="text" value={childName} onChange={(e) => setChildName(e.target.value)}
                className="w-full border-2 border-brand-200 rounded-2xl p-3 font-bold text-right focus:outline-none focus:border-brand-500" />
            </div>
          </div>
        </div>

        {/* Session times */}
        <div className="card p-5">
          <h3 className="font-black text-brand-900 mb-2">أوقات الجلسات</h3>
          <p className="text-sm text-brand-600 font-medium mb-4">دومان: ٣ جلسات يومياً بفارق ٣٠ دقيقة على الأقل</p>
          {sessionTimes.map((time, i) => (
            <div key={i} className="flex items-center gap-3 mb-3">
              <span className="font-black text-brand-700 w-24">الجلسة {i + 1}</span>
              <input type="time" value={time}
                onChange={(e) => { const t = [...sessionTimes]; t[i] = e.target.value; setSessionTimes(t); }}
                className="flex-1 border-2 border-brand-200 rounded-2xl p-3 font-bold focus:outline-none focus:border-brand-500 ltr" dir="ltr" />
            </div>
          ))}
        </div>

        {/* Language */}
        <div className="card p-5">
          <h3 className="font-black text-brand-900 mb-3">لغة الواجهة</h3>
          <div className="flex gap-2">
            {(["ar", "en", "es"] as const).map((lang) => {
              const labels = { ar: "🇸🇦 عربي", en: "🇺🇸 English", es: "🇪🇸 Español" };
              return (
                <button key={lang} onClick={() => setLanguage(lang)}
                  className={`flex-1 py-3 rounded-2xl font-bold text-sm border-2 transition-all ${language === lang ? "border-brand-500 bg-brand-50 text-brand-700" : "border-brand-100 bg-white text-brand-600"}`}>
                  {labels[lang]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Glenn Doman 5 Stages */}
        <div className="card p-5">
          <h3 className="font-black text-brand-900 mb-3">مراحل دومان الخمس 📖</h3>
          <p className="text-sm text-brand-600 font-medium mb-4">تعلّمي أين وصلتِ في البرنامج</p>
          <div className="space-y-3">
            {READING_STAGES.map((stage, i) => (
              <div key={stage.step} className={`flex items-start gap-3 p-3 rounded-xl ${i === 0 ? "bg-red-50 border border-red-200" : "bg-brand-50"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0 ${i === 0 ? "bg-red-500 text-white" : "bg-brand-200 text-brand-700"}`}>
                  {stage.step}
                </div>
                <div>
                  <p className="font-black text-brand-900">{stage.name_ar}</p>
                  <p className="text-sm text-brand-600 font-medium">{stage.desc_ar}</p>
                  {stage.milestone_ar && <p className="text-xs text-red-600 font-bold mt-1">📌 {stage.milestone_ar}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save button */}
        <button onClick={handleSave}
          className="w-full bg-brand-500 hover:bg-brand-600 text-white font-black text-xl py-5 rounded-3xl transition-all active:scale-95 shadow-xl shadow-brand-200">
          {saved ? "✓ تم الحفظ!" : "💾 حفظ الإعدادات"}
        </button>
      </div>
    </div>
  );
}
