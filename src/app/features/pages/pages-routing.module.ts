import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule) },
        { path: 'inicio', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule) },
        { path: 'reportes', loadChildren: () => import('./reportes/reportes.module').then(m => m.ReportesModule) }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
