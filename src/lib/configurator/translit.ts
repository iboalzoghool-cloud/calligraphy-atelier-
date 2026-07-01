/*
  Latein → Arabisch für Namen & kurze Botschaften.
  Namen algorithmisch zu transliterieren ist unzuverlässig – daher ein festes,
  kuratiertes Mapping mit Standard-Umschriften (erweiterbar). Der Nutzer kann
  jederzeit auch direkt Arabisch eintippen; unbekannte lateinische Eingaben
  bleiben lateinisch (werden im Atelier von Hand geschrieben).
*/

const NAME_MAP: Record<string, string> = {
  // ── weiblich ──
  miriam: "مريم", maryam: "مريم", mariam: "مريم", meryem: "مريم", maria: "ماريا",
  yasmin: "ياسمين", yasmine: "ياسمين", jasmin: "ياسمين", yasmina: "ياسمينة",
  salwa: "سلوى", salma: "سلمى", sara: "سارة", sarah: "سارة",
  fatima: "فاطمة", fatma: "فاطمة", fatema: "فاطمة",
  aisha: "عائشة", aischa: "عائشة", aysha: "عائشة",
  khadija: "خديجة", khadidscha: "خديجة",
  zainab: "زينب", zaynab: "زينب", zeynep: "زينب",
  amina: "آمنة", amna: "آمنة", hana: "هناء", hanaa: "هناء", hanan: "حنان",
  layla: "ليلى", leila: "ليلى", laila: "ليلى", leyla: "ليلى",
  nour: "نور", nur: "نور", noor: "نور", mona: "منى", muna: "منى",
  huda: "هدى", rahma: "رحمة", malak: "ملاك", jana: "جنى", jannah: "جنة",
  shirin: "شيرين", schirin: "شيرين", nadia: "نادية", samira: "سميرة",
  karima: "كريمة", latifa: "لطيفة", habiba: "حبيبة", iman: "إيمان",
  asma: "أسماء", bushra: "بشرى", ruqaya: "رقية", safiya: "صفية",
  halima: "حليمة", sumaya: "سمية", khawla: "خولة", dunya: "دنيا",
  lina: "لينا", dina: "دينا", rania: "رانيا", sukaina: "سكينة", sukayna: "سكينة",
  warda: "وردة", yara: "يارا", nisrin: "نسرين", nesrin: "نسرين",
  // ── männlich ──
  mohammed: "محمد", muhammad: "محمد", mohamed: "محمد", muhammed: "محمد", mohammad: "محمد",
  ahmed: "أحمد", ahmad: "أحمد", ali: "علي", omar: "عمر", umar: "عمر",
  yusuf: "يوسف", yousef: "يوسف", youssef: "يوسف", yusif: "يوسف",
  ibrahim: "إبراهيم", ismail: "إسماعيل", ismael: "إسماعيل",
  bilal: "بلال", hamza: "حمزة", khalil: "خليل",
  karim: "كريم", kerim: "كريم", amir: "أمير", emir: "أمير",
  zaid: "زيد", zayd: "زيد", adam: "آدم", yahya: "يحيى", idris: "إدريس",
  musa: "موسى", isa: "عيسى", harun: "هارون", tariq: "طارق", tarek: "طارق",
  sami: "سامي", rami: "رامي", nabil: "نبيل", jamal: "جمال", faisal: "فيصل",
  hasan: "حسن", hassan: "حسن", hussein: "حسين", husain: "حسين", husein: "حسين",
  anas: "أنس", ayman: "أيمن", habib: "حبيب", malik: "مالك", malek: "مالك",
  nasser: "ناصر", rashid: "راشد", walid: "وليد", yasin: "ياسين", yassin: "ياسين",
  zakaria: "زكريا", zakariya: "زكريا", suleiman: "سليمان", sufyan: "سفيان",
  // ── kurze Botschaften ──
  mama: "ماما", papa: "بابا", habibi: "حبيبي", habibti: "حبيبتي",
};

const ARABIC_RE = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;

export function isArabicText(s: string): boolean {
  return ARABIC_RE.test(s);
}

export type TranslitSource = "typed-arabic" | "mapped" | "none";

export interface TranslitResult {
  /** Arabische Form, falls direkt eingegeben oder gemappt – sonst null. */
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
  return { arabic: null, source: "none" };
}

/** Wie viele Namen kennt das Mapping (für UI-Hinweise). */
export const KNOWN_NAME_COUNT = new Set(Object.values(NAME_MAP)).size;
