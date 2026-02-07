import { apiClient } from "../RestApi";
import { RemoteProfile } from "./model/RemoteProfile";
import { Profile } from "../../domain/model/Profile";

export const getProfile = async (): Promise<Profile> => {
  const response = await apiClient.get<RemoteProfile>("profile");
  const remoteProfile = response.data;

  return new Profile(
      remoteProfile.title,
      remoteProfile.description,
      remoteProfile.imageUrl
    );
};
