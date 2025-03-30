import { Component, inject, OnInit } from '@angular/core';
import { Marca } from 'src/app/core/interfaces/marca';
import { MarcasService } from 'src/app/core/services/marcas.service';

@Component({
    templateUrl: './marcas.component.html',
    standalone: false
})
export class MarcasComponent implements OnInit{
    public marcasService = inject(MarcasService);
    public listaMarcas: Marca[] = [];

    ngOnInit(): void {
        this.marcasService.GetAll().subscribe((response) => {
            this.listaMarcas = response;
        });
    }
}
