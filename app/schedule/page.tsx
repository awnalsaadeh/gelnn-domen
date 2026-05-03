"use client";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { DOMAN_RULES } from "@/lib/doman";

const WEEKLY_PLAN = [
  {
    day: "الأحد",
    dayEn: "Sun",
    date: "27 أبريل",
    isToday: false,
    sessions: [
      { time: "٨:٠٠ ص", done: true },
      { time: "١٢:٠٠ م", done: true },
      { time: "٤:٠٠ م", done: true },
    ],
    note: "تقاعدت: يد، عين → أُضيفت: رأس، أذن",
  },
  {
    day: "الاثنين",
    dayEn: "Mon",
    date: "28 أبريل",
    isToday: false,
    sessions: [
      { time: "٨:٠٠ ص", done: true },
      { time: "١٢:٠٠ م", done: true },
      { time: "٤:٠٠ م", done: true },
    ],
    note: "",
  },
  {
    day: "الثلاثاء",
    dayEn: "Tue",
    date: "29 أبريل",
    isToday: false,
    sessions: [
      { time: "٨:٠٠ ص", done: true },
      { time: "١٢:٠٠ م", done: true },
      { time: "٤:٠٠ م", done: false },
    ],
    note: "",
  },
  {
    day: "الأربعاء",
    dayEn: "Wed",
    date: "30 أبريل",
    isToday: false,
    sessions: [
      { time: "٨:٠٠ ص", done: true },
      { time: "١٢:٠٠ م", done: false },
      { time: "٤:٠٠ م", done: false },
    ],
    note: "",
  },
  {
    day: "الخميس",
    dayEn: "Thu",
    date: "1 مايو",
    isToday: false,
    sessions: [
      { time: "٨:٠٠ ص", done: false },
      { time: "١٢:٠٠ م", done: false },
      { time: "٤:٠٠ م", done: false },
    ],
    note: "",
  },
  {
    day: "الجمعة",
    dayEn: "Fri",
    date: "2 مايو",
    isToday: true,
    sessions: [
      { time: "٨:٠٠ ص", done: true },
      { time: "١٢:٠٠ م", done: false },
      { time: "٤:٠٠ م", done: false },
    ],
    note: "اليوم: تقاعد كلمة أمي → أضيفي: جدي",
  },
  {
    day: "السبت",
    dayEn: "Sat",
    date: "3 مايو",
    isToday: false,
    sessions: [
      { time: "٨:٠٠ ص", done: false },
      { time: "١٢:٠٠ م", done: false },
      { time: "٤:٠٠ م", done: false },
    ],
    note: "",
  },
];

// Words retiring soon
const RETIRING_SOON = [
  { word: "أمي", category: "أفراد العائلة", daysLeft: 0, shown: 15 },
  { word: "أبي", category: "أفراد العائلة", daysLeft: 1, shown: 12 },
  { word: "يد", category: "أجزاء الجسم", daysLeft: 2, shown: 9 },
  { word: "أحمر", category: "الألوان", daysLeft: 3, shown: 6 },
];

// New words ready to add
const READY_TO_ADD = [
  { word: "جدي", category: "أفراد العائلة", emoji: "👴" },
  { word: "كتف", category: "أجزاء الجسم", emoji: "💪" },
  { word: "بنفسجي", category: "الألوان", emoji: "🟣" },
];

