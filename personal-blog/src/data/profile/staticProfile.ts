import { Profile } from "../../domain/model/Profile";

/**
 * Profile data from personal-blog-backend (ProfileRouting.kt).
 * Update this file when the backend profile changes.
 */
/** Profile image: place your image in personal-blog/public/ (e.g. profile.jpg). */
export const staticProfile: Profile = new Profile(
  "Bem-vindo ao Abecaxis!",
  "Não sei o que você estava procurando, mas espero que encontre aqui. \n Prazer, pode me chamar de Abe :)",
  "/0da858f0-06d5-4c1d-94f1-8d8b36bd8766.jpg"
);
