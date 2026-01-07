import { showErrorToast, showSuccessToast } from "@/lib/toast.utils";
import { clearLocalStorage, setTokenToLocalStorage } from "@/utils.ts/localstorage-utils";

const validEmail = import.meta.env.VITE_VALID_EMAIL;
const validPassword = import.meta.env.VITE_VALID_PASSWORD;
const validToken = JSON.parse(import.meta.env.VITE_ACTIVE_TOKEN);

export const delayFunction = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const loginFunction = async (email: string, password: string) => {
    console.log("Attempting login with:", { validToken });

    await delayFunction(2000); // Simulate network delay
    if (email === validEmail && password === validPassword) {
        showSuccessToast("Login successful");
        setTokenToLocalStorage(validToken.access);
        return validToken;
    } else {
        showErrorToast(`
            Invalid email or password.
            Please use:
            Email: ${validEmail}
            Password: ${validPassword}
        `);
        throw new Error("Invalid email or password");

    }
}

export const logoutFunction = async () => {
    await delayFunction(500);
    clearLocalStorage();
    showSuccessToast("Logout successful");
    return;
}