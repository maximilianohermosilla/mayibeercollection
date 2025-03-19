import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EstilosComponent } from './estilos.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: EstilosComponent }
    ])],
    exports: [RouterModule]
})
export class EstilosRoutingModule { }
