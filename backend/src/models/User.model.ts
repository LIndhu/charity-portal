export interface User {
  id: number;
  name: string;
  role: 'DONOR' | 'NGO' | 'ADMIN';
  email: string;
}
