import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  constructor(private AFDB:AngularFireDatabase, private loginService:LoginService) { 

  }

  public getNotas(){
    return this.AFDB.list(this.loginService.uidUser + '/notas/');
  }

  public getNota(id){
    return this.AFDB.object(this.loginService.uidUser + '/notas/'+id);
  }

  public crearNota(nota){
    return this.AFDB.database.ref(this.loginService.uidUser + '/notas/'+nota.id).set(nota);
  }

  public  actualizarNota(nota){
    return this.AFDB.database.ref(this.loginService.uidUser + '/notas/'+nota.id).set(nota);
  }

  public eliminarNota(nota){
    return this.AFDB.database.ref(this.loginService.uidUser + '/notas/'+nota.id).remove();
  }

}
