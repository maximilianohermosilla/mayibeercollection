import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaisesRoutingModule } from './paises-routing.module';
import { PaisesComponent } from './paises.component';
import { GrillaNombreImagenComponent } from "../../../shared/components/grilla-nombre-imagen/grilla-nombre-imagen.component";

@NgModule({
    imports: [
    CommonModule,
    PaisesRoutingModule,
    GrillaNombreImagenComponent
],
    declarations: [PaisesComponent]
})
export class PaisesModule { }
