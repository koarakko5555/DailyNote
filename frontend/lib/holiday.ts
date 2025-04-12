// lib/holiday.ts
import jpholiday from "japanese-holidays";

/**
 * 与えられた日付が祝日かどうかを判定
 * @param date Dateオブジェクト
 * @returns trueなら祝日、falseなら平日
 */
export function isJapaneseHoliday(date: Date): boolean {
  return jpholiday.isHoliday(date) !== undefined;
}