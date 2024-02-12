import { IAppContext } from "../types/app";
import UserService from "./user";

export interface IServices {
  UserService: UserService
}

export default async function initServices(context:IAppContext):Promise<IServices>{

  return {
    UserService: new UserService(context)
  }
} 