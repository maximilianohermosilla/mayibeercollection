import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CiudadesComponent } from './ciudades.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CiudadesComponent }
    ])],
    exports: [RouterModule]
})
export class CiudadesRoutingModule { }
