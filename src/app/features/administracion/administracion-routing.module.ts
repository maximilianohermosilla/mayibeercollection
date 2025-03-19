import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule) },
        { path: 'cervezas', loadChildren: () => import('./cervezas/cervezas.module').then(m => m.CervezasModule) },
        { path: 'marcas', loadChildren: () => import('./marcas/marcas.module').then(m => m.MarcasModule) },
        { path: 'estilos', loadChildren: () => import('./estilos/estilos.module').then(m => m.EstilosModule) },
        { path: 'paises', loadChildren: () => import('./paises/paises.module').then(m => m.PaisesModule) },
        { path: 'ciudades', loadChildren: () => import('./ciudades/ciudades.module').then(m => m.CiudadesModule) }
    ])],
    exports: [RouterModule]
})
export class AdministracionRoutingModule { }
