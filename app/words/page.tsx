"use client";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { DEFAULT_CATEGORIES, DOMAN_RULES } from "@/lib/doman";

// ✅ Fixed: color is now hardcoded as Doman RED since all cards must be red
const DOMAN_RED = DOMAN_RULES.CARD_TEXT_COLOR;

type WordStatus = "active" | "retired" | "pending";

type Word = {
  id: string;
  text_ar: string;
  text_en: string;
  text_es: string;
  status: WordStatus;
  timesShown: number;
};

type Category = {
  id: string;
  name_ar: string;
  name_en: string;
  emoji: string;
  domanOrder: number;
  words: Word[];
};

// Build demo data from defaults
const DEMO_CATEGORIES: Category[] = DEFAULT_CATEGORIES.map((cat, ci) => ({
  id: `cat-${ci}`,
  name_ar: cat.name_ar,
  name_en: cat.name_en,
  emoji: cat.emoji,
  domanOrder: cat.domanOrder,
  words: cat.words.map((w, wi) => ({
    id: `w-${ci}-${wi}`,
    text_ar: w.text_ar,
    text_en: w.text_en,
    text_es: w.text_es,
    status: (wi < 4 ? "active" : wi < 5 ? "pending" : "retired") as WordStatus,
    timesShown: wi < 4 ? Math.floor(Math.random() * 12) + 1 : 0,
  })),
}));

