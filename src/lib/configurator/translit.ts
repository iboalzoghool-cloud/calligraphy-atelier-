/*
  Latein → Arabisch für Namen & kurze Botschaften.

  Zweistufiges System:
  1) Kuratiertes Mapping häufiger Namen → EXAKTE, traditionelle Schreibweise.
  2) Algorithmische phonetische Transliteration als Fallback → jeder unbekannte
     Name wird trotzdem arabisch geschrieben (nie steriles Latein), inkl.
     „Arabizi"-Ziffern (3=ع, 7=ح …). Näherung – der Nutzer kann jederzeit direkt
     Arabisch tippen (dann exakt).
*/

const NAME_MAP: Record<string, string> = {
  // ── weiblich ──
  miriam: "مريم", maryam: "مريم", mariam: "مريم", meryem: "مريم", maria: "ماريا",
  fatima: "فاطمة", fatma: "فاطمة", fatema: "فاطمة",
  aisha: "عائشة", aischa: "عائشة", aysha: "عائشة", ayse: "عائشة", ayshe: "عائشة",
  khadija: "خديجة", khadidscha: "خديجة", hatice: "خديجة",
  zainab: "زينب", zaynab: "زينب", zeynep: "زينب",
  amina: "آمنة", amna: "آمنة", emine: "آمنة",
  hafsa: "حفصة", ruqaya: "رقية", ruqayya: "رقية", sumaya: "سمية", sumayya: "سمية",
  safa: "صفا", safaa: "صفاء", safiya: "صفية", safiye: "صفية",
  salma: "سلمى", salwa: "سلوى", sara: "سارة", sarah: "سارة",
  nour: "نور", nur: "نور", noor: "نور", huda: "هدى", hana: "هناء", hanaa: "هناء",
  hanan: "حنان", rana: "رنا", rania: "رانيا", lina: "لينا", dina: "دينا",
  dunya: "دنيا", yasmin: "ياسمين", yasmine: "ياسمين", jasmin: "ياسمين",
  jana: "جنى", jannah: "جنة", malak: "ملاك", iman: "إيمان", israa: "إسراء",
  duaa: "دعاء", alaa: "ألاء", shaima: "شيماء", rahaf: "رهف", lujain: "لجين",
  judy: "جودي", judi: "جودي", layan: "ليان", layla: "ليلى", leila: "ليلى",
  laila: "ليلى", leyla: "ليلى", sila: "سيلا", elif: "إليف", esra: "إسراء",
  merve: "مروة", sena: "سنا", betul: "بتول", rabia: "رابعة", zehra: "زهراء",
  hira: "حراء", nadia: "نادية", samira: "سميرة", karima: "كريمة", latifa: "لطيفة",
  habiba: "حبيبة", asma: "أسماء", bushra: "بشرى", halima: "حليمة", khawla: "خولة",
  shirin: "شيرين", schirin: "شيرين", warda: "وردة", yara: "يارا", nisrin: "نسرين",
  sukaina: "سكينة", zahra: "زهراء", raghad: "رغد", tala: "تالا", sidra: "سدرة",
  // ── männlich ──
  mohammed: "محمد", muhammad: "محمد", mohamed: "محمد", muhammed: "محمد",
  mohammad: "محمد", mehmet: "محمد", ahmed: "أحمد", ahmad: "أحمد",
  ali: "علي", omar: "عمر", umar: "عمر", oemer: "عمر", osman: "عثمان",
  uthman: "عثمان", yusuf: "يوسف", yousef: "يوسف", youssef: "يوسف", yusif: "يوسف",
  ibrahim: "إبراهيم", ismail: "إسماعيل", ismael: "إسماعيل", ishaq: "إسحاق",
  yaqub: "يعقوب", musa: "موسى", isa: "عيسى", harun: "هارون", idris: "إدريس",
  nuh: "نوح", adam: "آدم", adem: "آدم", yahya: "يحيى", zakariya: "زكريا",
  sulaiman: "سليمان", suleyman: "سليمان", dawud: "داود", davut: "داود",
  bilal: "بلال", hamza: "حمزة", khalid: "خالد", halit: "خالد", walid: "وليد",
  tariq: "طارق", tarek: "طارق", faris: "فارس", fares: "فارس", sami: "سامي",
  rami: "رامي", karim: "كريم", kerim: "كريم", amir: "أمير", emir: "أمير",
  nabil: "نبيل", jamal: "جمال", kamal: "كمال", kemal: "كمال", jamil: "جميل",
  salah: "صلاح", salim: "سليم", selim: "سليم", sadiq: "صادق", sufyan: "سفيان",
  anas: "أنس", ayman: "أيمن", ammar: "عمار", hasan: "حسن", hassan: "حسن",
  hussein: "حسين", huseyin: "حسين", husain: "حسين", zaid: "زيد", zayd: "زيد",
  zayn: "زين", rayan: "ريان", ryan: "ريان", taha: "طه", yunus: "يونس",
  younes: "يونس", ilyas: "إلياس", mustafa: "مصطفى", murad: "مراد", murat: "مراد",
  abdullah: "عبد الله", habib: "حبيب", wael: "وائل", ziad: "زياد", ziyad: "زياد",
  majid: "ماجد", nasser: "ناصر", nasir: "ناصر", rashid: "راشد", basil: "باسل",
  malik: "مالك", malek: "مالك", khalil: "خليل", jibril: "جبريل", saif: "سيف",
  // ── kurze Botschaften ──
  mama: "ماما", papa: "بابا", habibi: "حبيبي", habibti: "حبيبتي",
};

