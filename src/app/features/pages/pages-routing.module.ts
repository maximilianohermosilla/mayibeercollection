import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'inicio', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule) },
        { path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule) },
        { path: 'cervezas', loadChildren: () => import('./cervezas/cervezas.module').then(m => m.CervezasModule) },
        { path: 'plataformas', loadChildren: () => import('./plataformas/plataformas.module').then(m => m.PlataformasModule) },
        { path: 'reportes', loadChildren: () => import('./reportes/reportes.module').then(m => m.ReportesModule) }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
