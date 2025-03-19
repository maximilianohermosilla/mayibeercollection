import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaisesComponent } from './paises.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PaisesComponent }
    ])],
    exports: [RouterModule]
})
export class PaisesRoutingModule { }
