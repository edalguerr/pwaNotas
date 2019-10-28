import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  uidUser:any = {};

  constructor(private afAuth:AngularFireAuth) { }

  loginToken(token){
    return this.afAuth.auth.signInWithCustomToken(token);
  }
  
  getUsuario(){
    return this.afAuth.auth.currentUser;
  }

  loginConFacebook(){
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  logout(){
    return this.afAuth.auth.signOut();
  }
}
