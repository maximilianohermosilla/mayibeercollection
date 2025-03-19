import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { GrillaCervezasComponent } from 'src/app/shared/components/grilla-cervezas/grilla-cervezas.component';

@NgModule({
    imports: [
        CommonModule,
        InicioRoutingModule,
        GrillaCervezasComponent
    ],
    declarations: [InicioComponent]
})
export class InicioModule { }
