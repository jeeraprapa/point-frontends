// utils/dateHelper.ts
import dayjs from "dayjs";
import "dayjs/locale/th"; // ใช้ภาษาไทย
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";

// เปิดใช้งาน Plugins
dayjs.extend(utc);
dayjs.locale("th");
dayjs.extend(relativeTime);
dayjs.locale("th");

/**
 * 📅 แปลงวันที่เป็นรูปแบบที่กำหนด
 * @param {string | Date} date วันที่ที่ต้องการแปลง
 * @param {string} format รูปแบบวันที่ (ค่าเริ่มต้น: "DD MMMM YYYY HH:mm:ss")
 * @returns {string} วันที่ที่ถูก format แล้ว
 */
export const formatDate = (date: string | Date, format = "DD MMMM YYYY HH:mm:ss") => {
  return dayjs(date).format(format);
};

/**
 * 📆 แปลงวันที่เป็นรูปแบบสั้น (เช่น DD MMMM YYYY)
 */
export const formatShortDate = (date: string | Date) => {
  return formatDate(date, "DD MMMM YYYY");
};

/**
 * ⏳ แปลงวันที่เป็นข้อความเวลา เช่น "2 วันที่แล้ว"
 */
export const timeFromNow = (date: string | Date) => {
  return dayjs(date).fromNow();
};


/**
 * 🕒 เช็คว่า day1 < day2 หรือไม่
 * @param {string | Date} day1 วันที่แรก
 * @param {string | Date} day2 วันที่สอง
 * @returns {boolean} true ถ้า day1 น้อยกว่า day2
 */
export const isBeforeDate = (day1: string | Date, day2: string | Date): boolean => {
  return dayjs(day1).isBefore(dayjs(day2));
};
