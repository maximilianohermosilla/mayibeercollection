import { Component, inject, OnInit } from '@angular/core';
import { Estilo } from 'src/app/core/interfaces/estilo';
import { EstilosService } from 'src/app/core/services/estilos.service';

@Component({
    templateUrl: './estilos.component.html',
    standalone: false
})
export class EstilosComponent implements OnInit {
    public estilosService = inject(EstilosService);
    public listaEstilos: Estilo[] = [];

    ngOnInit(): void {
        this.getEstilos();
    }

    public getEstilos(){
        this.estilosService.GetAll().subscribe((response) => {
            this.listaEstilos = response;
        });
    }

    public handleElement(element: Estilo) {
        if(element && element!.id! > 0){
            this.estilosService.Update(element).subscribe((response) => {
                this.getEstilos();
            });
        }
        else{
            this.estilosService.Create(element).subscribe((response) => {
                this.getEstilos();
            });
        }
    }

    public handleDeleteElement(element: Estilo) {
        this.estilosService.Delete(element).subscribe((response) => {
            this.getEstilos();
        });
    }
}

