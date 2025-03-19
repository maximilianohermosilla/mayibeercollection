import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaisesRoutingModule } from './paises-routing.module';
import { PaisesComponent } from './paises.component';

@NgModule({
    imports: [
        CommonModule,
        PaisesRoutingModule
    ],
    declarations: [PaisesComponent]
})
export class PaisesModule { }
