

import { z } from "zod";
// Zod schema for user profile form validation
export const userProfileSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .min(2, "Name must be at least 2 characters"),
    phone: z
        .string()
        .min(1, "Phone number is required")
        .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
    jobTitle: z
        .string()
        .min(1, "Job title is required")
        .min(2, "Job title must be at least 2 characters"),
    yearsOfExperience: z
        .number({
            error: "Years of experience must be a number",
        })
        .int("Years of experience must be a whole number")
        .min(0, "Years of experience cannot be negative")
        .max(70, "Years of experience must be less than 70"),
    address: z
        .string()
        .min(1, "Address is required")
        .min(5, "Address must be at least 5 characters"),
    workingHours: z
        .number({ error: "Working hours must be a number" })
        .int("Working hours must be a whole number")
        .min(1, "Working hours must be at least 1")
        .max(168, "Working hours cannot exceed 168 per week")
});

// Zod schema for login form validation
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .pipe(z.email("Please enter a valid email address")),
    password: z.string().min(1, "Password is required"),
});

// Zod schema for user data form validation from type User
export const editUserDataSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z
        .string()
        .min(1, "Email is required")
        .pipe(z.email("Please enter a valid email address")),
    country: z.string().min(5, "Country is required"),
    city: z.string().min(4, "City is required"),
});