import { modelDoctor } from "./doctor.model";
import { Person } from "./person.model";

export class Patients {
  id: number;
  name: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumber: string;
  doctor: modelDoctor;
  person: Person;
  symptoms: string[];
}

