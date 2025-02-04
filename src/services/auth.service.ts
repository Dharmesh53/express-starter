import { Inject, Service } from "typedi";
import { Logger } from "winston";

@Service()
export default class AuthService {
  constructor(
    @Inject('UserModel') private UserModel: Models.UserModel,
    @Inject('logger') private logger: Logger
  ) { }
}
