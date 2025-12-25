export interface ICategory {
  id: string;
  name: string;
}

export interface IHostProfile {
  id: string;
  fullName: string;
  bio: string | null;
  image: string | null;
  location: string | null;
  userId: string;
}

export interface IHost {
  profile: IHostProfile;
}

export interface IEvents {
  id: string;
  title: string;
  description: string;
  date: string; // ISO String
  location: string;
  minParticipants: number;
  maxParticipants: number;
  hostId: string;
  categoryId: string;
  fee: string; // Note: In the JSON this is a string "100"
  currency: string;
  image: string;
  status: "OPEN" | "CLOSED" | string;
  createdAt: string;
  updatedAt: string;
  category: ICategory[];
  host: IHost;
}
