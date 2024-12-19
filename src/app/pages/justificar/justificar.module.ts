import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JustificarPageRoutingModule } from './justificar-routing.module';

import { JustificarPage } from './justificar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    JustificarPageRoutingModule
  ],
  declarations: [JustificarPage]
})
export class JustificarPageModule {}
