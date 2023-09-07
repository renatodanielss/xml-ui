import { Jobs } from "./models/jobs.model";
import { User } from "./models/user.model";
import { Language } from "./models/language.model";
import { Application } from "./models/application.model";

export interface AppState {
  readonly jobs: Jobs[];
  readonly user: User[];
  readonly language: Language;
  readonly applications: Application[];
}