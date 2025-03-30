import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstilosRoutingModule } from './estilos-routing.module';
import { EstilosComponent } from './estilos.component';
import { GrillaNombreImagenComponent } from "../../../shared/components/grilla-nombre-imagen/grilla-nombre-imagen.component";

@NgModule({
    imports: [
    CommonModule,
    EstilosRoutingModule,
    GrillaNombreImagenComponent
],
    declarations: [EstilosComponent]
})
export class EstilosModule { }
