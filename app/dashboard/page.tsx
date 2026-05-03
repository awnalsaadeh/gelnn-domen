"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { getDomanTip, DOMAN_RULES } from "@/lib/doman";

// Sample data for demo mode
const DEMO_DATA = {
  child: { name: "نورة", age: "1.5 سنة" },
  activeWords: 25,
  retiredWords: 10,
  todaySessions: [
    {
      id: 1,
      time: "٨:٠٠ ص",
      sets: ["أفراد العائلة", "أجزاء الجسم", "الألوان", "الحيوانات", "الطعام"],
      completed: true,
    },
    {
      id: 2,
      time: "١٢:٠٠ م",
      sets: ["أفراد العائلة", "أجزاء الجسم", "الألوان", "الحيوانات", "الطعام"],
      completed: false,
    },
    {
      id: 3,
      time: "٤:٠٠ م",
      sets: ["أفراد العائلة", "أجزاء الجسم", "الألوان", "الحيوانات", "الطعام"],
      completed: false,
    },
  ],
  weekProgress: [
    { day: "الأحد", done: 3, total: 3 },
    { day: "الاثنين", done: 3, total: 3 },
    { day: "الثلاثاء", done: 2, total: 3 },
    { day: "الأربعاء", done: 1, total: 3 },
    { day: "الخميس", done: 0, total: 3 },
    { day: "الجمعة", done: 0, total: 3 },
    { day: "السبت", done: 0, total: 3 },
  ],
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "صباح الخير";
  if (hour < 18) return "مساء الخير";
  return "مساء النور";
}

export default function DashboardPage() {
  const [tip, setTip] = useState("");
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    setTip(getDomanTip("ar"));
    const now = new Date();
    const days = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
    const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    setTodayDate(`${days[now.getDay()]}، ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`);
  }, []);

  const completedSessions = DEMO_DATA.todaySessions.filter(s => s.completed).length;
  const totalSessions = DEMO_DATA.todaySessions.length;
  const progressPct = Math.round((completedSessions / totalSessions) * 100);

  return (
    <div className="min-h-screen pb-24 md:pr-64" dir="rtl">
      <BottomNav />
      
      {/* Header */}
      <header className="px-5 pt-6 pb-4 md:px-8">
        <p className="text-brand-500 font-bold text-lg">{todayDate}</p>
        <h1 className="text-3xl font-black text-brand-900 mt-1">
          {getGreeting()} 👋
        </h1>
        <p className="text-brand-600 font-medium mt-1">
          رحلة <span className="font-black text-brand-700">{DEMO_DATA.child.name}</span> مستمرة 🌟
        </p>
      </header>

      <div className="px-5 md:px-8 space-y-5">
        
        {/* Today's progress card */}
        <div className="card p-5 bg-gradient-to-l from-brand-500 to-brand-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-bold opacity-90 text-sm">تقدم اليوم</p>
              <p className="font-black text-2xl mt-1">
                {completedSessions} من {totalSessions} جلسات
              </p>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-white/40 flex items-center justify-center relative">
              <span className="font-black text-xl">{progressPct}%</span>
            </div>
          </div>
          <div className="bg-white/20 rounded-full h-3">
            <div
              className="bg-white rounded-full h-3 transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-3 text-sm font-medium opacity-90">
            <span>{DEMO_DATA.activeWords} كلمة نشطة</span>
            <span>{DEMO_DATA.retiredWords} كلمة تقاعدت ✓</span>
          </div>
        </div>

        {/* Daily Tip */}
        <div className="card p-4 bg-amber-50 border border-amber-200">
          <p className="text-xs font-bold text-amber-600 mb-1">💡 نصيحة دومان اليوم</p>
          <p className="font-bold text-brand-900">{tip}</p>
        </div>

        {/* Today's Sessions */}
        <div>
          <h2 className="text-xl font-black text-brand-900 mb-3">جلسات اليوم</h2>
          <div className="space-y-3">
            {DEMO_DATA.todaySessions.map((session) => (
              <div
                key={session.id}
                className={`card p-4 flex items-center gap-4 ${
                  session.completed ? "opacity-60" : ""
                }`}
              >
                {/* Time */}
                <div className="flex-shrink-0 text-center">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg ${
                    session.completed 
                      ? "bg-green-100 text-green-700" 
                      : "bg-brand-100 text-brand-700"
                  }`}>
                    {session.completed ? "✓" : session.id}
                  </div>
                  <p className="text-xs font-bold text-brand-500 mt-1">{session.time}</p>
                </div>

                {/* Sets */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-brand-800 text-sm mb-1">
                    {session.sets.length} مجموعات × {DOMAN_RULES.WORDS_PER_SET} كلمات
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {session.sets.map((set) => (
                      <span
                        key={set}
                        className="text-xs bg-brand-50 text-brand-600 font-medium px-2 py-0.5 rounded-lg border border-brand-100"
                      >
                        {set}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action */}
                {!session.completed && (
                  <Link
                    href="/flash"
                    className="flex-shrink-0 bg-brand-500 hover:bg-brand-600 text-white font-black text-sm px-4 py-3 rounded-2xl transition-all active:scale-95 shadow-md shadow-brand-200"
                  >
                    ابدأ
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: "📚", value: DEMO_DATA.activeWords, label: "كلمة نشطة", color: "bg-blue-50" },
            { icon: "✅", value: DEMO_DATA.retiredWords, label: "تعلّمتها", color: "bg-green-50" },
            { icon: "🔥", value: "٤ أيام", label: "متتالية", color: "bg-orange-50" },
          ].map((stat) => (
            <div key={stat.label} className={`card p-3 text-center ${stat.color}`}>
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-xl font-black text-brand-900">{stat.value}</div>
              <div className="text-xs font-bold text-brand-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Weekly view */}
        <div className="card p-4">
          <h3 className="font-black text-brand-900 mb-3">هذا الأسبوع</h3>
          <div className="flex items-end gap-2 h-20">
            {DEMO_DATA.weekProgress.map((day, i) => {
              const height = day.total > 0 ? (day.done / day.total) * 100 : 0;
              const isToday = i === new Date().getDay();
              return (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="flex-1 w-full bg-brand-100 rounded-lg overflow-hidden flex flex-col-reverse">
                    <div
                      className={`w-full rounded-lg transition-all duration-500 ${
                        isToday ? "bg-brand-500" : "bg-brand-300"
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className={`text-xs font-bold ${isToday ? "text-brand-700" : "text-brand-400"}`}>
                    {day.day.slice(0, 3)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3 pb-4">
          <Link href="/words" className="card card-hover p-4 flex flex-col gap-2">
            <span className="text-3xl">📝</span>
            <span className="font-black text-brand-900">إضافة كلمات</span>
            <span className="text-sm text-brand-600 font-medium">إضافة كلمات جديدة للمكتبة</span>
          </Link>
          <Link href="/print" className="card card-hover p-4 flex flex-col gap-2">
            <span className="text-3xl">🖨️</span>
            <span className="font-black text-brand-900">طباعة البطاقات</span>
            <span className="text-sm text-brand-600 font-medium">اطبع بطاقاتك الآن</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
