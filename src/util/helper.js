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
  document.cookie = `${key}=;`;
}
