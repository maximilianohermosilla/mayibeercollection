import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CervezasRoutingModule } from './cervezas-routing.module';
import { CervezasComponent } from './cervezas.component';
import { GrillaCervezasComponent } from 'src/app/shared/components/grilla-cervezas/grilla-cervezas.component';

@NgModule({
    imports: [
        CommonModule,
        CervezasRoutingModule,
        GrillaCervezasComponent
    ],
    declarations: [CervezasComponent]
})
export class CervezasModule { }

