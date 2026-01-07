const TOKEN_KEY = "TOKEN_KEY";

export const getTokenFromLocalStorage = (): string | null => {
    return localStorage.getItem(TOKEN_KEY) || null;
}

export const setTokenToLocalStorage = (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const clearLocalStorage = (): void => {
    console.log("Clearing local storage");
    localStorage.removeItem(TOKEN_KEY);
}
