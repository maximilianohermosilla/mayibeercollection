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
        console.log('Dato recibido en page:', element);
        if(element && element!.id! > 0){
            this.estilosService.Update(element).subscribe((response) => {
                console.log(response);
                this.getEstilos();
            });
        }
        else{
            this.estilosService.Create(element).subscribe((response) => {
                console.log(response);
                this.getEstilos();
            });
        }
    }

    public handleDeleteElement(element: Estilo) {
        console.log('Dato recibido para eliminar en page:', element);
        this.estilosService.Delete(element).subscribe((response) => {
            console.log(response);
            this.getEstilos();
        });
    }
}

