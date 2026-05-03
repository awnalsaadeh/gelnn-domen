"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { DOMAN_RULES } from "@/lib/doman";

/**
 * Flash Card Session Page
 * ✅ CORRECTED per Glenn Doman book:
 * - Cards are WHITE background with RED text (#CC0000)
 * - Each card shown for EXACTLY 1 second
 * - Words are LOWERCASE (except proper nouns)
 * - Word order: body parts first, then family, etc.
 */

// ✅ CORRECTED: Body parts FIRST per Doman, RED text on WHITE
const DEMO_SETS = [
  {
    id: 1,
    name: "أجزاء الجسم",
    emoji: "🖐️",
    note: "ابدئي هنا — كلمات الجسم أولاً",
    words: [
      { id: "w1", text_ar: "يد", text_en: "hand", text_es: "mano" },
      { id: "w2", text_ar: "عين", text_en: "eye", text_es: "ojo" },
      { id: "w3", text_ar: "أنف", text_en: "nose", text_es: "nariz" },
      { id: "w4", text_ar: "فم", text_en: "mouth", text_es: "boca" },
      { id: "w5", text_ar: "قدم", text_en: "foot", text_es: "pie" },
    ],
  },
  {
    id: 2,
    name: "أفراد العائلة",
    emoji: "👨‍👩‍👧‍👦",
    note: "العائلة ثانياً",
    words: [
      { id: "w6", text_ar: "أمي", text_en: "Mommy", text_es: "Mamá" },
      { id: "w7", text_ar: "أبي", text_en: "Daddy", text_es: "Papá" },
      { id: "w8", text_ar: "أخي", text_en: "brother", text_es: "hermano" },
      { id: "w9", text_ar: "أختي", text_en: "sister", text_es: "hermana" },
      { id: "w10", text_ar: "جدتي", text_en: "Grandma", text_es: "abuela" },
    ],
  },
  {
    id: 3,
    name: "البيت",
    emoji: "🏠",
    note: "البيت ثالثاً",
    words: [
      { id: "w11", text_ar: "باب", text_en: "door", text_es: "puerta" },
      { id: "w12", text_ar: "كرسي", text_en: "chair", text_es: "silla" },
      { id: "w13", text_ar: "طاولة", text_en: "table", text_es: "mesa" },
      { id: "w14", text_ar: "سرير", text_en: "bed", text_es: "cama" },
      { id: "w15", text_ar: "نافذة", text_en: "window", text_es: "ventana" },
    ],
  },
  {
    id: 4,
    name: "الطعام",
    emoji: "🍎",
    note: "الطعام رابعاً",
    words: [
      { id: "w16", text_ar: "تفاحة", text_en: "apple", text_es: "manzana" },
      { id: "w17", text_ar: "موزة", text_en: "banana", text_es: "plátano" },
      { id: "w18", text_ar: "حليب", text_en: "milk", text_es: "leche" },
      { id: "w19", text_ar: "خبز", text_en: "bread", text_es: "pan" },
      { id: "w20", text_ar: "ماء", text_en: "water", text_es: "agua" },
    ],
  },
  {
    id: 5,
    name: "الحيوانات",
    emoji: "🐾",
    note: "الحيوانات خامساً",
    words: [
      { id: "w21", text_ar: "قطة", text_en: "cat", text_es: "gato" },
      { id: "w22", text_ar: "كلب", text_en: "dog", text_es: "perro" },
      { id: "w23", text_ar: "أسد", text_en: "lion", text_es: "león" },
      { id: "w24", text_ar: "فيل", text_en: "elephant", text_es: "elefante" },
      { id: "w25", text_ar: "طائر", text_en: "bird", text_es: "pájaro" },
    ],
  },
];

type FlashState = "idle" | "countdown" | "flashing" | "between" | "done";

