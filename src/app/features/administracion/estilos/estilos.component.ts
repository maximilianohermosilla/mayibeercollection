import { Component, inject, OnInit } from '@angular/core';
import { Estilo } from 'src/app/core/interfaces/estilo';
import { EstilosService } from 'src/app/core/services/estilos.service';

@Component({
    templateUrl: './estilos.component.html',
    standalone: false
})
export class EstilosComponent implements OnInit{
    public estilosService = inject(EstilosService);
    public listaEstilos: Estilo[] = [];

    ngOnInit(): void {
        this.estilosService.GetAll().subscribe((response) => {
            this.listaEstilos = response;
        });
    }
}

