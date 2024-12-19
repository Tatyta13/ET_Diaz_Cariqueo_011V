import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApidatosService } from 'src/app/services/apidatos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {

  posteos: any[]=[];

  

  constructor(private alertController: AlertController,
    private router: Router, private apidatos: ApidatosService) { }

  ngOnInit() {
  }

  buscarPost(Observable:any){
    this.router.navigate(['/detalle'],{queryParams:{post:JSON.stringify(Observable)}});
  }

  cargarApi(){
    this.apidatos.getPosts().subscribe(resp =>{
      console.log(resp);
    })
  
    this.apidatos.getPosts().subscribe(
      datos => this.posteos = datos,
    )
  
  }
  async mensajeQR(){
    const alert = await this.alertController.create({
      header: 'Desea generar QR?',
      cssClass: 'fondo_alerta',
      buttons: [
        {
          text: 'Generar',
          role: 'confirm',
          handler: () => {
            console.log('Envio de datos');
            this.router.navigate(['/qr'])
          },
        },
        
      ],
      
    });

    await alert.present();

}
async mensajeIns(){
  const alert = await this.alertController.create({
    header: '',
    cssClass: 'fondo_alerta',
    buttons: [
      {
        text: 'Justificar',
        role: 'confirm',
        handler: () => {
          console.log('Envio de datos');
          this.router.navigate(['/justificar'])
        },
      },
      
    ],
    
  });

  await alert.present();

}



}
