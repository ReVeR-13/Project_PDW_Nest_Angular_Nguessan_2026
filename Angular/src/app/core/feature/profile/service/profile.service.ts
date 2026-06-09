import { Injectable } from "@angular/core";
import { Account } from "../data";

@Injectable({
    providedIn:'root'
})
export class ProfileService{

  public user:Account = {
    name:'john',
    mail:'john@hotmail.be'
  };

  constructor(){}

  public changeName(user:Account):Account{
    this.user.name =user.name;
    this.user.mail =user.name;

    return this.user;
  }
}