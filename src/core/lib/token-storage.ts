export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
};

export type TokenPersistMode = "local" | "session";

const KEYS = {
  ACCESS: "sharepay.access_token",
  REFRESH: "sharepay.refresh_token",
  TYPE: "sharepay.token_type",
  PERSIST: "sharepay.persist_mode",
} as const;

const isBrowser = () => typeof window !== "undefined";

export const tokenStorage = {
  // Récupère le mode de persistance choisi par l'utilisateur
  getPersistMode(): TokenPersistMode {
    if (!isBrowser()) return "session";
    return (localStorage.getItem(KEYS.PERSIST) as TokenPersistMode) ?? "session";
  },

  // Récupère les tokens depuis le storage approprié (session ou local)
  get(): AuthTokens | null {
    if (!isBrowser()) return null;

    // On cherche d'abord en local, puis en session
    const storage = this.getPersistMode() === "local" ? localStorage : sessionStorage;

    const accessToken = storage.getItem(KEYS.ACCESS);
    const refreshToken = storage.getItem(KEYS.REFRESH);
    const tokenType = storage.getItem(KEYS.TYPE) ?? "Bearer";

    if (!accessToken || !refreshToken) return null;

    return { accessToken, refreshToken, tokenType };
  },

  // Enregistre les tokens et gère la stratégie de persistance
  set(tokens: AuthTokens, options?: { persist?: boolean }) {
    if (!isBrowser()) return;

    const persist = options?.persist ?? (this.getPersistMode() === "local");
    const target = persist ? localStorage : sessionStorage;
    const other = persist ? sessionStorage : localStorage;

    // Nettoyage de l'autre storage pour éviter les doublons/conflits
    this._clearStorage(other);

    target.setItem(KEYS.PERSIST, persist ? "local" : "session");
    target.setItem(KEYS.ACCESS, tokens.accessToken);
    target.setItem(KEYS.REFRESH, tokens.refreshToken);
    target.setItem(KEYS.TYPE, tokens.tokenType);

    // Cookie management for Middleware
    // We set a flag cookie. detailed validation happens on client or via API
    const cookieName = "sharepay_session";
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    const sameSite = "; SameSite=Strict";

    let expires = "";
    if (persist) {
      // 30 days
      const date = new Date();
      date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }

    document.cookie = `${cookieName}=true${expires}; path=/${secure}${sameSite}`;
  },

  // Supprime tous les tokens des deux storages (Logout)
  clear() {
    if (!isBrowser()) return;
    this._clearStorage(localStorage);
    this._clearStorage(sessionStorage);

    // Clear cookie
    document.cookie = "sharepay_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  },

  // Utile pour les headers Authorization des requêtes API
  getAuthorizationHeader(): string | null {
    const tokens = this.get();
    if (!tokens) return null;
    return `${tokens.tokenType} ${tokens.accessToken}`;
  },

  // Méthode interne pour nettoyer un storage spécifique
  _clearStorage(storage: Storage) {
    storage.removeItem(KEYS.ACCESS);
    storage.removeItem(KEYS.REFRESH);
    storage.removeItem(KEYS.TYPE);
    storage.removeItem(KEYS.PERSIST);
  }
};