export interface User {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  adresse: string;
  password: string;
  role: string;
  image?: string;
  pointVente?: unknown;
  region?: unknown;
}
