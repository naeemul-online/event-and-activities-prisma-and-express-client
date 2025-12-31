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

export type ParticipantStatus = "PENDING" | " JOINED" | "LEFT";
export type UserRole = "USER" | "HOST" | "ADMIN";

export interface IProfile {
  id: string;
  fullName: string;
  bio?: string | null;
  image?: string | null;
  location?: string | null;
  userId: string;
  user: IUser;
}

export interface IEventParticipant {
  id: number;
  eventId: string;
  userId: string;
  status: ParticipantStatus;
  joinedAt?: string | null;
  event?: IEvents;
  user?: IUser;
}

export interface IUser {
  id: string;
  email: string;
  password?: string;
  role: UserRole;
  profile: IProfile;
  createdAt?: string;
  updatedAt?: string;
  events?: IEvents[];
  eventParticipants?: IEventParticipant[];
}

export interface IEvents {
  id: string;
  title: string;
  description: string;
  date: string; // ISO String
  location: string;
  minParticipants: number;
  maxParticipants: number;
  eventParticipants?: IEventParticipant[];
  categoryId: string;
  fee: string; // Note: In the JSON this is a string "100"
  currency: string;
  image: string;
  status: "OPEN" | "FULL" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
  category?: ICategory;
  host: IHost;
  paymentStatus?: "PAID" | "PENDING";
}

export interface IEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  minParticipants: number;
  maxParticipants: number;

  hostId: string;
  categoryId: string;
  fee: string;
  currency: string;
  image: string;
  status: "OPEN" | "FULL" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
  category: {
    name: string;
  };
  host: {
    email: string;
    profile: {
      id: string;
      fullName: string;
      bio: string;
      image: string | null;
      location: string;
      userId: string;
    };
  };
}
