import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

export function setCookie(key, value) {
  document.cookie = `${key}=${value};`;
}
export function getCookie(key) {
  const cookieArray = document.cookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.startsWith(key + "=")) {
      return cookie.substring(key.length + 1);
    }
  }
  return null;
}
export function deleteCookie(key) {
  return new Promise((res, rej) => {
    document.cookie = `${key}=;`;
    res();
  });
}
export function joinDate({ date }) {
  const joinDate = {
    inYear: differenceInYears(Date.now(), date),
    inMonth: differenceInMonths(Date.now(), date),
    inDay: differenceInDays(Date.now(), date),
  };
  {
    return joinDate.inYear
      ? `${joinDate.inYear} سنه`
      : joinDate.inMonth
        ? `${joinDate.inMonth} شهر`
        : `${joinDate.inDay} يوم`;
  }
}
