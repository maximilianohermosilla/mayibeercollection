import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormUsuarioComponent } from 'src/app/shared/components/form-usuario/form-usuario.component';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        DialogModule,
        FormUsuarioComponent,
        PerfilRoutingModule
    ],
    declarations: [PerfilComponent]
})
export class PerfilModule { }
