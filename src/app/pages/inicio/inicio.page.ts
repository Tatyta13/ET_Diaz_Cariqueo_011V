import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  loginForm:FormGroup;
  userdata:any;

  usuario={
    id:0,
    username:"",
    email:"",
    password:"",
    isactive:false
  }

  errorMessage: string='';
  

  login(){
    if (!this.loginForm.valid){
      return;
    }
    const username=this.loginForm.value.username;
    const password=this.loginForm.value.password;

    this.authservice.GetUserByUsername(username).subscribe(resp =>{
      this.userdata=resp;
      console.log(this.userdata);
      if (this.userdata.length === 0){
        this.loginForm.reset();
        this.UsuarioNoExiste();
      }
      this.usuario={
        id: this.userdata[0].id,
        username: this.userdata[0].username,
        password: this.userdata[0].password,
        email: this.userdata[0].email,
        isactive: this.userdata[0].isactive
      }
      if (this.usuario.password !==password){
        this.loginForm.reset();
        this.ErrorUsuario();
        return;
      }
      if (!this.usuario.isactive){
        this.loginForm.reset();
        this.UsuarioInactivo();
        return;
      }
      this.IniciarSesion(this.usuario);
    })
  }

  constructor(private alertController: AlertController,
              private router: Router,
              private authservice:AuthService, private toast:ToastController,
              private builder:FormBuilder) {
                this.loginForm=this.builder.group({
                  'username' : new FormControl("", [Validators.required,Validators.minLength(6)]),
                  'password' : new FormControl("", [Validators.required,Validators.minLength(8)]),
                })
              }

  ngOnInit() {
  }

  private IniciarSesion(usuario:any){
    sessionStorage.setItem('username',usuario.username);
    sessionStorage.setItem('password',usuario.password);
    sessionStorage.setItem('ingresado','true');
    this.showToast('Sesion Iniciada')
    this.router.navigate(['/menu'])
  }
  async showToast(msg:any){
    const toast=await this.toast.create({
      message:msg,
      duration:3000
    })
    toast.present();
  }
  async UsuarioInactivo(){
    const alerta=await this.alertController.create({
      header:'Usuario inactivo',
      message: 'Contactar a admin@admin',
      buttons:['OK']
    })
    alerta.present();
  }
  async ErrorUsuario(){
    const alerta= await this.alertController.create({
      header: 'Error..',
      message: 'Revise sus credenciales',
      buttons:['OK']
    })
    alerta.present();
  }
  async UsuarioNoExiste(){
    const alerta=await this.alertController.create({
      header:'No existe...',
      message: 'Debe registrarse...',
      buttons: ['OK']
    })
  }

  async mensaje(){
    const alert = await this.alertController.create({
      header: 'Datos ingresados correctamente',
      cssClass: 'fondo_alerta',
      buttons: [
        {
          text: 'Ingresar',
          role: 'confirm',
          handler: () => {
            console.log('Envio de datos');
            this.router.navigate(['/menu'])
          },
        },
      ],
    });

    await alert.present();

}
}