import { ROLE } from "./enum/roles";
import { Person } from "./person.model";

export class modelUser {
  username: string;
  password: string;
  email: string;
  image: string;
  person: Person;
  userType: string;
  roles: ROLE[];
}