export default function WordsPage() {
  const [categories, setCategories] = useState<Category[]>(DEMO_CATEGORIES);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [showAddWord, setShowAddWord] = useState(false);
  const [showAddCat, setShowAddCat] = useState(false);
  const [filter, setFilter] = useState<"all" | WordStatus>("all");
  const [newWord, setNewWord] = useState({ text_ar: "", text_en: "", text_es: "" });
  const [newCat, setNewCat] = useState({ name_ar: "", name_en: "", emoji: "📚" });

  const activeCat = categories.find((c) => c.id === selectedCat);

  const allWords = categories.flatMap((c) =>
    c.words.map((w) => ({
      ...w,
      categoryName: c.name_ar,
      categoryEmoji: c.emoji,
      catId: c.id,
    }))
  );

  const filteredWords =
    filter === "all" ? allWords : allWords.filter((w) => w.status === filter);

  const addWord = () => {
    if (!newWord.text_ar || !selectedCat) return;
    setCategories((prev) =>
      prev.map((c) =>
        c.id === selectedCat
          ? {
              ...c,
              words: [
                ...c.words,
                {
                  id: `w-new-${Date.now()}`,
                  text_ar: newWord.text_ar,
                  text_en: newWord.text_en,
                  text_es: newWord.text_es,
                  status: "pending" as WordStatus,
                  timesShown: 0,
                },
              ],
            }
          : c
      )
    );
    setNewWord({ text_ar: "", text_en: "", text_es: "" });
    setShowAddWord(false);
  };

  const addCategory = () => {
    if (!newCat.name_ar) return;
    setCategories((prev) => [
      ...prev,
      {
        id: `cat-new-${Date.now()}`,
        name_ar: newCat.name_ar,
        name_en: newCat.name_en,
        emoji: newCat.emoji,
        domanOrder: prev.length + 1,
        words: [],
      },
    ]);
    setNewCat({ name_ar: "", name_en: "", emoji: "📚" });
    setShowAddCat(false);
  };

  const statusLabel = (status: WordStatus) => {
    if (status === "active") return <span className="badge-active">نشطة</span>;
    if (status === "retired") return <span className="badge-retired">تقاعدت</span>;
    return <span className="badge-pending">في الانتظار</span>;
  };

  return (
    <div className="min-h-screen pb-32 md:pr-64" dir="rtl">
      <BottomNav />

      <header className="px-5 pt-6 pb-4 md:px-8">
        <h1 className="text-3xl font-black text-brand-900">مكتبة الكلمات 📚</h1>
        <p className="text-brand-600 font-medium mt-1">
          {allWords.length} كلمة · {allWords.filter((w) => w.status === "active").length} نشطة
        </p>
      </header>

      {/* Filter tabs */}
      <div className="px-5 md:px-8 flex gap-2 mb-5 overflow-x-auto pb-1">
        {(["all", "active", "pending", "retired"] as const).map((f) => {
          const labels = { all: "الكل", active: "نشطة", pending: "في الانتظار", retired: "متقاعدة" };
          const count = f === "all" ? allWords.length : allWords.filter((w) => w.status === f).length;
          return (
            <button key={f} onClick={() => setFilter(f)}
              className={`flex-shrink-0 px-4 py-2 rounded-2xl font-bold text-sm transition-all ${
                filter === f ? "bg-brand-500 text-white shadow" : "bg-white text-brand-600 border border-brand-100"
              }`}>
              {labels[f]} ({count})
            </button>
          );
        })}
      </div>

      {/* Categories grid */}
      {!selectedCat && filter === "all" && (
        <div className="px-5 md:px-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-black text-brand-900">الفئات — ترتيب دومان</h2>
            <button onClick={() => setShowAddCat(true)}
              className="bg-brand-500 text-white font-bold text-sm px-4 py-2 rounded-2xl active:scale-95">
              + فئة جديدة
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {categories.map((cat) => {
              const active = cat.words.filter((w) => w.status === "active").length;
              return (
                <button key={cat.id} onClick={() => setSelectedCat(cat.id)}
                  className="card card-hover p-4 text-right">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-3 bg-red-50">
                    {cat.emoji}
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-black text-brand-900">{cat.name_ar}</h3>
                    <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">#{cat.domanOrder}</span>
                  </div>
                  <p className="text-sm text-brand-600 font-medium">{cat.words.length} كلمة</p>
                  <div className="mt-2 bg-brand-100 rounded-full h-2">
                    <div className="h-2 rounded-full" style={{
                      width: cat.words.length > 0 ? `${(active / cat.words.length) * 100}%` : "0%",
                      backgroundColor: DOMAN_RED,
                    }} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Word list */}
      {(filter !== "all" || selectedCat) && (
        <div className="px-5 md:px-8">
          {selectedCat && (
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setSelectedCat(null)} className="flex items-center gap-2 text-brand-600 font-bold">
                ← رجوع
              </button>
              <button onClick={() => setShowAddWord(true)}
                className="bg-brand-500 text-white font-bold text-sm px-4 py-2 rounded-2xl active:scale-95">
                + كلمة جديدة
              </button>
            </div>
          )}

          {activeCat && (
            <div className="flex items-center gap-3 mb-4 p-3 bg-white rounded-2xl border border-brand-100">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-red-50">
                {activeCat.emoji}
              </div>
              <div>
                <h2 className="font-black text-brand-900">{activeCat.name_ar}</h2>
                <p className="text-sm text-brand-600">{activeCat.words.length} كلمة · المرتبة #{activeCat.domanOrder}</p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {(selectedCat
              ? (activeCat?.words.map((w) => ({ ...w, categoryName: activeCat.name_ar, categoryEmoji: activeCat.emoji, catId: activeCat.id })) ?? [])
              : filteredWords
            ).map((word) => (
              <div key={word.id} className="card p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg flex-shrink-0 bg-red-50"
                      style={{ color: DOMAN_RED }}>
                      {word.text_ar.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-xl" style={{ color: DOMAN_RED }}>{word.text_ar}</span>
                        <span className="text-brand-400 font-medium">{word.text_en}</span>
                      </div>
                      {!selectedCat && "categoryName" in word && (
                        <span className="text-xs text-brand-500 font-medium">{word.categoryName}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {statusLabel(word.status)}
                    {word.status === "active" && (
                      <span className="text-xs text-brand-400 font-medium">{word.timesShown}/15</span>
                    )}
                  </div>
                </div>
                {word.status === "active" && (
                  <div className="mt-3 bg-brand-100 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full transition-all"
                      style={{ width: `${(word.timesShown / 15) * 100}%`, backgroundColor: DOMAN_RED }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Word Modal */}
      {showAddWord && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="font-black text-xl text-brand-900 mb-4">إضافة كلمة جديدة</h3>
            <div className="space-y-4">
              <div>
                <label className="font-bold text-brand-700 text-sm block mb-1">الكلمة بالعربية *</label>
                <input type="text" value={newWord.text_ar} onChange={(e) => setNewWord({ ...newWord, text_ar: e.target.value })}
                  placeholder="مثال: شمس" className="w-full border-2 border-brand-200 rounded-2xl p-3 font-bold text-right text-lg focus:outline-none focus:border-brand-500" autoFocus />
              </div>
              <div>
                <label className="font-bold text-brand-700 text-sm block mb-1">بالإنجليزية</label>
                <input type="text" value={newWord.text_en} onChange={(e) => setNewWord({ ...newWord, text_en: e.target.value })}
                  placeholder="sun" className="w-full border-2 border-brand-200 rounded-2xl p-3 font-bold focus:outline-none focus:border-brand-500 ltr" dir="ltr" />
              </div>
              <div>
                <label className="font-bold text-brand-700 text-sm block mb-1">بالإسبانية</label>
                <input type="text" value={newWord.text_es} onChange={(e) => setNewWord({ ...newWord, text_es: e.target.value })}
                  placeholder="sol" className="w-full border-2 border-brand-200 rounded-2xl p-3 font-bold focus:outline-none focus:border-brand-500 ltr" dir="ltr" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={addWord} className="flex-1 btn-primary">حفظ</button>
              <button onClick={() => setShowAddWord(false)} className="flex-1 btn-secondary">إلغاء</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddCat && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="font-black text-xl text-brand-900 mb-4">فئة جديدة</h3>
            <div className="space-y-4">
              <div>
                <label className="font-bold text-brand-700 text-sm block mb-1">اسم الفئة بالعربية *</label>
                <input type="text" value={newCat.name_ar} onChange={(e) => setNewCat({ ...newCat, name_ar: e.target.value })}
                  placeholder="مثال: أدوات المطبخ" className="w-full border-2 border-brand-200 rounded-2xl p-3 font-bold text-right focus:outline-none focus:border-brand-500" autoFocus />
              </div>
              <div>
                <label className="font-bold text-brand-700 text-sm block mb-1">بالإنجليزية</label>
                <input type="text" value={newCat.name_en} onChange={(e) => setNewCat({ ...newCat, name_en: e.target.value })}
                  placeholder="Kitchen Tools" className="w-full border-2 border-brand-200 rounded-2xl p-3 font-bold focus:outline-none focus:border-brand-500 ltr" dir="ltr" />
              </div>
              <div>
                <label className="font-bold text-brand-700 text-sm block mb-1">رمز</label>
                <input type="text" value={newCat.emoji} onChange={(e) => setNewCat({ ...newCat, emoji: e.target.value })}
                  className="w-full border-2 border-brand-200 rounded-2xl p-3 font-bold text-center text-2xl focus:outline-none focus:border-brand-500" maxLength={2} />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={addCategory} className="flex-1 btn-primary">إنشاء</button>
              <button onClick={() => setShowAddCat(false)} className="flex-1 btn-secondary">إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
