import axios, { type AxiosInstance } from "axios";
import { showErrorToast } from "./toast.utils";

// Access the environment variable
const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
export class AppAxios {
    public static instance: AxiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    private static requestInterceptorId: number | null = null;
    private static responseInterceptorId: number | null = null;
    public static setup(token: string | null) {
        // Clear existing request and response interceptors if they exist to avoid duplicate interceptors and memory leaks
        // And to use the latest token from the user without any issues

        if (this.requestInterceptorId !== null) {
            AppAxios.instance.interceptors.request.eject(this.requestInterceptorId);
        }
        if (this.responseInterceptorId !== null) {
            AppAxios.instance.interceptors.response.eject(this.responseInterceptorId);
        }

        // Add a request interceptor
        this.requestInterceptorId = AppAxios.instance.interceptors.request.use(
            (config) => {
                if (!token) {
                    console.log("No token found, rejecting the request.");
                    // If there's no token, reject the request
                    return Promise.reject(new Error("No token found"));
                }

                if (token && config.headers) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                }

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        //Response interceptor
        this.responseInterceptorId = AppAxios.instance.interceptors.response.use(
            function (response) {
                // Any status code that lie within the range of 2xx cause this function to trigger
                // Do something with response data
                return response;
            },
            function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx

                    console.log('error from interceptor',error)

                    // if 400 Error
                    if (error.response.status === 400) {
                        showErrorToast(
                            error.response.data.errors[0]?.errorMessage ||
                            "Validation failed. Please check your input and try again!"
                        );
                        return;
                    }

                    // if 401 Error
                    if (error.response.status === 401) {
                        console.log("Unauthorized error response:", error.response);
                        showErrorToast(
                            error?.response?.data?.detail ||
                            "User is unauthorized, please reload the page!"
                        );
                        return;
                    }

                    // if 403 Error - Forbidden
                    if (error.response.status === 403) {
                        showErrorToast(
                            "You do not have permission to access this resource. Please contact support if you believe this is an error!"
                        );
                        return;
                    }

                    // if 404 Error
                    if (error.response.status === 404) {
                        showErrorToast(
                            error.response.data.title ||
                            "The requested resource was not found!"
                        );
                        return;
                    }

                    // if 500 Error
                    if (error.response.status === 500) {
                        console.log("Server error response:", error.response);
                        showErrorToast(
                            "An unexpected error occurred!"
                        );
                        return;
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    // Network error, server down, CORS issues, etc.
                    showErrorToast("Network error. Please check your connection and try again.");
                    console.error('Request error:', error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    showErrorToast("An error occurred while processing your request.");
                    console.error("Request setup error:", error.message);
                }

                return Promise.reject(error);
            }
        );
    }
}
