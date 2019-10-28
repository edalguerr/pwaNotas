import { Component, OnInit } from '@angular/core';
import { NotasService } from 'src/app/servicios/notas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  title = 'pwaNotas';
  notas: any = { categoria: 'Personal' };
  notaCreada = false;
  listaNotas: any = [];
  msjAlertaSatisfactoria = 'Nota creada';  
  editar = false;

  constructor(private notasService: NotasService,  private router:Router) { 
    this.notasService.getNotas().valueChanges().subscribe(res => {
      this.listaNotas = res;
    });
  }

  ngOnInit() {

    let token = localStorage.getItem('tokenPwa');
    if(token == null){
      this.router.navigateByUrl('/');
    }
  }

  guardarNota(): void {
    this.msjAlertaSatisfactoria = 'Nota creada';
    
    if(!this.notas.id){
      this.notas.id = Date.now();
    }
    else{
      this.msjAlertaSatisfactoria = "Nota actualizada";
    }
    
    this.notasService.crearNota(this.notas).then(res => {
      this.notas = { categoria: 'Personal' };

      this.notaCreada = true;
      setInterval(() => {
        this.notaCreada = false;
      }, 5000);

    }).catch(err => {
      
      console.log(err);
      this.notaCreada = false;
    });
  }

  seleccionarNota(nota){
    this.notas = nota;
    this.editar = true;
    document.getElementById("btnCrearNota").click();        
  }

  desplegar(){
    if(!this.editar){
      this.notas = { categoria: 'Personal' };
    }
    else{
      this.editar = false;
    }
    
  }

  eliminarNota(nota){
    this.notasService.eliminarNota(nota);
  }

}
