export function getCookie(cname) {
  var decodedCookie = decodeURIComponent(document.cookie);
  let cookie = undefined;
  decodedCookie
    .split(";")
    .map((ck) => ck.trim())
    .forEach((ck) => {
      let [ckKey, ckValue] = ck.split("=");
      if (ckKey === cname) cookie = ckValue;
    });

  return cookie;
}
export function setCookie(cname, cvalue, exdays = 30) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var cookieOptions = {
    [cname]: cvalue,
    expires: d.toUTCString(),
    path: "/",
  };
  var cookie = Object.keys(cookieOptions)
    .map((key) => `${key}=${cookieOptions[key]}`)
    .join(";");
  document.cookie = cookie;
}
export function clearCookie(cname) {
  setCookie(cname, "", -1);
}