const ARABIC_RE = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;

export function isArabicText(s: string): boolean {
  return ARABIC_RE.test(s);
}

/* ── Algorithmische phonetische Transliteration (Fallback) ──────── */

// Mehrbuchstaben-Sequenzen zuerst (längste zuerst geprüft).
const CLUSTERS: Record<string, string> = {
  sch: "ش", tsch: "تش",
  sh: "ش", ch: "تش", kh: "خ", gh: "غ", th: "ث", dh: "ذ", ph: "ف", ck: "ك",
  aa: "ا", ee: "ي", ie: "ي", oo: "و", ou: "و", au: "او", ai: "اي", ay: "اي",
  ei: "اي", ey: "اي", uu: "و",
};

const SINGLE: Record<string, string> = {
  b: "ب", c: "ك", d: "د", f: "ف", g: "غ", h: "ه", j: "ج", k: "ك", l: "ل",
  m: "م", n: "ن", p: "ب", q: "ق", r: "ر", s: "س", t: "ت", v: "ف", w: "و",
  x: "كس", y: "ي", z: "ز",
  // Arabizi-Ziffern
  "2": "أ", "3": "ع", "5": "خ", "6": "ط", "7": "ح", "8": "غ", "9": "ق",
};

const VOWELS = new Set(["a", "e", "i", "o", "u"]);

/** Phonetische Näherung Latein → arabische Schrift. */
export function latinToArabic(input: string): string {
  const s = input.toLowerCase().replace(/[^a-z0-9]+/g, "");
  if (!s) return "";
  let out = "";
  let i = 0;
  while (i < s.length) {
    // längste Cluster zuerst (4 → 2 Zeichen)
    let matched = false;
    for (const len of [4, 3, 2]) {
      const seg = s.slice(i, i + len);
      if (seg.length === len && CLUSTERS[seg]) {
        out += CLUSTERS[seg];
        i += len;
        matched = true;
        break;
      }
    }
    if (matched) continue;

    const c = s[i];
    if (VOWELS.has(c)) {
      const first = i === 0;
      const last = i === s.length - 1;
      if (first) {
        out += c === "i" ? "إي" : c === "o" || c === "u" ? "أو" : "ا";
      } else if (last) {
        out += c === "a" ? "ا" : c === "i" ? "ي" : c === "o" || c === "u" ? "و" : "ه";
      } else {
        // interne Kurzvokale a/e entfallen, i→ي, o/u→و (lesbar halten)
        out += c === "i" ? "ي" : c === "o" || c === "u" ? "و" : "";
      }
      i += 1;
      continue;
    }
    out += SINGLE[c] ?? "";
    i += 1;
  }
  return out;
}

/* ── Öffentliche API ───────────────────────────────────────────── */

export type TranslitSource = "typed-arabic" | "mapped" | "translit" | "none";

export interface TranslitResult {
  /** Arabische Form – bei jeder nicht-leeren Eingabe gesetzt. */
  arabic: string | null;
  source: TranslitSource;
}

/** Ermittelt die arabische Kalligrafie-Form einer Namens-/Wort-Eingabe. */
export function toArabicName(input: string): TranslitResult {
  const t = input.trim();
  if (!t) return { arabic: null, source: "none" };
  if (isArabicText(t)) return { arabic: t, source: "typed-arabic" };
  const mapped = NAME_MAP[t.toLowerCase()];
  if (mapped) return { arabic: mapped, source: "mapped" };
  const algo = latinToArabic(t);
  return algo
    ? { arabic: algo, source: "translit" }
    : { arabic: null, source: "none" };
}
