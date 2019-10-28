import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { LoginService } from './servicios/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    

  sesionActiva = false;

  constructor(private swUpdate: SwUpdate, private loginService:LoginService, private router:Router) {
   
  }

  ngOnInit(): void {

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      });
    }

    let token = localStorage.getItem('tokenPwa');
    
    if(token != null){
      
      this.sesionActiva = true;  
      this.loginService.uidUser = localStorage.getItem('uidUser');      
      this.router.navigateByUrl('/home');
    }    
    
  }

  
  login(){
    this.loginService.loginConFacebook().then(res => {
      
      this.sesionActiva = true;

      this.loginService.uidUser = res.user.uid;

      res.user.getIdToken().then(resToken => {
        localStorage.setItem('tokenPwa', resToken);
      })      

      localStorage.setItem('uidUser', res.user.uid);

      this.router.navigateByUrl('/home');

    }).catch(err => {
      console.log(err);
      this.sesionActiva = false;
    });
  }

  logout(){
    this.loginService.logout().then(res => {
            
      this.sesionActiva = false;

      localStorage.removeItem('tokenPwa');
      localStorage.removeItem('uidUser');

      this.router.navigateByUrl('/');
    }).catch(err => {
      console.log(err);
    });
  }

}
