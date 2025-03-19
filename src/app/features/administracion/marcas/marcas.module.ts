import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarcasRoutingModule } from './marcas-routing.module';
import { MarcasComponent } from './marcas.component';

@NgModule({
    imports: [
        CommonModule,
        MarcasRoutingModule
    ],
    declarations: [MarcasComponent]
})
export class MarcasModule { }
