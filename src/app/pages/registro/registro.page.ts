import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserNuevo } from 'src/app/interfaces/users';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registroForm: FormGroup;

  nuevoUsuario: UserNuevo={
    username:"",
    password: "",
    email: "",
    isactive: false
  }

  userdata: any;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private authservice: AuthService,
    private fbuilder: FormBuilder) {
      this.registroForm=this.fbuilder.group({
        'username': new FormControl ("", [Validators.required, Validators.minLength(6)]),
        'password': new FormControl ("",[Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
        'email': new FormControl ("",[Validators.required, Validators.email]),
      })
    }

  ngOnInit() {
  }

  crearUsuario(){
    if (this.registroForm.valid){
      this.authservice.GetUserByUsername(this.registroForm.value.username).subscribe(resp=>{
        this.userdata = resp;
        if(this.userdata.legth>0){
          this.registroForm.reset();
          this.errorDuplicidad();
        }
        else{
          this.nuevoUsuario.username=this.registroForm.value.username;
          this.nuevoUsuario.password=this.registroForm.value.password;
          this.nuevoUsuario.email=this.registroForm.value.email;
          this.nuevoUsuario.isactive=true;
          this.authservice.PostUsuario(this.nuevoUsuario).subscribe();
          this.registroForm.reset();
          this.mostrarMensaje();
          this.router.navigateByUrl('/inicio');
        }
      })
    }
  }

  async mostrarMensaje(){
    const alerta = await this.alertController.create({
      header: 'Usuario creado',
      message: 'Bienvenid@! '+ this.nuevoUsuario.username,
      buttons: ['OK']
    });
    alerta.present();
  }

  async errorDuplicidad(){
    const alerta = await this.alertController.create({
      header: 'Error...',
      message: 'Usted '+ this.nuevoUsuario.username + ' ya esta registrado',
      buttons: ['OK']
    });
    alerta.present();
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