export default function FlashPage() {
  const [sessionNumber] = useState(2);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [flashState, setFlashState] = useState<FlashState>("idle");
  const [countdown, setCountdown] = useState(3);
  const [completedSets, setCompletedSets] = useState<number[]>([]);
  const [displayLang, setDisplayLang] = useState<"ar" | "en" | "es">("ar");
  const [showCelebration, setShowCelebration] = useState(false);

  const currentSet = DEMO_SETS[currentSetIndex];
  const currentWord = currentSet?.words[currentWordIndex];

  // ✅ CORRECTED: Exactly 1 second per card per Doman's book
  useEffect(() => {
    if (flashState !== "flashing") return;
    const timer = setTimeout(() => {
      if (currentWordIndex < currentSet.words.length - 1) {
        setCurrentWordIndex((i) => i + 1);
      } else {
        setFlashState("between");
        setCompletedSets((prev) => [...prev, currentSet.id]);
      }
    }, DOMAN_RULES.SECONDS_PER_CARD * 1000); // exactly 1000ms = 1 second
    return () => clearTimeout(timer);
  }, [flashState, currentWordIndex, currentSet]);

  useEffect(() => {
    if (flashState !== "countdown") return;
    if (countdown <= 0) {
      setFlashState("flashing");
      setCurrentWordIndex(0);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [flashState, countdown]);

  const startSet = useCallback(() => {
    setFlashState("countdown");
    setCountdown(3);
    setCurrentWordIndex(0);
  }, []);

  const nextSet = useCallback(() => {
    if (currentSetIndex < DEMO_SETS.length - 1) {
      setCurrentSetIndex((i) => i + 1);
      setFlashState("idle");
      setCurrentWordIndex(0);
    } else {
      setShowCelebration(true);
      setFlashState("done");
    }
  }, [currentSetIndex]);

  const getWordText = (word: (typeof DEMO_SETS[0]["words"][0]) | undefined) => {
    if (!word) return "";
    if (displayLang === "ar") return word.text_ar;
    if (displayLang === "en") return word.text_en;
    return word.text_es;
  };

  return (
    <div className="min-h-screen pb-24 md:pr-64" dir="rtl">
      <BottomNav />

      {/* ✅ CORRECTED Flash screen: WHITE background, RED text per Doman */}
      {flashState === "flashing" && currentWord && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ backgroundColor: DOMAN_RULES.CARD_BG_COLOR }} // WHITE
        >
          <div key={`${currentWordIndex}-${currentWord.id}`} className="word-flash text-center px-8">
            <p
              className="font-black leading-none select-none"
              style={{
                // ✅ RED text — Doman book says red attracts child's visual attention
                color: DOMAN_RULES.CARD_TEXT_COLOR,
                fontSize: "clamp(5rem, 22vw, 14rem)",
                fontFamily: "'Cairo', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              {getWordText(currentWord)}
            </p>
          </div>

          {/* Progress dots at bottom */}
          <div className="absolute bottom-16 flex gap-3">
            {currentSet.words.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === currentWordIndex ? "14px" : "10px",
                  height: i === currentWordIndex ? "14px" : "10px",
                  backgroundColor: DOMAN_RULES.CARD_TEXT_COLOR,
                  opacity: i <= currentWordIndex ? 1 : 0.2,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Countdown overlay — also white with red */}
      {flashState === "countdown" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: DOMAN_RULES.CARD_BG_COLOR }}
        >
          <div className="text-center">
            <div
              className="font-black leading-none"
              style={{
                fontSize: "12rem",
                color: DOMAN_RULES.CARD_TEXT_COLOR,
              }}
            >
              {countdown === 0 ? "🌟" : countdown}
            </div>
            <p
              className="font-black text-2xl mt-4"
              style={{ color: DOMAN_RULES.CARD_TEXT_COLOR }}
            >
              {countdown === 0 ? "ابدأي!" : "استعدي..."}
            </p>
          </div>
        </div>
      )}

      {/* Celebration screen */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 bg-brand-500 flex flex-col items-center justify-center text-white text-center p-8">
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
          <h2 className="text-4xl font-black mb-3">أحسنتِ!</h2>
          <p className="text-xl font-bold opacity-90 mb-2">
            الجلسة {sessionNumber} من {DOMAN_RULES.SESSIONS_PER_DAY} مكتملة
          </p>
          <p className="text-lg opacity-80 mb-8">
            عرضتِ {DEMO_SETS.length * DOMAN_RULES.WORDS_PER_SET} كلمة 🌟
          </p>
          <Link
            href="/dashboard"
            className="bg-white text-brand-600 font-black text-lg px-8 py-4 rounded-3xl active:scale-95"
          >
            العودة للرئيسية
          </Link>
          <p className="mt-6 text-sm opacity-70 max-w-sm">
            ⚠️ لا تختبري طفلتك ولا تكرري البطاقات مباشرة 💕
            <br />
            الجلسة التالية بعد ٣٠ دقيقة على الأقل
          </p>
        </div>
      )}

      {/* Main screen */}
      {!showCelebration && flashState !== "flashing" && flashState !== "countdown" && (
        <>
          <header className="px-5 pt-6 pb-4 md:px-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-brand-900">
                الجلسة {sessionNumber} من {DOMAN_RULES.SESSIONS_PER_DAY}
              </h1>
              <p className="text-brand-600 font-medium">
                {completedSets.length} / {DEMO_SETS.length} مجموعات ✓
              </p>
            </div>
            <div className="flex gap-1 bg-brand-50 rounded-2xl p-1 border border-brand-100">
              {(["ar", "en", "es"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setDisplayLang(lang)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-sm transition-all ${
                    displayLang === lang ? "bg-brand-500 text-white" : "text-brand-600"
                  }`}
                >
                  {lang === "ar" ? "ع" : lang === "en" ? "EN" : "ES"}
                </button>
              ))}
            </div>
          </header>

          {/* Doman reminder */}
          <div className="mx-5 md:mx-8 mb-4 bg-red-50 border border-red-200 rounded-2xl p-3 flex items-center gap-3">
            <span className="text-2xl">📖</span>
            <p className="text-sm font-bold text-red-800">
              ثانية واحدة لكل بطاقة • لا تختبري • كوني سعيدة ومتحمسة 🌟
            </p>
          </div>

          <div className="px-5 md:px-8 space-y-4">
            {DEMO_SETS.map((set, index) => {
              const isCompleted = completedSets.includes(set.id);
              const isCurrent = index === currentSetIndex;

              return (
                <div
                  key={set.id}
                  className={`card p-5 transition-all ${
                    isCompleted ? "opacity-50" : isCurrent ? "ring-2 ring-red-400 shadow-lg" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-2xl">
                        {set.emoji}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-black text-brand-900">{set.name}</h3>
                          <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">
                            #{index + 1}
                          </span>
                        </div>
                        <p className="text-xs text-brand-500 font-medium">{set.note}</p>
                      </div>
                    </div>

                    {isCompleted ? (
                      <div className="bg-green-100 text-green-700 font-black px-4 py-2 rounded-2xl text-sm">✓ مكتملة</div>
                    ) : isCurrent && flashState === "between" ? (
                      <button onClick={nextSet} className="bg-brand-500 text-white font-black px-5 py-2.5 rounded-2xl active:scale-95">
                        التالية →
                      </button>
                    ) : isCurrent ? (
                      <button
                        onClick={startSet}
                        className="text-white font-black px-5 py-2.5 rounded-2xl active:scale-95 shadow-md"
                        style={{ backgroundColor: DOMAN_RULES.CARD_TEXT_COLOR }}
                      >
                        ▶ ابدأ
                      </button>
                    ) : (
                      <span className="text-brand-300 font-bold text-sm">قريباً</span>
                    )}
                  </div>

                  {/* Word preview — red text */}
                  {!isCompleted && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {set.words.map((word) => (
                        <span
                          key={word.id}
                          className="text-sm font-black px-3 py-1.5 rounded-xl border border-red-200 bg-red-50"
                          style={{ color: DOMAN_RULES.CARD_TEXT_COLOR }}
                        >
                          {getWordText(word)}
                        </span>
                      ))}
                    </div>
                  )}

                  {isCurrent && flashState === "between" && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl text-center">
                      <p className="font-bold text-green-800">🎉 مجموعة {set.name} اكتملت!</p>
                      <p className="text-sm text-green-700 mt-1">استريحي قليلاً ثم انتقلي للتالية</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
