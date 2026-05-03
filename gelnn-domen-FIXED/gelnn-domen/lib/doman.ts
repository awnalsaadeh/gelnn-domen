/**
 * Glenn Doman Methodology Engine
 * Based on "How to Teach Your Baby to Read" by Glenn Doman & Janet Doman
 *
 * VERIFIED RULES FROM THE BOOK:
 * - Cards: LARGE, BOLD, RED text on WHITE background (3 inch letters)
 * - Lowercase always (except proper nouns like names)
 * - 5 sets of 5 words = 25 active words
 * - Each set shown 3x per day, 30 min apart minimum
 * - Each word shown 5 days = 15 total showings, then RETIRED
 * - Add 1 new word per set per day after first week
 * - NEVER test the child
 * - Flash EXACTLY 1 second per card
 *
 * VERIFIED WORD ORDER FROM THE BOOK:
 * 1. Self words (body parts) FIRST
 * 2. Family words SECOND
 * 3. Home environment THIRD
 * 4. Food FOURTH
 * 5. Animals FIFTH
 *
 * 5-STEP READING PROGRESSION:
 * Step 1: Single Words (200+ before moving on)
 * Step 2: Couplets (two words: "red apple")
 * Step 3: Phrases (3 words: "Mommy is eating")
 * Step 4: Sentences (4+ words)
 * Step 5: Books
 */

export const DOMAN_RULES = {
  WORDS_PER_SET: 5,
  SETS_PER_DAY: 5,
  SESSIONS_PER_DAY: 3,
  DAYS_PER_WORD: 5,
  TOTAL_SHOWINGS_PER_WORD: 15,
  SECONDS_PER_CARD: 1,           // EXACTLY 1 second — book specification
  NEW_WORDS_PER_DAY: 1,
  TOTAL_STARTING_WORDS: 25,
  MIN_SESSION_GAP_MINUTES: 30,
  WORDS_BEFORE_COUPLETS: 200,
  CARD_TEXT_COLOR: "#CC0000",    // RED — book specification
  CARD_BG_COLOR: "#FFFFFF",      // WHITE — book specification
};

export const READING_STAGES = [
  { step: 1, name_ar: "كلمات مفردة", name_en: "Single Words", desc_ar: "كلمة واحدة لكل بطاقة — ابدئي بالجسم ثم العائلة", milestone_ar: "٢٠٠ كلمة قبل الانتقال" },
  { step: 2, name_ar: "كلمتان معاً", name_en: "Couplets", desc_ar: "تفاحة حمراء، كلب كبير — كلمتان من كلمات تعلّمتها", milestone_ar: "من كلمات سبق تعلّمها" },
  { step: 3, name_ar: "عبارات", name_en: "Phrases", desc_ar: "أمي تأكل، أبي يقرأ — ٣ كلمات", milestone_ar: "" },
  { step: 4, name_ar: "جمل كاملة", name_en: "Sentences", desc_ar: "٤ كلمات أو أكثر", milestone_ar: "" },
  { step: 5, name_ar: "كتب", name_en: "Books", desc_ar: "كتب بسيطة مصنوعة للطفل", milestone_ar: "الهدف النهائي 🎉" },
];

