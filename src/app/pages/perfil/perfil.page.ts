import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  perfilForm: FormGroup;
  imagenPerfil: string = ''; // Variable para la URL de la imagen de perfil

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.perfilForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
    this.cargarUsuario('http://localhost:3000/usarios'); // Cargar los datos del usuario al inicializar el componente
  }

  cargarUsuario(id: string) {
    this.authService.getUserById(id).subscribe((usuario) => {
      this.perfilForm.patchValue({
        username: usuario.username,
        email: usuario.email,
        password: usuario.password,
      });

      // Asignar la imagen de perfil si existe
      //this.imagenPerfil = usuario.imagen || 'assets/default-profile.png'; // URL de la imagen o imagen predeterminada
    });
  }

  seleccionarImagen(event: any) {
    const archivo = event.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenPerfil = e.target.result; // Mostrar la imagen seleccionada
      };
      reader.readAsDataURL(archivo);
    }
  }

  guardarPerfil() {
    if (this.perfilForm.valid) {
      const datosPerfil = { ...this.perfilForm.value };

      // Si hay una imagen seleccionada, incluye la URL de la imagen
      if (this.imagenPerfil) {
        datosPerfil.imagen = this.imagenPerfil;
      }

      // Aquí puedes enviar los datos actualizados al backend
      this.authService.updateUser('usarios', datosPerfil).subscribe(() => {
        alert('Perfil actualizado');
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}
