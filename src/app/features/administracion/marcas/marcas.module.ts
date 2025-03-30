import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarcasRoutingModule } from './marcas-routing.module';
import { MarcasComponent } from './marcas.component';
import { GrillaNombreImagenComponent } from "../../../shared/components/grilla-nombre-imagen/grilla-nombre-imagen.component";

@NgModule({
    imports: [
    CommonModule,
    MarcasRoutingModule,
    GrillaNombreImagenComponent
],
    declarations: [MarcasComponent]
})
export class MarcasModule { }
