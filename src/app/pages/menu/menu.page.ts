import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  slideOpts = {
    initialSlide: 0, // Slide inicial
    speed: 400, // Velocidad de transición (milisegundos)
    autoplay: {
      delay: 3000, // Tiempo entre cada transición (milisegundos)
      disableOnInteraction: false, // No detener autoplay en interacción
    },
    loop: true, // Hacer que el carrusel sea infinito
  };

  constructor(private menucontroller: MenuController) { }

  ngOnInit() {
  }

  mostrarMenu(){
    this.menucontroller.open('first');
  }

}
