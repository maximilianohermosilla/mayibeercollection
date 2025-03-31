import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CiudadesRoutingModule } from './ciudades-routing.module';
import { CiudadesComponent } from './ciudades.component';
import { GrillaCiudadesComponent } from "../../../shared/components/grilla-ciudades/grilla-ciudades.component";

@NgModule({
    imports: [
    CommonModule,
    CiudadesRoutingModule,
    GrillaCiudadesComponent
],
    declarations: [CiudadesComponent]
})
export class CiudadesModule { }
