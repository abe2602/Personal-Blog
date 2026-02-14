import { Profile } from "../../domain/model/Profile";
import { staticProfile } from "./staticProfile";

/**
 * Returns profile from static data (no backend call).
 * Data is kept in sync with personal-blog-backend ProfileRouting.kt.
 */
export const getProfile = async (): Promise<Profile> => {
  return staticProfile;
};
