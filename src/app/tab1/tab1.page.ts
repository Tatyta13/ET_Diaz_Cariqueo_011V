import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApidatosService } from '../services/apidatos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  posteos:any[]=[];

  constructor(private menucontroller: MenuController,
              private apidatos: ApidatosService) {}

  mostrarMenu(){
    this.menucontroller.open('first');
  }

  cargarApi(){
    this.apidatos.getPosts().subscribe(resp =>{
      console.log(resp);
    })

    this.apidatos.getPosts().subscribe(
      datos => this.posteos = datos,
    )

  }



}
