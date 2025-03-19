import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CiudadesRoutingModule } from './ciudades-routing.module';
import { CiudadesComponent } from './ciudades.component';

@NgModule({
    imports: [
        CommonModule,
        CiudadesRoutingModule
    ],
    declarations: [CiudadesComponent]
})
export class CiudadesModule { }