// CORRECTED ORDER: Self words (body) FIRST per Doman's book
export const DEFAULT_CATEGORIES = [
  {
    name_ar: "أجزاء الجسم",
    name_en: "Body Parts",
    name_es: "Partes del Cuerpo",
    emoji: "🖐️",
    domanOrder: 1,
    note_ar: "ابدئي هنا — كلمات الجسم أولاً حسب دومان",
    words: [
      { text_ar: "يد", text_en: "hand", text_es: "mano" },
      { text_ar: "عين", text_en: "eye", text_es: "ojo" },
      { text_ar: "أنف", text_en: "nose", text_es: "nariz" },
      { text_ar: "فم", text_en: "mouth", text_es: "boca" },
      { text_ar: "قدم", text_en: "foot", text_es: "pie" },
    ],
  },
  {
    name_ar: "أفراد العائلة",
    name_en: "Family Members",
    name_es: "Miembros de la Familia",
    emoji: "👨‍👩‍👧‍👦",
    domanOrder: 2,
    note_ar: "كلمات العائلة ثانياً",
    words: [
      { text_ar: "أمي", text_en: "Mommy", text_es: "Mamá" },
      { text_ar: "أبي", text_en: "Daddy", text_es: "Papá" },
      { text_ar: "أخي", text_en: "brother", text_es: "hermano" },
      { text_ar: "أختي", text_en: "sister", text_es: "hermana" },
      { text_ar: "جدتي", text_en: "Grandma", text_es: "abuela" },
    ],
  },
  {
    name_ar: "البيت",
    name_en: "Home Environment",
    name_es: "El Hogar",
    emoji: "🏠",
    domanOrder: 3,
    note_ar: "أشياء البيت ثالثاً",
    words: [
      { text_ar: "باب", text_en: "door", text_es: "puerta" },
      { text_ar: "كرسي", text_en: "chair", text_es: "silla" },
      { text_ar: "طاولة", text_en: "table", text_es: "mesa" },
      { text_ar: "سرير", text_en: "bed", text_es: "cama" },
      { text_ar: "نافذة", text_en: "window", text_es: "ventana" },
    ],
  },
  {
    name_ar: "الطعام",
    name_en: "Food",
    name_es: "Comida",
    emoji: "🍎",
    domanOrder: 4,
    note_ar: "الطعام رابعاً",
    words: [
      { text_ar: "تفاحة", text_en: "apple", text_es: "manzana" },
      { text_ar: "موزة", text_en: "banana", text_es: "plátano" },
      { text_ar: "حليب", text_en: "milk", text_es: "leche" },
      { text_ar: "خبز", text_en: "bread", text_es: "pan" },
      { text_ar: "ماء", text_en: "water", text_es: "agua" },
    ],
  },
  {
    name_ar: "الحيوانات",
    name_en: "Animals",
    name_es: "Animales",
    emoji: "🐾",
    domanOrder: 5,
    note_ar: "الحيوانات خامساً",
    words: [
      { text_ar: "قطة", text_en: "cat", text_es: "gato" },
      { text_ar: "كلب", text_en: "dog", text_es: "perro" },
      { text_ar: "أسد", text_en: "lion", text_es: "león" },
      { text_ar: "فيل", text_en: "elephant", text_es: "elefante" },
      { text_ar: "طائر", text_en: "bird", text_es: "pájaro" },
    ],
  },
];

export function shouldRetireWord(word: { introduced_at: string | null; times_shown: number }): boolean {
  if (word.times_shown >= DOMAN_RULES.TOTAL_SHOWINGS_PER_WORD) return true;
  if (word.introduced_at) {
    const daysDiff = Math.floor((Date.now() - new Date(word.introduced_at).getTime()) / 86400000);
    if (daysDiff >= DOMAN_RULES.DAYS_PER_WORD) return true;
  }
  return false;
}

export function getDomanTip(lang: "ar" | "en" | "es" = "ar"): string {
  const tips = {
    ar: [
      "🌟 اجعلي الجلسة ممتعة وسعيدة — هذا هو السر الأول عند دومان",
      "⏱️ أظهري كل بطاقة بسرعة — ثانية واحدة فقط لكل كلمة",
      "🚫 لا تختبري طفلتك أبداً — التعلم لعبة هي تفوز فيها دائماً",
      "🔄 قدّمي كلمات جديدة باستمرار — الجدة تمنع الملل",
      "💕 احتضني طفلتك وقبّليها أثناء الجلسة",
      "⏰ أوقفي الجلسة قبل أن تشعر طفلتك بالملل",
      "🔴 الكلمات الكبيرة الحمراء تجذب انتباه الطفل — هذا علم وليس رأياً",
      "📚 ابدئي بكلمات الجسم أولاً ثم العائلة ثم البيت — هذا هو الترتيب الصحيح",
    ],
    en: [
      "🌟 Always make sessions joyful — that is Doman's #1 rule",
      "⏱️ Flash each card quickly — exactly 1 second per word",
      "🚫 Never test your child — learning is a game they always win",
      "🔄 Introduce new material constantly to prevent boredom",
      "💕 Hug and kiss your child during sessions",
      "⏰ Always stop before your child gets bored",
      "🔴 Big red words attract baby's attention — science not opinion",
      "📚 Start body parts first, then family, then home — Doman's exact order",
    ],
    es: [
      "🌟 Haz sesiones alegres — esa es la regla #1 de Doman",
      "⏱️ Muestra cada tarjeta rápido — exactamente 1 segundo por palabra",
      "🚫 Nunca examines a tu hijo — siempre gana",
      "🔄 Introduce palabras nuevas constantemente",
      "💕 Abraza y besa a tu hijo durante las sesiones",
      "⏰ Para antes de que tu hijo se aburra",
    ],
  };
  const langTips = tips[lang];
  return langTips[Math.floor(Math.random() * langTips.length)];
}

export function getWordProgress(timesShown: number): number {
  return Math.min(100, Math.round((timesShown / DOMAN_RULES.TOTAL_SHOWINGS_PER_WORD) * 100));
}
