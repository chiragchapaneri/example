// Uncomment these imports to begin using these cool features!
import {repository} from '@loopback/repository';
import {getJsonSchema, post, requestBody} from '@loopback/rest';
import * as _ from "lodash";
import {User} from '../models';
import {UserRepository} from '../repositories';
import {validcredentials} from '../service/validator';
// import {inject} from '@loopback/core';


export class UserController {
  constructor(
    @repository(UserRepository)
    public userrepository:UserRepository
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

async signup(@requestBody() userdata:User){
  validcredentials(_.pick(userdata,['email','password']));
  const saveduse=await this.userrepository.create(userdata);
  return saveduse;

}

}
