import { UserRole } from "@/lib/auth-utils";
import { IProfile } from "./events.interface";

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profile: IProfile;
}
