import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    standalone: false
})
export class AppMenuComponent implements OnInit {

    token: string = "";
    model: any[] = [];

    constructor(public layoutService: LayoutService) { 
        this.token = localStorage.getItem('AuthToken') ?? "";       
    }

    ngOnInit() {
        this.model = [
            {
                label: 'INICIO',
                items: [
                    { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/pages/inicio'] }
                ]
            },
            {
                label: 'ADMINISTRACIÓN',
                items: [
                    { label: 'Perfil', icon: 'pi pi-fw pi-user', routerLink: ['/administracion/perfil'] , disabled: this.token == "" },
                    { label: 'Cervezas', icon: 'pi pi-fw pi-inbox', routerLink: ['/administracion/cervezas'] , disabled: this.token == "" },
                    { label: 'Marcas', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['/administracion/marcas'] , disabled: this.token == "" }, 
                    { label: 'Estilos', icon: 'pi pi-fw pi-tag', routerLink: ['/administracion/estilos'] , disabled: this.token == "" },                    
                    { label: 'Países', icon: 'pi pi-fw pi-flag', routerLink: ['/administracion/paises'] , disabled: this.token == "" }, 
                    { label: 'Ciudades', icon: 'pi pi-fw pi-map-marker', routerLink: ['/administracion/ciudades'] , disabled: this.token == "" }, 
                ]
            },           
            {
                label: 'Reportes',
                items: [
                    {
                        label: 'Reportes', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/pages/reportes']
                    }
                ]
            }
        ];
    }
}
