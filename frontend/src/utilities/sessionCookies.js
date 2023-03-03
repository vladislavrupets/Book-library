import Cookies from "js-cookie";

export const saveSession = (sessionId) => {
  Cookies.set("session", sessionId, { expires: 1 });
};

export const loadSession = () => {
  const sessionId = Cookies.get("session");
  if (sessionId) {
    return { isAuthenticated: true, sessionId };
  } else {
    return { isAuthenticated: false };
  }
};

export const clearSession = () => {
  Cookies.remove("session");
};
