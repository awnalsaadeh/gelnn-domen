"use client";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { DEFAULT_CATEGORIES, DOMAN_RULES } from "@/lib/doman";

type Language = "ar" | "en" | "es";
type CardSize = "large" | "medium" | "small";

// ✅ CORRECTED: All sizes must produce readable large text per Doman
const SIZE_CONFIG: Record<CardSize, { label: string; desc: string; width: string; height: string; fontSize: string }> = {
  large:  { label: "كبير", desc: "للرضّع — الأفضل",   width: "22cm", height: "7cm",  fontSize: "4.5cm" },
  medium: { label: "متوسط", desc: "للأطفال ١-٣ سنوات", width: "15cm", height: "6cm",  fontSize: "3cm" },
  small:  { label: "صغير", desc: "للأطفال ٣-٦ سنوات", width: "10cm", height: "5cm",  fontSize: "2cm" },
};

export default function PrintPage() {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [cardSize, setCardSize] = useState<CardSize>("large");
  const [language, setLanguage] = useState<Language>("ar");
  const [showSecondLang, setShowSecondLang] = useState(false);

  const categoriesToPrint =
    selectedCat === "all"
      ? DEFAULT_CATEGORIES
      : DEFAULT_CATEGORIES.filter((_, i) => `cat-${i}` === selectedCat);

  const getWordText = (word: (typeof DEFAULT_CATEGORIES[0]["words"][0])) => {
    if (language === "ar") return word.text_ar;
    if (language === "en") return word.text_en;
    return word.text_es;
  };

  const getSecondText = (word: (typeof DEFAULT_CATEGORIES[0]["words"][0])) => {
    if (language === "ar") return word.text_en;
    return word.text_ar;
  };

  const totalCards = categoriesToPrint.reduce((a, c) => a + c.words.length, 0);
  const size = SIZE_CONFIG[cardSize];

  return (
    <>
      {/* ===== SCREEN UI ===== */}
      <div className="no-print min-h-screen pb-24 md:pr-64" dir="rtl">
        <BottomNav />

        <header className="px-5 pt-6 pb-4 md:px-8">
          <h1 className="text-3xl font-black text-brand-900">طباعة البطاقات 🖨️</h1>
          <p className="text-brand-600 font-medium mt-1">اضبطي الإعدادات ثم اضغطي طباعة</p>
        </header>

        <div className="px-5 md:px-8 space-y-5">

          {/* Doman card rules reminder */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
            <h3 className="font-black text-red-900 mb-2">📖 مواصفات دومان الدقيقة</h3>
            <div className="text-sm text-red-800 font-medium space-y-1">
              <p>• خط <strong>أحمر عريض</strong> على خلفية بيضاء</p>
              <p>• حروف صغيرة دائماً (إلا أسماء العائلة)</p>
              <p>• أكبر حجم ممكن للخط — الأكبر الأفضل للرضّع</p>
              <p>• بطاقة واحدة لكل كلمة — بدون صور على بطاقة الكلمة</p>
            </div>
          </div>

          {/* Category */}
          <div className="card p-4">
            <h3 className="font-black text-brand-900 mb-3">الفئة (ترتيب دومان)</h3>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setSelectedCat("all")}
                className={`p-3 rounded-2xl font-bold text-right border-2 transition-all ${selectedCat === "all" ? "border-brand-500 bg-brand-50 text-brand-700" : "border-brand-100 bg-white text-brand-600"}`}>
                <span className="text-xl">📚</span>
                <span className="block text-sm">كل الفئات</span>
              </button>
              {DEFAULT_CATEGORIES.map((cat, i) => (
                <button key={i} onClick={() => setSelectedCat(`cat-${i}`)}
                  className={`p-3 rounded-2xl font-bold text-right border-2 transition-all ${selectedCat === `cat-${i}` ? "border-brand-500 bg-brand-50 text-brand-700" : "border-brand-100 bg-white text-brand-600"}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{cat.emoji}</span>
                    <div>
                      <span className="block text-sm">{cat.name_ar}</span>
                      <span className="block text-xs text-brand-400">#{cat.domanOrder} حسب دومان</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Card size */}
          <div className="card p-4">
            <h3 className="font-black text-brand-900 mb-3">حجم البطاقة</h3>
            <div className="space-y-2">
              {(Object.entries(SIZE_CONFIG) as [CardSize, typeof SIZE_CONFIG[CardSize]][]).map(([key, val]) => (
                <button key={key} onClick={() => setCardSize(key)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border-2 transition-all ${cardSize === key ? "border-red-400 bg-red-50" : "border-brand-100 bg-white"}`}>
                  <span className="font-bold text-brand-900">{val.label}</span>
                  <span className="text-sm text-brand-500 font-medium">{val.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="card p-4">
            <h3 className="font-black text-brand-900 mb-3">اللغة الرئيسية</h3>
            <div className="flex gap-2">
              {(["ar", "en", "es"] as Language[]).map((lang) => {
                const labels = { ar: "🇸🇦 عربي", en: "🇺🇸 English", es: "🇪🇸 Español" };
                return (
                  <button key={lang} onClick={() => setLanguage(lang)}
                    className={`flex-1 py-3 rounded-2xl font-bold text-sm border-2 transition-all ${language === lang ? "border-red-400 bg-red-50 text-red-700" : "border-brand-100 bg-white text-brand-600"}`}>
                    {labels[lang]}
                  </button>
                );
              })}
            </div>
            <label className="flex items-center gap-3 mt-3 cursor-pointer">
              <input type="checkbox" checked={showSecondLang} onChange={(e) => setShowSecondLang(e.target.checked)} className="w-5 h-5 accent-brand-500" />
              <span className="font-bold text-brand-700">إظهار ترجمة صغيرة أسفل البطاقة</span>
            </label>
          </div>

          {/* Count & print button */}
          <div className="bg-brand-50 border-2 border-brand-200 rounded-2xl p-4 text-center">
            <p className="font-bold text-brand-700">
              سيتم طباعة <span className="font-black text-brand-900 text-2xl">{totalCards}</span> بطاقة
            </p>
          </div>

          <button onClick={() => window.print()}
            className="w-full text-white font-black text-xl py-5 rounded-3xl transition-all active:scale-95 shadow-xl flex items-center justify-center gap-3"
            style={{ backgroundColor: DOMAN_RULES.CARD_TEXT_COLOR }}>
            <span>🖨️</span>
            <span>طباعة الآن</span>
          </button>

          <div className="card p-4 bg-amber-50 border border-amber-200">
            <h3 className="font-black text-amber-900 mb-2">💡 نصائح الطباعة</h3>
            <ul className="space-y-1.5 text-sm text-amber-800 font-medium">
              <li>• ورق أبيض سميك (200-250 جرام) أفضل</li>
              <li>• مقياس الطباعة = 100% (لا تختصر)</li>
              <li>• الحجم الكبير هو الأفضل — خصوصاً للرضّع</li>
              <li>• يمكنك تصوير البطاقات وعرضها على الأيباد أيضاً</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===== PRINT-ONLY CONTENT ===== */}
      {/* ✅ CORRECTED: RED text (#CC0000) on WHITE background per Doman */}
      <div className="hidden print:block" dir="rtl">
        <style>{`
          @page { margin: 0.8cm; size: A4; }
          body { background: white !important; }
          .print-page-grid { display: flex; flex-wrap: wrap; gap: 0.4cm; margin-bottom: 0.5cm; }
          .print-card {
            width: ${size.width};
            height: ${size.height};
            border: 2px solid #CC0000;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            page-break-inside: avoid;
            padding: 0.3cm 0.5cm;
            box-sizing: border-box;
            background: white;
          }
          .print-word {
            font-size: ${size.fontSize};
            font-weight: 900;
            color: #CC0000;
            font-family: 'Cairo', sans-serif;
            text-align: center;
            line-height: 1.1;
            direction: rtl;
          }
          .print-word-small {
            font-size: calc(${size.fontSize} * 0.28);
            color: #999999;
            font-family: 'Cairo', sans-serif;
            text-align: center;
            margin-top: 0.15cm;
          }
          .cat-header {
            font-family: 'Cairo', sans-serif;
            font-size: 0.6cm;
            font-weight: 900;
            color: #2D1800;
            padding: 0.3cm 0 0.2cm;
            margin-top: 0.3cm;
            border-bottom: 2px solid #CC0000;
            width: 100%;
            page-break-inside: avoid;
          }
        `}</style>

        {categoriesToPrint.map((cat, ci) => (
          <div key={ci}>
            <div className="cat-header">
              {cat.emoji} {cat.name_ar} — {cat.name_en}
              <span style={{ fontSize: "0.4cm", color: "#999", marginRight: "0.3cm" }}>
                (المرتبة #{cat.domanOrder} حسب دومان)
              </span>
            </div>
            <div className="print-page-grid">
              {cat.words.map((word, wi) => (
                <div key={wi} className="print-card">
                  <div className="print-word">{getWordText(word)}</div>
                  {showSecondLang && (
                    <div className="print-word-small">{getSecondText(word)}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
