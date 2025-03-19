import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarcasComponent } from './marcas.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: MarcasComponent }
    ])],
    exports: [RouterModule]
})
export class MarcasRoutingModule { }
