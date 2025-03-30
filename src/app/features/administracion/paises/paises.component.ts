import { Component, inject, OnInit } from '@angular/core';
import { Pais } from 'src/app/core/interfaces/pais';
import { PaisesService } from 'src/app/core/services/paises.service';

@Component({
    templateUrl: './paises.component.html',
    standalone: false
})
export class PaisesComponent implements OnInit{
    public paisesService = inject(PaisesService);
    public listaPaises: Pais[] = [];

    ngOnInit(): void {
        this.paisesService.GetAll().subscribe((response) => {
            this.listaPaises = response;
        });
    }
}
