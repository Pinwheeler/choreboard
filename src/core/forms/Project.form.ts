import { User } from "@firebase/auth";
import { UpcertTask } from "./Task.form";

export interface UpcertProject {
  name: string;
  owner: User;
  tasks: UpcertTask[];
}
