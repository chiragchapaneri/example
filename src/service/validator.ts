import {HttpErrors} from '@loopback/rest';
import IsEmail from "isemail";
import {Credntials} from '../repositories';


export function validcredentials(credentilas:Credntials)
{
  if(!IsEmail.validate(credentilas.email))
  {
throw new  HttpErrors.UnprocessableEntity("invlaid email")

  }

}
