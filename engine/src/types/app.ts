import { IModels} from "../models";
import { IServices } from "../services";
export interface IAppContext {
  models?: IModels;
  services?: IServices
}

export default class IService {
  models?: IModels;
  constructor(context: IAppContext) {
    this.models = context.models;
  }
}