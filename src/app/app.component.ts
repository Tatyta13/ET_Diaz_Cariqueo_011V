import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Opciones{
  icon:string;
  name:string;
  redirecTo:string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  opciones: Opciones[]=[
    {
      icon:'home-outline',
      name:'Menu',
      redirecTo:'/menu'
    },
    {
      icon:'accessibility-outline',
      name:'Perfil',
      redirecTo:'/perfil'
    },
    {
      icon:'time-outline',
      name:'clases',
      redirecTo:'/clases'
    },
    {
      icon: 'log-out-outline', // Ícono para cerrar sesión
      name: 'Cerrar Sesión',
      redirecTo: '', // No redirige, será manejado por un método
    },
  ]
  
  constructor(private router:Router) {}

  navegar(ruta: string) {
    if (ruta) {
      this.router.navigate([ruta]);
    }
  }

  logout() {
    // Limpiar datos de la sesión
    sessionStorage.clear();

    // Redirigir al login
    this.router.navigate(['/login']);
  }
}