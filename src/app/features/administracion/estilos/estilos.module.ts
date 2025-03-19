import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstilosRoutingModule } from './estilos-routing.module';
import { EstilosComponent } from './estilos.component';

@NgModule({
    imports: [
        CommonModule,
        EstilosRoutingModule
    ],
    declarations: [EstilosComponent]
})
export class EstilosModule { }