export default function SchedulePage() {
  const [view, setView] = useState<"week" | "timeline">("week");

  const totalDone = WEEKLY_PLAN.reduce(
    (acc, day) => acc + day.sessions.filter((s) => s.done).length,
    0
  );
  const totalSessions = WEEKLY_PLAN.length * DOMAN_RULES.SESSIONS_PER_DAY;

  return (
    <div className="min-h-screen pb-32 md:pr-64" dir="rtl">
      <BottomNav />

      {/* Header */}
      <header className="px-5 pt-6 pb-4 md:px-8">
        <h1 className="text-3xl font-black text-brand-900">الجدول الأسبوعي 📅</h1>
        <p className="text-brand-600 font-medium mt-1">
          {totalDone} من {totalSessions} جلسة هذا الأسبوع
        </p>
      </header>

      {/* View toggle */}
      <div className="px-5 md:px-8 flex gap-2 mb-5">
        <button
          onClick={() => setView("week")}
          className={`px-4 py-2 rounded-2xl font-bold text-sm transition-all ${
            view === "week" ? "bg-brand-500 text-white" : "bg-white text-brand-600 border border-brand-100"
          }`}
        >
          عرض أسبوعي
        </button>
        <button
          onClick={() => setView("timeline")}
          className={`px-4 py-2 rounded-2xl font-bold text-sm transition-all ${
            view === "timeline" ? "bg-brand-500 text-white" : "bg-white text-brand-600 border border-brand-100"
          }`}
        >
          الكلمات
        </button>
      </div>

      {view === "week" && (
        <div className="px-5 md:px-8 space-y-4">
          {/* Today's alerts */}
          <div className="space-y-2">
            {RETIRING_SOON.filter((w) => w.daysLeft === 0).map((w) => (
              <div key={w.word} className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4 flex items-center gap-3">
                <span className="text-2xl">🔔</span>
                <div>
                  <p className="font-black text-orange-900">
                    حان وقت تقاعد كلمة &quot;{w.word}&quot;
                  </p>
                  <p className="text-sm text-orange-700 font-medium">
                    عُرضت {w.shown} مرة • استبدليها بكلمة جديدة
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Weekly grid */}
          <div className="space-y-3">
            {WEEKLY_PLAN.map((day) => {
              const doneSessions = day.sessions.filter((s) => s.done).length;
              return (
                <div
                  key={day.day}
                  className={`card p-4 ${day.isToday ? "ring-2 ring-brand-500 shadow-lg shadow-brand-100" : ""}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center ${
                        day.isToday ? "bg-brand-500 text-white" : "bg-brand-50 text-brand-700"
                      }`}
                    >
                      <span className="text-xs font-bold leading-none">{day.dayEn}</span>
                      <span className="font-black text-lg leading-none">{day.date.split(" ")[0]}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-brand-900">{day.day}</h3>
                        {day.isToday && (
                          <span className="bg-brand-500 text-white text-xs font-black px-2 py-0.5 rounded-full">
                            اليوم
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-brand-500 font-medium">{day.date}</p>
                    </div>
                    <div className="flex gap-1.5">
                      {day.sessions.map((s, i) => (
                        <div
                          key={i}
                          title={s.time}
                          className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm ${
                            s.done
                              ? "bg-green-100 text-green-700"
                              : day.isToday
                              ? "bg-brand-100 text-brand-500 border-2 border-brand-300 border-dashed"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {s.done ? "✓" : i + 1}
                        </div>
                      ))}
                    </div>
                  </div>

                  {day.note && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5">
                      <p className="text-sm font-bold text-amber-800">📌 {day.note}</p>
                    </div>
                  )}

                  {/* Progress bar */}
                  <div className="mt-3 bg-brand-100 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all ${
                        day.isToday ? "bg-brand-500" : "bg-green-400"
                      }`}
                      style={{
                        width: `${(doneSessions / day.sessions.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view === "timeline" && (
        <div className="px-5 md:px-8 space-y-5">
          {/* Retire soon */}
          <div className="card p-4">
            <h3 className="font-black text-brand-900 mb-3 flex items-center gap-2">
              <span>⏰</span> كلمات ستتقاعد قريباً
            </h3>
            <div className="space-y-2">
              {RETIRING_SOON.map((w) => (
                <div key={w.word} className="flex items-center gap-3 p-3 rounded-xl bg-brand-50">
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      w.daysLeft === 0
                        ? "bg-red-500"
                        : w.daysLeft === 1
                        ? "bg-orange-500"
                        : "bg-yellow-500"
                    }`}
                  />
                  <div className="flex-1">
                    <span className="font-black text-brand-900 text-lg">{w.word}</span>
                    <span className="text-brand-500 font-medium text-sm mr-2">· {w.category}</span>
                  </div>
                  <span
                    className={`font-bold text-sm ${
                      w.daysLeft === 0 ? "text-red-600" : "text-brand-600"
                    }`}
                  >
                    {w.daysLeft === 0 ? "اليوم!" : `${w.daysLeft} أيام`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Ready to add */}
          <div className="card p-4">
            <h3 className="font-black text-brand-900 mb-3 flex items-center gap-2">
              <span>✨</span> كلمات جاهزة للإضافة
            </h3>
            <p className="text-sm text-brand-600 font-medium mb-3">
              حسب منهج دومان، أضيفي كلمة واحدة لكل مجموعة يومياً
            </p>
            <div className="space-y-2">
              {READY_TO_ADD.map((w) => (
                <div
                  key={w.word}
                  className="flex items-center justify-between p-3 rounded-xl bg-green-50 border border-green-100"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{w.emoji}</span>
                    <div>
                      <span className="font-black text-brand-900 text-lg">{w.word}</span>
                      <p className="text-sm text-brand-500 font-medium">{w.category}</p>
                    </div>
                  </div>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold text-sm px-4 py-2 rounded-xl active:scale-95 transition-all">
                    + أضيفي
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Doman schedule explanation */}
          <div className="card p-4 bg-brand-900 text-white">
            <h3 className="font-black text-xl mb-3">📖 قاعدة دومان</h3>
            <div className="space-y-2 text-sm font-medium text-brand-200">
              <p>• كل كلمة تُعرض <strong className="text-white">٣ مرات يومياً لمدة ٥ أيام</strong></p>
              <p>• مجموع العرض: <strong className="text-white">١٥ مرة</strong> لكل كلمة</p>
              <p>• أضيفي <strong className="text-white">كلمة واحدة</strong> لكل مجموعة يومياً</p>
              <p>• تقاعدي الكلمة بعد <strong className="text-white">٥ أيام أو ١٥ عرضاً</strong></p>
              <p>• لا تختبري طفلتك أبداً 💕</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
