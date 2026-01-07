import { AppAxios } from "@/lib/axios.config";
import { transformUserApiResponse } from "@/utils.ts/user-utils";
import type { User, UserApiResponse, UserProfileInfo } from "@/types";

/**
 * Fetch users from the Random User API
 * 
 * @param results - Number of users to fetch (default: 50)
 * @returns Array of simplified User objects
 */
export const fetchUsers = async (results: number = 50): Promise<User[]> => {
    try {
        const response = await AppAxios.instance.get<{ results: UserApiResponse[] }>(
            '/',
            {
                params: {
                    results: results
                }
            }
        );

        if (response.data && response.data.results) {
            // Transform API response to simplified User type
            return response.data.results.map(transformUserApiResponse);
        }

        return [];
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

