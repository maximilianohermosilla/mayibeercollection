import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CervezasRoutingModule } from './cervezas-routing.module';
import { CervezasComponent } from './cervezas.component';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormCervezaComponent } from 'src/app/shared/components/form-cerveza/form-cerveza.component';
import { DialogModule } from 'primeng/dialog';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        DataViewModule,
        DropdownModule,
        InputTextModule,
        CervezasRoutingModule,
        FormCervezaComponent,
        DialogModule
    ],
    declarations: [CervezasComponent]
})
export class CervezasModule { }
