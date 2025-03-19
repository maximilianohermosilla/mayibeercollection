import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CervezasComponent } from './cervezas.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CervezasComponent }
    ])],
    exports: [RouterModule]
})
export class CervezasRoutingModule { }
