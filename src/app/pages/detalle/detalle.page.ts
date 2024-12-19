import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MisQr } from 'src/app/interfaces/users';
import { AlertController } from '@ionic/angular';
import { ApidatosService } from 'src/app/services/apidatos.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  post:any;
  
  Clase: any;
  qrdata:string;
  
  nombre:any;

  constructor(private ruta:ActivatedRoute, private router:Router, private alertcontroller: AlertController, private apidatos: ApidatosService) {
    this.ruta.queryParams.subscribe(params=>{
      this.post=JSON.parse(params['post']);
    })
    this.qrdata=' ';
    this.nombre=sessionStorage.getItem('username');
  }

  ngOnInit() {
  }

  regresar(){
    this.router.navigate(['/clases'])
  }
  generarQr(){
    this.qrdata=' ';
    this.qrdata=this.Clase.nombre + this.Clase.id + this.Clase.hora + this.Clase.profesor + this.nombre;
    console.log(this.qrdata);
  }
  //newQr: MisQr={
    //nombre:'',
    //clase:'',
    
  //}

}
