import { Config } from '../config';
import IService, { IAppContext } from '../types/app';
import { IUserAuth, IUserInput } from '../types/user';
import { _generateToken } from '../utils/token';

export default class UserService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async registerUser(payload: IUserInput): Promise<IUserAuth> {
    try{
        const _user = await this.models?.User.find({email:payload.email})
        if(_user.length) throw new Error("User already exists")

        const user = new this.models?.User({...payload})
        await user.save()

        const token = _generateToken(user._id);

        return {
            token,
            user
        }

    }catch(e){
        throw new Error("Error creating new user")
    }
  }
}
