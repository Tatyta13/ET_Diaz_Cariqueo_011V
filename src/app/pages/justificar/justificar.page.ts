import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-justificar',
  templateUrl: './justificar.page.html',
  styleUrls: ['./justificar.page.scss'],
})
export class JustificarPage implements OnInit {
  justificacionForm: FormGroup;
  clases: any[] = []; // Lista de clases cargadas desde la base de datos

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private alertController: AlertController
  ) {
    // Inicializar el formulario con validaciones
    this.justificacionForm = this.fb.group({
      claseId: ['', Validators.required], // Campo obligatorio
      motivo: ['', [Validators.required, Validators.minLength(10)]], // Mínimo 10 caracteres
    });
  }

  ngOnInit() {
    // Cargar las clases desde el archivo almacen.json
    this.http.get('http://localhost:3000/clases').subscribe(
      (data: any) => {
        this.clases = data; // Asignar las clases al arreglo
      },
      (error) => {
        console.error('Error al cargar las clases:', error);
      }
    );
  }

  guardarJustificacion() {
    if (this.justificacionForm.valid) {
      const justificacion = {
        ...this.justificacionForm.value,
        fecha: new Date().toISOString(), // Agregar la fecha actual
      };

      // Guardar la justificación en la base de datos (almacen.json)
      this.http.post('http://localhost:3000/justificaciones', justificacion).subscribe(
        async () => {
          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'Justificación guardada correctamente.',
            buttons: ['OK'],
          });
          await alert.present();

          // Reiniciar el formulario
          this.justificacionForm.reset();
        },
        async (error) => {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'No se pudo guardar la justificación. Intente nuevamente.',
            buttons: ['OK'],
          });
          await alert.present();
          console.error('Error al guardar la justificación:', error);
        }
      );
    } else {
      // Mostrar una alerta si el formulario no es válido
      this.mostrarAlerta('Error', 'Por favor completa todos los campos correctamente.');
    }
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
