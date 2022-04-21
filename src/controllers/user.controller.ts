// Uncomment these imports to begin using these cool features!
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {getJsonSchema, post, requestBody} from '@loopback/rest';
import * as _ from "lodash";
import {User} from '../models';
import {UserRepository} from '../repositories';
import {BcryptHasher} from '../service/hash.password.bcrypt';
import {validcredentials} from '../service/validator';
// import {inject} from '@loopback/core';


export class UserController {
  constructor(
    @repository(UserRepository)
    public userrepository:UserRepository,


    @inject('service.hasher')
    public hasher: BcryptHasher,
  ) {



  }

@post("/signup",{
  responses:{
    "200":{
      discription:"user",
      content:{
        schema:getJsonSchema(User)
      }
    }
  }
})

// async signup(@requestBody() userdata:User){
//   validcredentials(_.pick(userdata,['email','password']));
//   const saveduse=await this.userrepository.create(userdata);
//   return saveduse;

// }


async signup(@requestBody() userData: User) {
  validcredentials(_.pick(userData, ['email', 'password']));

  //encrypt the user password
  // eslint-disable-next-line require-atomic-updates
  userData.password = await this.hasher.hashPassword(userData.password);

  const savedUser = await this.userrepository.create(userData);
  // remove savedUser.password;
  return savedUser;
}

}
