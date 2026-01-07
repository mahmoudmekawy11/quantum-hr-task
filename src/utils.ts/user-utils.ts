import type { User, UserApiResponse } from "@/types";

/**
 * Transform API response to simplified User type
 * 
 * Extracts and formats only the necessary user properties from the full API response.
 * 
 * @param apiUser - Full user data from API
 * @returns Simplified user object with fullName, email, country, and image
 */
export const transformUserApiResponse = (apiUser: UserApiResponse): User => {
  return {
    id: apiUser.login.uuid, // Use UUID as unique identifier
    fullName: `${apiUser.name.first} ${apiUser.name.last}`,
    email: apiUser.email,
    country: apiUser.location.country,
    city: apiUser.location.city,
    image: apiUser.picture.large,
    state: apiUser.location.state,
    phone: apiUser.phone,
  };
};
